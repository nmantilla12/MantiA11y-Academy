// =========================================================
// 1. ESTADO Y VARIABLES DE ACCESIBILIDAD
// =========================================================
let cart = JSON.parse(localStorage.getItem('mantiA11y-cart')) || [
    { name: "Desarrollo Web Accesible", quantity: 1, price: 149.99 },
    { name: "UI Inclusiva", quantity: 1, price: 99.99 },
    { name: "WCAG 2.2 Essentials", quantity: 1, price: 79.99 }
];

let triggerElement = null; // Guarda el botón que abre el carrito
const cartModal = document.getElementById('cart-modal');
const cartItemsListEl = document.getElementById('cart-items-list');

function saveCart() {
    localStorage.setItem('mantiA11y-cart', JSON.stringify(cart));
}

// =========================================================
// 2. GESTIÓN DE FOCO Y ACCESIBILIDAD
// =========================================================
function openCart() {
    triggerElement = document.activeElement; // Guardamos quién abrió
    cartModal.style.display = 'block';
    // Enfocar el botón de cerrar al abrir para empezar el ciclo
    const closeBtn = cartModal.querySelector('.btn-close'); 
    closeBtn?.focus();
}

function closeCart() {
    cartModal.style.display = 'none';
    if (triggerElement) triggerElement.focus(); // Retorno de foco
}

// Focus Trap: Bucle de navegación por tabulador
cartModal?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusable = cartModal.querySelectorAll('button, [href]');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }
});

// =========================================================
// 3. LÓGICA DE NEGOCIO Y UI
// =========================================================
function updateUI() {
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const btnCheckoutEl = document.getElementById('btn-checkout');

    if (!cartItemsListEl) return;

    let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartCountEl) cartCountEl.textContent = totalItems;

    let currentTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (cartTotalPriceEl) cartTotalPriceEl.textContent = `${currentTotal.toFixed(2).replace('.', ',')}€`;

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
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal.style.display === 'block') {
        closeCart();
        document.getElementById('btn-cart').setAttribute('aria-expanded', 'false');
    }
});

