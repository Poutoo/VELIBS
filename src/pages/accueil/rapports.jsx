import React, { useContext } from 'react';
import { AuthContext } from '/src/context/AuthContext.jsx';

const Rapports = () => {
  const { visiteur } = useContext(AuthContext);

  return (
    <div className="text-gray-500 dark:text-gray-300">
      <h1>Pages des rapports</h1>
      {visiteur ? (
        <div>
          {Object.entries(visiteur).map(([key, value]) => (
            <p key={key}><strong>{key} :</strong> {value}</p>
          ))}
        </div>
      ) : (
        <p>Aucune information disponible. Veuillez vous connecter.</p>
      )}
    </div>
  );
};

export default Rapports;
