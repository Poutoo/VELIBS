/* Chargement du fichier JSON */
async function load() {
    try {
        const response = await fetch('/src/api/velib-disponibilite-en-temps-reel.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
    }
}

/* Traitement des données retournées */
load()
    .then((data) => {
        if (data) {
            console.log(data);
        } else {
            console.log("Aucune donnée chargée.");
        }
    })
    .catch((error) => {
        console.error("Erreur globale :", error);
    });

/* Exportation de la fonction */
export default load;
