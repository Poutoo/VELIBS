import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css'; 
import SecondNav from './secondNavbar';
import { Outlet } from 'react-router-dom';

export default function Medecin() {
    const navigate = useNavigate();

    const [version, setVersion] = useState('');
    const [listeVisible, setListeVisible] = useState(false);
    const [nomMedecin, setNomMedecin] = useState('');
    const [listeMedecins, setListeMedecins] = useState([]);
    const [medecin, setMedecin] = useState(null);

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
        setVersion(version + 1);
        navigate('' + leMedecin.id);
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
                    className="bg-zinc-100 dark:bg-zinc-700 w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {listeVisible && (
                <ul className="mt-4 border border-gray-300 rounded-md shadow-md">
                    {listeMedecins.map((medecin) => (
                        <li 
                            key={medecin.id} 
                            onClick={() => selectMedecin(medecin)} 
                            className="bg-zinc-100 dark:bg-zinc-700 p-2 cursor-pointer hover:bg-gray-100">
                            {medecin.nom} {medecin.prenom}
                        </li>
                    ))}
                </ul>
            )}
            
            {medecin && (
                <>
                    <SecondNav medecin={medecin} />
                    <Outlet context={[medecin, setMedecin]} key={version} />
                </>
            )}
        </div>
    );
}
