import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

function App() {
  const termRef = useRef(null); const ws = useRef(null); useEffect(() => { const term = new Terminal();
    term.open(document.getElementById('terminal'));
    termRef.current = term;

    ws.current = new WebSocket("ws://localhost:8080/data");

    ws.current.onopen = () => {
      term.write("Connected to server\r\n");
    };

    ws.current.onmessage = (event) => {
      term.write(event.data);
    };

    ws.current.onclose = () => {
      term.write("\r\nConnection closed");
    };

    term.onData(data => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(data);
      }
    });

    return () => {
      ws.current.close();
      term.dispose();
    };
  }, []);

  return (
    <>
      <h1>HTTP-SSH</h1>
      <div id="terminal" style={{ height: '400px', width: '100%', background: 'black' }}></div>
    </>
  );
}

export default App;
