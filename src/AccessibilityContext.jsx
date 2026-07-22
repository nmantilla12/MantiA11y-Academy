import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el contexto de accesibilidad
const AccessibilityContext = createContext();

// 2. Crear y exportar el Provider completo
export function AccessibilityProvider({ children }) {
  // Estado para el modo de alto contraste
  const [highContrast, setHighContrast] = useState(() => {
    const savedContrast = localStorage.getItem('manti_high_contrast');
    return savedContrast ? JSON.parse(savedContrast) : false;
  });

  // Estado para el tamaño de fuente ('normal', 'large', 'xlarge')
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('manti_font_size');
    return savedFontSize || 'normal';
  });

  // Estado para lectores de pantalla / ayudas visuales o foco visible mejorado
  const [enhancedFocus, setEnhancedFocus] = useState(() => {
    const savedFocus = localStorage.getItem('manti_enhanced_focus');
    return savedFocus ? JSON.parse(savedFocus) : false;
  });

  // Sincronizar y aplicar clases o atributos al DOM raíz (document.body) según las preferencias
  useEffect(() => {
    localStorage.setItem('manti_high_contrast', JSON.stringify(highContrast));
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('manti_font_size', fontSize);
    document.body.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
    document.body.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('manti_enhanced_focus', JSON.stringify(enhancedFocus));
    if (enhancedFocus) {
      document.body.classList.add('enhanced-focus-mode');
    } else {
      document.body.classList.remove('enhanced-focus-mode');
    }
  }, [enhancedFocus]);

  // Funciones de control de accesibilidad
  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const changeFontSize = (size) => {
    if (['normal', 'large', 'xlarge'].includes(size)) {
      setFontSize(size);
    }
  };

  const toggleEnhancedFocus = () => {
    setEnhancedFocus(prev => !prev);
  };

  // Restablecer todos los valores de accesibilidad por defecto
  const resetAccessibility = () => {
    setHighContrast(false);
    setFontSize('normal');
    setEnhancedFocus(false);
    localStorage.removeItem('manti_high_contrast');
    localStorage.removeItem('manti_font_size');
    localStorage.removeItem('manti_enhanced_focus');
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        changeFontSize,
        enhancedFocus,
        toggleEnhancedFocus,
        resetAccessibility
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

// 3. Hook personalizado para consumir el contexto de accesibilidad fácilmente en componentes
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe ser utilizado dentro de un AccessibilityProvider');
  }
  return context;
}
