/* src/components/layout/Layout.jsx */
import React from 'react';
import Header from '../components/header/header'; // Ajusta esta ruta según la ubicación exacta de tu componente Header

const Layout = ({ children, cart, removeFromCart }) => {
  return (
    <div className="layout-wrapper">
      {/* Skip-link para accesibilidad por teclado */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Header cart={cart} removeFromCart={removeFromCart} />

      {/* Punto de destino principal para el foco */}
      <main id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
        {children}
      </main>

      <footer className="footer">
        <p>© 2026 MantiA11y Academy. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
