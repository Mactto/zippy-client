import React, { useState } from 'react';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      console.log('Email:', email);
      console.log('fullname:', fullname);
      console.log('Password:', password);
    };
  
    return (
        <div>
          <h2>회원가입</h2>
          <form>
            <input
              type="text"
              placeholder="Email"
              value={fullname}
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
            <button type="button" onClick={handleLogin}>
              회원가입
            </button>
          </form>
        </div>
    )
}

export default RegisterPage;