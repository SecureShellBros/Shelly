import './App.css'
<<<<<<< HEAD
import XTermComponent from './XTermComponent'
=======
>>>>>>> a4bdd82 (fioxed cors)

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
<<<<<<< HEAD
      <div className='terminalContainer' style={{width:"100%", height:'100vh', position:'relative', maxWidth:'100vh'}}>
        <h1>Peak Terminal</h1>
          <main className='terminal'>
            <XTermComponent/>
          </main>
      </div>
      
=======
      <h1>Http-ssh bros</h1>
      <div className="card">
        <textarea
          id="commandInput"
          placeholder="Type your command here and press Enter..."
          onKeyUp={(key) => {
            if (key.code === "Enter") sendCommand();
          }}
        ></textarea>
      </div>
      <div id="output" style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}></div>
>>>>>>> a4bdd82 (fioxed cors)
    </>
  )
}

export default App;