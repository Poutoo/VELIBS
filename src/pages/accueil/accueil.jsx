import React, { useState, useEffect } from 'react';
import '../index.css';
import load from '../../api/api';

function Accueil() {
  const [data, setData] = useState([]); // Stocke toutes les données des stations
  const [filteredData, setFilteredData] = useState([]); // Stocke les données filtrées
  const [selectedDepartment, setSelectedDepartment] = useState(''); // Département choisi
  const [selectedStation, setSelectedStation] = useState(null); // Station sélectionnée
  const [error, setError] = useState(null); // Gestion des erreurs

  // Charger les données JSON au montage
  useEffect(() => {
    load()
      .then((result) => {
        if (result) {
          setData(result); // Charge toutes les stations
        }
      })
      .catch((err) => {
        setError("Erreur lors du chargement des données.");
        console.error(err);
      });
  }, []);

  // Mettre à jour les données filtrées selon le département sélectionné
  const handleFilterChange = (department) => {
    setSelectedDepartment(department);

    if (department === '') {
      setFilteredData([]); // Vide si aucun département
    } else {
      const filtered = data.filter((station) =>
        station.code_insee_commune.includes(department)
      );
      setFilteredData(filtered);
    }

    // Réinitialise la station sélectionnée
    setSelectedStation(null);
  };

  // Afficher les détails d'une station lorsqu'on la clique
  const handleStationClick = (station) => {
    setSelectedStation(station);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* En haut : Filtres avec des boutons */}
      <div className="w-full bg-white p-6 shadow-md mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Filtrer et afficher les stations Vélib'
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {["92", "93", "94", "95"].map((department) => (
            <button
              key={department}
              className={`px-4 py-2 rounded-lg border ${
                selectedDepartment === department
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => handleFilterChange(department)}
            >
              {department}
            </button>
          ))}
        </div>
      </div>

      {/* Au milieu : Détails de la station sélectionnée */}
      <div className="w-full bg-gray-50 p-6 shadow-md mb-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Détails de la station sélectionnée</h2>
        {selectedStation ? (
          <div className="text-center">
            <p><strong>Nom :</strong> {selectedStation.name}</p>
            <p><strong>Arrondissement/Commune :</strong> {selectedStation.nom_arrondissement_communes}</p>
            <p><strong>Vélos disponibles :</strong> {selectedStation.numbikesavailable}</p>
            <p><strong>Code Station :</strong> {selectedStation.stationcode}</p>
            <p><strong>Ouvert :</strong> {selectedStation.is_open === "OUI" ? "Oui" : "Non"}</p>
          </div>
        ) : (
          <p>Sélectionnez une station pour voir ses détails.</p>
        )}
      </div>

      {/* En bas : Liste des stations sous forme de tableau */}
      <div className="w-full bg-white p-6 shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Liste des stations</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredData.length > 0 ? (
          <div className="overflow-y-auto h-80 shadow-md sm:rounded-lg"> {/* Conteneur déroulant */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr className="bg-gray-200">
                  <th scope="col" className="px-6 py-3">N°Station</th>
                  <th scope="col" className="px-6 py-3">Nom</th>
                  <th scope="col" className="px-6 py-3">Ouvert</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((station) => (
                  <tr
                    key={station.stationcode}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStationClick(station)}
                  >
                    <td className="px-6 py-4">{station.stationcode}</td>
                    <td className="px-6 py-4">{station.name}</td>
                    <td className="px-6 py-4">{station.is_installed === "OUI" ? "Oui" : "Non"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Aucune station trouvée pour le département sélectionné.</p>
        )}
      </div>
    </div>
  );
}

export default Accueil;
