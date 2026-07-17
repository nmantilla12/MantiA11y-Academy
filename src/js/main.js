const btnCart = document.getElementById('btn-cart');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartSidebar = document.getElementById('cart-sidebar');

function openCart() {
  cartSidebar.classList.add('cart-sidebar--open');
  btnCart.setAttribute('aria-expanded', 'true');
  cartSidebar.setAttribute('aria-hidden', 'false');
  cartSidebar.focus();
}

function closeCart() {
  cartSidebar.classList.remove('cart-sidebar--open');
  btnCart.setAttribute('aria-expanded', 'false');
  cartSidebar.setAttribute('aria-hidden', 'true');
  btnCart.focus();
}

btnCart.addEventListener('click', openCart);
btnCloseCart.addEventListener('click', closeCart);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cartSidebar.classList.contains('cart-sidebar--open')) {
    closeCart();
  }
});
const cartItemsList = document.getElementById('cart-items-list');
const cartCountBadge = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const btnCheckout = document.getElementById('btn-checkout');
const addToCartButtons = document.querySelectorAll('.course-card__add-btn');
let cart = [];
function updateCartUI() {
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li class="cart-sidebar__empty-message">Tu carrito está vacío actualmente.</li>';
    cartCountBadge.textContent = '0';
    cartTotalPrice.textContent = '0,00€';
    cartTotalPrice.setAttribute('aria-label', 'Total: 0 euros');
    btnCheckout.disabled = true;
    btnCheckout.setAttribute('aria-label', 'Proceder al pago (botón desactivado, carrito vacío)');
    btnCart.setAttribute('aria-label', 'Abrir carrito de compras, 0 artículos en la cesta');
    return;
  }

  cartCountBadge.textContent = cart.length;
  btnCart.setAttribute('aria-label', `Abrir carrito de compras, ${cart.length} ${cart.length === 1 ? 'artículo' : 'artículos'} en la cesta`);

  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    
    const li = document.createElement('li');
    li.className = 'cart-sidebar__item';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.padding = '1rem 0';
    li.style.borderBottom = '1px solid #e2e8f0';

    li.innerHTML = `
      <div>
        <p style="font-weight: 600; margin: 0;">${item.title}</p>
        <p style="margin: 0.25rem 0 0 0; color: #718096;">${item.price.toFixed(2).replace('.', ',')}€</p>
      </div>
      <button class="cart-sidebar__remove-btn" data-index="${index}" aria-label="Eliminar ${item.title} del carrito" style="background: none; border: none; color: #e53e3e; cursor: pointer; padding: 0.5rem; font-weight: bold;">
        Eliminar
      </button>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotalPrice.textContent = `${total.toFixed(2).replace('.', ',')}€`;
  cartTotalPrice.setAttribute('aria-label', `Total: ${total.toFixed(2).replace('.', ',')} euros`);

  btnCheckout.disabled = false;
  btnCheckout.removeAttribute('aria-label');

  const removeButtons = cartItemsList.querySelectorAll('.cart-sidebar__remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const indexToRemove = parseInt(e.target.getAttribute('data-index'));
      removeFromCart(indexToRemove);
    });
  });
}

function addToCart(title, price) {
  cart.push({ title, price });
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.course-card');
    const title = card.querySelector('.course-card__title').textContent;
    const priceText = card.querySelector('.course-card__price').textContent;
    const price = parseFloat(priceText.replace(',', '.').replace('€', ''));
    
    addToCart(title, price);
  });
});