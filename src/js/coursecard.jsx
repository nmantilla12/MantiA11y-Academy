import React from 'react';
import Button from '../button/button'; // Asegúrate de que la ruta sea correcta

const Coursecard = ({ title, price, onAddClick }) => {
  return (
    <article style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <p>{price}€</p>
      
      {/* Usamos el ariaLabel dinámico para asegurar la accesibilidad */}
      <Button 
        onClick={onAddClick} 
        ariaLabel={`Añadir ${title} al carrito por ${price}€`}
      >
        Añadir al carrito
      </Button>
    </article>
  );
};

export default Coursecard;
