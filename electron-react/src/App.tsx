// import Update from '@/components/update'
import Workshop from './pages/Workshop'
import { DetailsProvider } from './components/context/DetailsContext'
import { PerformanceProvider } from './components/context/PerformanceContext'
import './App.scss'
import FileExplorer from './components/FileExplorer'



function App() {
  
  return (
    <div className='App'>
      <h1>Athena</h1>
      <DetailsProvider>
        <FileExplorer />
        <PerformanceProvider>
          <Workshop />
        </PerformanceProvider>
      </DetailsProvider>
    </div>
  )
}

export default App
