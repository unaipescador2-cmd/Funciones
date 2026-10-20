// FASE 4 · Conexión de la página con las funciones

// ---------- Utilidades de la página ----------

function mostrarResultado(idSalida, mensaje) {
  const salida = document.getElementById(idSalida);
  salida.textContent = mensaje;
  salida.className = "resultado ok";
}

function mostrarError(idSalida, mensaje) {
  const salida = document.getElementById(idSalida);
  salida.textContent = mensaje;
  salida.className = "resultado error";
}

// Campo opcional: si está vacío devuelve el valor por defecto;
// si no es un número válido devuelve null (señal de error).
function leerNumeroOpcional(texto, porDefecto) {
  if (texto.trim() === "") {
    return porDefecto;
  }
  if (!esNumeroValido(texto)) {
    return null;
  }
  return Number(texto);
}

// ---------- 1 · IVA y descuentos ----------

function manejarIVA() {
  const salida = "resultado-iva";

  // 1. Leer los campos
  const textoPrecio = document.getElementById("iva-precio").value;
  const textoTipo = document.getElementById("iva-tipo").value;
  const textoDescuento = document.getElementById("iva-descuento").value;

  // 2. Comprobar que están bien
  // El precio es obligatorio: vacío NO puede valer 0.
  if (!esNumeroValido(textoPrecio)) {
    mostrarError(salida, "El precio es obligatorio y tiene que ser un número.");
    return;
  }
  const precio = Number(textoPrecio);
  if (precio < 0) {
    mostrarError(salida, "El precio no puede ser negativo.");
    return;
  }

  const tipo = leerNumeroOpcional(textoTipo, 21);
  if (tipo === null || tipo < 0) {
    mostrarError(salida, "El IVA tiene que ser un número igual o mayor que 0.");
    return;
  }

  const descuento = leerNumeroOpcional(textoDescuento, 0);
  if (descuento === null || descuento < 0 || descuento > 100) {
    mostrarError(salida, "El descuento tiene que ser un número entre 0 y 100.");
    return;
  }

  // 3. Calcular con nuestras funciones (primero el descuento, luego el IVA)
  const precioDescontado = aplicarDescuento(precio, descuento);
  const iva = calcularIVA(precioDescontado, tipo);
  const total = precioConIVA(precioDescontado, tipo);

  // 4. Mostrar el resultado
  mostrarResultado(
    salida,
    "Precio con descuento: " + formatearEuros(precioDescontado) + "\n" +
    "IVA (" + tipo + " %): " + formatearEuros(iva) + "\n" +
    "Total a pagar: " + formatearEuros(total)
  );
}

// ---------- 2 · Conversor de temperaturas ----------

function manejarTemperatura() {
  const salida = "resultado-temp";

  // 1. Leer
  const textoValor = document.getElementById("temp-valor").value;
  const de = document.getElementById("temp-de").value;
  const a = document.getElementById("temp-a").value;

  // 2. Comprobar
  if (!esNumeroValido(textoValor)) {
    mostrarError(salida, "Escribe una temperatura válida (un número).");
    return;
  }
  const valor = Number(textoValor);

  // 3. Calcular
  const resultado = convertirTemperatura(valor, de, a);

  // 4. Mostrar
  mostrarResultado(
    salida,
    valor + " °" + de + " = " + redondear(resultado, 2) + " °" + a
  );
}

// ---------- 3 · Validador de contraseñas ----------

function manejarValidador() {
  const salida = "resultado-validar";

  // 1. Leer
  const contrasena = document.getElementById("val-contrasena").value;

  // 2. Comprobar
  if (contrasena === "") {
    mostrarError(salida, "Escribe una contraseña para evaluarla.");
    return;
  }

  // 3. Calcular
  const nivel = evaluarContrasena(contrasena);
  const marca = (cumple) => (cumple ? "✓" : "✗");

  // 4. Mostrar
  mostrarResultado(
    salida,
    "Nivel: " + nivel + "\n" +
    marca(longitudSuficiente(contrasena)) + " 8 caracteres o más\n" +
    marca(tieneMayuscula(contrasena)) + " Alguna mayúscula\n" +
    marca(tieneMinuscula(contrasena)) + " Alguna minúscula\n" +
    marca(tieneNumero(contrasena)) + " Algún número"
  );
}

// ---------- 4 · Generador de contraseñas ----------

function manejarGenerador() {
  const salida = "resultado-generar";

  // 1. Leer
  const textoLongitud = document.getElementById("gen-longitud").value;
  const mayusculas = document.getElementById("gen-mayusculas").checked;
  const numeros = document.getElementById("gen-numeros").checked;

  // 2. Comprobar
  if (!esNumeroValido(textoLongitud)) {
    mostrarError(salida, "La longitud tiene que ser un número.");
    return;
  }

  // 3. Calcular
  const contrasena = generarContrasena(Number(textoLongitud), { mayusculas, numeros });
  if (contrasena === null) {
    mostrarError(salida, "La longitud tiene que ser un número entero entre 6 y 30.");
    return;
  }

  // 4. Mostrar
  mostrarResultado(salida, contrasena);
}

// ---------- 5 · Contador de palabras ----------

function manejarPalabras() {
  const salida = "resultado-palabras";

  // 1. Leer
  const texto = document.getElementById("palabras-texto").value;
  const conEspacios = document.getElementById("palabras-espacios").checked;

  // 2. Comprobar
  if (texto.trim() === "") {
    mostrarError(salida, "Escribe o pega un texto para analizarlo.");
    return;
  }

  // 3. Calcular
  const total = contarPalabras(texto);
  const caracteres = contarCaracteres(texto, conEspacios);
  const masLarga = palabraMasLarga(texto);
  const minutos = minutosLectura(texto);

  // 4. Mostrar
  mostrarResultado(
    salida,
    "Palabras: " + total + "\n" +
    "Caracteres " + (conEspacios ? "(con espacios)" : "(sin espacios)") + ": " + caracteres + "\n" +
    "Palabra más larga: " + masLarga + "\n" +
    "Tiempo de lectura: " + minutos + " min"
  );
}

// ---------- Conectar cada botón con su función ----------

document.getElementById("btn-iva").addEventListener("click", manejarIVA);
document.getElementById("btn-temp").addEventListener("click", manejarTemperatura);
document.getElementById("btn-validar").addEventListener("click", manejarValidador);
document.getElementById("btn-generar").addEventListener("click", manejarGenerador);
document.getElementById("btn-palabras").addEventListener("click", manejarPalabras);