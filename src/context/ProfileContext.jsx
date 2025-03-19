import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || 'jinx-pdp-2.gif');

  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
    localStorage.setItem('profileImage', newImage);
  };

  return (
    <ProfileContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
