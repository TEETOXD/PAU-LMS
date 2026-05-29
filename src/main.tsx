import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FontSizeProvider } from './FontSizeContext'
import { ThemeProvider } from './ThemeContext'
import './index.css'




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FontSizeProvider>
          <App />
        </FontSizeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)