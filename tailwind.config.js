/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/index.jsx",
    "./src/composants/Navbar.jsx",
    "./src/composants/secondNavbar.jsx",
    "./src/composants/modifierRapport.jsx",
    "./src/composants/ajouterRapport.jsx",
    "./src/composants/listeRapports.jsx",
    "./src/composants/ficheMedecin.jsx",
    "./src/composants/leMedecin.jsx",
    "./src/pages/accueil/accueil.jsx",
    "./src/pages/accueil/medecins.jsx",
    "./src/pages/accueil/rapport.jsx",
    "./src/pages/accueil/profile.jsx",

  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  darkMode: 'class', // Ajoutez ceci pour activer le mode sombre basé sur une classe
  plugins: [],
}