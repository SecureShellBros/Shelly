import './App.css';
import XTermComponent from './XTermComponent';
import HackerLogin from './HackerLogin';
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
