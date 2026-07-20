import React, { useState } from 'react';
import './layout.scss'; 

const Layout = ({ children, cart, removeFromCart }) => {
  // Estado para controlar si el panel del carrito está visible o no
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {/* SkipLink: Primer elemento interactivo para accesibilidad de teclado */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <header style={{ padding: '1rem', background: '#f4f4f4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>MantiA11y Academy</h1>
        
        {/* Botón del carrito con accesibilidad dinámica */}
        <button 
          className="header-cart-btn" 
          id="btn-cart" 
          onClick={() => setIsCartOpen(!isCartOpen)}
          aria-haspopup="dialog" 
          aria-expanded={isCartOpen} 
          aria-label="Abrir carrito de compras"
          style={{ cursor: 'pointer' }}
        >
          <span aria-hidden="true">🛒</span>
          <span> Carrito ({cart.length})</span>
        </button>
      </header>
      
      {/* Main content: El id permite el salto del SkipLink */}
      <main id="main-content" tabIndex="-1" style={{ outline: 'none', padding: '1rem' }}>
        {children}
      </main>

      {/* Aside: Se muestra solo cuando isCartOpen es true */}
      {isCartOpen && (
        <aside style={{ borderTop: '2px solid black', marginTop: '2rem', padding: '1rem', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Tu Cesta</h2>
            <button onClick={() => setIsCartOpen(false)} aria-label="Cerrar carrito">Cerrar</button>
          </div>
          
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.title} - {item.price}€</span>
                <button 
                  onClick={() => removeFromCart(index)}
                  aria-label={`Eliminar ${item.title} del carrito`}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </aside>
      )}
    </>
  );
};

export default Layout;