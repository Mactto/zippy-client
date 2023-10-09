import { Link } from 'react-router-dom';
import zippyLogo from '../../assets/zippy_logo.png';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducer/actions';
import { removeCookie } from '../../utils/Cookie';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleLogout = () => {
    removeCookie('jwtToken');
    dispatch(logout());
  };

  return (
    <div className="header_container">
      <div className="logo">
        <Link to="">
          <img src={zippyLogo} alt="zippy_logo" />
        </Link>
      </div>
      {isLoggedIn ? (
        <button className="logoutBtn" onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <div className="btns">
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
