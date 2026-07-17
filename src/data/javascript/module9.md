## Función De Orden Superior

Las funciones de orden superior son funciones que toman otra función como parámetro o retorna una función como valor. La función que se pasa como parámetro se llama callback.

### Callback

Un callback es una función que puede ser pasada como parámetro a otra función. Véase el ejemplo siguiente.

Todo el ecosistema de JavaScript se basa fuertemente en las Funciones de Orden Superior. Conceptos clave como el **manejo asíncrono y los Callbacks** (Event Listeners del DOM, Timers como setTimeout, o Promesas) son posibles gracias a que podemos pasar funciones como parámetros para que se ejecuten cuando un evento ocurra o una tarea termine.

```js
// una función callback, el nombre de la función puede ser cualquier nombre
const callback = (n) => {
  return n ** 2
}
​
// función que toma otra función como callback
function cube(callback, n) {
  return callback(n) * n
}
​
console.log(cube(callback, 3))
```

---


### Retornar una función

Las funciones de orden superior retorna la función como valor
​

```js
// Función de orden superior que devuelve otra función
const higherOrder = (n) => {
  const doSomething = (m) => {
    const doWhatEver = (t) => {
      return 2 * n + 3 * m + t;
    };
    return doWhatEver;
  };
  return doSomething;
};
console.log(higherOrder(2)(3)(10));
```

---


Veamos dónde utilizamos las funciones de callback. Por ejemplo, el método _forEach_ utiliza callback.

```js
const numbers = [1, 2, 3, 4, 5];
const sumArray = (arr) => {
  let sum = 0;
  const callback = function (element) {
    sum += element;
  };
  arr.forEach(callback);
  return sum;
};
console.log(sumArray(numbers));
```

```sh
15
```

---


El ejemplo anterior puede simplificarse como el siguiente:

```js
const numbers = [1, 2, 3, 4]
​
const sumArray = arr => {
  let sum = 0
  arr.forEach(function(element) {
    sum += element
  })
  return sum

}
console.log(sumArray(numbers))
```

```sh
15
```

---


### Configuración de tiempo

En JavaScript podemos ejecutar algunas actividades en un determinado intervalo de tiempo o podemos programar (esperar) algún tiempo para ejecutar algunas actividades.

- setInterval
- setTimeout

#### Configuración del intervalo mediante la función setInterval

In JavaScript, we use setInterval higher order function to do some activity continuously with in some interval of time. El método global setInterval toma una función callback y una duración como parámetro. La duración está en milisegundos y la llamada de retorno siempre será llamada en ese intervalo de tiempo.

```js
// sintaxis
function callback() {
  // el código va aquí
}
setInterval(callback, duration);
```

```js
function sayHello() {
  console.log("Hello");
}
setInterval(sayHello, 1000); // imprime hola cada segundo, 1000ms es 1s
```

---


#### Configurar tiempo mediante un setTimeout

En JavaScript, utilizamos la función de orden superior setTimeout para ejecutar alguna acción en algún momento en el futuro. El método global setTimeout toma una función callback y una duración como parámetro. La duración está en milisegundos y el callback espera esa cantidad de tiempo.

```js
// sintaxis
function callback() {
  // el código va aquí
}
setTimeout(callback, duration); // duración en milliseconds
```

```js
function sayHello() {
  console.log("Hello");
}
setTimeout(sayHello, 2000); // imprime hola después de esperar 2 segundos.
```


---

## Programación funcional

En lugar de escribir un bucle regular, la última versión de JavaScript introdujo un montón de métodos incorporados que pueden ayudarnos a resolver problemas complicados.

Instead of writing regular loop, latest version of JavaScript introduced lots of built in methods which can help us to solve complicated problems. Todos los métodos incorporados toman la función callback. En esta sección, veremos _forEach_, _map_, _filter_, _reduce_, _find_, _every_, _some_, y _sort_.

El uso de estos métodos promueve un estilo de programación **declarativa e inmutable**. A diferencia de los bucles `for` tradicionales (imperativos), donde manejamos contadores y mutamos estados, las funciones de orden superior nos permiten enfocarnos en el "qué" hacer y no en el "cómo". Además, métodos como `map` o `filter` nunca modifican (mutan) el array original, sino que generan y devuelven un array completamente nuevo en memoria, lo cual es una ventaja clave para evitar bugs en frameworks modernos como React.

### forEach

_forEach_: Iterar los elementos de un array. Utilizamos _forEach_ sólo con arrays. Toma una función callback con elementos, parámetro de índice y el propio array. El índice y el array son opcionales. A diferencia de `map`, `forEach` no retorna nada (devuelve `undefined`) y se utiliza principalmente para ejecutar efectos secundarios.

```js
arr.forEach(function (element, index, arr) {
  console.log(index, element, arr);
});
// El código anterior puede escribirse utilizando la función de flecha
arr.forEach((element, index, arr) => {
  console.log(index, element, arr);
});
// El código anterior puede escribirse utilizando la función de flecha y return explícito
arr.forEach((element, index, arr) => console.log(index, element, arr));
```

---


```js
let sum = 0;
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => console.log(num));
console.log(sum);
```

```sh
1
2
3
4
5
```

```js
let sum = 0;
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => (sum += num));

console.log(sum);
```

---


```sh
15
```

```js
const countries = ["Finland", "Denmark", "Sweden", "Norway", "Iceland"];
countries.forEach((element) => console.log(element.toUpperCase()));
```

```sh
FINLAND
DENMARK
SWEDEN
NORWAY
ICELAND
```

Es importante destacar que dentro de un `forEach` **no se puede usar `break` ni `continue`**. Si deseas saltar a la siguiente iteración (simulando un `continue`), puedes usar la sentencia `return`. Esto simplemente termina la ejecución de esa instancia del callback en particular, pero no detiene el bucle completo.

---

### map

_map_: Iterar los elementos de un array y modificar los elementos del mismo. Toma una función callback con elementos, índice , parámetro del array y devuelve un nuevo array.

```js
const modifiedArray = arr.map(function (element, index, arr) {
  return element;
});
```

```js
/*Función flecha y return explícito
const modifiedArray = arr.map((element,index) => element);
*/
//Ejemplo
const numbers = [1, 2, 3, 4, 5];
const numbersSquare = numbers.map((num) => num * num);

console.log(numbersSquare);
```

---


```sh
[1, 4, 9, 16, 25]
```

```js
const names = ["Asabeneh", "Mathias", "Elias", "Brook"];
const namesToUpperCase = names.map((name) => name.toUpperCase());
console.log(namesToUpperCase);
```

```sh
['ASABENEH', 'MATHIAS', 'ELIAS', 'BROOK']
```

```js
const countries = [
  "Albania",
  "Bolivia",
  "Canada",
  "Denmark",
  "Ethiopia",
  "Finland",
  "Germany",
  "Hungary",
  "Ireland",
  "Japan",
  "Kenya",
];
const countriesToUpperCase = countries.map((country) => country.toUpperCase());
console.log(countriesToUpperCase);

/*
// Función flecha
const countriesToUpperCase = countries.map((country) => {
  return country.toUpperCase();
})
//Función flecha de return explícita
const countriesToUpperCase = countries.map(country => country.toUpperCase());
*/
```

---


```sh
['ALBANIA', 'BOLIVIA', 'CANADA', 'DENMARK', 'ETHIOPIA', 'FINLAND', 'GERMANY', 'HUNGARY', 'IRELAND', 'JAPAN', 'KENYA']
```

```js
const countriesFirstThreeLetters = countries.map((country) =>
  country.toUpperCase().slice(0, 3)
);
```

```sh
 ["ALB", "BOL", "CAN", "DEN", "ETH", "FIN", "GER", "HUN", "IRE", "JAP", "KEN"]
```

⚠️ **Precaución con `map` y funciones nativas:** Dado que el callback de `map` recibe 3 argumentos (valor, índice, array), pasar funciones nativas directamente puede causar resultados inesperados. El ejemplo clásico es `[10, 20].map(parseInt)`. En lugar de devolver `[10, 20]`, devuelve `[10, NaN]`. Esto ocurre porque `parseInt` recibe el valor como primer argumento y el **índice** de la iteración (0, 1) como segundo argumento (la base numérica o *radix*), rompiendo la conversión matemática en la segunda vuelta.

---

### filter

_Filter_: Filtra los elementos que cumplen las condiciones de filtrado y devuelve un nuevo array.

```js
//Filtrar los países que contienen land
const countriesContainingLand = countries.filter((country) =>
  country.includes("land")
);
console.log(countriesContainingLand);
```

```sh
['Finland', 'Ireland']
```

```js
const countriesEndsByia = countries.filter((country) => country.endsWith("ia"));
console.log(countriesEndsByia);
```

---


```sh
['Albania', 'Bolivia','Ethiopia']
```

```js
const countriesHaveFiveLetters = countries.filter(
  (country) => country.length === 5
);
console.log(countriesHaveFiveLetters);
```

```sh
['Japan', 'Kenya']
```

```js
const scores = [
  { name: "Asabeneh", score: 95 },
  { name: "Lidiya", score: 98 },
  { name: "Mathias", score: 80 },
  { name: "Elias", score: 50 },
  { name: "Martha", score: 85 },
  { name: "John", score: 100 },
];

const scoresGreaterEighty = scores.filter((score) => score.score > 80);
console.log(scoresGreaterEighty);
```

---


```sh
[{name: 'Asabeneh', score: 95}, { name: 'Lidiya', score: 98 },{name: 'Martha', score: 85},{name: 'John', score: 100}]
```

El callback que pasamos a `filter` es obligatorio y típicamente debe devolver un valor booleano (o evaluable como *truthy/falsy*). Un truco muy común y limpio para eliminar todos los valores *falsy* nativos de JavaScript (`0`, `""`, `null`, `undefined`, `false`, `NaN`) de un array es pasar el constructor primitivo directamente: `arr.filter(Boolean)`.

Hablando de valores *falsy*, es común usar operadores lógicos dentro de estos métodos iterativos. Por ejemplo, si aplicas `arr.map(x => x || 'Vacio')` a un array que contiene los 6 valores *falsy* mencionados, el operador `||` evaluará consistentemente a `'Vacio'` en todos los casos.

### Method Chaining (Encadenamiento de Métodos)

Como métodos como `map` y `filter` retornan nuevos arrays, podemos llamar inmediatamente a otro método sobre ese resultado. A este patrón se le conoce como **Method Chaining** (Encadenamiento de Métodos). Permite crear conductos (*pipelines*) declarativos de manipulación de datos de forma muy legible, por ejemplo: `arr.filter(...).map(...).reduce(...)`.

### reduce

_reduce_: Reduce toma una función callback. La función callback toma como parámetro el acumulador, el valor actual y opcional el valor inicial y retorna un único valor. Es una buena práctica definir un valor inicial para el valor del acumulador. Si no especificamos este parámetro, por defecto el acumulador obtendrá el `primer valor` del array y comenzará la iteración desde el segundo elemento. Si nuestro array es un _array vacío_, entonces `Javascript` lanzará un error.

```js
arr.reduce((acc, cur) => {
  // algunas operaciones van aquí antes de devolver un valor
  return;
}, initialValue);
```

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, cur) => acc + cur, 0);

console.log(sum);
```

---


```js
15;
```

### every

_every_: Comprueba si todos los elementos son similares en un aspecto. Devuelve un booleano

```js
const names = ["Asabeneh", "Mathias", "Elias", "Brook"];
const areAllStr = names.every((name) => typeof name === "string"); // ¿Son todas strings?

console.log(areAllStr);
```

```sh
true
```

```js
const bools = [true, true, true, true];
const areAllTrue = bools.every((b) => b === true); // ¿Son todas true?

console.log(areAllTrue); // true
```

---


```sh
true

```

### find

_find_: Retorna el primer elemento que cumple la condición

```js
const ages = [24, 22, 25, 32, 35, 18];
const age = ages.find((age) => age < 20);

console.log(age);
```

```js
18;
```

```js
const names = ["Asabeneh", "Mathias", "Elias", "Brook"];
const result = names.find((name) => name.length > 7);
console.log(result);
```

---


```sh
Asabeneh
```

```js
const scores = [
  { name: "Asabeneh", score: 95 },
  { name: "Mathias", score: 80 },
  { name: "Elias", score: 50 },
  { name: "Martha", score: 85 },
  { name: "John", score: 100 },
];

const score = scores.find((user) => user.score > 80);
console.log(score);
```

```sh
{ name: "Asabeneh", score: 95 }
```

---


### findIndex

_findIndex_: Retorna la posición del primer elemento que cumple la condición. Es el equivalente directo a `indexOf()`, pero en vez de recibir un valor estático, recibe una función condicional (callback) para evaluar, lo cual es ideal para arreglos de objetos.

```js
const names = ["Asabeneh", "Mathias", "Elias", "Brook"];
const ages = [24, 22, 25, 32, 35, 18];

const result = names.findIndex((name) => name.length > 7);
console.log(result); // 0

const age = ages.findIndex((age) => age < 20);
console.log(age); // 5
```


---

### flat y flatMap

_flat_: El método `flat()` aplana estructuras de arrays anidados (bidimensionales o multidimensionales). Por defecto, su nivel de profundidad es 1. Por ejemplo, si queremos transformar un array bidimensional plano como `[[1,2], [3,4]]` en `[1, 2, 3, 4]`, simplemente usamos `arr.flat()`. Existe también `flatMap()`, que combina un `map()` seguido de un `flat()` de profundidad 1.

---

### some

_some_: Comprueba si algunos de los elementos son similares en un aspecto. Retorna un booleano. A diferencia de `every`, `some` verifica si al menos un elemento pasa la prueba y devuelve `true` de inmediato.

```js
const names = ["Asabeneh", "Mathias", "Elias", "Brook"];
const bools = [true, true, true, true];

const areSomeTrue = bools.some((b) => b === true);

console.log(areSomeTrue); //true
```

```