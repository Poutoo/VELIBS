import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [visiteur, setVisiteur] = useState(null);

  const login = (visiteurData) => {
    setVisiteur(visiteurData);
  };

  const logout = () => {
    setVisiteur(null);
  };

  return (
    <AuthContext.Provider value={{ visiteur, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
