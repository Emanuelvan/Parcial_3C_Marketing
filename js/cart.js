/**
 * Lógica del carrito de compras
 */

let cart = [];

/**
 * Añade un producto al carrito (o incrementa su cantidad)
 * @param {string} productoId - ID del producto
 */
function addToCart(productoId) {
    const id = parseInt(productoId);
    const productInCart = cart.find(item => item.id === id);

    if (productInCart) {
        productInCart.cantidad++;
    } else {
        const productToAdd = DB_PRODUCTOS.find(item => item.id === id);
        cart.push({ ...productToAdd, cantidad: 1 });
    }
    
    saveCart();
    renderCart();
}

/**
 * Remueve un item del carrito (o decrementa su cantidad)
 * @param {string} productoId - ID del producto
 */
function removeFromCart(productoId) {
    const id = parseInt(productoId);
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].cantidad--;
        if (cart[itemIndex].cantidad === 0) {
            cart.splice(itemIndex, 1);
        }
    }
    
    saveCart();
    renderCart();
}

/**
 * Vacía completamente el carrito
 */
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

/**
 * Calcula el total del carrito
 * @returns {number} El total numérico
 */
function calculateTotal() {
    const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const cartTotalDisplay = document.getElementById('cart-total');
    cartTotalDisplay.textContent = CONFIG.formatter.format(total);
    return total;
}

/**
 * Actualiza el contador del ícono del carrito
 */
function updateCartBadge() {
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    const cartCountBadge = document.getElementById('cart-count');
    cartCountBadge.textContent = totalItems;
}

/**
 * Guarda el carrito en localStorage
 */
function saveCart() {
    localStorage.setItem('streetStyleCart', JSON.stringify(cart));
}

/**
 * Carga el carrito desde localStorage
 */
function loadCart() {
    const cartFromStorage = localStorage.getItem('streetStyleCart');
    if (cartFromStorage) {
        cart = JSON.parse(cartFromStorage);
    }
}
