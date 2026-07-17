## Funciones

Hasta ahora hemos visto muchas funciones JavaScript integradas. En esta sección, nos centraremos en las funciones personalizadas. ¿Qué es una función? Antes de comenzar a hacer funciones, comprendamos ¿Qué es una función? y ¿Por qué necesitamos una función?

Una función es un bloque reutilizable de código o declaraciones de programación diseñadas para realizar una determinada tarea.

Una función se declara mediante la palabra clave function seguida de un nombre, seguido de paréntesis (). Un paréntesis puede tomar un parámetro. Si una función toma un parámetro, se llamará con un argumento. Una función también puede tomar un parámetro predeterminado. Para almacenar datos en una función, una función debe devolver ciertos tipos de datos. Para obtener el valor llamamos o invocamos a la función.

La función hace código:

- limpio y fácil de leer
- reutilizable
- fácil de probar

Una función se puede declarar o crear de un par de maneras:

- _Función declarativa_
- _Función de expresión_
- _Función anonima_
- _Función flecha_


---

### Función declarativa

Veamos cómo declaramos una función y cómo llamar a una función.

```js
//declaramos una función sin un parámetro
function functionName() {
  // el código va aquí
}
functionName(); // llamando a la función por su nombre con paréntesis
```


---

### Función sin parámetros y return

La función se puede declarar sin un parámetro.

**Ejemplo:**

```js
// función sin parámetros. La función eleva al cuadrado un número
function square() {
  let num = 2;
  let sq = num * num;
  console.log(sq);
}

square(); // 4

// función sin parámetro
function addTwoNumbers() {
  let numOne = 10;
  let numTwo = 20;
  let sum = numOne + numTwo;

  console.log(sum);
}

addTwoNumbers(); // una función tiene que ser llamada por su nombre para ser ejecutada
```

---


```js
function printFullName() {
  let firstName = "Asabeneh";
  let lastName = "Yetayeh";
  let space = " ";
  let fullName = firstName + space + lastName;
  console.log(fullName);
}

printFullName(); // llamando a una función
```


---

### Función que retorna un valor

La función también puede devolver valores, si una función no devuelve valores, el valor de la función no está definido. Escribamos las funciones anteriores con return. A partir de ahora, retornaremos el valor a una función en lugar de imprimirlo.

```js
function printFullName() {
  let firstName = "Asabeneh";
  let lastName = "Yetayeh";
  let space = " ";
  let fullName = firstName + space + lastName;
  return fullName;
}
console.log(printFullName());
```

```js
function addTwoNumbers() {
  let numOne = 2;
  let numTwo = 3;
  let total = numOne + numTwo;
  return total;
}

console.log(addTwoNumbers());
```

---


### Función con un parámetro

En una función podemos pasar diferentes tipos de datos(number, string, boolean, object, function) como un parámetro.

```js
// función con un parámetro
function functionName(parm1) {
  //el código va aquí
}
functionName(parm1); // durante la llamada o la invocación es necesario un argumento

function areaOfCircle(r) {
  let area = Math.PI * r * r;
  return area;
}

console.log(areaOfCircle(10)); // debe ser llamado con un argumento

function square(number) {
  return number * number;
}

console.log(square(10));
```

---


### Función con dos parámetros

```js
// función con dos parámetros
function functionName(parm1, parm2) {
  //el código va aquí
}
functionName(parm1, parm2); // durante la llamada o invocación se necesitan dos argumentos
// la función sin parámetros no recibe entrada, así que hagamos una función con parámetros
function sumTwoNumbers(numOne, numTwo) {
  let sum = numOne + numTwo;
  console.log(sum);
}
sumTwoNumbers(10, 20); // llamando a la función
// si una función no es retorna esta no almacena datos, por lo que debe retornar

function sumTwoNumbers(numOne, numTwo) {
  let sum = numOne + numTwo;
  return sum;
}

console.log(sumTwoNumbers(10, 20));
function printFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
console.log(printFullName("Asabeneh", "Yetayeh"));
```

---


### Función con muchos parámetros

```js
// función con múltiples parámetros
function functionName(parm1, parm2, parm3,...){
  //el código va aquí
}
functionName(parm1,parm2,parm3,...) // durante la llamada o la invocación necesita tres argumentos


// esta función toma un array como un parámetro y suma los números en el array
function sumArrayValues(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}
const numbers = [1, 2, 3, 4, 5];
    //llamada a la función
console.log(sumArrayValues(numbers));


    const areaOfCircle = (radius) => {
      let area = Math.PI * radius * radius;
      return area;
    }
console.log(areaOfCircle(10))

```

---


### Función con número ilimitado de parámetros

A veces no sabemos cuántos argumentos va a pasar el usuario. Por lo tanto, debemos saber cómo escribir una función que pueda tomar un número ilimitado de argumentos. La forma en que lo hacemos tiene una diferencia significativa entre una función declarativa (función regular) y una función flecha. Veamos ejemplos tanto en la función declarativa como en la función flecha.

#### Número ilimitado de parámetros en una función regular

Una función declarativa proporciona una función con alcance de argumentos array como objeto. Se puede acceder a cualquier cosa que pasemos como argumento en la función desde el objeto de argumentos dentro de las funciones. Veamos un ejemplo

```js
// Accedemos a los argumentos del objeto
​
function sumAllNums() {
 console.log(arguments)
}

sumAllNums(1, 2, 3, 4)
// Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]

```

```js
// declaración
​
function sumAllNums() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}

console.log(sumAllNums(1, 2, 3, 4)) // 10
console.log(sumAllNums(10, 20, 13, 40, 10))  // 93
console.log(sumAllNums(15, 20, 30, 25, 10, 33, 40))  // 173
```

---


#### Número ilimitado de parámetros en una función flecha

La función flecha no tiene el objeto de alcance de los argumentos
Para implementar una función que toma un número ilimitado de argumentos en una función de flecha, usamos el operador de propagación seguido de cualquier nombre de parámetro. Se puede acceder a cualquier elemento que hayamos pasado como argumento en la función como array en la función de flecha. Veamos un ejemplo

```js
// Accedemos a los argumentos del objeto
​
const sumAllNums = (...args) => {
 // console.log(arguments), objeto de argumentos no encontrado en la función flecha
 // en su lugar, usamos un parámetro seguido de un operador de propagación (...)
 console.log(args)
}

sumAllNums(1, 2, 3, 4)
// [1, 2, 3, 4]

```

```js
// declaración
​
const sumAllNums = (...args) => {
  let sum = 0
  for (const element of args) {
    sum += element
  }
  return sum
}

console.log(sumAllNums(1, 2, 3, 4)) // 10
console.log(sumAllNums(10, 20, 13, 40, 10))  // 93
console.log(sumAllNums(15, 20, 30, 25, 10, 33, 40))  // 173
```

---


### Función anónima

Función anónima o sin nombre

```js
const anonymousFun = function () {
  console.log("Soy una función anónima y mi valor se almacena en anonymousFun");
};
```


---

### Función de expresión

Las funciones de expresión son funciones anónimas. Después creamos una función sin nombre y la asignamos a una variable. Para retornar un valor de la función debemos llamar a la variable. Mira el ejemplo de abajo.

```js
// Function expression
const square = function (n) {
  return n * n;
};

console.log(square(2)); // -> 4
```


---

### Función de autoinvocación

Las funciones de autoinvocación son funciones anónimas que no necesitan ser llamadas para devolver un valor.

```js
(function (n) {
  console.log(n * n);
})(2); // 4, pero en lugar de solo imprimir si queremos regresar y almacenar los datos, hacemos lo que se muestra a continuación

let squaredNum = (function (n) {
  return n * n;
})(10);

console.log(squaredNum);
```


---

### Función flecha

La función flecha es una alternativa para escribir una función, sin embargo, la función declarativa y la función flecha tienen algunas diferencias menores.

La función flecha usa una flecha en lugar de la palabra clave _function_ para declarar una función. Veamos tanto la función declarativa como la función flecha.

```js
// Así es como escribimos una función normal o declarativa
// Cambiemos esta función de declarativa a una función flecha
function square(n) {
  return n * n;
}

console.log(square(2)); // 4

const square = (n) => {
  return n * n;
};

console.log(square(2)); // -> 4

// si tenemos solo una línea en el bloque de código, se puede escribir de la siguiente manera, return explícito
const square = (n) => n * n; // -> 4
```

---


```js
const changeToUpperCase = (arr) => {
  const newArr = [];
  for (const element of arr) {
    newArr.push(element.toUpperCase());
  }
  return newArr;
};

const countries = ["Finland", "Sweden", "Norway", "Denmark", "Iceland"];
console.log(changeToUpperCase(countries));

// ["FINLAND", "SWEDEN", "NORWAY", "DENMARK", "ICELAND"]
```

```js
const printFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

console.log(printFullName("Asabeneh", "Yetayeh"));
```

---


La función anterior solo tiene la declaración de return, por lo tanto, podemos retornar explícitamente de la siguiente manera.

```js
const printFullName = (firstName, lastName) => `${firstName} ${lastName}`;

console.log(printFullName("Asabeneh", "Yetayeh"));
```


---

### Función con parámetros por defecto

A veces, pasamos valores predeterminados a los parámetros, cuando invocamos la función, si no pasamos un argumento, se usará el valor predeterminado. Tanto la función declarativa como la función flecha pueden tener un valor o valores predeterminados.

```js
// sintaxis
// Declarando una función
function functionName(param = value) {
  //código
}

// Llamando una función
functionName();
functionName(arg);
```

**Example:**

```js
function greetings(name = "Peter") {
  let message = `${name}, welcome to 30 Days Of JavaScript!`;
  return message;
}

console.log(greetings());
console.log(greetings("Asabeneh"));
```

---


```js
function generateFullName(firstName = "Asabeneh", lastName = "Yetayeh") {
  let space = " ";
  let fullName = firstName + space + lastName;
  return fullName;
}

console.log(generateFullName());
console.log(generateFullName("David", "Smith"));
```

```js
function calculateAge(birthYear, currentYear = 2019) {
  let age = currentYear - birthYear;
  return age;
}

console.log("Age: ", calculateAge(1819));
```

---


```js
function weightOfObject(mass, gravity = 9.81) {
  let weight = mass * gravity + " N"; // el valor tiene que ser cambiado a string primero
  return weight;
}

console.log("Weight of an object in Newton: ", weightOfObject(100)); // 9.81 es la gravedad en la superficie de la tierra
console.log("Weight of an object in Newton: ", weightOfObject(100, 1.62)); // gravedad en la superficie de la luna
```

Veamos cómo escribimos las funciones anteriores con funciones flecha.

```js
// sintaxis
// declarando una función
const functionName = (param = value) => {
  //código
};

// Llamando a la  función
functionName();
functionName(arg);
```

---


**Example:**

```js
const greetings = (name = "Peter") => {
  let message = name + ", welcome to 30 Days Of JavaScript!";
  return message;
};

console.log(greetings());
console.log(greetings("Asabeneh"));
```

```js
const generateFullName = (firstName = "Asabeneh", lastName = "Yetayeh") => {
  let space = " ";
  let fullName = firstName + space + lastName;
  return fullName;
};

console.log(generateFullName());
console.log(generateFullName("David", "Smith"));
```

---


```js
const calculateAge = (birthYear, currentYear = 2019) => currentYear - birthYear;
console.log("Age: ", calculateAge(1819));
```

```js
const weightOfObject = (mass, gravity = 9.81) => mass * gravity + " N";

console.log("Weight of an object in Newton: ", weightOfObject(100)); // 9.81 es la gravedad en la superficie de la tierra
console.log("Weight of an object in Newton: ", weightOfObject(100, 1.62)); // gravedad en la superficie de la luna
```


---

### Función declarativa versus función flecha

Será cubierto en otra sección.

---

## 💻 Ejercicios Prácticos (Funciones)

**Consigna 1:** Escribe una función declarada llamada `areaOfCircle` que tome el radio del círculo y retorne su área.
**[Solución]**
```javascript
function areaOfCircle(r) {
  const PI = Math.PI;
  return PI * r * r;
}
console.log(areaOfCircle(10)); // 314.159...
```

**Consigna 2:** Escribe una función flecha `checkSeason` que tome un mes como parámetro y retorne la estación correspondiente.
**[Solución]**
```javascript
const checkSeason = (month) => {
  const m = month.toLowerCase();
  if (m === 'diciembre' || m === 'enero' || m === 'febrero') return 'Verano';
  if (m === 'marzo' || m === 'abril' || m === 'mayo') return 'Otoño';
  if (m === 'junio' || m === 'julio' || m === 'agosto') return 'Invierno';
  return 'Primavera';
};
console.log(checkSeason('enero')); // Verano
```

**Consigna 3:** Escribe una función anónima asignada a una variable `sumArray` que reciba un array de números como parámetro y retorne la suma de todos sus elementos.
**[Solución]**
```javascript
const sumArray = function(arr) {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum;
};
console.log(sumArray([1, 2, 3, 4, 5])); // 15
```
