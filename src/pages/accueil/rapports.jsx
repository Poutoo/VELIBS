import React, { useContext } from 'react';
import ListeRapports from '../../composants/listeRapports';

function Rapports() {

  return ( 
         
    <>
        <div className="text-gray-500 dark:text-gray-300">
            <br />
            <h1 className='text-center'>Page des rapports</h1>
            <br />
            <ListeRapports />
        </div>
        </>

  /*<div className="p-6 max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
      {visiteur ? (
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(visiteur).map(([key, value]) => (
            <div key={key} className="bg-gray-100 dark:bg-zinc-700 p-4 rounded-md shadow-md">
              <p className="text-lg font-semibold text-gray-900 dark:text-white"><strong>{key} :</strong></p>
              <p className="text-gray-700 dark:text-gray-300">{value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center">Aucune information disponible. Veuillez vous connecter.</p>
      )}
    </div>*/
  );
};

export default Rapports;
