import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from '../context/AccessibilityContext'; // Importamos tu nuevo contexto
import Layout from './components/layout/layout';
import Coursecard from './components/coursecard/coursecard';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log("Añadiendo:", product.title);
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <AccessibilityProvider>
      <Router>
        <Layout cart={cart} removeFromCart={removeFromCart}>
          <Routes>
            <Route path="/" element={
              <Coursecard 
                title="Desarrollo Accesible" 
                price={29.99} 
                onAddClick={() => addToCart({ title: "Desarrollo Accesible", price: 29.99 })}
              />
            } />
            {/* Aquí añadirás las nuevas rutas de tu "Metodología" próximamente */}
          </Routes>
        </Layout>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
