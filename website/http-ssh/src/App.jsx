import { cors }
import './App.css'


function App() {
  function sendCommand() {

    let command = document.getElementById("commandInput").value;
    document.getElementById("commandInput").value = "";
    let request = new Request(`localhost:6969/command?cmd=${command}`);// might need to changel the command
    let out;
    let error;
    fetch(request)
      .then((response) => out = response)
      .catch((exception) => error = exception)
      ;
    document.getElementById("output").innerHTML = out;
    //WARN: might not work :(
  }
  return (
    <>
      <h1>Http-ssh bros</h1>
      <div className="card">
        <textarea id="commandInput" onKeyUp={(key) => { if (key.code == "Enter") sendCommand() }}>
        </textarea>
      </div >
      <div id="output">
      </div>
    </>
  )
}

export default App
