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

//Fase 3 funciones pequeñas
 
// ---------- A · Temperaturas ----------
 

function celsiusAFahrenheit(c) {
  return (c * 9) / 5 + 32;
}
 
function fahrenheitACelsius(f) {
  return ((f - 32) * 5) / 9;
}
 
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
  return null; // unidades que no son "C" ni "F"
}
 
// ---------- B · Validador de contraseñas ----------
 
function longitudSuficiente(texto, minimo = 8) {
  return texto.length >= minimo;
}
 
function tieneMayuscula(texto) {
  return texto !== texto.toLowerCase();
}
 
function tieneMinuscula(texto) {
  return texto !== texto.toUpperCase();
}
 
function tieneNumero(texto) {
  return [...texto].some((caracter) => "0123456789".includes(caracter));
}
 
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
 
// ---------- C · Generador de contraseñas ----------
 
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function caracterAleatorio(conjunto) {
  return conjunto[numeroAleatorio(0, conjunto.length - 1)];
}
 
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
 
// ---------- D · Contador de palabras ----------
 
function palabras(texto) {
  return texto.split(/\s+/).filter((palabra) => palabra !== "");
}
 
function contarPalabras(texto) {
  return palabras(texto).length;
}
 
function contarCaracteres(texto, conEspacios = true) {
  if (conEspacios) {
    return texto.length;
  }
  return texto.replace(/\s/g, "").length;
}
 
function palabraMasLarga(texto) {
  let masLarga = "";
  for (const palabra of palabras(texto)) {
    if (palabra.length > masLarga.length) {
      masLarga = palabra;
    }
  }
  return masLarga;
}
 
function minutosLectura(texto, ppm = 200) {
  return Math.ceil(contarPalabras(texto) / ppm);
}