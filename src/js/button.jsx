import React from 'react';

const Button = ({ onClick, children, ariaLabel }) => {
  return (
    <button 
      onClick={onClick} 
      aria-label={ariaLabel}
      className="btn-accessible"
      style={{ 
        padding: '8px 16px', 
        cursor: 'pointer' 
      }}
    >
      {children}
    </button>
  );
};

export default Button;
