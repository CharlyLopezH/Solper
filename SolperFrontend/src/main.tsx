import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App'
//import ConexionConTablaDesign from './ConexionConTablaDesign'
import IndexAdscripciones from './demos/IndexAdscripciones'
//import './index.css'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <IndexAdscripciones/>
  </StrictMode>
)
