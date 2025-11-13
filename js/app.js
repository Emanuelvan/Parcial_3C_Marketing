/**
 * Aplicación principal - Event listeners e inicialización
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTORES ---
    const productGrid = document.getElementById('product-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const filtrosContainer = document.getElementById('filtros-container');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    // --- EVENT LISTENERS PARA FILTROS ---
    filtrosContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            const categoria = e.target.dataset.categoria;

            // Actualizar clase activa
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            if (categoria === 'all') {
                renderProductos(DB_PRODUCTOS);
            } else {
                const productosFiltrados = DB_PRODUCTOS.filter(p => p.categoria === categoria);
                renderProductos(productosFiltrados);
            }
        }
    });

    // --- EVENT LISTENER PARA AÑADIR AL CARRITO ---
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const id = e.target.dataset.id;
            addToCart(id);
        }
    });

    // --- EVENT LISTENER PARA CONTENEDOR DEL CARRITO ---
    cartItemsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        
        const id = btn.dataset.id;
        
        if (btn.classList.contains('remove-from-cart-btn')) {
            removeFromCart(id);
        } else if (btn.classList.contains('add-to-cart-btn')) {
            addToCart(id);
        }
    });
    
    // --- EVENT LISTENER PARA VACIAR CARRITO ---
    clearCartBtn.addEventListener('click', clearCart);

    // --- INICIALIZACIÓN ---
    loadCart();
    renderProductos(DB_PRODUCTOS);
    renderCart();
});
