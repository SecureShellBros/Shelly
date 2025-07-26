import './App.css'
import XTermComponent from './XTermComponent'

function App() {
  async function sendCommand() {
    const command = document.getElementById("commandInput").value;
    document.getElementById("commandInput").value = "";

    let out;
    let error;

    try {
      const response = await fetch(`/data?msg=${encodeURIComponent(command)}`, {
        mode: 'cors'
      });
      out = await response.text();
    } catch (err) {
      error = err.toString();
    }

    document.getElementById("output").innerHTML = error ? `❌ Error: ${error}` : out;
  }

  return (
    <>
      <div className='terminalContainer' style={{width:"100%", height:'100vh', position:'relative', maxWidth:'100vh'}}>
        <h1>Peak Terminal</h1>
          <main className='terminal'>
            <XTermComponent/>
          </main>
      </div>
      
    </>
  )
}

export default App;