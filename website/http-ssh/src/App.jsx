import './App.css'

function App() {
  async function sendCommand() {
    const command = document.getElementById("commandInput").value;
    document.getElementById("commandInput").value = "";

    let out;
    let error;

    try {
      const response = await fetch(`/data?cmd=${command}`, {
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
    </>
  )
}

export default App;
