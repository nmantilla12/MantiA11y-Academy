document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.getElementById('btn-cart');
    const btnCloseCart = document.getElementById('btn-close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartCountBadge = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const btnCheckout = document.getElementById('btn-checkout');
    const addToCartButtons = document.querySelectorAll('.course-card__add-btn');
    const body = document.body;

    let cart = JSON.parse(localStorage.getItem('manti_cart')) || [];
    let fontSize = 100;

    function openCart() {
        cartSidebar.classList.add('cart-sidebar--open');
        btnCart.setAttribute('aria-expanded', 'true');
        cartSidebar.setAttribute('aria-hidden', 'false');
        btnCloseCart.focus();
    }

    function closeCart() {
        cartSidebar.classList.remove('cart-sidebar--open');
        btnCart.setAttribute('aria-expanded', 'false');
        cartSidebar.setAttribute('aria-hidden', 'true');
    }

    function saveCartToStorage() {
        localStorage.setItem('manti_cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="cart-sidebar-item">Tu carrito está vacío.</li>';
            cartCountBadge.textContent = '0';
            cartTotalPrice.textContent = '0,00€';
            btnCheckout.disabled = true;
            return;
        }

        cartCountBadge.textContent = cart.length;
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement('li');
            li.className = 'cart-sidebar-item';
            li.innerHTML = `
                <span>${item.title} - ${item.price.toFixed(2).replace('.', ',')}€</span>
                <button class="cart-sidebar-remove-btn" data-index="${index}">Eliminar</button>
            `;
            cartItemsList.appendChild(li);
        });

        cartTotalPrice.textContent = `${total.toFixed(2).replace('.', ',')}€`;
        btnCheckout.disabled = false;

        cartItemsList.querySelectorAll('.cart-sidebar-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                cart.splice(parseInt(e.target.dataset.index), 1);
                saveCartToStorage();
                updateCartUI();
            });
        });
    }

    function checkout() {
        alert('¡Gracias por tu compra!');
        cart = [];
        saveCartToStorage();
        updateCartUI();
        closeCart();
    }

    document.getElementById('btn-contrast').addEventListener('click', () => body.classList.toggle('high-contrast'));
    document.getElementById('btn-text-up').addEventListener('click', () => { fontSize += 10; body.style.fontSize = fontSize + '%'; });
    document.getElementById('btn-text-down').addEventListener('click', () => { if (fontSize > 80) { fontSize -= 10; body.style.fontSize = fontSize + '%'; } });

    btnCart.addEventListener('click', openCart);
    btnCloseCart.addEventListener('click', closeCart);
    btnCheckout.addEventListener('click', checkout);
    
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.course-card');
            const title = card.querySelector('.course-card__title').textContent;
            const price = parseFloat(card.querySelector('.course-card__price').textContent.replace(',', '.').replace('€', ''));
            cart.push({ title, price });
            saveCartToStorage();
            updateCartUI();
        });
    });

    updateCartUI();
});
