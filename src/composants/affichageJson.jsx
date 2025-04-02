import React, { useState, useEffect } from 'react';
import load from '../api/api';

function AffichageJson() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Appel de la fonction "load" pour récupérer les données
    load()
      .then((result) => {
        if (result) {
          setData(result); // Mise à jour de l'état avec les données
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'appel à la fonction load :", error);
      });
  }, []); // Le tableau vide [] indique que l'effet ne sera exécuté qu'une seule fois.

  return (
    <div>
      <h1>Exemple d'appel de la fonction `load`</h1>
      {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}

export default AffichageJson;
