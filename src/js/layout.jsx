const layout = ({ children, cart, removeFromCart }) => {
  return (
    <>
      <header style={{ padding: '1rem', background: '#f4f4f4' }}>
        <h1>MantiA11y Academy</h1>
        <p>Carrito: {cart.length} productos</p>
      </header>
      
      <main>{children}</main>

      <aside style={{ borderTop: '2px solid black', marginTop: '2rem' }}>
        <h2>Tu Cesta</h2>
        {cart.map((item, index) => (
          <div key={index}>
            {item.title} - {item.price}€
            <button onClick={() => removeFromCart(index)}>Eliminar</button>
          </div>
        ))}
      </aside>
    </>
  );
};

export default Layout;