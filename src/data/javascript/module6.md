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

---


### Bucle while

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

Usamos el bucle for of para arrays. Es una forma muy práctica de iterar a través de un array, si no estamos interesados en el index de cada elemento del array.

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

### break

Break se utiliza para interrumpir un bucle.

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

Usamos la palabra clave _continue_ para omitir ciertas iteraciones.

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
