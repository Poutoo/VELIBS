import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Accueil from './pages/accueil/accueil.jsx';
import './pages/index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Accueil />,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
          <RouterProvider router={router} />
  </StrictMode>
);
