import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../index.css'
import Navbar from '/home/administrateur/vs/React/GSB Project/GSB/src/composants/Navbar.jsx';
import { Outlet } from 'react-router-dom';


function Rapports() {

    return (
        <>
        
    <Navbar />
    <h1>Page des rapports</h1>
    </>
    )
}

export default Rapports;