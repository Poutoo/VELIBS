import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; // Assurez-vous d'importer Tailwind CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importer l'icône de loupe

export default function Medecin() {
    const navigate = useNavigate();

    const [listeVisible, setListeVisible] = useState(false);
    const [nomMedecin, setNomMedecin] = useState('');
    const [listeMedecins, setListeMedecins] = useState([]);
    const [medecin, setMedecin] = useState({});

    function charger(event) {
        const nom = event.target.value;
        setNomMedecin(nom);

        if (nom) {
            rechercherRapports(nom);
        } else {
            setListeMedecins([]);
            setListeVisible(false);
        }
    }

    function selectMedecin(leMedecin) {
        setMedecin(leMedecin);
        setListeVisible(false);
    }

    async function rechercherRapports(nom) {
        try {
            const response = await fetch(`http://172.16.61.61/restGSB/medecins?nom=${nom}`);
            if (response.ok) {
                const data = await response.json();
                setListeMedecins(data);
                setListeVisible(true);
            } else {
                console.error("Erreur lors de la récupération des médecins");
            }
        } catch (error) {
            console.error("Erreur de connexion à l'API", error);
        }
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                </div>
                <input
                    type="text"
                    value={nomMedecin}
                    onChange={charger}
                    placeholder="Recherche de médecin"
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {listeVisible && (
                <ul className="mt-4 border border-gray-300 rounded-md shadow-md">
                    {listeMedecins.map((medecin) => (
                        <li 
                            key={medecin.id} 
                            onClick={() => selectMedecin(medecin)} 
                            className="p-2 cursor-pointer hover:bg-gray-100">
                            {medecin.nom} {medecin.prenom}
                        </li>
                    ))}
                </ul>
            )}

            {medecin.nom && (
                <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Détails du Médecin</h3>
                    <p><strong>Nom :</strong> {medecin.nom} {medecin.prenom}</p>
                    <p><strong>Spécialité :</strong> {medecin.specialitecomplementaire}</p>
                    <p><strong>Adresse :</strong> {medecin.adresse}</p>
                    <p><strong>Téléphone :</strong> {medecin.tel}</p>
                </div>
            )}
        </div>
    );
}
