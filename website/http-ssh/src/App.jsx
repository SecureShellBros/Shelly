import './App.css'
import XTermComponent from './XTermComponent'

function App() {
  return (
    <>
      <div className='terminalContainer' style={{ width: "100%", height: '100vh', position: 'relative' }}>
        <h1>Peak Terminal</h1>
        <main className='terminal'>
          <XTermComponent />
        </main>
      </div>

    </>
  )
}

export default App;
