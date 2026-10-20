//Fase 2. Precio y descuentos

function calcularIVA(precio, tipo = 21) {
    return (precio * tipo) / 100;
}

function precioConIVA(precio, tipo = 21) {
    return precio + calcularIVA(precio, tipo);
}

function aplicarDescuento(precio, descuento) {
    return precio - (precio * descuento) / 100;
}

function redondear (numero, decimales = 2) {
    const factor = 10 ** decimales;
    return Math.round((numero + Number.EPSILON) * factor) / factor;
}

function formatearEuros(numero) {
    return redondear(numero, 2).toFixed(2).replace('.', ',') + ' €';
}

//Experimentos 

const aplicarDescuentoFlecha = (precio, porcentaje) =>
  precio - (precio * porcentaje) / 100;

function calcularIVAConsola(precio, tipo = 21) {
  console.log((precio * tipo) / 100);
}

function precioConIVAConsola(precio, tipo = 21) {
  return precio + calcularIVAConsola(precio, tipo);
}