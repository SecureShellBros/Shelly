import React, { useState, useEffect } from 'react';
import './HackerLogin.css';

const HackerLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);
  const [header, setHeader] = useState('');

  const fullHeader = '>> SYSTEM BOOTING... PEAK TERMINAL LOGIN INITIALIZED';

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setHeader((prev) => prev + fullHeader[i]);
      i++;
      if (i >= fullHeader.length) clearInterval(typing);
    }, 30);
    return () => clearInterval(typing);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'root' && password === 'toor') {
      onLogin(); 
    } else {
      setAccessDenied(true);
      setPassword('');
      setTimeout(() => setAccessDenied(false), 2000);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-terminal">
        <pre className="terminal-title">{header}<span className="cursor">|</span></pre>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label> ENTER USERNAME:</label>
            <input
              type="text"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label> ENTER PASSWORD:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit"> INITIATE LOGIN</button>
          {accessDenied && (
            <div className="access-denied">
              !! ACCESS DENIED !!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default HackerLogin;
