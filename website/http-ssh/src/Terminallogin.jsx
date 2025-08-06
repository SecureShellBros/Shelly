import React, { useState } from 'react';
import './TerminalLogin.css';

function TerminalLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="loginWrapper">
      <div className="loginScreen">
        <h1 className="loginTitle">Peak Terminal</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="loginIp">Login IP</label>
          <input
            id="loginIp"
            type="text"
            placeholder="enter IP address"
            value={username}
            required
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default TerminalLogin;
