/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/index.jsx",
    "./src/composants/Navbar.jsx",
    "./src/composants/secondNavbar.jsx",
    "./src/pages/accueil/accueil.jsx",
    "./src/pages/accueil/medecins.jsx",
    "./src/pages/accueil/rapport.jsx",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Ajoutez ceci pour activer le mode sombre basé sur une classe
  plugins: [],
}