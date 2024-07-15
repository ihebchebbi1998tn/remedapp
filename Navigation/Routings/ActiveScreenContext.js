import React, { createContext, useState, useContext } from 'react';

const ActiveScreenContext = createContext();

export const useActiveScreen = () => useContext(ActiveScreenContext);

export const ActiveScreenProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('Home'); // Default initial screen

  return (
    <ActiveScreenContext.Provider value={{ activeScreen, setActiveScreen }}>
      {children}
    </ActiveScreenContext.Provider>
  );
};
