## Bucles

La mayoría de las actividades que hacemos en la vida están llenas de repeticiones. Imagina que tienes que imprimir de 0 a 100 usando console.log(). Para implementar esta simple tarea, puede tomar de 2 a 5 minutos, este tipo de tarea tediosa y repetitiva se puede llevar a cabo usando un bucle. Si prefieres ver los videos, puedes revisar el [video tutorials](https://www.youtube.com/channel/UCM4xOopkYiPwJqyKsSqL9mw)

En los lenguajes de programación para realizar tareas repetitivas utilizamos diferentes tipos de bucles. Los siguientes ejemplos son los bucles de uso común en JavaScript y otros lenguajes de programación.

### Bucle for

```js
// Estructura del bucle for
for(inicialización, condición, incremento/decremento){
  // el código va aquí
}
```

Es importante entender el orden de ejecución en esta estructura: la inicialización ocurre una sola vez al principio, la condición se evalúa antes de cada vuelta, y el **incremento/decremento se ejecuta siempre al final de cada iteración**, justo después de ejecutar el bloque de código interno y antes de volver a evaluar la condición.

Además, la sintaxis del bucle `for` es sumamente expresiva y flexible. Puedes declarar múltiples variables separadas por comas en la inicialización (ej. `for(let i = 0, j = 10; i < 10; i++, j--)`). Incluso puedes omitir las tres partes para crear un bucle infinito válido sintácticamente: `for (;;) { }`. 

Históricamente, si usas `var` en lugar de `let` para declarar el contador (ej. `for (var i = 0; i < 3; i++)`), ocurre una peculiaridad: la variable sobrevive (se "filtra") fuera del bucle porque `var` tiene ámbito de función, no de bloque. Hoy en día, siempre se recomienda usar `let` para evitar contaminar el entorno.

```js
for (let i = 0; i <= 5; i++) {
  console.log(i);
}

// 0 1 2 3 4 5
```

---


```js
for (let i = 5; i >= 0; i--) {
  console.log(i);
}

// 5 4 3 2 1 0
```

```js
for (let i = 0; i <= 5; i++) {
  console.log(`${i} * ${i} = ${i * i}`);
}
```

```sh
0 * 0 = 0
1 * 1 = 1
2 * 2 = 4
3 * 3 = 9
4 * 4 = 16
5 * 5 = 25
```

---


```js
const countries = ["Finland", "Sweden", "Denmark", "Norway", "Iceland"];
const newArr = [];
for (let i = 0; i < countries.length; i++) {
  newArr.push(countries[i].toUpperCase());
}

// ["FINLAND", "SWEDEN", "DENMARK", "NORWAY", "ICELAND"]
```

Agregar todos los elementos en un array

```js
const numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum = sum + numbers[i]; // can be shorten, sum += numbers[i]
}

console.log(sum); // 15
```

---


Crea un nuevo array basado en el array existente

```js
const numbers = [1, 2, 3, 4, 5];
const newArr = [];
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  newArr.push(numbers[i] ** 2);
}

console.log(newArr); // [1, 4, 9, 16, 25]
```

```js
const countries = ["Finland", "Sweden", "Norway", "Denmark", "Iceland"];
const newArr = [];
for (let i = 0; i < countries.length; i++) {
  newArr.push(countries[i].toUpperCase());
}

console.log(newArr); // ["FINLAND", "SWEDEN", "NORWAY", "DENMARK", "ICELAND"]
```

**Bucles anidados y Matrices**
Para recorrer estructuras de datos más complejas, como matrices (arrays multidimensionales o arrays de arrays, ej: `[[1, 2], [3, 4]]`), se utilizan bucles anidados (un bucle dentro de otro bucle). En un escenario de dos bucles anidados (ej. `for (let i=0; i<3; i++) { for (let j=0; j<3; j++) { ... } }`), el bucle interior se ejecuta por completo en cada vuelta del exterior. En este caso, matemáticamente se ejecutaría 9 veces en total (3 x 3).

Si utilizas la sentencia `break` en el bucle interior, se rompe ÚNICAMENTE ese bucle interior, y la ejecución retorna al bucle exterior para seguir su próxima vuelta. Para romper ambos bucles a la vez desde adentro, JavaScript permite el uso de **Labels (Etiquetas)**. Puedes nombrar un bloque de código y usarlo junto a break (ej: `break miBucleExterno;`).

---


### Bucle while

En un bucle `while`, la condición se evalúa ANTES de entrar al bloque. Si la condición evalúa inicialmente a `false`, el bloque de código interior jamás se ejecuta. Un error muy común en este tipo de bucles (que causa típicamente un bucle infinito fatal) es olvidar escribir la lógica dentro del bloque que hace avanzar el contador o modifica la condición para que eventualmente sea falsa (ej: olvidar el `i++`).

```js
let i = 0;
while (i <= 5) {
  console.log(i);
  i++;
}

// 0 1 2 3 4 5
```


---

### Bucle do while

La principal diferencia entre un bucle `while` y un bucle `do while` es que este último evalúa la condición al final. Esto asegura que el bloque de código se ejecute obligatoriamente al menos una vez, aunque la condición sea falsa desde el principio.

```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i <= 5);

// 0 1 2 3 4 5
```


---

### Bucle for of

Usamos el bucle for of para arrays. Es una forma muy práctica e ideal (introducida en ES6) de iterar a través de un array u otro elemento iterable obteniendo directamente sus valores, si no estamos interesados en el index de cada elemento del array.

Además de los arrays, los Strings en JavaScript también implementan el protocolo Iterable. Por lo tanto, sí se puede iterar un String con el bucle `for...of`, el cual iterará sobre cada uno de los caracteres del string (uno por uno).

Ten en cuenta que al iterar sobre valores primitivos con `for...of`, la variable iteradora recibe una copia del valor. Si intentas modificarla (ej. `for (let n of nums) { n += 5; }`), el array original NO será mutado ni modificado.

```js
for (const element of arr) {
  // el código va aquí
}
```

```js
const numbers = [1, 2, 3, 4, 5];

for (const num of numbers) {
  console.log(num);
}

// 1 2 3 4 5

for (const num of numbers) {
  console.log(num * num);
}

// 1 4 9 16 25

// sumando todos los números del array
let sum = 0;
for (const num of numbers) {
  sum = sum + num;
  // también se puede acortar así, sum += num
  // después de esto usaremos la sintaxis más corta (+=, -=, *=, /= etc)
}
console.log(sum); // 15

const webTechs = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "MongoDB",
];

for (const tech of webTechs) {
  console.log(tech.toUpperCase());
}

// HTML CSS JAVASCRIPT REACT NODE MONGODB

for (const tech of webTechs) {
  console.log(tech[0]); // obtiene solo la primera letra de cada elemento,  H C J R N M
}
```

---


```js
const countries = ["Finland", "Sweden", "Norway", "Denmark", "Iceland"];
const newArr = [];
for (const country of countries) {
  newArr.push(country.toUpperCase());
}

console.log(newArr); // ["FINLAND", "SWEDEN", "NORWAY", "DENMARK", "ICELAND"]
```


---

### Bucle for in

Mientras que `for...of` itera sobre valores, el bucle `for...in` está diseñado específicamente para iterar (recorrer) sobre las propiedades (claves/índices) de un Objeto literal.

```js
const obj = { a: 1, b: 2 };
for (const x in obj) {
  console.log(x);
}
```

En la primera iteración del ejemplo anterior, la variable `x` toma el valor de la CLAVE en formato string (`'a'`), no el valor numérico (`1`).

**Nota importante:** NO es recomendable usar `for...in` para iterar Arrays convencionales. Esto se debe a que itera sobre todas las propiedades enumerables (incluso las heredadas o inyectadas manualmente en el prototipo del Array por alguna librería), además de que el orden de iteración no está garantizado.

---

### break

Break se utiliza para interrumpir un bucle. Es la palabra clave que utilizas para detener forzosamente y SALIR de un bucle antes de que alcance su límite natural.

```js
for (let i = 0; i <= 5; i++) {
  if (i == 3) {
    break;
  }
  console.log(i);
}

// 0 1 2
```

El código anterior se detiene si se encuentran 3 en el proceso de iteración.


---

### continue

Usamos la palabra clave _continue_ para omitir ciertas iteraciones. A diferencia de `break`, `continue` sirve para saltarse la iteración actual y pasar inmediatamente a la siguiente iteración (forzando al bucle a saltar al incremento y a la siguiente evaluación).

```js
for (let i = 0; i <= 5; i++) {
  if (i == 3) {
    continue;
  }
  console.log(i);
}

// 0 1 2 4 5
```

---

## 💻 Ejercicios Prácticos (Bucles)

**Consigna 1:** Usa un bucle `for` para iterar desde 0 hasta 10 e imprimir la suma de todos los números.
**[Solución]**
```javascript
let sum = 0;
for (let i = 0; i <= 10; i++) {
  sum += i;
}
console.log(`La suma de todos los números de 0 a 10 es ${sum}`); // 55
```

**Consigna 2:** Usa un bucle `while` para imprimir los números pares del 0 al 10.
**[Solución]**
```javascript
let j = 0;
while (j <= 10) {
  if (j % 2 === 0) {
    console.log(j); // Imprime 0, 2, 4, 6, 8, 10
  }
  j++;
}
```

**Consigna 3:** Itera sobre un array de frutas `['manzana', 'banana', 'naranja']` usando el bucle `for...of` e imprime cada fruta en mayúsculas.
**[Solución]**
```javascript
const frutas = ['manzana', 'banana', 'naranja'];
for (const fruta of frutas) {
  console.log(fruta.toUpperCase());
}
// MANZANA
// BANANA
// NARANJA
```