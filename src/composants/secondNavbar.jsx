import React from 'react';

const SecondNav = ({ medecin }) => {
    return (
        <>
            <div className="bg-gray-200 dark:bg-zinc-800 text-white p-4 rounded-md shadow-md mx-auto max-w-2xl text-center">
                <div className="flex justify-center items-center">
                    <nav className="flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">CONSULTER LES RAPPORTS</a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">GERER LE MEDECIN</a>
                    </nav>
                </div>
            </div>
            <br />
            <div className="bg-gray-200 dark:bg-zinc-800 p-4 rounded-md shadow-md mx-auto max-w-2xl text-center">
                <p className="text-sm text-gray-500 dark:text-white">Nom du médecin</p>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {medecin.nom} {medecin.prenom} ; {medecin.id}
                </h1>
            </div>
            <br />
        </>
    );
};

export default SecondNav;
