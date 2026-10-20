// FASE 5 · Pruebas de las funciones

// Aquí se guarda el resultado de cada prueba
const resultadosPruebas = [];

// Compara dos valores. Los arrays se comparan por su contenido.
function sonIguales(obtenido, esperado) {
  if (Array.isArray(obtenido) && Array.isArray(esperado)) {
    return JSON.stringify(obtenido) === JSON.stringify(esperado);
  }
  return obtenido === esperado;
}

// Para escribir los valores de forma legible en los mensajes
function verValor(valor) {
  if (typeof valor === "string" || Array.isArray(valor)) {
    return JSON.stringify(valor);
  }
  return String(valor);
}

// Ejecuta una prueba: compara lo obtenido con lo esperado y guarda el resultado
function probar(descripcion, obtenido, esperado) {
  const paso = sonIguales(obtenido, esperado);
  console.assert(
    paso,
    "FALLA: " + descripcion +
      " | obtenido: " + verValor(obtenido) +
      " | esperado: " + verValor(esperado)
  );
  resultadosPruebas.push({ descripcion, obtenido, esperado, paso });
}

// Repite una comprobación varias veces. Devuelve true solo si pasa todas.
function todasVerdaderas(veces, comprobacion) {
  for (let i = 0; i < veces; i++) {
    if (!comprobacion()) {
      return false;
    }
  }
  return true;
}

// ---------- 1 · IVA y descuentos ----------

function pruebasIVA() {
  probar("calcularIVA(100) usa el 21 % por defecto", calcularIVA(100), 21);
  probar("calcularIVA(100, 10)", calcularIVA(100, 10), 10);
  probar("calcularIVA(0) con precio 0", calcularIVA(0), 0);

  probar("precioConIVA(50, 10)", precioConIVA(50, 10), 55);
  probar("precioConIVA(0) con precio 0", precioConIVA(0), 0);

  probar("aplicarDescuento(80, 25)", aplicarDescuento(80, 25), 60);
  probar("aplicarDescuento(80, 0) sin descuento", aplicarDescuento(80, 0), 80);
  probar("aplicarDescuento(80, 100) descuento total", aplicarDescuento(80, 100), 0);

  probar("redondear(2.567)", redondear(2.567), 2.57);
  probar("redondear(2.5, 0)", redondear(2.5, 0), 3);
  probar("redondear(1.005) el caso difícil", redondear(1.005), 1.01);

  probar("formatearEuros(1234.5)", formatearEuros(1234.5), "1234,50 €");
  probar("formatearEuros(0)", formatearEuros(0), "0,00 €");
}

// ---------- 2 · Temperaturas ----------

function pruebasTemperaturas() {
  probar("celsiusAFahrenheit(100)", celsiusAFahrenheit(100), 212);
  probar("fahrenheitACelsius(32)", fahrenheitACelsius(32), 0);
  probar("convertirTemperatura(100, C, F)", convertirTemperatura(100, "C", "F"), 212);
  probar("convertirTemperatura(25, C, C) unidades iguales", convertirTemperatura(25, "C", "C"), 25);
  probar("-40 °C son -40 °F (límite)", convertirTemperatura(-40, "C", "F"), -40);
  probar("-40 °F son -40 °C (límite)", convertirTemperatura(-40, "F", "C"), -40);
  probar("convertirTemperatura(0, C, F) cero", convertirTemperatura(0, "C", "F"), 32);
}

// ---------- 3 · Validador de contraseñas ----------

function pruebasValidador() {
  probar("longitudSuficiente de 7 caracteres", longitudSuficiente("1234567"), false);
  probar("longitudSuficiente de 8 caracteres", longitudSuficiente("12345678"), true);
  probar("longitudSuficiente de texto vacío", longitudSuficiente(""), false);

  probar("tieneMayuscula(abc)", tieneMayuscula("abc"), false);
  probar("tieneMayuscula(aBc)", tieneMayuscula("aBc"), true);
  probar("tieneMayuscula de texto vacío", tieneMayuscula(""), false);

  probar("tieneMinuscula(ABC)", tieneMinuscula("ABC"), false);
  probar("tieneMinuscula(aBC)", tieneMinuscula("aBC"), true);

  probar("tieneNumero(abc)", tieneNumero("abc"), false);
  probar("tieneNumero(abc1)", tieneNumero("abc1"), true);
  probar("tieneNumero de texto vacío", tieneNumero(""), false);

  probar("evaluarContrasena(Abcdefg1)", evaluarContrasena("Abcdefg1"), "fuerte");
  probar("evaluarContrasena(Abcdefgh)", evaluarContrasena("Abcdefgh"), "media");
  probar("evaluarContrasena(abc)", evaluarContrasena("abc"), "débil");
  probar("evaluarContrasena de texto vacío", evaluarContrasena(""), "débil");
}

// ---------- 4 · Generador de contraseñas ----------

function pruebasGenerador() {
  probar(
    "numeroAleatorio(1, 6) siempre en rango (20 veces)",
    todasVerdaderas(20, () => {
      const n = numeroAleatorio(1, 6);
      return Number.isInteger(n) && n >= 1 && n <= 6;
    }),
    true
  );
  probar("numeroAleatorio(3, 3) mismo min y max", numeroAleatorio(3, 3), 3);

  probar(
    "caracterAleatorio(abc) devuelve uno de abc (20 veces)",
    todasVerdaderas(20, () => "abc".includes(caracterAleatorio("abc"))),
    true
  );

  probar(
    "generarContrasena(12) tiene 12 caracteres (20 veces)",
    todasVerdaderas(20, () => generarContrasena(12).length === 12),
    true
  );
  probar("generarContrasena(6) longitud mínima", generarContrasena(6).length, 6);
  probar("generarContrasena(30) longitud máxima", generarContrasena(30).length, 30);
  probar("generarContrasena(3) demasiado corta", generarContrasena(3), null);
  probar("generarContrasena(31) demasiado larga", generarContrasena(31), null);
  probar("generarContrasena(7.5) no es entero", generarContrasena(7.5), null);
  probar(
    "generarContrasena sin mayúsculas (20 veces)",
    todasVerdaderas(20, () => !tieneMayuscula(generarContrasena(30, { mayusculas: false }))),
    true
  );
  probar(
    "generarContrasena sin números (20 veces)",
    todasVerdaderas(20, () => !tieneNumero(generarContrasena(30, { numeros: false }))),
    true
  );
}

// ---------- 5 · Contador de palabras ----------

function pruebasPalabras() {
  probar("palabras(hola mundo)", palabras("hola mundo"), ["hola", "mundo"]);
  probar(
    "palabras con espacios repetidos y salto de línea",
    palabras("  hola   mundo \n adiós "),
    ["hola", "mundo", "adiós"]
  );
  probar("palabras de texto vacío", palabras(""), []);

  probar("contarPalabras(hola mundo)", contarPalabras("hola mundo"), 2);
  probar("contarPalabras de texto vacío", contarPalabras(""), 0);

  probar("contarCaracteres(a b c) con espacios", contarCaracteres("a b c"), 5);
  probar("contarCaracteres(a b c, false) sin espacios", contarCaracteres("a b c", false), 3);

  probar("palabraMasLarga(El perro rápido)", palabraMasLarga("El perro rápido"), "rápido");
  probar("palabraMasLarga de texto vacío", palabraMasLarga(""), "");

  probar("minutosLectura(hola)", minutosLectura("hola"), 1);
  probar("minutosLectura de texto vacío", minutosLectura(""), 0);
  probar("minutosLectura de 200 palabras", minutosLectura("a ".repeat(200)), 1);
  probar("minutosLectura de 201 palabras", minutosLectura("a ".repeat(201)), 2);
}

// ---------- esNumeroValido (Fase 4) ----------

function pruebasNumeroValido() {
  probar("esNumeroValido(12)", esNumeroValido("12"), true);
  probar("esNumeroValido(-3.5)", esNumeroValido("-3.5"), true);
  probar("esNumeroValido de texto vacío", esNumeroValido(""), false);
  probar("esNumeroValido de solo espacios", esNumeroValido("   "), false);
  probar("esNumeroValido(12px)", esNumeroValido("12px"), false);
}

// ---------- Ejecutar todo y mostrarlo en la página ----------

function ejecutarPruebas() {
  resultadosPruebas.length = 0;

  pruebasIVA();
  pruebasTemperaturas();
  pruebasValidador();
  pruebasGenerador();
  pruebasPalabras();
  pruebasNumeroValido();

  const total = resultadosPruebas.length;
  const fallos = resultadosPruebas.filter((prueba) => !prueba.paso);
  const pasan = total - fallos.length;

  console.table(resultadosPruebas);

  if (fallos.length === 0) {
    mostrarResultado("resultado-pruebas", "✓ Pasan " + pasan + " de " + total + " pruebas.");
    return;
  }

  const detalle = fallos.map(
    (f) =>
      "✗ " + f.descripcion +
      " (obtenido: " + verValor(f.obtenido) +
      ", esperado: " + verValor(f.esperado) + ")"
  );
  mostrarError(
    "resultado-pruebas",
    "Pasan " + pasan + " de " + total + ". Fallan " + fallos.length + ":\n" + detalle.join("\n")
  );
}

document.getElementById("btn-pruebas").addEventListener("click", ejecutarPruebas);