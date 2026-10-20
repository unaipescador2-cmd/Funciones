# Notas · Taller de funciones

## Fase 1 · Funciones predefinidas

| Línea | Mi predicción | Resultado | Tipo (typeof) |
|-------|---------------|-----------|---------------|
| 1. `parseInt("42")` | Convertira un número que está como string a número | 42 | number |
| 2. `parseInt("12px")` | Convertira el número de string a entero | 12 | number |
| 3. `parseInt("px12")` | Fallara porque antes del número hay un string | NaN | number |
| 4. `Number("")` | Devolvera un número | 0 | number |
| 5. `isNaN("")` | Dira si lo que hay dentro del parentesis es o no un número | false | boolean |
| 6. `Math.round(-2.5)` | Redondea el número | -2 | number |
| 7. `"oso".replace("o", "0")` | Reemplaza las o por 0 | "0so" | string |
| 8. `"a,b,c".split(",")` | Quitara las comas | ["a", "b", "c"] | object (es un array) |
| 9. `0.1 + 0.2` | Sumara las cadenas de texto | 0.30000000000000004 | number |
| 10. `(1.005).toFixed(2)` | Redondeara a mas decimales | "1.00" | string |

### Grupos de funciones

- **Convertir:** `parseInt`, `Number`, `toFixed`
- **Comprobar:** `isNaN`
- **Matemáticas:** `Math.round`
- **Texto:** `replace`, `split`
- **3 más que conozco:** `Math.random()`, `toUpperCase()`, `parseFloat()`

### Preguntas

1. **¿Qué da `Number("")`? ¿Por qué es un problema en un formulario?**
   Da `0`, no `NaN`. Si un campo se queda vacío, JavaScript lo trata como el número 0, y el programa cree que el usuario ha escrito un 0 cuando en realidad no ha escrito nada. Hay que comprobar que el campo no esté vacío antes de convertirlo.

2. **¿Qué diferencia hay entre `parseInt("12px")` y `parseInt("px12")`?**
   `parseInt` lee de izquierda a derecha y se para en el primer carácter que no es un número. En `"12px"` lee el 12 y se para en la `p`, así que devuelve 12. En `"px12"` el primer carácter ya no es un número, así que no lee nada y devuelve `NaN`, lo que significa que no es un número

3. **¿Por qué `0.1 + 0.2` no da 0.3? ¿Qué problema crearía en una tienda?**
   Los ordenadores guardan los decimales en binario, y números como 0.1 o 0.2 no se pueden representar de forma exacta, así que el resultado sale con un error minúsculo (0.30000000000000004). En una tienda, al sumar precios podrían salir céntimos de más o de menos, y comparaciones como `total === 0.3` darían `false`.

---
## Fase 2 · Funciones de precios y descuentos
 
### Funciones creadas
 
| Función | Qué hace | Ejemplo probado | Resultado |
|---------|----------|-----------------|-----------|
| `calcularIVA(precio, tipo = 21)` | Devuelve cuánto IVA hay que pagar | `calcularIVA(100)` | 21 |
| `calcularIVA(precio, tipo = 21)` | Con un tipo distinto | `calcularIVA(100, 10)` | 10 |
| `precioConIVA(precio, tipo = 21)` | Devuelve el precio más el IVA (usa `calcularIVA`) | `precioConIVA(50, 10)` | 55 |
| `aplicarDescuento(precio, porcentaje)` | Devuelve el precio tras el descuento | `aplicarDescuento(80, 25)` | 60 |
| `aplicarDescuento(precio, porcentaje)` | Con descuento 0 | `aplicarDescuento(80, 0)` | 80 |
| `redondear(numero, decimales = 2)` | Redondea a los decimales pedidos | `redondear(2.567)` | 2.57 |
| `redondear(numero, decimales = 2)` | Sin decimales | `redondear(2.5, 0)` | 3 |
| `redondear(numero, decimales = 2)` | Caso que falla con `toFixed` | `redondear(1.005)` | 1.01 |
| `formatearEuros(numero)` | Devuelve un texto con dos decimales, coma y € | `formatearEuros(1234.5)` | "1234,50 €" |
 
### Cómo he resuelto `redondear`
 
En la Fase 1 vi que `(1.005).toFixed(2)` da `"1.00"` porque 1.005 no se guarda exacto en binario. Por eso no uso `toFixed` para redondear. Multiplico por `10 ** decimales`, redondeo con `Math.round` y divido de nuevo. Antes de redondear sumo `Number.EPSILON`, el error mínimo de los decimales, para que 1.005 se redondee a 1.01.
 
### Dos pruebas más
 
1. **Función normal y función flecha.** He escrito `aplicarDescuento` de las dos formas:
```js
   function aplicarDescuento(precio, porcentaje) {
     return precio - (precio * porcentaje) / 100;
   }
 
   const aplicarDescuentoFlecha = (precio, porcentaje) =>
     precio - (precio * porcentaje) / 100;
```
   Con `aplicarDescuento(80, 25)` y `aplicarDescuentoFlecha(80, 25)` dan las dos 60. Hacen lo mismo; solo cambia la forma de escribirlas.
 
2. **Copia de `calcularIVA` con `console.log`.** He hecho `calcularIVAConsola`, que muestra el resultado con `console.log` en lugar de usar `return`, y la he usado dentro de `precioConIVAConsola`. Al ejecutar `precioConIVAConsola(50, 10)` la consola muestra un 5, pero la función devuelve `NaN`.
### Preguntas
 
1. **Con un ejemplo de tu código: ¿qué es un parámetro y qué es un argumento?**
   Los parámetros son los nombres que aparecen al definir la función. En `function calcularIVA(precio, tipo = 21)`, `precio` y `tipo` son parámetros. Los argumentos son los valores reales que se pasan al llamarla. En `calcularIVA(100, 10)`, el 100 y el 10 son los argumentos.
2. **¿Cuándo se usa un valor por defecto?**
   Cuando un dato puede no indicarse y existe un valor razonable de reserva. Por ejemplo, el IVA general es del 21 %, así que `tipo = 21` evita tener que escribirlo cada vez. Si llamo a `calcularIVA(100)`, `tipo` vale 21. Si llamo a `calcularIVA(100, 10)`, el valor por defecto se ignora y `tipo` vale 10.
3. **¿Qué pasó con la copia que usaba `console.log`? ¿Por qué?**
   La copia mostraba el resultado en la consola, pero no devolvía nada. `console.log` solo muestra un valor, no lo devuelve. Como la función no tiene `return`, devuelve `undefined`. Al hacer `precio + undefined` dentro de `precioConIVAConsola`, el resultado es `NaN`. Para que otra función pueda usar el resultado de una función, esta tiene que devolverlo con `return`.