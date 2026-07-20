// =========================================================
// 1. ESTADO: Cargar desde localStorage o iniciar vacío
// =========================================================
let cart = JSON.parse(localStorage.getItem('mantiA11y-cart')) || [
    { name: "Desarrollo Web Accesible", quantity: 1, price: 149.99 },
    { name: "UI Inclusiva", quantity: 1, price: 99.99 },
    { name: "WCAG 2.2 Essentials", quantity: 1, price: 79.99 }
];

function saveCart() {
    localStorage.setItem('mantiA11y-cart', JSON.stringify(cart));
}

// =========================================================
// 2. LÓGICA DE NEGOCIO
// =========================================================
function addProduct(name, price, quantity = 1) {
    const cleanName = name.trim();
    const courseFound = cart.find(item => item.name.toLowerCase() === cleanName.toLowerCase());

    if (courseFound) {
        courseFound.quantity += quantity;
    } else {
        cart.push({ name: cleanName, quantity: quantity, price: parseFloat(price) });
    }
    saveCart();
    updateUI();
}

// =========================================================
// 3. RENDERIZADO Y DELEGACIÓN DE EVENTOS
// =========================================================
const cartItemsListEl = document.getElementById('cart-items-list');

function updateUI() {
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const btnCheckoutEl = document.getElementById('btn-checkout');

    if (!cartItemsListEl) return;

    // Actualizar contadores globales
    let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartCountEl) cartCountEl.textContent = totalItems;

    let currentTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (cartTotalPriceEl) cartTotalPriceEl.textContent = `${currentTotal.toFixed(2).replace('.', ',')}€`;

    // Renderizado de lista
    cartItemsListEl.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsListEl.innerHTML = '<li class="cart-sidebar-empty-message">Tu cesta está vacía</li>';
        if (btnCheckoutEl) btnCheckoutEl.disabled = true;
    } else {
        if (btnCheckoutEl) btnCheckoutEl.disabled = false;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'cart-sidebar-item';
            li.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.price.toFixed(2).replace('.', ',')}€ x ${item.quantity}</small>
                </div>
                <div class="cart-sidebar-actions">
                    <button type="button" class="btn-plus" data-name="${item.name}" aria-label="Aumentar ${item.name}">+</button>
                    <button type="button" class="btn-minus" data-name="${item.name}" aria-label="Disminuir ${item.name}">-</button>
                </div>
            `;
            cartItemsListEl.appendChild(li);
        });
    }
}

// Delegación de eventos (Funciona con elementos dinámicos)
cartItemsListEl?.addEventListener('click', (e) => {
    const name = e.target.getAttribute('data-name');
    if (!name) return;
    
    const index = cart.findIndex(item => item.name === name);
    if (index === -1) return;

    if (e.target.classList.contains('btn-plus')) {
        cart[index].quantity += 1;
    } else if (e.target.classList.contains('btn-minus')) {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
    }
    
    saveCart();
    updateUI();
});

document.addEventListener('DOMContentLoaded', updateUI);
