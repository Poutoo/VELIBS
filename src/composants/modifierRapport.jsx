import React, { useState } from 'react';
import api from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const ModifierRapport = ({ visiteur }) => {
    const [date, setDate] = useState(''); // Date sélectionnée
    const [listeRapports, setListeRapports] = useState([]); // Liste des rapports récupérés
    const [message, setMessage] = useState(''); // Message d'état (succès ou erreur)
    const [messageType, setMessageType] = useState(''); // 'success' ou 'error'
    const [isModalOpen, setIsModalOpen] = useState(false); // État de la modale
    const [rapportSelectionne, setRapportSelectionne] = useState(null); // Rapport sélectionné pour modification

    // Fonction pour rechercher les rapports d'une date donnée avec GET
    async function rechercherRapports() {
        if (!date) {
            setMessageType('error');
            setMessage('Veuillez sélectionner une date.');
            return;
        }

        const url = `/rapports_a_date?idVisiteur=${visiteur.id}&date=${date}`;
        console.log('URL appelée :', url); // Vérification de l'URL

        try {
            const response = await api.get(url); // Effectuer la requête GET
            console.log('Réponse brute de l\'API :', response);

            if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
                setMessageType('success');
                setMessage('Rapports trouvés !');
                setListeRapports(response.data); // Stocker les rapports récupérés
            } else {
                setMessageType('error');
                setMessage('Aucun rapport trouvé pour cette date.');
                setListeRapports([]); // Réinitialiser la liste
            }
        } catch (error) {
            console.error('Erreur lors de l\'appel à l\'API :', error);
            setMessageType('error');
            setMessage('Erreur de connexion à l\'API.');
        }
    }

    // Fonction pour ouvrir la modale avec les données d'un rapport sélectionné
    const ouvrirModale = (rapport) => {
        setRapportSelectionne(rapport);
        setIsModalOpen(true);
    };

    // Fonction pour fermer la modale
    const fermerModale = () => {
        setIsModalOpen(false);
        setRapportSelectionne(null);
    };

    // Fonction pour soumettre les modifications
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/majRapports`, rapportSelectionne);
            console.log('Modification réussie :', response);
    
            if (response.status === 200) {
                setMessageType('success');
                setMessage(`Le rapport ${rapportSelectionne.idRapport} a été modifié avec succès !`);
                fermerModale(); // Fermer la modale
    
                // Afficher le message de confirmation pendant 3 secondes avant de recharger les rapports
                setTimeout(() => {
                    rechercherRapports(); // Recharger les rapports après 3 secondes
                    setMessage('Rapports trouvés !'); // Restaurer le message par défaut
                }, 3000);
            } else {
                setMessageType('error');
                setMessage('Erreur lors de la modification du rapport.');
            }
        } catch (error) {
            console.error('Erreur lors de la modification :', error);
            setMessageType('error');
            setMessage('Erreur de connexion à l\'API.');
        }
    };
    

    return (
        <div className="p-6 mx-auto bg-gray-200 dark:bg-zinc-800 rounded-lg shadow-lg w-fit">
            <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white text-center">
                Modifier un Rapport
            </h1>

            {/* Champ de recherche par date */}
            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Sélectionnez une date :
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={rechercherRapports}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mt-4"
                >
                    Rechercher
                </button>
            </div>

            {/* Messages d'état */}
            {message && (
                <p
                    className={`mb-6 ${
                        messageType === 'success'
                            ? 'text-green-500'
                            : 'text-red-500'
                    }`}
                >
                    {message}
                </p>
            )}

            {/* Tableau des rapports récupérés */}
            {listeRapports.length > 0 && (
                <div className="mt-6">
                    <table className="table-auto bg-white dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm">
                        <thead>
                            <tr className="bg-gray-300 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                                <th className="px-4 py-2 border">ID Rapport</th>
                                <th className="px-20 py-2 border">Motif</th>
                                <th className="px-20 py-2 border">Bilan</th>
                                <th className="px-4 py-2 border">Médecin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listeRapports.map((rapport, index) => (
                                <tr
                                    key={index}
                                    className="text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-600"
                                    onClick={() => ouvrirModale(rapport)}
                                >
                                    <td className="px-2 py-2 border">{rapport.idRapport}</td>
                                    <td className="px-4 py-2 border">{rapport.motif}</td>
                                    <td className="px-4 py-2 border">{rapport.bilan}</td>
                                    <td className="px-4 py-2 border">
                                        {rapport.nomMedecin} {rapport.prenomMedecin}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modale pour modifier le rapport */}
            {isModalOpen && rapportSelectionne && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
                            Modification du Rapport {rapportSelectionne.idRapport}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                    Motif
                                </label>
                                <input
                                    type="text"
                                    value={rapportSelectionne.motif}
                                    onChange={(e) =>
                                        setRapportSelectionne({
                                            ...rapportSelectionne,
                                            motif: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                    Bilan
                                </label>
                                <textarea
                                    value={rapportSelectionne.bilan}
                                    onChange={(e) =>
                                        setRapportSelectionne({
                                            ...rapportSelectionne,
                                            bilan: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transform hover:scale-105 transition-transform duration-200"
                            >  <FontAwesomeIcon icon={faFloppyDisk} style={{ marginRight: '9px' }} />
                                Enregistrer
                            </button>
                            <button
                                type="button"
                                onClick={fermerModale}
                                className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transform hover:scale-105 transition-transform duration-200"
                                >  <FontAwesomeIcon icon={faXmark} style={{ marginRight: '10px' }} />
                                Annuler
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModifierRapport;
