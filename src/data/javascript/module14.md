## Manejo de Errores

JavaScript es un lenguaje de tipado libre. Algunas veces obtendrá un error en tiempo de ejecución cuando intente acceder a una variable no definida o llamar a una función no definida, etc. ¿Qué ocurre si no usas un bloque `try/catch` y se produce un error crítico en tu código JavaScript? Ocurre una excepción no capturada (*Uncaught Exception*) y la ejecución del script se detiene en esa línea. Los errores no manejados bloquean el hilo de ejecución principal, por lo que el resto del script debajo de ese error jamás se ejecutará.

JavaScript, al igual que python o Java, proporciona un mecanismo de gestión de errores para capturar los errores asíncronos o síncronos en tiempo de ejecución y evitar que el programa colapse mediante la estructura del bloque try-catch-finally.

```js
try {
  // código que puede arrojar un error
} catch (err) {
  // código a ejecutar si se produce un error
} finally {
  // código que se ejecutará independientemente de que se produzca un error o no
}
```

**try**: envuelve el código sospechoso que puede arrojar un error en un bloque try. La sentencia try nos permite definir un bloque de código para que se compruebe si hay errores mientras se ejecuta.

**catch**: escribe código para hacer algo en el bloque catch cuando se produce un error. El bloque catch puede tener parámetros que le darán información sobre el error. El bloque Catch se utiliza para registrar un error o mostrar mensajes específicos al usuario. Desde ES2019, puedes omitir el parámetro de error en el bloque catch (una característica llamada *Optional Catch Binding*), lo que permite escribir `try { ... } catch { console.log('Falló'); }` si no vas a usar el objeto del error. Sin embargo, la mejor práctica general dicta que atrapar errores genéricos `catch (e)` y luego ignorarlos por completo sin imprimir nada es un anti-patrón brutal llamado *"Swallowing Errors"* (Tragarse los Errores). Esto oculta problemas graves de lógica y vuelve el programa indepurable.

**finally**: El bloque finally se ejecutará siempre, independientemente de que se produzca un error en el try o no. El bloque finally puede utilizarse para completar la tarea restante (como cerrar conexiones o esconder un spinner de carga) o para restablecer las variables que puedan haber cambiado antes de que se produzca el error en el bloque try. Es importante destacar que puedes tener un bloque `try` acompañado de un bloque `finally` SIN incluir un bloque `catch`. Es sintácticamente válido: el try se ejecuta, el finally limpia recursos, y luego si hubo un error, este sube "burbujeando" sin ser atrapado. Además, si hay una instrucción `return` dentro del bloque `try`, y existe un bloque `finally`, el motor pausa el return, ejecuta todo el bloque finally y luego continúa devolviendo el valor del return original.

**Example:**

---


```js
try {
  let lastName = "Yetayeh";
  let fullName = fistName + " " + lastName;
} catch (err) {
  console.log(err);
}
```

```sh
ReferenceError: fistName no está definido
    at <anonymous>:4:20
```

```js
try {
  let lastName = "Yetayeh";
  let fullName = fistName + " " + lastName;
} catch (err) {
  console.error(err); // podemos utilizar console.log() o console.error()
} finally {
  console.log("In any case I will be executed");
}
```

---


```sh
ReferenceError: fistName no está definido
    at <anonymous>:4:20
En cualquier caso se ejecutará
```

El bloque de captura toma un parámetro. Es habitual pasar e, err o error como parámetro al bloque catch. Este parámetro es un objeto Error que contiene propiedades valiosas y tiene las claves nombre y mensaje. Utilicemos el nombre y el mensaje. Además de estas, la propiedad `e.stack` de un objeto de Error atrapado en un catch contiene el rastro en texto plano detallando la secuencia de funciones que fueron invocadas en memoria hasta que ocurrió el quiebre (el *stack trace*).

```js
try {
  let lastName = "Yetayeh";
  let fullName = fistName + " " + lastName;
} catch (err) {
  console.log("Name of the error", err.name);
  console.log("Error message", err.message);
} finally {
  console.log("In any case I will be executed");
}
```

---


```sh
Name of the error ReferenceError
Error message fistName is not defined
In any case I will be executed
```

¿Qué ocurre si dentro del bloque `catch` decides arrojar OTRO error usando `throw`? El nuevo error se eleva (*re-throwing*) hacia la siguiente función en la pila de llamadas que tenga su propio bloque try/catch. Si no existe, el programa falla.

throw: la sentencia throw nos permite crear o lanzar un error deliberadamente para que sea atrapado por un bloque catch. Podemos pasar una cadena, un número, un booleano o un objeto. Utilice la sentencia throw para lanzar una excepción. Cuando se lanza una excepción, la expresión especifica el valor de la excepción. Cada una de las siguientes acciones lanza una excepción:

```js
throw "Error2"; // genera una excepción con un valor de cadena
throw 42; // genera una excepción con el valor 42
throw true; // genera una excepción con el valor true
throw new Error("Required"); // genera un objeto de error con el mensaje de Requerido
```

Si deseas crear tu propio tipo de error personalizado (ej: `ValidationError`) para distinguirlo de los errores comunes, el mejor enfoque es definir una clase que herede de Error: `class ValidationError extends Error { ... }` y arrojar instancias de esa clase. Esto garantiza que heredarás características vitales del motor de JS, como la captura de la pila de llamadas.

```js
const throwErrorExampleFun = () => {
  let message;
  let x = prompt("Enter a number: ");
  try {
    if (x == "") throw "empty";
    if (isNaN(x)) throw "not a number";
    x = Number(x);
    if (x < 5) throw "too low";
    if (x > 10) throw "too high";
  } catch (err) {
    console.log(err);
  }
};
throwErrorExampleFun();
```

---

### Errores Asíncronos y Globales

Si tienes un bloque `try { setTimeout(() => { throw new Error('Boom'); }, 1000) } catch(e) { }`, el catch NO atrapará este error. Esto se debe a que las funciones asíncronas basadas en callbacks como setTimeout se envían a la Web API y luego regresan a la Pila de Ejecución mucho después de que el bloque try/catch original ya terminó de ejecutarse. Para solucionar este problema y atrapar errores de operaciones asíncronas modernas como peticiones a la red (`fetch`), usas el método encadenado `.catch()` de las Promesas, o utilizas `try/catch` envolviendo a una expresión con `await` dentro de una función asíncrona. Si usas callbacks antiguos, metes el try/catch directamente adentro del callback.

Por otro lado, si un error de JavaScript no es atrapado por ningún bloque catch en toda la aplicación, se dispara el evento global `window.onerror` en el Navegador (`window`). Esta es la última barrera de defensa y se usa en producción para enviar telemetría (logs) al servidor cuando la app crashea.

### Tipo de Error

- ReferenceError: Se ha producido una referencia ilegal. Se lanza un ReferenceError si utilizamos una variable que no ha sido declarada. Se refiere a que estás intentando referenciar o usar una variable que no existe en la memoria o no está en el ámbito actual.

```js
let firstName = "Asabeneh";
let fullName = firstName + " " + lastName;

console.log(fullName);
```

```sh
Uncaught ReferenceError: lastName is not defined
    at <anonymous>:2:35
```

- SyntaxError: Se ha producido un error de sintaxis. ¿Puede un bloque `try...catch` capturar un error de SINTAXIS como olvidar cerrar una llave `}`? No. Si el código tiene un error de sintaxis grave, el motor falla durante la fase de parseo/compilación, por lo que el bloque try ni siquiera llega a ejecutarse.

```js
let square = 2 x 2
console.log(square)

console.log('Hello, world")
```

---


```sh
Uncaught SyntaxError: Unexpected identifier
```

- TypeError: Se ha producido un error sobre el tipo. Ocurre normalmente cuando intentas realizar una operación sobre un valor que no es del tipo esperado (ej: invocar como función a algo que es un string: `'Hola'()`).

```js
let num = 10;
console.log(num.toLowerCase());
```

```sh
Uncaught TypeError: num.toLowerCase is not a function
    at <anonymous>:2:17
```

- RangeError: Si tu código sufre de un error RangeError (fuera de rango), típicamente fue provocado porque se produjo una recursión infinita (*Maximum call stack size exceeded*) o se intentó pasarle un parámetro numérico erróneo a una función (ej: un array con tamaño negativo).

Estos son algunos de los errores más comunes a los que te puedes enfrentar cuando escribes un código. Entender los errores puede ayudarte a saber qué errores has cometido y te ayudará a depurar tu código rápidamente.