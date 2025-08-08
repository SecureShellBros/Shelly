import React, { useState, useEffect } from 'react';
import './App.css';
import XTermComponent from './XTermComponent.jsx';
import TerminalLogin from './Terminallogin.jsx';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('ip')) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin@124') {
      setAuthenticated(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  function handleLogout(event) {
    sessionStorage.removeItem('ip');
    setAuthenticated(false);

  }

  return (
    <div className="appWrapper">
      {authenticated ? (<button id="logout" onClick={handleLogout}>Log Out</button>) : <div></div>}
      {!authenticated ? (
        <TerminalLogin onLogin={handleLogin} />
      ) : (
        <div className="terminalContainer">
          <h1 className="terminalTitle">Peak Terminal</h1>
          <XTermComponent />
          
        </div>
      )}
      
    </div>
  );
}

export default App;
