import React, { useState } from 'react';
import api from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

const AjouterRapport = ({ visiteur, medecin, onRapportAjoute }) => {
    const [motif, setMotif] = useState('');
    const [bilan, setBilan] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' ou 'error'

    const ajouteRapport = async (e) => {
        e.preventDefault();
        if (!medecin) {
            setMessageType('error');
            setMessage("Veuillez sélectionner un médecin.");
            return;
        }
        if (!date) {
            setMessageType('error');
            setMessage("Veuillez sélectionner une date.");
            return;
        }
        if (!motif) {
            setMessageType('error');
            setMessage("Veuillez saisir un motif.");
            return;
        }
        if (!bilan) {
            setMessageType('error');
            setMessage("Veuillez saisir un bilan.");
            return;
        }

        const params = {
            idVisiteur: visiteur.id, // L'ID du visiteur
            idMedecin: medecin.id,
            date,
            motif,
            bilan
        };

        // Affiche les données dans les logs de la console
        console.log('Données envoyées à l\'API :', params);

        try {
            const response = await api.put('/ajouterRapport', params);
            if (response.status === 200) {
                setMessageType('success');
                setMessage("Rapport ajouté avec succès !");
                // Réinitialiser le formulaire après succès
                setDate('');
                setMotif('');
                setBilan('');
                onRapportAjoute(); // Notifier le parent que le rapport a été ajouté
            } else {
                setMessageType('error');
                setMessage("Erreur lors de l'ajout du rapport.");
            }
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API", error);
            setMessageType('error');
            setMessage("Erreur de connexion à l'API.");
        }
    };

    return (
        <div>
            {message && (
                <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-error'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={ajouteRapport} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-left dark:text-gray-300 mb-1 ">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-zinc-100 dark:bg-zinc-700 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left dark:text-gray-300 mb-1">Motif</label>
                    <input
                        type="text"
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                        placeholder="Motif"
                        className="bg-zinc-100 dark:bg-zinc-700 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-left dark:text-gray-300 mb-1">Bilan</label>
                    <textarea
                        value={bilan}
                        onChange={(e) => setBilan(e.target.value)}
                        placeholder="Bilan"
                        className="bg-zinc-100 dark:bg-zinc-700 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
                    <FontAwesomeIcon icon={faFloppyDisk} style={{ marginRight: '9px' }} />
                    Enregistrer le rapport
                </button>
            </form>
        </div>
    );
};

export default AjouterRapport;
