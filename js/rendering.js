/**
 * Funciones de renderizado del DOM
 */

/**
 * Renderiza los productos en el DOM
 * @param {Array} productos - El array de productos a renderizar
 */
function renderProductos(productos) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    if (productos.length === 0) {
        productGrid.innerHTML = '<p class="text-gris-asfalto col-span-full">No se encontraron productos en esta categoría.</p>';
        return;
    }

    productos.forEach(producto => {
        const productCard = `
            <div class="bg-white text-urban-black rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src="${producto.img}" alt="${producto.nombre}" class="w-full h-64 object-cover" 
                     onerror="this.src='https://placehold.co/400x400/cccccc/333333?text=Sin+Imagen'; this.onerror=null;">
                <div class="p-4">
                    <span class="text-
                    xs text-gris-asfalto">${producto.categoria}</span>
                    <h3 class="text-lg font-semibold my-1">${producto.nombre}</h3>
                    <p class="text-xl font-bold text-naranja-neon mb-4">${CONFIG.formatter.format(producto.precio)}</p>
                    <button class="add-to-cart-btn w-full bg-urban-black text-blanco-cemento py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-naranja-neon hover:text-urban-black" data-id="${producto.id}">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

/**
 * Renderiza los items del carrito en el DOM
 */
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMsg = document.getElementById('cart-empty-msg');
    const cartSummary = document.getElementById('cart-summary');
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartEmptyMsg.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        cartEmptyMsg.style.display = 'none';
        cartSummary.style.display = 'block';

        cart.forEach(item => {
            const cartItem = `
                <div class="flex items-center justify-between py-3">
                    <img src="${item.img}" alt="${item.nombre}" class="w-12 h-12 rounded-md object-cover mr-3">
                    <div class="flex-grow">
                        <p class="font-semibold text-sm">${item.nombre}</p>
                        <p class="text-xs text-gris-asfalto">${CONFIG.formatter.format(item.precio)} x ${item.cantidad}</p>
                    </div>
                    <div class="flex items-center">
                        <button class="remove-from-cart-btn text-red-500 hover:text-red-700 px-2" data-id="${item.id}" data-action="remove-one">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" /></svg>
                        </button>
                        <span class="mx-1 text-sm">${item.cantidad}</span>
                        <button class="add-to-cart-btn text-green-500 hover:text-green-700 px-2" data-id="${item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        </button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItem;
        });
    }
    
    const total = calculateTotal();
    updateCartBadge();
    setupPayPalButtons(total);
}
