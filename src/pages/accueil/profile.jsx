import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext'; // Assurez-vous du chemin correct
import '../index.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const { profileImage, updateProfileImage } = useProfile();
  const [tempImage, setTempImage] = useState(null);
  const { visiteur } = useContext(AuthContext); // Utiliser le contexte pour obtenir visiteur et logout


  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setTempImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleConfirm = () => {
    updateProfileImage(tempImage);
    setTempImage(null);
  };

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-lg bg-gray-200 dark:bg-zinc-800">
      <h1 className="text-3xl text-center font-bold mb-6 text-gray-700 dark:text-white">
            {visiteur.nom && visiteur.prenom ?  `${visiteur.nom} ${visiteur.prenom}` : 'aaaaa'}
      </h1>
      <div className="flex flex-col items-center">
        <img 
          src={tempImage || profileImage} 
          alt="Profile"
          className="h-24 w-24 rounded-full mb-4 shadow-md"
        />
        <input 
          type="file" 
          onChange={handleImageChange} 
          className="mb-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        {tempImage && (
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Confirmer la modification
          </button>
        )}
      </div>
    </div>
  );
}
