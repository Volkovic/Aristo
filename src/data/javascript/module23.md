## Event Listeners

Eventos HTML comunes: onclick, onchange, onmouseover, onmouseout, onkeydown, onkeyup, onload.
Podemos añadir el método **event_listener** (escuchador de eventos) a cualquier objeto DOM. Utilizamos el método **_addEventListener()_** para escuchar diferentes tipos de eventos en los elementos HTML. El método _addEventListener()_ toma dos argumentos, un event listener y una función callback.

El método `addEventListener(tipo, callback)` es el estándar actual en JavaScript. A diferencia de asignar eventos directamente (como sobrescribir la propiedad `onclick = function`), `addEventListener` permite agregar múltiples "oyentes" del mismo tipo al mismo elemento sin pisarse entre sí.

Al escuchar un evento, el navegador inyecta automáticamente un **Objeto de Evento (`e`)** al callback. Este objeto está cargado con información útil sobre el evento disparado, como las coordenadas exactas del click (`e.clientX`), la tecla presionada (`e.key` o `e.code`), o el elemento objetivo (`e.target`).

**Propagación y Prevención de Eventos:**
- **Event Bubbling (Propagación):** Por defecto, casi todos los eventos en el DOM tienen una fase de burbuja. Esto significa que si haces click en un botón dentro de un div, el evento se dispara primero en el botón, luego "burbujea" hacia el div, y luego sigue subiendo hacia el document. Puedes detener esto usando `e.stopPropagation()`.
- **Prevent Default:** Muchos elementos tienen comportamientos nativos. Por ejemplo, si tienes un formulario (form) en HTML y escuchas el evento `submit`, la página se recargará automáticamente al enviarlo. Para evitar esto y manejar los datos con JS, debes usar `e.preventDefault()`, lo cual bloquea el comportamiento nativo y por defecto del navegador.

```js
selectedElement.addEventListener("eventlistner", function (e) {
  // la actividad que quieres que ocurra después del evento estará aquí
});
// or

selectedElement.addEventListener("eventlistner", (e) => {
  // la actividad que quieres que ocurra después del evento estará aquí
});
```


---

#### Click

Para adjuntar un event listener a un elemento, primero seleccionamos el elemento y luego adjuntamos el método addEventListener. El event listener toma como argumento el tipo de evento y las funciones de callback.

El siguiente es un ejemplo de evento de tipo click.

**Ejemplo: click**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model</title>
  </head>

  <body>
    <button>Click Me</button>

    <script>
      const button = document.querySelector("button");
      button.addEventListener("click", (e) => {
        console.log("e gives the event listener object:", e);
        console.log("e.target gives the selected element: ", e.target);
        console.log(
          "e.target.textContent gives content of selected element: ",
          e.target.textContent
        );
      });
    </script>
  </body>
</html>
```

---


También se puede adjuntar un evento directamente al elemento HTML como script en línea.

**Ejemplo: onclick**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model</title>
  </head>

  <body>
    <button onclick="clickMe()">Click Me</button>
    <script>
      const clickMe = () => {
        alert("We can attach event on HTML element");
      };
    </script>
  </body>
</html>
```

---


#### Doble Click

Para adjuntar un event listener a un elemento, primero seleccionamos el elemento y luego adjuntamos el método addEventListener. El event listener toma como argumento el tipo de evento y las funciones de callback.

El siguiente es un ejemplo de evento de tipo click.

**Ejemplo: dblclick**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model</title>
  </head>

  <body>
    <button>Click Me</button>
    <script>
      const button = document.querySelector("button");
      button.addEventListener("dblclick", (e) => {
        console.log("e gives the event listener object:", e);
        console.log("e.target gives the selected element: ", e.target);
        console.log(
          "e.target.textContent gives content of selected element: ",
          e.target.textContent
        );
      });
    </script>
  </body>
</html>
```

---


#### Mouse enter

Para adjuntar un event listener a un elemento, primero seleccionamos el elemento y luego adjuntamos el método addEventListener. El event listener toma como argumento el tipo de evento y las funciones de callback.

El siguiente es un ejemplo de evento de tipo click.

*Nota:* Si quieres que un elemento cambie temporalmente (por ejemplo, su color de fondo a rojo) solo mientras el ratón del usuario pase (vuele) por encima, y vuelva a su color original cuando el ratón salga, los eventos ideales a usar en JS son `'mouseenter'` (cuando el puntero entra físicamente a la caja del elemento) y `'mouseleave'` (cuando sale). También existen `'mouseover'` y `'mouseout'`. Cabe destacar que el concepto de `'hover'` es exclusivo de CSS y no existe como evento JS puro.

**Ejemplo: mouseenter**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model</title>
  </head>

  <body>
    <button>Click Me</button>
    <script>
      const button = document.querySelector("button");
      button.addEventListener("mouseenter", (e) => {
        console.log("e gives the event listener object:", e);
        console.log("e.target gives the selected element: ", e.target);
        console.log(
          "e.target.textContent gives content of selected element: ",
          e.target.textContent
        );
      });
    </script>
  </body>
</html>
```

---


A estas alturas ya estás familiarizado con el método addEventListen y cómo añadir un event listener. Hay muchos tipos de event listeners. Pero en este reto nos centraremos en los eventos importantes más comunes.

Lista de eventos:

- click - cuando se hace click en el elemento
- dblclick - cuando se hace doble click en el elemento
- mouseenter - cuando el punto del mouse ingresa al elemento
- mouseleave - cuando el puntero del mouse abandona el elemento
- mousemove - cuando el puntero del mouse se mueve sobre el elemento
- mouseover - cuando el puntero del mouse se mueve sobre el elemento
- mouseout - cuando el puntero del mouse sale del elemento
- input - cuando el valor entra en el input de entrada
- change - cuando el valor cambia en el input de entrada
- blur - cuando el elemento no está enfocado
- keydown - cuando una tecla está pulsada
- keyup - cuando una tecla está levantada
- keypress - cuando pulsamos cualquier tecla
- onload - cuando el navegador ha terminado de cargar una página

---


Pruebe los tipos de eventos anteriores sustituyendo el tipo de evento en el fragmento de código anterior.

### Obtener el valor de un elemento input

Normalmente rellenamos formularios y los formularios aceptan datos. Los campos de los formularios se crean utilizando el elemento HTML input. Vamos a construir una pequeña aplicación que nos permita calcular el índice de masa corporal de una persona utilizando dos campos de entrada, un botón y una etiqueta p.

### valor de entrada

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model:30 Days Of JavaScript</title>
  </head>

  <body>
    <h1>Body Mass Index Calculator</h1>

    <input type="text" id="mass" placeholder="Mass in Kilogram" />
    <input type="text" id="height" placeholder="Height in meters" />
    <button>Calculate BMI</button>

    <script>
      const mass = document.querySelector("#mass");
      const height = document.querySelector("#height");
      const button = document.querySelector("button");

      let bmi;
      button.addEventListener("click", () => {
        bmi = mass.value / height.value ** 2;
        alert(`your bmi is ${bmi.toFixed(2)}`);
        console.log(bmi);
      });
    </script>
  </body>
</html>
```

---


#### evento de entrada y cambio

En el ejemplo anterior, hemos conseguido obtener los valores de entrada de dos campos de entrada haciendo click en el botón. Qué tal si queremos obtener el valor sin hacer click en el botón. Podemos utilizar el tipo de evento _change_ o _input_ para obtener los datos inmediatamente del campo de entrada cuando el campo está en el foco. Veamos cómo lo haremos.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model:30 Days Of JavaScript</title>
  </head>

  <body>
    <h1>Data Binding using input or change event</h1>

    <input type="text" placeholder="say something" />
    <p></p>

    <script>
      const input = document.querySelector("input");
      const p = document.querySelector("p");

      input.addEventListener("input", (e) => {
        p.textContent = e.target.value;
      });
    </script>
  </body>
</html>
```

---


#### evento de desenfoque

A diferencia de _input_ o _change_, el evento _blur_ se produce cuando el campo de entrada no está enfocado.

```js
<!DOCTYPE html>
<html>

<head>
    <title>Document Object Model:30 Days Of JavaScript</title>
</head>

<body>
    <h1>Giving feedback using blur event</h1>

    <input type="text" id="mass" placeholder="say something" />
    <p></p>

    <script>
        const input = document.querySelector('input')
        const p = document.querySelector('p')

        input.addEventListener('blur', (e) => {
            p.textContent = 'Field is required'
            p.style.color = 'red'

        })
    </script>
</body>

</html>
```

---


#### keypress, keydow y keyup

Podemos acceder a todos los números de teclas del teclado utilizando diferentes tipos de event listener. Usemos keypress y obtengamos el keyCode de cada tecla del teclado.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model:30 Days Of JavaScript</title>
  </head>

  <body>
    <h1>Key events: Press any key</h1>

    <script>
      document.body.addEventListener("keypress", (e) => {
        alert(e.keyCode);
      });
    </script>
  </body>
</html>
```

---

---

## El Ecosistema Moderno de JavaScript y el Futuro

A medida que finalizas tu aprendizaje de Vanilla JS, es vital entender el panorama general de JavaScript en la industria actual.

**Más allá del Navegador y Node.js**
Hoy en día, JavaScript se ha vuelto omnipresente. Ya no es exclusivo de navegadores; puede crear Servidores Web backend de alto tráfico, programar scripts de CLI, construir aplicaciones de escritorio (con Electron), y hasta entrenar IA y manipular Robótica. Todo esto fue posible gracias a que en 2009, Ryan Dahl extrajo el **motor V8 Engine** (una bestia compiladora JIT de Google Chrome que leía JS y lo traducía a código de máquina ultrarrápido) y lo embebió dentro de C++ para dar a luz al ecosistema **Node.js**.

Para migrar tus conocimientos síncronos de JS hacia un servidor Node.js que reciba decenas de consultas simultáneas, debes dominar obligatoriamente el **Modelo Asíncrono Non-Blocking I/O (El Event Loop de Node)**. Debes saber cómo delegar Promesas para evitar bloquear el hilo (Thread) principal, permitiendo que tu servidor siga escuchando nuevos usuarios libremente. Históricamente, esto generaba el "Callback Hell" (La Pirámide de la Perdición), pero la sintaxis **`async / await`** (introducida en ES2017) resolvió este problema arquitectónico fundamental, permitiéndote leer o escribir flujos temporales inciertos (HTTP, BD) con la sintaxis plana, estructurada y limpia de un código síncrono imperativo.

**Evolución del Lenguaje y Conceptos Clave**
En el año 2015, JavaScript sufrió su evolución más cataclísmica y salvadora: **ECMAScript 6 (ES6 o ES2015)**. Este conjunto de adiciones nos trajo `let`, `const`, Arrow Functions, Clases, Promesas y Destructuring.
        
A nivel de memoria, de todos los tipos en JS, es crucial recordar que los **tipos primitivos** (Number, String, Boolean, Null, Undefined, Symbol, BigInt) se transmiten (asignan) SIEMPRE "por valor" (creando una copia profunda inmutable e independiente), mientras que los complejos (Objetos y Arrays) pasan "por referencia" (un puntero a la misma zona mutante de la RAM).
        
Otro concepto avanzado vital para entrevistas son los **Closures**. En términos simples, son funciones que están anidadas, donde la función interior hereda mágicamente una "mochila de memoria" (con las variables que existían a su alrededor al nacer) que lleva consigo para siempre, aunque la función creadora ya no exista.

**Herramientas y Frameworks Modernos**
- **TypeScript:** Para futuros proyectos corporativos de mediana y gran escala, un desarrollador debería adoptar TypeScript porque proporciona un sistema de Tipos Estáticos estricto (Static Typing) por encima de JS, atrapando silenciosamente el 80% de los errores y Bugs de ejecución (TypeError) en TIEMPO DE ESCRITURA en tu editor (VS Code), sin que siquiera tengas que ejecutar tu código.
- **React, Vue y el DOM:** Conocer a la perfección el Document Object Model (DOM) de JavaScript Vanilla puro es crítico incluso si vas a trabajar con bibliotecas declarativas. Porque bajo las complejas abstracciones mágicas (Virtual DOM) de todas esas librerías, el único que sigue repintando la pantalla y procesando eventos físicamente en el navegador es el viejo DOM real. Conocer las bases te previene de errores de rendimiento catastróficos. Estas librerías manejan el concepto filosófico **UI = f(State)**: la Pantalla es una función directa y declarativa de su Estado Interno. Si tus variables (Estado) cambian, la UI muta, se destruye y se re-dibuja sola de forma automática para reflejar esos datos.
- **Inmutabilidad (Immutability):** Adoptado firmemente por Redux y React, este principio dicta que al evitar cambiar objetos en el mismo lugar de la memoria y preferir retornar nuevas copias alteradas (priorizando métodos como `.map`, `.filter`