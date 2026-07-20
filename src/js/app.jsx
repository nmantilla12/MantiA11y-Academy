import react, { useState } from 'react';
import layout from './components/layout/layout';
import coursecard from './components/coursecard/coursecard';

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
    <Layout cart={cart} removeFromCart={removeFromCart}>
      <Coursecard 
        title="Desarrollo Accesible" 
        price={29.99} 
        onAddClick={() => addToCart({ title: "Desarrollo Accesible", price: 29.99 })}
      />
    </Layout>
  );
}

export default App;
