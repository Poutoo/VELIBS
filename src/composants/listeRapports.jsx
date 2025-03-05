import React, { useState } from 'react';

export default function ListeRapports() {
    const [affichage, setAffichage] = useState('ajouter');
    const [nomMedecin, setNomMedecin] = useState('');
    const [listeMedecins, setListeMedecins] = useState([]);
    const [medecin, setMedecin] = useState(null);
    const [listeVisible, setListeVisible] = useState(false);
    const [dateRecherche, setDateRecherche] = useState(''); // Nouvel état pour la date
    const [rapport, setRapport] = useState(null); // Rapport récupéré

    // Fonction pour rechercher des médecins par nom
    const rechercherMedecins = async (nom) => {
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
    };

    // Fonction de recherche par date
    const rechercherRapportParDate = async (date) => {
        try {
            const response = await fetch(`http://172.16.61.61/restGSB/rapports?date=${date}`);
            if (response.ok) {
                const data = await response.json();
                setRapport(data);
            } else {
                console.error("Erreur lors de la récupération du rapport");
            }
        } catch (error) {
            console.error("Erreur de connexion à l'API", error);
        }
    };

    // Fonction appelée lorsqu'une date est sélectionnée
    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDateRecherche(selectedDate);
        rechercherRapportParDate(selectedDate);
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

    function AjouterRapport({ visiteur }) {
        
        const [medecin, setMedecin] = useState({});
        const [addRapportSucces, setaddRapportSucces] = useState();

        function ajouteRapport(e) {

            return (
                J
        );

        }
        /** 
        * @param {JSON} params
        * @returns
        */
        async function ajouterRapportBase(params) {
            
        }

    
    }

    return (
        <div className="flex flex-col items-center jusitfy-center min-h-screen bg-gray-100 dark:bg-zinc-900">
                <div className="flex justify-center items-center space-x-6 mb-8">
                    <button
                        className={`px-4 py-2 rounded-md shadow-md ${affichage === 'ajouter' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={() => setAffichage('ajouter')}
                    >
                        Ajouter un rapport
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md shadow-md ${affichage === 'modifier' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        onClick={() => setAffichage('modifier')}
                    >
                        Modifier un rapport
                    </button>
                </div>

                {/* Affichage pour Ajouter un rapport */}
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
                                    Médecin sélectionné : {medecin.nom} {medecin.prenom}
                                </h3>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Motif</label>
                                        <input
                                            type="text"
                                            placeholder="Motif"
                                            className="bg-zinc-100 dark:bg-zinc-700 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Bilan</label>
                                        <textarea
                                            placeholder="Bilan"
                                            className="bg-zinc-100 dark:bg-zinc-700 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
                                        Enregistrer le rapport
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {/* Affichage pour Modifier un rapport */}
                {affichage === 'modifier' && (
                    <div className="w-full max-w-md text-center">
                        <br />
                        <div className="relative mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">Sélectionnez une date</label>
                            <input
                                type="date"
                                value={dateRecherche}
                                onChange={handleDateChange}
                                className="bg-zinc-100 dark:bg-zinc-700 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {rapport && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Rapport du {dateRecherche}</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    <strong>Motif :</strong> {rapport.motif}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300">
                                    <strong>Bilan :</strong> {rapport.bilan}
                                </p>
                                {/* Ajouter un formulaire de modification si besoin */}
                            </div>
                        )}
                    </div>
                )}
            </div>
    );
}
