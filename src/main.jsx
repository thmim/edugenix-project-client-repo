import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  RouterProvider
} from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './context/authcontext/AuthProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
     <AuthProvider>
       <RouterProvider router={router} />
     </AuthProvider>
    </div>
  </StrictMode>,
)
