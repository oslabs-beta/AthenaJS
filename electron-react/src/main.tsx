import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import { UserCompProvider } from './components/context/UserCompContext'
import { ShowUIProvider } from './components/context/ShowUIContext'
import {AnimatePresence} from 'framer-motion';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ShowUIProvider>
      <UserCompProvider>
        <AnimatePresence mode = 'wait'>
        <App />
        </AnimatePresence>
      </UserCompProvider>
    </ShowUIProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
