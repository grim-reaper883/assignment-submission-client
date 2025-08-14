import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './provider/AuthProvider.jsx'

import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className='max-w-screen mx-auto'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>,
)
