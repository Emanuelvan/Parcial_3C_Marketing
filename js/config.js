/**
 * Configuración global de la aplicación
 */

const CONFIG = {
    // Colores personalizados
    colors: {
        'urban-black': '#1A1A1A',
        'blanco-cemento': '#F5F5F5',
        'gris-asfalto': '#4B4B4B',
        'naranja-neon': '#FCA311',
    },
    
    // Tasa de conversión COP a USD
    TASA_CONVERSION_COP_A_USD: 4000,
    
    // Formateador de moneda colombiana
    formatter: new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })
};
