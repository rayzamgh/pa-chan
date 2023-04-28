// src/VolumeContext.js
import { createContext, useContext, useState } from 'react';

const VolumeContext = createContext();

export const useVolume = () => {
  const context = useContext(VolumeContext);
  if (!context) {
    throw new Error('useVolume must be used within a VolumeProvider');
  }
  return context;
};

export const VolumeProvider = ({ children }) => {
  const [volume, setVolume] = useState(1);

  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};
