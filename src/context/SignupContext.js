import React, { createContext, useContext, useState } from 'react';

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const updateUser = (data) => {
    setUserData(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  return (
    <SignupContext.Provider value={{ userData, updateUser }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => useContext(SignupContext);
