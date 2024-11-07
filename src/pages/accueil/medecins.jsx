import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../index.css'
import Navbar from '/home/administrateur/vs/React/GSB Project/GSB/src/composants/Navbar.jsx';
import { Outlet } from 'react-router-dom';


function Medecins() {

    return (
        <>
        
    <Navbar />
    <h1>Page des medecins</h1>
    </>
    )
}

export default Medecins;