// funciones.js · Solo cálculos, no toca la página


// ---------- Precios y descuentos ----------

/**
 * Calcula cuánto IVA hay que pagar por un precio.
 * @param {number} precio - Precio base.
 * @param {number} [tipo=21] - Porcentaje de IVA.
 * @returns {number} El importe del IVA.
 */
function calcularIVA(precio, tipo = 21) {
  return (precio * tipo) / 100;
}

/**
 * Calcula el precio final sumando el IVA al precio base.
 * @param {number} precio - Precio base.
 * @param {number} [tipo=21] - Porcentaje de IVA.
 * @returns {number} El precio más el IVA.
 */
function precioConIVA(precio, tipo = 21) {
  return precio + calcularIVA(precio, tipo);
}

/**
 * Aplica un porcentaje de descuento a un precio.
 * @param {number} precio - Precio original.
 * @param {number} porcentaje - Porcentaje de descuento (de 0 a 100).
 * @returns {number} El precio después del descuento.
 */
function aplicarDescuento(precio, porcentaje) {
  return precio - (precio * porcentaje) / 100;
}

/**
 * Redondea un número a los decimales indicados.
 * Suma Number.EPSILON para que casos como 1.005 se redondeen bien.
 * @param {number} numero - Número a redondear.
 * @param {number} [decimales=2] - Cantidad de decimales.
 * @returns {number} El número redondeado.
 */
function redondear(numero, decimales = 2) {
  const factor = 10 ** decimales;
  return Math.round((numero + Number.EPSILON) * factor) / factor;
}

/**
 * Da formato de euros a un número: dos decimales, coma y símbolo €.
 * @param {number} numero - Cantidad a formatear.
 * @returns {string} Un texto como "1234,50 €".
 */
function formatearEuros(numero) {
  return redondear(numero, 2).toFixed(2).replace(".", ",") + " €";
}

// ---------- Temperaturas ----------

/**
 * Convierte grados Celsius a Fahrenheit.
 * @param {number} c - Grados Celsius.
 * @returns {number} Grados Fahrenheit.
 */
function celsiusAFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

/**
 * Convierte grados Fahrenheit a Celsius.
 * @param {number} f - Grados Fahrenheit.
 * @returns {number} Grados Celsius.
 */
function fahrenheitACelsius(f) {
  return ((f - 32) * 5) / 9;
}

/**
 * Convierte una temperatura de una unidad a otra.
 * @param {number} valor - Temperatura que se quiere convertir.
 * @param {string} de - Unidad de origen: "C" o "F".
 * @param {string} a - Unidad de destino: "C" o "F".
 * @returns {number|null} El valor convertido, el mismo valor si las unidades
 *   son iguales, o null si alguna unidad no es "C" ni "F".
 */
function convertirTemperatura(valor, de, a) {
  if (de === a) {
    return valor;
  }
  if (de === "C" && a === "F") {
    return celsiusAFahrenheit(valor);
  }
  if (de === "F" && a === "C") {
    return fahrenheitACelsius(valor);
  }
  return null;
}

// ---------- Validador de contraseñas ----------

/**
 * Comprueba si un texto llega a una longitud mínima.
 * @param {string} texto - Texto a comprobar.
 * @param {number} [minimo=8] - Longitud mínima.
 * @returns {boolean} true si el texto llega a la longitud mínima.
 */
function longitudSuficiente(texto, minimo = 8) {
  return texto.length >= minimo;
}

/**
 * Comprueba si un texto tiene alguna mayúscula.
 * Si al pasarlo a minúsculas cambia, es que tenía alguna.
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si hay alguna mayúscula.
 */
function tieneMayuscula(texto) {
  return texto !== texto.toLowerCase();
}

/**
 * Comprueba si un texto tiene alguna minúscula.
 * Si al pasarlo a mayúsculas cambia, es que tenía alguna.
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si hay alguna minúscula.
 */
function tieneMinuscula(texto) {
  return texto !== texto.toUpperCase();
}

/**
 * Comprueba si un texto tiene algún número.
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si hay algún dígito del 0 al 9.
 */
function tieneNumero(texto) {
  return [...texto].some((caracter) => "0123456789".includes(caracter));
}

/**
 * Evalúa la fortaleza de una contraseña según cuatro requisitos:
 * longitud, mayúscula, minúscula y número.
 * @param {string} texto - Contraseña a evaluar.
 * @returns {string} "fuerte" (cumple 4), "media" (cumple 3) o "débil" (menos).
 */
function evaluarContrasena(texto) {
  const requisitos = [
    longitudSuficiente(texto),
    tieneMayuscula(texto),
    tieneMinuscula(texto),
    tieneNumero(texto),
  ];
  const cumplidos = requisitos.filter((cumple) => cumple).length;

  if (cumplidos === 4) {
    return "fuerte";
  }
  if (cumplidos === 3) {
    return "media";
  }
  return "débil";
}

// ---------- Generador de contraseñas ----------

/**
 * Genera un número entero al azar entre dos valores, ambos incluidos.
 * @param {number} min - Valor mínimo.
 * @param {number} max - Valor máximo.
 * @returns {number} Un entero entre min y max.
 */
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Elige un carácter al azar de un texto.
 * @param {string} conjunto - Caracteres entre los que elegir.
 * @returns {string} Un carácter de ese texto.
 */
function caracterAleatorio(conjunto) {
  return conjunto[numeroAleatorio(0, conjunto.length - 1)];
}

/**
 * Genera una contraseña al azar. Siempre usa minúsculas.
 * @param {number} longitud - Longitud deseada (entero entre 6 y 30).
 * @param {{mayusculas?: boolean, numeros?: boolean}} [opciones] - Si se incluyen
 *   mayúsculas y números. Por defecto, los dos están activados.
 * @returns {string|null} La contraseña, o null si la longitud no es válida.
 */
function generarContrasena(longitud, opciones = {}) {
  if (!Number.isInteger(longitud) || longitud < 6 || longitud > 30) {
    return null;
  }

  const { mayusculas = true, numeros = true } = opciones;

  let conjunto = "abcdefghijklmnopqrstuvwxyz";
  if (mayusculas) {
    conjunto += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (numeros) {
    conjunto += "0123456789";
  }

  let contrasena = "";
  for (let i = 0; i < longitud; i++) {
    contrasena += caracterAleatorio(conjunto);
  }
  return contrasena;
}

// ---------- Contador de palabras ----------

/**
 * Separa un texto en palabras, ignorando espacios repetidos y saltos de línea.
 * @param {string} texto - Texto a separar.
 * @returns {string[]} La lista de palabras.
 */
function palabras(texto) {
  return texto.split(/\s+/).filter((palabra) => palabra !== "");
}

/**
 * Cuenta las palabras de un texto.
 * @param {string} texto - Texto a analizar.
 * @returns {number} Cantidad de palabras.
 */
function contarPalabras(texto) {
  return palabras(texto).length;
}

/**
 * Cuenta los caracteres de un texto, con o sin espacios.
 * @param {string} texto - Texto a analizar.
 * @param {boolean} [conEspacios=true] - Si es false, no cuenta los espacios.
 * @returns {number} Cantidad de caracteres.
 */
function contarCaracteres(texto, conEspacios = true) {
  if (conEspacios) {
    return texto.length;
  }
  return texto.replace(/\s/g, "").length;
}

/**
 * Busca la palabra más larga de un texto.
 * @param {string} texto - Texto a analizar.
 * @returns {string} La palabra más larga, o "" si no hay palabras.
 */
function palabraMasLarga(texto) {
  let masLarga = "";
  for (const palabra of palabras(texto)) {
    if (palabra.length > masLarga.length) {
      masLarga = palabra;
    }
  }
  return masLarga;
}

/**
 * Calcula los minutos que se tarda en leer un texto.
 * @param {string} texto - Texto a leer.
 * @param {number} [ppm=200] - Palabras que se leen por minuto.
 * @returns {number} Minutos de lectura, redondeados hacia arriba.
 */
function minutosLectura(texto, ppm = 200) {
  return Math.ceil(contarPalabras(texto) / ppm);
}

// ---------- Validación de datos ----------

/**
 * Comprueba si un texto es un número válido.
 * Un texto vacío, con solo espacios o con letras no es válido.
 * @param {string} texto - Texto escrito por el usuario.
 * @returns {boolean} true si el texto es un número.
 */
function esNumeroValido(texto) {
  if (texto.trim() === "") {
    return false;
  }
  return Number.isFinite(Number(texto));
}