import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/Cookie';
import '../../styles/Login/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setIsError(true);
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    axios
      .post('http://localhost:3001/auth/login', loginData)
      .then((response) => {
        const token = response.data.access_token;
        setCookie('jwtToken', token, { path: '/' });
        console.log('서버 응답:', response.data);
        navigate('/');
      })
      .catch((error) => {
        setIsError(true);
        console.error('오류 발생:', error);
      });
  };

  return (
    <div className="login_container">
      <h2>로그인</h2>
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          로그인
        </button>
      </form>
      <div className={`error_message ${isError ? 'show' : 'hide'}`}>
        로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요!
      </div>
    </div>
  );
};

export default LoginPage;
