
export default function ListeRapports() {


    return (
        <>
            <div className="bg-gray-200 dark:bg-zinc-800 text-white p-4 rounded-md shadow-md mx-auto max-w-2xl text-center">
                <div className="flex justify-center items-center">
                    <nav className="flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            /*onClick={() => setAffichage('rapports')}*/
                            >
                            AJOUTER UN RAPPORT
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                            /*onClick={() => setAffichage('fiche')}*/
                            >
                            MODIFIER UN RAPPORT
                        </a>
                    </nav>
                </div>
            </div>
        </>
    );
}
