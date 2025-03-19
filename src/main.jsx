import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Index from './pages/index.jsx';
import Accueil from './pages/accueil/accueil.jsx';
import Medecins from './pages/accueil/medecins.jsx';
import Rapports from './pages/accueil/rapports.jsx';
import FicheMedecin from './composants/ficheMedecin.jsx';
import Profile from './pages/accueil/profile.jsx'; // Importer le nouveau composant Profile
import './pages/index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '/src/context/AuthContext.jsx';
import { ProfileProvider } from './context/ProfileContext'; // Importer ProfileProvider
import { BannerProvider, useBanner } from './context/BannerContext.jsx';
import ListeRapports from './composants/listeRapports.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: 'accueil',
    element: <Accueil />,
    children: [
      {
        path: 'medecins',
        element: <Medecins />,
        children: [
          {
            path: ':id',
            element: <FicheMedecin/>
          },
        ]
      },
      {
        path: 'rapports',
        element: <Rapports />,
        children: [
          {
            path: ':id',
            element: <ListeRapports/>
          },
          {
            path: 'ajouter',
            element: <ListeRapports/>,
            children: [
              {
                path: ':id',
                element: <ListeRapports/>
              },
            ]
          },
          {
            path: 'modifier',
            element: <ListeRapports/>,
            children: [
              {
                path: ':id',
                element: <ListeRapports/>
              },
            ]
          }
        ]
      },
      {
        path: 'profile', // Ajouter la route pour le profil
        element: <Profile />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Enveloppez votre application avec AuthProvider */}
      <ProfileProvider>
        <BannerProvider>
          <RouterProvider router={router} />
        </BannerProvider>
      </ProfileProvider>
    </AuthProvider>
  </StrictMode>
);
