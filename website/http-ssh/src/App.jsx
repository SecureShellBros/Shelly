import './App.css'


function App() {
  async function sendCommand() {

    let command = document.getElementById("commandInput").value;
    document.getElementById("commandInput").value = "";
    let request = new Request(`http://localhost:6969/data?msg=${command}`);// might need to changel the command
    let error;
    let out;
    await fetch(request)
      .then((response) => response.text().then((cont) => { out = cont }))
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
