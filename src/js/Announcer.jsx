import React from 'react';

const Announcer = ({ message }) => {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      className="sr-only" // Clase para ocultar visualmente pero mantener accesible
    >
      {message}
    </div>
  );
};

export default Announcer;
