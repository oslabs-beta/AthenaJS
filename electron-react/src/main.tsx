import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import { UserCompProvider } from './components/context/UserCompContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserCompProvider>
      <App />
    </UserCompProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
