import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { JwtProvider } from './contexts/JwtContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <JwtProvider>
 
    <App />
   </JwtProvider>

    </ThemeProvider>
  </StrictMode>,
)
