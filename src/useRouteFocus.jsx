/* src/components/accessibility/RouteFocus.jsx */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteFocus = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Busca el encabezado principal de la página actual
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
      // Necesitamos hacer el elemento "focusable" sin romper la semántica
      mainHeading.setAttribute('tabindex', '-1');
      mainHeading.focus();
    }
  }, [pathname]);

  return null;
};

export default RouteFocus;
