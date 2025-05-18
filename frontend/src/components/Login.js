import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded credentials
    if (username === 'admin' && password === 'admin123') {
      onLogin();
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className = "bglg">
    <form onSubmit={handleSubmit}>
      <h1 >Admin Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form></div>
  );
}

export default Login;
