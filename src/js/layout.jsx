import React from 'react';

const layout = ({ children }) => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      
      <header>
        <nav aria-label="Navegación principal">
        </nav>
      </header>

      <main id="main-content">
        {children}
      </main>

      <footer>
        <p>© 2026 MantiA11y Academy. Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

export default Layout;
