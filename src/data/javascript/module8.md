## Scope (alcance)

La variable es la parte fundamental en la programación. Declaramos variables para almacenar diferentes tipos de datos. Para declarar una variable usamos la palabra clave _var_, _let_, y _const_. Una variable puede declararse en diferentes scope. En esta sección, veremos el alcance de las variables, el alcance de las variables cuando usamos var o let.
El scope de las variables pueden ser:

- Global
- Local

Las variables pueden ser declaradas con un scope global o local. Veremos tanto el scope global como el local. Cualquier cosa declarada sin let, var o const tiene un alcance global.

Imaginemos que tenemos un fichero scope.js.


---

### Objeto Global Window

Sin usar console.log() abre tu navegador y comprueba, verás el valor de a y b si escribes a o b en el navegador. Eso significa que a y b ya están disponibles en window

```js
//scope.js
a = "JavaScript"; // declarar una variable sin let o const la hace disponible en el objeto window y esta se encuentra en cualquier lugar
b = 10; // es una variable de scope global y se encuentra en el objeto ventana
function letsLearnScope() {
  console.log(a, b);
  if (true) {
    console.log(a, b);
  }
}
console.log(a, b); // accesibles
```


---

### Global scope

Una variable declarada globalmente puede ser accedida en cualquier lugar del mismo archivo. Pero el término global es relativo. Puede ser global al archivo o puede ser global relativo a algún bloque de códigos.

```js
//scope.js
let a = "JavaScript"; // es un scope global que se encontrará en cualquier parte de este archivo
let b = 10; // es un scope global que se encontrará en cualquier parte de este archivo
function letsLearnScope() {
  console.log(a, b); // JavaScript 10, accesible
  if (true) {
    let a = "Python";
    let b = 100;
    console.log(a, b); // Python 100
  }
  console.log(a, b);
}
letsLearnScope();
console.log(a, b); // JavaScript 10, accesible
```

---


### Local scope

Una variable declarada como local sólo puede ser accedida en determinados bloques de código.

- Scope del bloque
- Scope de la función

```js
//scope.js
let a = "JavaScript"; // es un scope global que se encontrará en cualquier parte de este archivo
let b = 10; // es un scope global que se encontrará en cualquier parte de este archivo
// Scope de la función
function letsLearnScope() {
  console.log(a, b); // JavaScript 10, accesible
  let value = false;
  // Scope del bloque
  if (true) {
    // podemos acceder desde la función y fuera de la función pero
    // las variables declaradas dentro del if no serán accesibles fuera del bloque if
    let a = "Python";
    let b = 20;
    let c = 30;
    let d = 40;
    value = !value;
    console.log(a, b, c, value); // Python 20 30 true
  }
  // no podemos acceder a c porque el scope de c es sólo el bloque if
  console.log(a, b, value); // JavaScript 10 true
}
letsLearnScope();
console.log(a, b); // JavaScript 10, accesible
```

---


Ahora, usted tiene una comprensión del scope. Una variable declarada con _var_ sólo tiene ámbito de función, pero una variable declarada con _let_ o _const_ tiene scope de bloque (bloque de función, bloque if, bloque de bucle, etc). El bloque en JavaScript es un código entre dos llaves({}).

```js
//scope.js
function letsLearnScope() {
  var gravity = 9.81;
  console.log(gravity);
}
// console.log(gravity), Uncaught ReferenceError: la gravedad no está definida

if (true) {
  var gravity = 9.81;
  console.log(gravity); // 9.81
}
console.log(gravity); // 9.81

for (var i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
console.log(i); // 3
```

---


En ES6 y superiores existe _let_ y _const_, por lo que no sufrirás la insidia de _var_. Cuando usamos _let_ nuestra variable tiene alcance de bloque y no infectara otras partes de nuestro código.

```js
//scope.js
function letsLearnScope() {
  // puedes usar let o const, pero la gravedad es constante prefiero usar const
  const gravity = 9.81;
  console.log(gravity);
}
// console.log(gravity), Uncaught ReferenceError: la gravedad no está definida

if (true) {
  const gravity = 9.81;
  console.log(gravity); // 9.81
}
// console.log(gravity), Uncaught ReferenceError: la gravedad no está definida

for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
// console.log(i), Uncaught ReferenceError: i no está definida
```

---


El ámbito _let_ y _const_ es el mismo. La diferencia es sólo la reasignación. No podemos cambiar o reasignar el valor de la variable `const`. Te sugiero encarecidamente que utilices _let_ y _const_, utilizando _let_ y _const_ escribirás un código limpio y evitarás errores difíciles de depurar. Como regla general, puedes usar _let_ para cualquier valor que cambie, _const_ para cualquier valor constante, y para un array, objeto, función de flecha y expresión de función.

##

---

## 💻 Ejercicios Prácticos (Objetos)

**Consigna 1:** Crea un objeto vacío llamado `dog` y agrégale las propiedades `name`, `legs`, `color` y `age`.
**[Solución]**
```javascript
const dog = {};
dog.name = 'Firulais';
dog.legs = 4;
dog.color = 'Marrón';
dog.age = 3;
console.log(dog);
```

**Consigna 2:** Añade un método `bark` al objeto `dog` que retorne 'woof woof'. Invócalo y muestra el resultado en consola.
**[Solución]**
```javascript
dog.bark = function() {
  return 'woof woof';
};
console.log(dog.bark()); // woof woof
```

**Consigna 3:** Encuentra todas las claves (keys) y valores (values) del objeto `dog` utilizando los métodos de la clase `Object`.
**[Solución]**
```javascript
const claves = Object.keys(dog);
const valores = Object.values(dog);

console.log('Claves:', claves); // ['name', 'legs', 'color', 'age', 'bark']
console.log('Valores:', valores); // ['Firulais', 4, 'Marrón', 3, ƒ()]
```
