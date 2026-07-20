import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  // Inicializamos leyendo del localStorage, o por defecto false/normal
  const [isContrastMode, setIsContrastMode] = useState(() => {
    return localStorage.getItem('contrastMode') === 'true';
  });

  // Efecto para guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('contrastMode', isContrastMode);
    document.body.classList.toggle('contrast-mode', isContrastMode);
  }, [isContrastMode]);

  return (
    <AccessibilityContext.Provider value={{ isContrastMode, setIsContrastMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
