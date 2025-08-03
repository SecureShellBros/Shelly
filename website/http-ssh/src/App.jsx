import './App.css';
import XTermComponent from './XTermComponent.jsx';
import HackerLogin from './Hackerlogin.jsx';
import MatrixBackground from './MatrixBackground';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <MatrixBackground />
      {!isLoggedIn ? (
        <HackerLogin onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div className='terminalContainer' style={{ width: "100%", height: '100vh', position: 'relative' }}>
          <main className='terminal'>
            <XTermComponent />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
