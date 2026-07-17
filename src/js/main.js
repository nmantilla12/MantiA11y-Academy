const btnCart = document.getElementById('btn-cart');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsList = document.getElementById('cart-items-list');
const cartCountBadge = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const btnCheckout = document.getElementById('btn-checkout');
const addToCartButtons = document.querySelectorAll('.course-card__add-btn');

let cart = [];

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

    li.innerHTML = `
      <div class="cart-sidebar__item-info">
        <p class="cart-sidebar__item-title">${item.title}</p>
        <p class="cart-sidebar__item-price">${item.price.toFixed(2).replace('.', ',')}€</p>
      </div>
      <button class="cart-sidebar__remove-btn" data-index="${index}" aria-label="Eliminar ${item.title} del carrito">
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

btnCart.addEventListener('click', openCart);
btnCloseCart.addEventListener('click', closeCart);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cartSidebar.classList.contains('cart-sidebar--open')) {
    closeCart();
  }
});

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.course-card');
    const title = card.querySelector('.course-card__title').textContent;
    const priceText = card.querySelector('.course-card__price').textContent;
    const price = parseFloat(priceText.replace(',', '.').replace('€', ''));
    
    addToCart(title, price);
  });
});
const btnCart = document.getElementById('btn-cart');
const btnCloseCart = document.getElementById('btn-close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsList = document.getElementById('cart-items-list');
const cartCountBadge = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const btnCheckout = document.getElementById('btn-checkout');
const addToCartButtons = document.querySelectorAll('.course-card__add-btn');

// Intentamos cargar el carrito desde LocalStorage; si no hay nada, empezamos con una lista vacía
let cart = JSON.parse(localStorage.getItem('manti_cart')) || [];

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

function saveCartToStorage() {
  localStorage.setItem('manti_cart', JSON.stringify(cart));
}

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

    li.innerHTML = `
      <div class="cart-sidebar__item-info">
        <p class="cart-sidebar__item-title">${item.title}</p>
        <p class="cart-sidebar__item-price">${item.price.toFixed(2).replace('.', ',')}€</p>
      </div>
      <button class="cart-sidebar__remove-btn" data-index="${index}" aria-label="Eliminar ${item.title} del carrito">
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
  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
}

btnCart.addEventListener('click', openCart);
btnCloseCart.addEventListener('click', closeCart);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cartSidebar.classList.contains('cart-sidebar--open')) {
    closeCart();
  }
});

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.course-card');
    const title = card.querySelector('.course-card__title').textContent;
    const priceText = card.querySelector('.course-card__price').textContent;
    const price = parseFloat(priceText.replace(',', '.').replace('€', ''));
    
    addToCart(title, price);
  });
});

// Al arrancar la aplicación, pintamos el carrito con lo que hayamos recuperado de LocalStorage
updateCartUI();