import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RouterProvider
} from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './context/authcontext/AuthProvider.jsx';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
      <RouterProvider router={router} />
     </AuthProvider>
      </QueryClientProvider>
      
    </div>
  </StrictMode>,
)
