import React from 'react';
import Button from '../button/button';

const Coursecard = ({ title, price, onAddClick }) => {
  return (
    <article 
      className="course-card" 
      aria-labelledby={`title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Usamos un ID dinámico para asociar la etiqueta del artículo al título */}
      <h3 id={`title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
        {title}
      </h3>
      
      <p>Precio: {price}€</p>
      
      <Button 
        type="button" // Asegura que no sea un submit accidental
        onClick={onAddClick} 
        ariaLabel={`Añadir ${title} al carrito, cuesta ${price} euros`}
      >
        Añadir al carrito
      </Button>
    </article>
  );
};

export default Coursecard;