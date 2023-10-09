import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import axios from 'axios';
import { getCookie } from '../../utils/Cookie';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducer/actions';
import '../../styles/Main/MainPage.css';

const MainPage = () => {
  const [albums, setAlbums] = useState([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const accessToken = getCookie('jwtToken');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const accessToken = getCookie('jwtToken');

    axios
      .get('http://localhost:3001/album', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          skip: 0,
          count: 10,
        },
      })
      .then((response) => {
        dispatch(login());
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }, []);

  const handleCreateAlbumBtn = async () => {
    try {
      const album_res = await axios.post(`http://localhost:3001/album/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <div className="main_container">
      <div className="album_section">
        <div className="album_text">앨범리스트</div>
        <button className="albumCreateBtn" onClick={handleCreateAlbumBtn}>
          앨범만들기
        </button>
      </div>
      {isLoggedIn ? (
        <div className="cards">
          {albums.map((album) => (
            <Card key={album.id} album={album} />
          ))}
        </div>
      ) : (
        navigate('/login')
      )}
    </div>
  );
};

export default MainPage;
