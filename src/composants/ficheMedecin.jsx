import React from 'react';
import { useOutletContext } from 'react-router-dom';

const FicheMedecin = () => {
    const [medecin] = useOutletContext();

    return (
        
        <div className="bg-gray-200 dark:bg-zinc-800 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Fiche du Médecin</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Nom</label>
                    <input
                        type="text"
                        value={medecin.nom}
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Prénom</label>
                    <input
                        type="text"
                        value={medecin.prenom}
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Spécialité</label>
                    <input
                        type="text"
                        value={medecin.specialitecomplementaire}
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Adresse</label>
                    <input
                        type="text"
                        value={medecin.adresse}
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Téléphone</label>
                    <input
                        type="text"
                        value={medecin.tel}
                        className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 border border-gray-300 rounded-md shadow-sm focus:outline-none "
                    />
                </div>
            </form>
        </div>
    );
};

export default FicheMedecin;
