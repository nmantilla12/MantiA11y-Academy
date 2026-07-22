import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import Layout from './components/layout/layout';
import Coursecard from './components/coursecard/coursecard';
import useRouteFocus from './hooks/useRouteFocus';

// Array de cursos para renderizar dinámicamente el catálogo
const COURSES = [
  { id: 1, title: "Desarrollo Accesible", price: 29.99 },
  { id: 2, title: "Diseño Inclusivo", price: 34.99 },
  { id: 3, title: "Web Semántica", price: 24.99 }
];

// Este componente dispara el hook para mover el foco al cambiar de ruta
const FocusManager = () => {
  useRouteFocus();
  return null;
};

function App() {
  // Inicialización perezosa: carga del localStorage si existe, si no, array vacío
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('mantiA11y-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Efecto para sincronizar el carrito con localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('mantiA11y-cart', JSON.stringify(cart));
  }, [cart]);

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
                <div className="course-grid">
                  {COURSES.map((course) => (
                    <Coursecard 
                      key={course.id}
                      title={course.title} 
                      price={course.price} 
                      onAddClick={() => addToCart(course)}
                    />
                  ))}
                </div>
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