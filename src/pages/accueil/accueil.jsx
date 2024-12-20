import React, { useContext } from 'react';
import '../index.css';
import Navbar from '/src/composants/Navbar.jsx';
import { AuthContext } from '/src/context/AuthContext.jsx';
import { Outlet } from 'react-router-dom';
import useDarkMode from '/src/hooks/useDarkMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function Accueil() {
  const { visiteur } = useContext(AuthContext);
  const [theme, setTheme] = useDarkMode();

  /*const location = useLocation();
  const login = location.state.login;*/

  return (
    <div className={`min-h-screen bg-stone-100 dark:bg-zinc-900`}>
      <Navbar />
      <div className="flex justify-end p-4">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-gray-500 dark:text-gray-300">
          {theme === 'dark' ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
        </button>
      </div>
      {/*<h1 className="text-center text-2xl font-semibold text-gray-900 dark:text-white">
        Hi, {visiteur ? `${visiteur.nom} ${visiteur.prenom}` : 'x'}!
      </h1>*/}
      <Outlet />
    </div>
  );
}

export default Accueil;
