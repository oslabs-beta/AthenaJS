import nodeLogo from './assets/node.svg'
import { useState } from 'react'
import Update from '@/components/update'
import './App.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className='App'>
      <h1>Athena</h1>

      <Update />
    </div>
  )
}

export default App
