import './App.css'
import XTermComponent from './XTermComponent'

function App() {
  async function sendCommand() {

    let command = document.getElementById("commandInput").value;
    document.getElementById("commandInput").value = "";
    let request = new Request(`http://localhost:6969/data?msg=${command}`);
    let error;
    let out;
    await fetch(request)
      .then((response) =>
        response.text()
          .then((cont) => { out = cont })
          .catch((expception) => { error = expception }))
      .catch((exception) => error = exception)
      ;
    document.getElementById("output").innerHTML = out;
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

export default App
