import React from 'react';
import { useAccessibility } from './AccessibilityContext';

export function AccessibilityToggle() {
  const { highContrast, toggleHighContrast } = useAccessibility();

  return (
    <div className="accessibility-bar" style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem 1rem', background: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
      <button 
        onClick={toggleHighContrast}
        className="accessibility-btn"
        style={{
          background: highContrast ? '#1f1f1f' : '#0b57d0',
          color: '#ffffff',
          border: 'none',
          padding: '0.4rem 0.8rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '600',
          transition: 'background 0.2s ease'
        }}
        aria-pressed={highContrast}
        aria-label="Alternar modo de alto contraste"
      >
        {highContrast ? 'Desactivar Alto Contraste' : '♿ Alto Contraste'}
      </button>
    </div>
  );
}
