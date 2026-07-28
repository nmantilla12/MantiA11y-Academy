import React, { createContext, useContext, useState, useEffect } from 'react';


export const AccessibilityContext = createContext();

// 2. Proveedor completo con persistencia y control de accesibilidad
export function AccessibilityProvider({ children }) {
  const [fontDyslexia, setFontDyslexia] = useState(false);
  const [calmMode, setCalmMode] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);

  const [highContrast, setHighContrast] = useState(() => {
    const savedContrast = localStorage.getItem('manti_high_contrast');
    return savedContrast ? JSON.parse(savedContrast) : false;
  });

  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('manti_font_size');
    return savedFontSize || 'normal';
  });

  const [enhancedFocus, setEnhancedFocus] = useState(() => {
    const savedFocus = localStorage.getItem('manti_enhanced_focus');
    return savedFocus ? JSON.parse(savedFocus) : false;
  });

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

  const resetAccessibility = () => {
    setFontDyslexia(false);
    setCalmMode(false);
    setReadingGuide(false);
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
        fontDyslexia,
        setFontDyslexia,
        calmMode,
        setCalmMode,
        readingGuide,
        setReadingGuide,
        highContrast,
        setHighContrast,
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

// 3. Hook personalizado para consumir el contexto de forma segura
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility debe ser utilizado dentro de un AccessibilityProvider');
  }
  return context;
}