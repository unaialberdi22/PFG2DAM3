import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './components/map.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Map/>       
    </>
  )
}

export default App
