import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from '../../utils/Cookie';
import '../../styles/Album/AlbumPage.css';

const AlbumPage = () => {
  const { albumId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

  const accessToken = getCookie('jwtToken');

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const album_res = await axios.get(
          `http://localhost:3001/album/${albumId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setAlbum(album_res.data);

        const photos_res = await axios.get('http://localhost:3001/photo', {
          params: {
            filter_album_id: album_res.data.id,
            skip: 0,
            count: 40,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setPhotos(photos_res.data);

        setIsLoading(false);
      } catch (error) {
        console.error('오류 발생:', error);
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, []);

  const handleAddImages = (e) => {
    const imageLists = Array.from(e.target.files);

    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
    setUploadImages(imageLists);
  };

  const handleUploadImages = async () => {
    const uploadImageInfos = uploadImages.map(
      (uploadImage) => `${uploadImage.name}|${uploadImage.type}`
    );

    const response = await axios.post(
      'http://localhost:3001/photo/bulk',
      {
        albumId: album.id,
        fileInfos: uploadImageInfos,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    uploadImages.map(async (uploadImage) => {
      const presignedUrl = response.data.presignedUrls[uploadImage.name];

      await axios.put(presignedUrl, uploadImage, {
        headers: {
          'Content-Type': uploadImage.type,
          'Content-Disposition': 'inline',
        },
      });
    });

    setIsModalOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        album && (
          <div className="album_container">
            <div className="album_section">
              <h1>{album.title}</h1>
              <button
                className="photoUploadBtn"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                이미지 업로드
              </button>
            </div>
            <div className="album">
              {photos &&
                photos.map((photo) => (
                  <div key={photo.id}>
                    <img src={photo.uploadUrl} alt="이미지 설명" />
                  </div>
                ))}

              <div className={`modal ${isModalOpen ? 'active' : ''}`}>
                <label htmlFor="input-file" onChange={handleAddImages}>
                  <input type="file" id="input-file" />
                  <div className="modalBtns">
                    <button className="uploadBtn" onClick={handleUploadImages}>
                      업로드
                    </button>
                    <button
                      className="closeModalBtn"
                      onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                      닫기
                    </button>
                  </div>
                </label>
              </div>

              {showImages.map((image, id) => (
                <div key={id}>
                  <img src={image} alt={`${image}-${id}`} />
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AlbumPage;
