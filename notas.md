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