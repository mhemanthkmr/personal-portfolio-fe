import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ChitManagementApp from './ChitManagementApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChitManagementApp />
  </StrictMode>,
)
