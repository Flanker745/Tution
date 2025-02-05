import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tution from './Tution'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tution/>
  </StrictMode>,
)
