import React, { useContext } from 'react';
import '../index.css';
import useDarkMode from '/src/hooks/useDarkMode';

function Accueil() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Bienvenue sur votre page Accueil !
      </h1>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Cliquez ici
      </button>
    </div>
  );
}

export default Accueil;
