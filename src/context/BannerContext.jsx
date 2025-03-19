import React, { createContext, useState, useContext } from 'react';

const BannerContext = createContext();

export function BannerProvider({ children }) {
  const [bannerImage, setBannerImage] = useState(localStorage.getItem('bannerImage') || 'jinx-5.gif');

  const updateBannerImage = (newImage) => {
    setBannerImage(newImage);
    localStorage.setItem('bannerImage', newImage);
  };

  return (
    <BannerContext.Provider value={{ bannerImage, updateBannerImage }}>
      {children}
    </BannerContext.Provider>
  );
}

export function useBanner() {
  return useContext(BannerContext);
}
