import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import Layout from './components/layout/layout';
import Coursecard from './components/coursecard/coursecard';
import useRouteFocus from './hooks/useRouteFocus';

// Este componente dispara el hook para mover el foco al cambiar de ruta
const FocusManager = () => {
  useRouteFocus();
  return null;
};

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <AccessibilityProvider>
      <Router>
        {/* El FocusManager debe estar dentro del Router para acceder al location */}
        <FocusManager />
        
        <Layout cart={cart} removeFromCart={removeFromCart}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Coursecard 
                  title="Desarrollo Accesible" 
                  price={29.99} 
                  onAddClick={() => addToCart({ title: "Desarrollo Accesible", price: 29.99 })}
                />
              } 
            />
            {/* Aquí irán tus próximas rutas */}
          </Routes>
        </Layout>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;