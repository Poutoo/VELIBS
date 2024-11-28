import { useLocation } from 'react-router-dom';
import React, { useContext } from 'react';
import '../index.css'
import Navbar from '/home/administrateur/vs/React/GSB Project/GSB/src/composants/Navbar.jsx';
import { AuthContext } from '/home/administrateur/vs/React/GSB Project/GSB/src/context/AuthContext.jsx';
import { Outlet } from 'react-router-dom';

function Accueil() {

  const { visiteur } = useContext(AuthContext);

    /*const location = useLocation();
    const login = location.state.login;*/

    return (
        <>

      <Navbar />
    
      <h1>Hi, {visiteur ?`${visiteur.nom} ${visiteur.prenom}` : 'x' }!</h1>
      <Outlet />
        
        </>
    );
}

export default Accueil