import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import { UserCompProvider } from './components/context/UserCompContext'
import { ShowUIProvider } from './components/context/ShowUIContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ShowUIProvider>
      <UserCompProvider>
        <App />
      </UserCompProvider>
    </ShowUIProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
