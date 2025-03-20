import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import AjouterRapport from './ajouterRapport';
import ModifierRapport from './modifierRapport';

export default function ListeRapports() {
    const [affichage, setAffichage] = useState('ajouter');
    const [nomMedecin, setNomMedecin] = useState('');
    const [listeMedecins, setListeMedecins] = useState([]);
    const [medecin, setMedecin] = useState(null);
    const [listeVisible, setListeVisible] = useState(false);
    const [dateRecherche, setDateRecherche] = useState(''); // Date sélectionnée
    const [listeRapports, setListeRapports] = useState([]); // Liste des rapports récupérés
    const [message, setMessage] = useState(''); // Message d'état (succès ou erreur)
    const [messageType, setMessageType] = useState(''); // 'success' ou 'error'

    const visiteur = {
        id: 'a131', // Exemple d'ID visiteur
    };

    // Fonction pour rechercher des médecins par nom
    const rechercherMedecins = async (nom) => {
        try {
            const response = await fetch(`http://172.16.61.61/restGSB/medecins?nom=${nom}`);
            if (response.ok) {
                const data = await response.json();
                setListeMedecins(data);
                setListeVisible(true);
            } else {
                console.error('Erreur lors de la récupération des médecins');
            }
        } catch (error) {
            console.error('Erreur de connexion à l\'API', error);
        }
    };
    

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDateRecherche(selectedDate);
        rechercherRapports(selectedDate); // Lancer la recherche des rapports
    };

    const charger = (event) => {
        const nom = event.target.value;
        setNomMedecin(nom);

        if (nom) {
            rechercherMedecins(nom);
        } else {
            setListeMedecins([]);
            setListeVisible(false);
        }
    };

    const selectMedecin = (medecin) => {
        setMedecin(medecin);
        setListeVisible(false);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-900">
            {/* Barre de navigation */}
            <div className="flex justify-center items-center space-x-6 mb-8">
                <button
                    className={`flex items-center px-4 py-2 rounded-md shadow-md ${
                        affichage === 'ajouter'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:text-white'
                    } ml-4`}
                    onClick={() => setAffichage('ajouter')}
                >
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '9px' }} />
                    Ajouter un rapport
                </button>
                <button
                    className={`flex items-center px-4 py-2 rounded-md shadow-md ${
                        affichage === 'modifier'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:text-white'
                    } ml-4`}
                    onClick={() => setAffichage('modifier')}
                >
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '9px' }} />
                    Modifier un rapport
                </button>
            </div>

            {/* Affichage Ajouter un rapport */}
            {affichage === 'ajouter' && (
                <div className="w-full max-w-md text-center">
                    <br />
                    <div className="relative mb-4">
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
                                    className="bg-zinc-100 dark:bg-zinc-700 p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {medecin.nom} {medecin.prenom}
                                </li>
                            ))}
                        </ul>
                    )}

                    {medecin && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                                <FontAwesomeIcon icon={faUserDoctor} style={{ marginRight: '9px' }} />
                                Médecin sélectionné : {medecin.nom} {medecin.prenom}
                            </h3>
                            <AjouterRapport
                                visiteur={visiteur}
                                medecin={medecin}
                                onRapportAjoute={() => console.log('Rapport ajouté')}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Affichage Modifier un rapport */}
            {affichage === 'modifier' && (
                <div className="w-full max-w-md text-center">
                <br />
                <div className="relative mb-4">
                    <ModifierRapport visiteur={visiteur} />
                </div>
            </div>
            )}
        </div>
    );
}
