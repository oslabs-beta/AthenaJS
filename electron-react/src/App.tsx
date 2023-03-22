// import Update from '@/components/update'
import Workshop from './pages/Workshop'
import { DetailsProvider } from './components/context/DetailsContext'
import { PerformanceProvider } from './components/context/PerformanceContext'
import './App.scss'


function App() {
  return (
    <div className='App'>
      <h1>Athena</h1>
      <DetailsProvider>
        <PerformanceProvider>
          <Workshop />
        </PerformanceProvider>
      </DetailsProvider>
      {/* <Update /> */}
    </div>
  )
}

export default App
