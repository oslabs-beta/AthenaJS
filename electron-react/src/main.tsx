import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import { UserCompProvider } from './components/context/UserCompContext'
import { DetailsProvider } from './components/context/DetailsContext';
import { PerformanceProvider } from './components/context/PerformanceContext';
import { MockFetchProvider } from './components/context/MockFetchContext';
import { ShowUIProvider } from './components/context/ShowUIContext'
import {AnimatePresence} from 'framer-motion';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ShowUIProvider>
      <UserCompProvider>
        <DetailsProvider>
          <PerformanceProvider>
            <MockFetchProvider>
              <AnimatePresence mode = 'wait'>
              <App />
              </AnimatePresence>
            </MockFetchProvider>
          </PerformanceProvider>
        </DetailsProvider>
      </UserCompProvider>
    </ShowUIProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
