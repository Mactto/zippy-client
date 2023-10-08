import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Register/RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !fullname || !password) {
      setIsError(true);
      return;
    }

    const registerData = {
      email: email,
      fullname: fullname,
      password: password,
    };

    axios
      .post('http://localhost:3001/account', registerData)
      .then((response) => {
        console.log('서버 응답:', response.data);
        navigate('/login');
      })
      .catch((error) => {
        setIsError(true);
        console.error('오류 발생:', error);
      });
  };

  return (
    <div className="register_container">
      <h2>회원가입</h2>
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleRegister}>
          회원가입
        </button>
      </form>
      <div className={`error_message ${isError ? 'show' : 'hide'}`}>
        회원가입에 실패했습니다. 입력값을 확인해주세요!
      </div>
    </div>
  );
};

export default RegisterPage;
