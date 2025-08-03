import React, { useState } from 'react';
import './App.css';
import XTermComponent from './XTermComponent';
import TerminalLogin from './TerminalLogin';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin@124') {
      setAuthenticated(true);
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div className="appWrapper">
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
