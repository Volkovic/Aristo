## Métodos del Objeto Console

En esta sección, trataremos sobre console y los métodos de los objetos console. Los principiantes generalmente no saben cuál usar: console.log(), document.write() o document.getElementById.

Usamos métodos de objetos console para mostrar la salida en la consola del navegador y usamos document.write para mostrar la salida en el documento del navegador (view port). Ambos métodos se utilizan únicamente con fines de prueba y depuración. El método console es la herramienta de prueba y depuración más popular en el navegador. Usamos document.getElementById() cuando queremos interactuar con el DOM usando JavaScript. Trataremos el tema del DOM en otra sección.

Técnicamente, el objeto `console` no es parte del estándar estricto del lenguaje JavaScript (ECMAScript). Es una Web API provista por el entorno anfitrión (como el objeto `window` o `globalThis` en el navegador, o globalmente en Node.js). 

Es importante destacar que dejar métodos `console.log()` esparcidos en el código de Producción (Production) es una mala práctica. Los logs ensucian la consola del cliente final, pueden filtrar indirectamente estructuras de datos sensibles o causar leves problemas de rendimiento (Memory Leaks). Generalmente, en el paso de construcción (Build), herramientas como Webpack o Vite están configuradas para eliminar todos los console.log automáticamente.

Además del famoso método console.log(), console proporciona otros métodos más.

### console.log()

Usamos console.log() para mostrar la salida en la consola del navegador. Podemos sustituir valores y también podemos estilizar la salida del registro usando %c. 

La forma más sencilla de imprimir múltiples variables en un solo `console.log` es pasarlas separadas por comas (ej. `console.log(var1, var2)`). El navegador las imprimirá automáticamente con un espacio de separación entre ellas, preservando sus colores y tipos originales. En la consola de navegadores como Chrome, el color de salida tiene un significado: los strings suelen imprimirse en negro o blanco, mientras que los primitivos como números y booleanos se imprimen en azul o púrpura. Esta distinción visual es crucial para depurar problemas de coerción de tipos, permitiéndote ver a simple vista si tu variable es un '1' (String) o un 1 (Number).

- Mostrando la salida en la consola del navegador

```js
console.log("30 Days of JavaScript");
```

```sh
30 Days of JavaScript
```

- Sustitución

Esta es una característica antigua heredada de lenguajes como C. Antes de los Template Literals, el uso de tokens como `%s` (String), `%d` o `%i` (Integer) y `%o` (Object) era la forma clásica de formatear cadenas inyectando valores.

```js
console.log("%d %s of JavaScript", 30, "Days");
```

---


```sh
30 Days of JavaScript
```

- CSS

Podemos darle estilo al mensaje de registro usando css. Copia el siguiente código y pégalo en la consola del navegador para ver el resultado. El identificador de formato `%c` le indica al navegador que aplique las reglas CSS suministradas en el segundo argumento al texto que sigue.

```js
console.log("%c30 Days Of JavaScript", "color:green"); // la salida del registro es verde
console.log(
  "%c30 Days%c %cOf%c %cJavaScript%c",
  "color:green",
  "",
  "color:red",
  "",
  "color:yellow"
); // salida del registro texto verde rojo y amarillo
```

---


### console.warn()

Usamos console.warn() para dar avisos en el navegador. Por ejemplo para informar o avisar de la depreciación de la versión de un paquete o de malas prácticas. Imprime advertencias, usualmente en color amarillo y con un ícono de precaución, pero no detienen el hilo de ejecución. Copia el siguiente código y pégalo en la consola del navegador para ver los mensajes de advertencia.

```js
console.warn("This is a warning");
console.warn(
  "You are using React. Do not touch the DOM. Virtual DOM will take care of handling the DOM!"
);
console.warn("Warning is different from error");
```


---

### console.error()

El método console.error() muestra un mensaje de error.

```js
console.error("This is an error message");
console.error("We all make mistakes");
```


---

### console.dir()

Mientras que `console.log()` imprime la representación en cadena o HTML de un elemento, `console.dir()` imprime el elemento explícitamente como un objeto interactivo. Esto es una herramienta de inspección vital. Por ejemplo, al hacer `console.dir(document.body)`, en lugar de imprimir la representación HTML, te permite navegar por todas sus propiedades internas y métodos ocultos de JavaScript. Junto con `console.table()`, es ideal para visualizar propiedades puntuales de objetos o JSON enormes como un árbol explorable.

---

### console.table()

El método console.table() muestra los datos como una tabla en la consola. Muestra los datos en forma de tabla, formateando automáticamente la salida en una grilla tabular muy fácil de leer en lugar de objetos anidados. El método console.table() toma un argumento requerido data, que debe ser un array o un objeto, y un parámetro adicional opcional columns.

Empecemos con un simple array. El código siguiente muestra una tabla con dos columnas. Una columna índice para mostrar el índice y una columna valor para mostrar los nombres

```js
const names = ["Asabeneh", "Brook", "David", "John"];
console.table(names);
```

Comprobemos también el resultado de un objeto. Esto crea una tabla con dos columnas: una columna índice que contiene las claves y una columna valor que contiene los valores del objeto.

```js
const user = {
  name: "Asabeneh",
  title: "Programmer",
  country: "Finland",
  city: "Helsinki",
  age: 250,
};
console.table(user);
```

---


Comprueba el resto de los ejemplos copiando y pegando en la consola del navegador.

```js
const countries = [
  ["Finland", "Helsinki"],
  ["Sweden", "Stockholm"],
  ["Norway", "Oslo"],
];
console.table(countries);
```

```js
const users = [
  {
    name: "Asabeneh",
    title: "Programmer",
    country: "Finland",
    city: "Helsinki",
    age: 250,
  },
  {
    name: "Eyob",
    title: "Teacher",
    country: "Sweden",
    city: "London",
    age: 25,
  },
  {
    name: "Asab",
    title: "Instructor",
    country: "Norway",
    city: "Oslo",
    age: 22,
  },
  {
    name: "Matias",
    title: "Developer",
    country: "Denmark",
    city: "Copenhagen",
    age: 28,
  },
];
console.table(users);
```

---


### console.time()

Inicia un temporizador que se puede utilizar para controlar el tiempo que dura una operación (por ejemplo, medir exactamente cuántos milisegundos tarda en ejecutarse un bucle). Puedes dar a cada temporizador un nombre único, y puedes tener hasta 10.000 temporizadores funcionando en una página determinada. Cuando llame a console.timeEnd() con el mismo nombre, el navegador mostrará el tiempo, en milisegundos, que ha transcurrido desde que se inició el temporizador. Es obligatorio que la etiqueta de texto coincida exactamente entre ambos métodos, ya que puedes tener decenas de temporizadores corriendo al mismo tiempo de forma paralela y el nombre es la única forma que tiene JS de emparejarlos.

```js
const countries = [
  ["Finland", "Helsinki"],
  ["Sweden", "Stockholm"],
  ["Norway", "Oslo"],
];

console.time("Regular for loop");
for (let i = 0; i < countries.length; i++) {
  console.log(countries[i][0], countries[i][1]);
}
console.timeEnd("Regular for loop");

console.time("for of loop");
for (const [name, city] of countries) {
  console.log(name, city);
}
console.timeEnd("for of loop");

console.time("forEach loop");
countries.forEach(([name, city]) => {
  console.log(name, city);
});
console.timeEnd("forEach loop");
```

---


```sh
Finland Helsinki
Sweden Stockholm
Norway Oslo
Regular for loop: 0.34716796875ms
Finland Helsinki
Sweden Stockholm
Norway Oslo
for of loop: 0.26806640625ms
Finland Helsinki
Sweden Stockholm
Norway Oslo
forEach loop: 0.358154296875ms
```

De acuerdo con la salida anterior, el bucle for regular es más lento que el bucle for of o forEach.


---

### console.info()

Muestra un mensaje de información en la consola del navegador. Técnicamente, `console.info()` y `console.log()` son idénticos en casi todos los navegadores modernos (a veces `info()` añade un pequeño ícono 'i' de información). Sin embargo, semánticamente se usan para diferentes niveles (Log Levels) de severidad al depurar.

```js
console.info("30 Days Of JavaScript challenge is trending on Github");
console.info("30 Days Of fullStack challenge might be released");
console.info("30 Days Of HTML and CSS challenge might be released");
```


---

### console.assert()

El método console.assert() escribe un mensaje de error en la consola si la afirmación es falsa. Si la afirmación es verdadera, no pasa nada (permanece silencioso). El primer parámetro es una expresión de aserción. Si esta expresión es falsa, se mostrará un mensaje de error de aserción fallida.

```js
console.assert(4 > 3, "4 is greater than 3"); // no hay resultado
console.assert(3 > 4, "3 is not greater than 4"); // Aserción fallida: 3 no es mayor que 4

for (let i = 0; i <= 10; i += 1) {
  let errorMessage = `${i} is not even`;
  console.log("the # is " + i);
  console.assert(i % 2 === 0, { number: i, errorMessage: errorMessage });
}
```


---

### console.trace()

El método `console.trace()` imprime la pila de llamadas (stack trace) en la consola. Esto es fundamental para depurar porque te muestra exactamente qué funciones llamaron a qué otras funciones hasta llegar a la línea exacta donde pusiste el `console.trace()`, revelando cómo el programa llegó a ese punto.

---

### console.group()

El console.group() puede ayudar a agrupar diferentes grupos de registro visualmente bajo un bloque indentado y colapsable en la consola del navegador, lo cual ayuda a limpiar consolas muy ruidosas. Copie el siguiente código y péguelo en la consola del navegador para los grupos.

Si deseas agrupar logs pero que su contenido inicie "cerrado" para ahorrar espacio en pantalla, puedes usar `console.groupCollapsed('Detalles')`. A diferencia de `console.group()` puro, `groupCollapsed()` es ideal para ocultar grandes volcados de datos (dumps) hasta que el usuario decida expandirlos haciendo click. Ambos métodos se cierran llamando a `console.groupEnd()`.

```js
const names = ["Asabeneh", "Brook", "David", "John"];
const countries = [
  ["Finland", "Helsinki"],
  ["Sweden", "Stockholm"],
  ["Norway", "Oslo"],
];
const user = {
  name: "Asabeneh",
  title: "Programmer",
  country: "Finland",
  city: "Helsinki",
  age: 250,
};
const users = [
  {
    name: "Asabeneh",
    title: "Programmer",
    country: "Finland",
    city: "Helsinki",
    age: 250,
  },
  {
    name: "Eyob",
    title: "Teacher",
    country: "Sweden",
    city: "London",
    age: 25,
  },
  {
    name: "Asab",
    title: "Instructor",
    country: "Norway",
    city: "Oslo",
    age: 22,
  },
  {
    name: "Matias",
    title: "Developer",
    country: "Denmark",
    city: "Copenhagen",
    age: 28,
  },
];

console.group("Names");
console.log(names);
console.groupEnd();

console.group("Countries");
console.log(countries);
console.groupEnd();

console.group("Users");
console.log(user);
console.log(users);
console.groupEnd();
```

---


### console.count()

Imprime el número de veces que se llama a console.count(). Toma un parámetro de etiqueta de cadena. Es muy útil para contar el número de veces que se llama a una función o cuántas veces se pasa por un bloque de código, ahorrándote crear una variable contador manual. En el siguiente ejemplo, el método console.count() se ejecutará tres veces.

Si necesitas reiniciar este contador a cero, puedes utilizar el método `console.countReset('Etiqueta')` pasando la misma etiqueta que usaste en `count()`.

```js
const func = () => {
  console.count("Function has been called");
};
func();
func();
func();
```

```sh
Function has been called: 1
Function has been called: 2
Function has been called: 3
```


---

### console.clear()

El console.clear() limpia todo el registro histórico de la consola del navegador. Es muy útil si estás corriendo un bucle muy ruidoso y necesitas borrar toda la salida anterior.