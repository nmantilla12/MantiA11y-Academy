import React, { useState, useEffect } from 'react';

export function AccessibilityToggle() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <button 
      onClick={() => setHighContrast(!highContrast)}
      aria-label="Activar modo de alto contraste"
      className="accessibility-btn"
    >
      {highContrast ? 'Desactivar Alto Contraste' : '♿ Alto Contraste'}
    </button>
  );
}