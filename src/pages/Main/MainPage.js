import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import '../../styles/Main/MainPage.css';
import axios from 'axios';
import { getCookie } from '../../utils/Cookie';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducer/actions';

const MainPage = () => {
  const [albums, setAlbums] = useState([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

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

  return (
    <div className="main_container">
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
