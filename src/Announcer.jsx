/* src/components/common/Announcer.jsx */
import React from 'react';

const Announcer = ({ message }) => {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

export default Announcer;
