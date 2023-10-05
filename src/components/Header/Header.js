import { Link } from 'react-router-dom';
import zippyLogo from '../../assets/zippy_logo.png';
import './Header.css';

const Header = () => {
  return (
    <div className="header_container">
      <div className="logo">
        <Link to="">
          <img src={zippyLogo} alt="zippy_logo" />
        </Link>
      </div>
      <div className="btns">
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
      </div>
    </div>
  );
};

export default Header;
