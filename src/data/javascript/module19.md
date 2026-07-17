## Closure

JavaScript permite escribir una función dentro de una función externa. Podemos escribir tantas funciones internas como queramos. Si la función interna accede a las variables de la función externa entonces se llama closure (clausura).

Técnicamente, una clausura es una función que agrupa o "encierra" tanto su propio código interno como su **Entorno Léxico** (Lexical Scope). El ámbito léxico significa que el acceso a las variables está determinado por el lugar FÍSICO (la posición en el código fuente) donde fue declarada la función, independientemente de dónde o quién la invoque después. Gracias a esto, una función "recuerda" las variables de su ámbito exterior incluso después de que esa función externa haya terminado de ejecutarse y retornado.

```js
function outerFunction() {
  let count = 0;
  function innerFunction() {
    count++;
    return count;
  }

  return innerFunction;
}
const innerFunc = outerFunction();

console.log(innerFunc());
console.log(innerFunc());
console.log(innerFunc());
```

---


```sh
1
2
3
```

Como podemos observar, al ejecutar `innerFunc()` múltiples veces, la variable `count` se mantiene viva y se incrementa (1, luego 2, luego 3). Además, si creáramos una nueva instancia llamando a `const otraFunc = outerFunction();`, esta empezaría de nuevo en 1. Cada invocación a la función madre genera un NUEVO ámbito (Scope) completamente aislado e independiente del anterior.

Veamos más ejemplos de funciones internas

```js
function outerFunction() {
  let count = 0;
  function plusOne() {
    count++;
    return count;
  }
  function minusOne() {
    count--;
    return count;
  }

  return {
    plusOne: plusOne(),
    minusOne: minusOne(),
  };
}
const innerFuncs = outerFunction();

console.log(innerFuncs.plusOne);
console.log(innerFuncs.minusOne);
```

---


```sh
1
0
```

Este enfoque es la base del **Patrón Módulo** (o Patrón de Encapsulamiento). Históricamente, antes de los campos privados (`#`) en clases, las closures eran la única forma de simular métodos y variables verdaderamente privadas retornando un objeto que exponga únicamente los métodos públicos. Esto soluciona el grave problema de las variables globales (Namespace Pollution), evitando que sean reasignadas accidentalmente desde el exterior. Estas variables encapsuladas quedan completamente selladas en memoria; no es posible inspeccionarlas directamente por código, siendo tu única oportunidad de verlas usar las Herramientas de Desarrollo (DevTools) en la sección "Scope".

### Closures sin retorno explícito
No es obligatorio retornar explícitamente una función (`return function() {}`) para formar una clausura. Si una función interior muta o se adhiere a una variable externa (por ejemplo, un manejador de eventos adjuntado a un botón en el DOM, o un `setTimeout`), se está formando igualmente una clausura viva que protege su entorno.

### El problema del bucle asíncrono
Un clásico fallo en entrevistas ocurre al usar un bucle `for` asíncrono en ES5: `for(var i=0; i<3; i++) { setTimeout(() => console.log(i), 100); }`. Esto imprimirá `3, 3, 3` porque `var` tiene ámbito global o de función; cuando los timeouts se ejecutan, el bucle ya terminó y la variable mutó a 3. La solución moderna y limpia es cambiar `var` por `let`. Como `let` tiene Scope de Bloque, fuerza al motor a crear y aislar un closure silencioso e independiente para cada paso del bucle, imprimiendo correctamente `0, 1, 2`.

### Currying y Partial Application
Los closures son extremadamente útiles en Programación Funcional para técnicas como el **Currying** (Currificación). En lugar de tomar todos los argumentos a la vez, una función toma el primero y devuelve una nueva función (closure) pre-configurada que toma el segundo (ej. `const doble = multiplicador(2); doble(5);`). Por otro lado, la **Aplicación Parcial** (Partial Application) es similar, pero toma algunos argumentos iniciales (más de uno) y devuelve una función que toma el resto.

### Closures y el contexto `this`
Un problema común al usar closures es la pérdida del contexto `this`. Si tienes un objeto con un método que retorna una función regular (ej. `return function() { console.log(this.id); }`), al ejecutarla de forma aislada imprimirá `undefined`. Esto ocurre porque el `this` en funciones regulares es dinámico y pertenece a quien invoca la función; las funciones de Closure NO arrastran el contexto `this` por defecto. La solución moderna es usar una **Arrow Function** (`return () => console.log(this.id)`), ya que las flechas no tienen `this` propio y respetan el ámbito léxico de su padre.

### Peligros: Fugas de Memoria (Memory Leaks)
Aunque los closures son poderosos, pueden ser peligrosos si no se usan con responsabilidad. Si creas closures muy grandes y complejos que referencian arrays inmensos o nodos DOM innecesariamente, se generan fugas de memoria (Memory Leaks). Como el closure retiene el entorno léxico de por vida, el recolector de basura (Garbage Collector) no puede destruir esos recursos ni limpiar la memoria, lo que puede saturar la aplicación.