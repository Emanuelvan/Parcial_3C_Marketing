/**
 * Integración con PayPal
 */

/**
 * Configura y renderiza los botones de PayPal
 * @param {number} total - El total a pagar
 */
function setupPayPalButtons(total) {
    const paypalContainer = document.getElementById('paypal-button-container');
    paypalContainer.innerHTML = '';

    // Guard clause para verificar que el SDK de PayPal se haya cargado
    if (typeof paypal === 'undefined') {
        console.warn('SDK de PayPal no detectado. Los botones de pago no se renderizarán.');
        if (total > 0) {
            paypalContainer.innerHTML = '<p class="text-sm text-center text-red-500">Error al cargar el método de pago. Verifica que el Client-ID de PayPal sea correcto.</p>';
            paypalContainer.style.display = 'block';
        }
        return;
    }

    // Solo mostrar PayPal si el total es mayor a 0
    if (total > 0) {
        paypalContainer.style.display = 'block';

        paypal.Buttons({
            createOrder: function(data, actions) {
                const totalEnUSD = total / CONFIG.TASA_CONVERSION_COP_A_USD;
                const totalString = totalEnUSD.toFixed(2);

                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: totalString,
                            currency_code: 'USD'
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    console.log('Pago completado por ' + details.payer.name.given_name);
                    paypalContainer.innerHTML = '<p class="text-green-600 font-semibold text-center">¡Pago completado con éxito!</p>';
                    clearCart();
                });
            },
            onError: function(err) {
                console.error('Error con PayPal:', err);
                paypalContainer.innerHTML = '<p class="text-red-600 text-center">Ocurrió un error con el pago.</p>';
            }
        }).render('#paypal-button-container');

    } else {
        paypalContainer.style.display = 'none';
    }
}
