import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Rutas from './Routes.tsx'
import { CarritoProvider } from './context/CarritoContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <Rutas />
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>,
)
