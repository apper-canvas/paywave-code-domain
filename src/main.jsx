import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// Enable HMR with full reload as fallback
if (import.meta.hot) {
  import.meta.hot.accept('./App.jsx', (newModule) => {
    if (newModule === undefined) location.reload();
  });
}