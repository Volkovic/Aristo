## Condicionales

Las declaraciones condicionales se utilizan para tomar decisiones basadas en diferentes condiciones. De forma predeterminada, las declaraciones en el script de JavaScript se ejecutan secuencialmente de arriba a abajo. Si la lógica de procesamiento lo requiere, el flujo secuencial de ejecución se puede alterar de dos formas:

- Ejecución condicional: se ejecutará un bloque de una o más sentencias si cierta expresión es true
- Ejecución repetitiva: un bloque de una o más sentencias se ejecutará de forma repetitiva siempre que cierta expresión sea verdadera. En esta sección, cubriremos las declaraciones _if_, _else_ y _else if_. Los operadores lógicos y de comparación que aprendimos en las secciones anteriores serán útiles aquí.

Las condiciones se pueden implementar de las siguientes maneras:

- if
- if else
- if else if else
- switch
- operador ternario

En JavaScript, las condiciones no solo evalúan booleanos estrictos (`true` o `false`), sino también valores conocidos como **Truthy** (verdaderos) y **Falsy** (falsos). Un valor "Truthy" es cualquier valor que, al ser forzado a un contexto booleano (como en un `if`), se evalúa y se comporta como `true`. Los únicos valores "Falsy" en JavaScript son: `false`, `0`, `""` (string vacío), `null`, `undefined` y `NaN`. Cualquier otro valor, incluyendo strings con texto como `'0'` o `'false'`, arreglos vacíos `[]` u objetos `{}`, se evalúa como verdadero. Si aplicas el operador de negación NOT (`!`) a un valor Truthy (por ejemplo `!('false')`), este se invierte y se convierte en el booleano `false`.

Además, al comparar tipos especiales, ten en cuenta que `undefined == null` es verdadero en igualdad débil, pero `undefined === null` se evalúa como `false` porque son de distinto tipo de dato.


---

### If

En JavaScript y otros lenguajes de programación, la palabra clave _if_ se usa para verificar si una condición es true y ejecutar el bloque de código. Para crear una condición if, necesitamos la palabra clave _if_, la condición va dentro de paréntesis y el bloque de código va dentro de llaves ({}). 

Como detalle de sintaxis, si el bloque `if` contiene una única instrucción, las llaves `{}` son opcionales, aunque se recomiendan por claridad. Además, es perfectamente posible anidar una sentencia `if` dentro de otra sentencia `if` sin límite teórico para evaluar condiciones complejas, aunque abusar de esto puede reducir la legibilidad.

```js
// sintaxis
if (condition) {
  //esta parte del código se ejecuta cuando es true
}
```

**Example:**

```js
let num = 3;
if (num > 0) {
  console.log(`${num} es un número positivo`);
}
//  3 es un número positivo
```

Es un error lógico extremadamente común usar un solo signo de igual (`=`) dentro de una condición, como `if (x = 5)`. Esto no compara, sino que **asigna** el valor 5 a `x` y luego evalúa ese valor asignado (que al ser 5, es Truthy), ejecutando siempre el bloque. Para comparar, siempre usa `==` o `===`. Recuerda también que operadores como `>=` (mayor o igual) devolverán `true` si el valor cumple cualquiera de las dos condiciones (por ejemplo, si `edad` es 18, la condición `edad >= 18` es verdadera).

---


Como puede ver en el ejemplo de condición anterior, 3 es mayor que 0, por lo que es un número positivo. La condición era true y se ejecutó el bloque de código. Sin embargo, si la condición es falsa, no veremos ningún resultado.

```js
let isRaining = true;
if (isRaining) {
  console.log("Recuerda llevar tu impermeable.");
}
```

Lo mismo ocurre con la segunda condición, si isRaining es false, el bloque if no se ejecutará y no veremos ninguna respuesta. Para ver el resultado de una condición false, debemos tener otro bloque, que será _else_.


---

### If Else

Si la condición es true, se ejecutará el primer bloque, si no, se ejecutará la condición else.

```js
// sintaxis
if (condition) {
  // esta parte del código se ejecuta para la condición de verdad
} else {
  // esta parte del código se ejecuta para una condición falsa
}
```

```js
let num = 3;
if (num > 0) {
  console.log(`${num} es un número positivo`);
} else {
  console.log(`${num} es un número negativo`);
}
//  3 es un número positivo

num = -3;
if (num > 0) {
  console.log(`${num} es un número positivo`);
} else {
  console.log(`${num} es un número negativo`);
}
//  -3 es un número negativo
```

---


```js
let isRaining = true;
if (isRaining) {
  console.log("Necesitas un impermeable.");
} else {
  console.log("No hay necesidad de un impermeable.");
}
// Necesitas un impermeable.

isRaining = false;
if (isRaining) {
  console.log("Necesitas un impermeable.");
} else {
  console.log("No hay necesidad de un impermeable.");
}
// No hay necesidad de un impermeable.
```

---


La última condición es falsa, por lo que se ejecutó el bloque else. ¿Qué pasa si tenemos más de dos condiciones? En ese caso, usaremos las condiciones _else if_.

### If Else if Else

En nuestra vida, tomamos decisiones diariamente. Tomamos decisiones no comprobando una o dos condiciones, sino que tomamos decisiones basadas en múltiples condiciones. Al igual que nuestra vida diaria, la programación también está llena de condiciones. Usamos _else if_ cuando tenemos múltiples condiciones.

En una declaración `if / else if / else`, la evaluación se realiza de arriba hacia abajo. Solo se ejecuta el bloque de la **primera condición verdadera** que se encuentre. Una vez que una condición se evalúa como verdadera, su bloque se ejecuta y todo el resto de la estructura se salta (se ignora), incluso si se cumplen múltiples condiciones en diferentes ramas.

```js
// sintaxis
if (condition) {
  // código
} else if (condition) {
  // código
} else {
  //  código
}
```

**Ejemplo:**

```js
let a = 0;
if (a > 0) {
  console.log(`${a} es un número positivo`);
} else if (a < 0) {
  console.log(`${a} es un número negativo`);
} else if (a == 0) {
  console.log(`${a} es cero`);
} else {
  console.log(`${a} no es un número`);
}
```

---


```js
// if else if else
let weather = "sunny";
if (weather === "rainy") {
  console.log("Necesitas un impermeable.");
} else if (weather === "cloudy") {
  console.log("Puede que haga frío, necesitas una chaqueta.");
} else if (weather === "sunny") {
  console.log("Sal tranquilo.");
} else {
  console.log("No hay necesidad de un impermeable.");
}
```


---

### Switch

Switch es una alternativa para **if else if else else**.
La instrucción switch comienza con una palabra clave _switch_ seguida de un paréntesis y un bloque de código. Dentro del bloque de código tendremos diferentes casos. El bloque de casos se ejecuta si el valor en el paréntesis de la declaración de cambio coincide con el valor del caso. Internamente, se realiza una **comparación estricta (===)** entre la expresión y los `case`. 

La declaración de break es para terminar la ejecución. Esto para que la ejecución del código se detenga después de que se cumpla la condición. Si te olvidas de colocar la palabra clave `break` al final de un `case` verdadero, se producirá el efecto **"fall-through"**: el código continuará ejecutando las instrucciones de los siguientes casos hacia abajo, independientemente de si sus condiciones se cumplen o no, hasta encontrar un break o terminar el switch. Este comportamiento puede ser útil si deseas agrupar varios 'case' para que ejecuten el mismo código, apilándolos uno debajo de otro sin usar break entre ellos.

El bloque default actúa como un "else": se ejecuta si todos los casos anteriores no cumplen la condición (ningún case coincide).

```js
switch (caseValue) {
  case 1:
    // código
    break;
  case 2:
    // código
    break;
  case 3:
    // código
    break;
  default:
  // código
}
```

---


```js
let weather = "cloudy";
switch (weather) {
  case "rainy":
    console.log("Necesitas un impermeable.");
    break;
  case "cloudy":
    console.log("Puede que haga frío, necesitas una chaqueta.");
    break;
  case "sunny":
    console.log("Sal tranquilo.");
    break;
  default:
    console.log("No hay necesidad de un impermeable.");
}

// Más Ejemplos switch
let dayUserInput = prompt("¿Qué día es hoy?");
let day = dayUserInput.toLowerCase();

switch (day) {
  case "lunes":
    console.log("Hoy es Lunes");
    break;
  case "martes":
    console.log("Hoy es Martes");
    break;
  case "miércoles":
    console.log("Hoy es Miércoles");
    break;
  case "jueves":
    console.log("Hoy es Jueves");
    break;
  case "viernes":
    console.log("Hoy es Viernes");
    break;
  case "sábado":
    console.log("Hoy es Sábado");
    break;
  case "domingo":
    console.log("Hoy es Domingo");
    break;
  default:
    console.log("No es un día de semana.");
}
```

---


// Ejemplos de condiciones en los casos

```js
let num = prompt("Ingrese un número");
switch (true) {
  case num > 0:
    console.log("El número es positivo");
    break;
  case num == 0:
    console.log("El número es cero");
    break;
  case num < 0:
    console.log("El número es negativo");
    break;
  default:
    console.log("El valor ingresado no era un número");
}
```

---


### Operadores Ternarios

Otra forma de escribir condicionales es usando operadores ternarios. Hemos cubierto esto en otras secciones, pero también deberíamos mencionarlo aquí.

```js
let isRaining = true;
isRaining
  ? console.log("Necesitas un impermeable.")
  : console.log("No hay necesidad de un impermeable.");
```

Al usar operadores ternarios, ten cuidado de no crear código redundante (un anti-patrón). Por ejemplo, escribir `let esMayor = edad > 18 ? true : false;` es innecesario, porque la expresión `edad > 18` ya devuelve por sí misma `true` o `false`. Bastaría con hacer directamente la asignación: `let esMayor = edad > 18;`.

---

### Operadores Lógicos y Evaluación de Cortocircuito

Además de usarse en condicionales tradicionales, los operadores lógicos pueden devolver valores directamente mediante la evaluación de cortocircuito (short-circuit evaluation):

- El operador **OR (`||`)** devuelve el primer valor Truthy que encuentra de izquierda a derecha. Si encuentra uno, hace cortocircuito y lo retorna ignorando el resto. Por ejemplo, en `const resultado = false || 'Gatito' || 'Perrito';`, el valor de `resultado` será `'Gatito'`.
- El operador **AND (`&&`)** sigue evaluando de izquierda a derecha mientras los valores sean Truthy. Si todos lo son, devuelve siempre el último valor evaluado. Por ejemplo, en `const resultado = true && 'Gatito' && 'Perrito';`, el valor será `'Perrito'`.

### Encadenamiento Opcional (Optional Chaining)

En JavaScript moderno (ES2020), cuando trabajas con objetos anidados y necesitas acceder a propiedades que podrían no existir, puedes usar el **Encadenamiento Opcional (`?.`)**. Por ejemplo, si quieres ejecutar `console.log(user.profile.age)` pero `user.profile` podría ser `undefined` (lo que arrojaría un error fatal), puedes escribir `user?.profile?.age`. Este operador verifica silenciosamente si la propiedad existe antes de intentar acceder al siguiente nivel; si no existe, devuelve `undefined` de forma elegante y segura.