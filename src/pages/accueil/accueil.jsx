import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../index.css'
import Navbar from '/home/administrateur/vs/React/GSB Project/GSB/src/composants/Navbar.jsx';
import { Outlet } from 'react-router-dom';

function Accueil() {


    /*const location = useLocation();
    const login = location.state.login;*/

    return (
        <>

      <Navbar />
      <h1>Hi  !</h1>
      <Outlet />
        
        </>
    );
}

export default Accueil