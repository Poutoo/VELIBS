import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../api/api';

/**
 * @param {JSON} leMedecin
 * @returns 
 */
function Fiche({ leMedecin }) {
    const [medecin, setMedecin] = leMedecin;
    const [updateMedecinSucces, setUpdateMedecinSucces] = useState(null); // Check si MAJ est réussi

    /** 
     * Fonction qui se déclenche lors de la soumission du formulaire.
     * Fait appel à l'API avec les données saisies pour MAJ le médecin
     * dans la base de données
     * @param {*} e 
     */
    function updatemedecin(e) {
        e.preventDefault();
        console.log('Données du médecin envoyées :', medecin); // Log des données envoyées
        sendUpdateMedecin(medecin)
            .then(response => {
                setUpdateMedecinSucces(true);
                console.log('Mise à jour réussie', response.data);
            })
            .catch(error => {
                setUpdateMedecinSucces(false);
                console.error('Erreur lors de la mise à jour', error.response ? error.response.data : error.message);
            });
    }

    /** 
     * Appel à l'API pour mettre à jour le medecin dans la base
     * de données, via la méthode PUT
     * @param {JSON} params
     * @returns Promesse Axios
     */
    async function sendUpdateMedecin(params) {
        const apiUrl = `/majMedecin`; // Utiliser l'URL fournie pour l'API
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await api.put(apiUrl, params, config); 
            console.log('Réponse de l\'API :', response); // Log de la réponse de l'API
            return response;
        } catch (error) {
            console.error('Erreur API :', error.response); // Log de l'erreur de l'API
            throw error;
        }
    }
    
    return (
        <div className="p-6 max-w-lg mx-auto bg-gray-200 dark:bg-zinc-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-700 dark:text-white text-center">
                Fiche Formulaire
            </h1>
            <form onSubmit={updatemedecin}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">
                        Nom
                    </label>
                    <input
                        type="text"
                        name="nom"
                        value={medecin.nom}
                        onChange={(e) => setMedecin({ ...medecin, nom: e.target.value })}
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /> 
                </div> 

                <div className="mb-4"> 
                    <label className="block text-gray-700 dark:text-gray-300">Prénom</label> 
                    <input 
                        type="text" 
                        name="prenom" 
                        value={medecin.prenom} 
                        onChange={(e) => setMedecin({ ...medecin, prenom: e.target.value })} 
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /> 
                </div> 
                
                <div className="mb-4"> 
                    <label className="block text-gray-700 dark:text-gray-300">Spécialité</label> 
                    <input 
                        type="text" 
                        name="specialitecomplementaire" 
                        value={medecin.specialitecomplementaire} 
                        onChange={(e) => setMedecin({ ...medecin, specialitecomplementaire: e.target.value })} 
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /> 
                </div> 
                
                <div className="mb-4"> 
                    <label className="block text-gray-700 dark:text-gray-300">Adresse</label> 
                    <input 
                        type="text" 
                        name="adresse" 
                        value={medecin.adresse} 
                        onChange={(e) => setMedecin({ ...medecin, adresse: e.target.value })} 
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /> 
                </div> 
                
                <div className="mb-4"> 
                    <label className="block text-gray-700 dark:text-gray-300">Téléphone</label> 
                    <input 
                        type="text" 
                        name="tel" 
                        value={medecin.tel} 
                        onChange={(e) => setMedecin({ ...medecin, tel: e.target.value })} 
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /> 
                </div> 
                
                <button type="submit" 
                    className="bg-rose-500 text-gray-100 px-4 py-2 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-200" > 
                    Enregistrer les modifications 
                </button>
                {updateMedecinSucces === true && (
                    <p className="mt-4 alert-success">Mise à jour réussie!</p>
                )} 
                {updateMedecinSucces === false && (
                    <p className="mt-4 text-error ">Erreur lors de la mise à jour.</p>
                )} 
            </form>                
        </div>
    );
}

    /** 
     * @param {string} idMedecin 
     * @returns 
     */ 

        function Rapports({ idMedecin }) { 

            const [rapportsMedecin, setRapportsMedecin] = useState([]); // Stockage des rapports 
            /**
             * Utilisation du hook useEffect : Appel à l'API via la méthode GET 
             * dès le chargement/rafraîchissement du composant.
             *  Cette synchronisation va dépendre de idMedecin
             *  URL API : '/rapports/' + idMedecin 
             */ 
            
            useEffect(() => { async function fetchRapports() { 
                try {
                     const response = await api.get('/rapports/'+idMedecin); 
                     console.log('Réponse complète de l\'API :', response); // Affiche la réponse complète 
                     if (response.data) { 
                        console.log('Données des rapports :', response.data); // Affiche les données des rapports 
                        setRapportsMedecin(response.data); // Stockage des données dans l'état 
                    } else { 
                        console.log('Pas de données de rapports trouvées.'); 
                    } 
                } catch (error) { 
                    console.error('Erreur API :', error); // Affiche l'erreur complète de l'API 
                    } 
                } fetchRapports(); 
            }, [idMedecin]); 
            
            return ( 
                <div className="p-6 mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white text-center">Rapports du Médecin</h1>
                    {rapportsMedecin.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-zinc-700"> 
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Date</th>
                                    <th className="py-2 px-4 border">Motif</th>
                                    <th className="py-2 px-4 border">Bilan</th> 
                                    <th className="py-2 px-4 border">Visiteur</th> 
                                </tr>
                            </thead>
                            <tbody> {rapportsMedecin.map((rapport, index) => ( 
                                <tr key={index} className=" text-center border-b"> 
                                    <td className="py-2 px-4 border">{rapport.date}</td> 
                                    <td className="py-2 px-4 border">{rapport.motif}</td> 
                                    <td className="py-2 px-4 border">{rapport.bilan}</td> 
                                    <td className="py-2 px-4 border">{rapport.nom} {rapport.prenom}</td> 
                                </tr> ))} 
                            </tbody> 
                        </table>
                </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-300 text-center">Aucun rapport trouvé pour ce médecin.</p>
                )}
                </div>
            );
            }


const FicheMedecin = () => {
    const [medecin, setMedecin] = useOutletContext();
    const [affichage, setAffichage] = useState('fiche');

    return (
        <>
            <div className="bg-gray-200 dark:bg-zinc-800 text-white p-4 rounded-md shadow-md mx-auto max-w-2xl text-center">
                <div className="flex justify-center items-center">
                    <nav className="flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            onClick={() => setAffichage('rapports')}>
                            CONSULTER LES RAPPORTS
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            onClick={() => setAffichage('fiche')}>
                            GERER LE MEDECIN
                        </a>
                    </nav>
                </div>
            </div>
            <br />
            {affichage === 'fiche' ?
                <Fiche leMedecin={[medecin, setMedecin]} />
                :
                <Rapports idMedecin={medecin.id} />
            }
        </>
    );
};

export default FicheMedecin;
