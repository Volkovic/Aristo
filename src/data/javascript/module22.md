## Creando un elemento

Para crear un elemento HTML utilizamos el nombre de la etiqueta. La creación de un elemento HTML mediante JavaScript es muy sencilla y directa. Utilizamos el método _document.createElement()_. El método toma un nombre de etiqueta de elemento HTML como parámetro de cadena.

```js
// sintaxus
document.createElement("tagname");
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model:30 Days Of JavaScript</title>
  </head>

  <body>
    <script>
      let title = document.createElement("h1");
      title.className = "title";
      title.style.fontSize = "24px";
      title.textContent = "Creating HTML element DOM Day 2";

      console.log(title);
    </script>
  </body>
</html>
```

Al manipular elementos recién creados o ya existentes, es crucial entender cómo gestionar sus atributos y estilos. Para las clases, aunque podemos usar `className`, la forma más segura y moderna es utilizar la propiedad `classList`, que provee una excelente API con métodos como `.add()`, `.remove()` y `.toggle()` para manejar las clases de forma segura sin borrar las ya existentes. En cuanto a los estilos en línea dinámicos, JavaScript prohíbe sintácticamente el uso de guiones (ya que es el operador de resta), por lo que todas las propiedades CSS que lleven guion se escriben forzosamente en notación CamelCase (por ejemplo, `elemento.style.fontSize` en lugar de `font-size`).

Para otros atributos, podemos usar el método genérico `elemento.setAttribute('nombre', 'valor')` (útil para inyectar en el HTML subyacente) o acceder directamente a la propiedad del objeto para atributos estándar (ej. `img.src = 'foto.jpg'`). Es importante notar la diferencia fundamental: `setAttribute` modifica el HTML original puro, mientras que la propiedad directa (como `elemento.value` en un input) vive en la memoria viva de JS y lee el estado interactivo real, evitando desincronizaciones. Además, HTML5 introdujo los atributos `data-*` (ej. `data-info="..."`), diseñados estrictamente para darnos una forma legal y limpia de esconder variables secretas o datos serializados en la propia etiqueta, los cuales luego leemos en JS usando la propiedad `dataset`.

---


### Creación de elementos

Para crear múltiples elementos debemos utilizar el bucle. Usando el bucle podemos crear tantos elementos HTML como queramos.
Después de crear el elemento podemos asignar valor a las diferentes propiedades del objeto HTML.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model:30 Days Of JavaScript</title>
  </head>

  <body>
    <script>
      let title;
      for (let i = 0; i < 3; i++) {
        title = document.createElement("h1");
        title.className = "title";
        title.style.fontSize = "24px";
        title.textContent = i;
        console.log(title);
      }
    </script>
  </body>
</html>
```

---


### Añadir un hijo a un elemento padre

Para ver un elemento creado en el documento HTML debemos añadirlo al padre como elemento hijo. Podemos acceder al cuerpo del documento HTML utilizando _document.body_. El _document.body_ soporta el método _appendChild()_. Vea el ejemplo siguiente. El método `appendChild()` toma el nuevo nodo y lo coloca al final de la lista de hijos del nodo padre especificado.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document Object Model:30 Days Of JavaScript</title>
  </head>

  <body>
    <script>
      // creación de múltiples elementos y anexión al elemento padre
      let title;
      for (let i = 0; i < 3; i++) {
        title = document.createElement("h1");
        title.className = "title";
        title.style.fontSize = "24px";
        title.textContent = i;
        document.body.appendChild(title);
      }
    </script>
  </body>
</html>
```

Cuando tu script crea una interfaz gigantesca e inserta una estructura con miles de elementos, hacer `appendChild` uno por uno directamente al DOM es muy lento. Para optimizar esto y hacerlo 100 veces más veloz, puedes armar el árbol de JS y configurar un `document.createDocumentFragment()`. Esto permite hacer todas las operaciones de ensamblaje "Off-Screen" (fuera de la pantalla). Cuando finalmente anclas el fragmento al DOM principal, el navegador invoca un único paso de repintado (Reflow) masivo en vez de miles de repintados separados.

---


### Eliminar un elemento hijo de un nodo padre

Después de crear un HTML, es posible que queramos eliminar uno o varios elementos y podemos utilizar el método _removeChild()_.

**Ejemplo:**

```html
<!DOCTYPE html>
<html>

<head>
    <title>Document Object Model:30 Days Of JavaScript</title>
</head>

<body>
    <h1>Removing child Node</h1>
    <h2>Asabeneh Yetayeh challenges in 2020</h1>
    <ul>
        <li>30DaysOfPython Challenge Done</li>
        <li>30DaysOfJavaScript Challenge Done</li>
        <li>30DaysOfReact Challenge Coming</li>
        <li>30DaysOfFullStack Challenge Coming</li>
        <li>30DaysOfDataAnalysis Challenge Coming</li>
        <li>30DaysOfReactNative Challenge Coming</li>
        <li>30DaysOfMachineLearning Challenge Coming</li>
    </ul>

    <script>
        const ul = document.querySelector('ul')
        const lists = document.querySelectorAll('li')
        for (const list of lists) {
            ul.removeChild(list)

        }
    </script>
</body>

</html>
```

En el pasado debías hacer `padre.removeChild(hijo)` obligatoriamente. Hoy en día, en los navegadores modernos, la API del DOM es más amigable y permite llamar directamente al método `.remove()` sobre el propio elemento que quieres destruir (por ejemplo, `elemento.remove()`).

Al seleccionar elementos para eliminarlos o modificarlos, es vital conocer qué tipo de colección nos devuelve el DOM. Métodos antiguos como `document.getElementsByTagName` o `document.getElementsByClassName` devuelven "Arrays en vivo" (Live Collections) que mutan mágicamente a medida que el DOM cambia por detrás, lo que puede causar bucles infinitos. Por el contrario, `document.querySelectorAll` devuelve una lista estática y predecible (un Snapshot) de los nodos que encontró en ese preciso instante.

---


Como hemos visto en la sección anterior hay una forma mejor de eliminar todos los elementos HTML internos o hijos de un elemento padre utilizando el método _innerHTML_ propiedades. Asignar un string vacío a `innerHTML` es una técnica brutal y rapidísima aceptada para destripar (purgar) visual y estructuralmente miles de hijos de un contenedor simultáneamente.

```html
<!DOCTYPE html>
<html>

<head>
    <title>Document Object Model:30 Days Of JavaScript</title>
</head>

<body>
    <h1>Removing child Node</h1>
    <h2>Asabeneh Yetayeh challenges in 2020</h1>
    <ul>
        <li>30DaysOfPython Challenge Done</li>
        <li>30DaysOfJavaScript Challenge Done</li>
        <li>30DaysOfReact Challenge Coming</li>
        <li>30DaysOfFullStack Challenge Coming</li>
        <li>30DaysOfDataAnalysis Challenge Coming</li>
        <li>30DaysOfReactNative Challenge Coming</li>
        <li>30DaysOfMachineLearning Challenge Coming</li>
    </ul>

    <script>
        const ul = document.querySelector('ul')
        ul.innerHTML = ''
    </script>
</body>

</html>
```

---


El fragmento de código anterior borró todos los elementos hijos.

---

### Conceptos Avanzados del DOM, BOM y Eventos

El punto de entrada global y oficial (la raíz) para acceder a todas las funcionalidades del navegador es el objeto `window`. Este engloba desde el DOM (`window.document`) hasta APIs del Browser Object Model (BOM). Por ejemplo, si queremos redirigir a los usuarios a otra URL por código en la misma ventana, mutamos la propiedad `window.location.href`. Es importante saber que una redirección real aniquila por completo el contexto de ejecución de JavaScript; si el usuario cambia el href o hace click en "Volver Atrás", el navegador aborta y destruye la ejecución en curso de manera catastrófica, por lo que cualquier Promesa HTTP (`fetch`) que estuvieras esperando morirá colgada sin resolverse.

Otra API moderna muy útil del navegador es la del portapapeles. La forma más compatible de copiar texto al portapapeles (Clipboard) del sistema operativo es usando la API asíncrona `navigator.clipboard.writeText('Texto')`, la cual devuelve una Promesa y reemplaza comandos obsoletos.

En cuanto a la geometría de los elementos y animaciones, existe un método mágico llamado `elemento.getBoundingClientRect()`. Este retorna un objeto con datos geométricos milimétricos en vivo (x, y, width, height, top, left) indicando el tamaño real y la posición exacta del elemento en la ventana actual (Viewport), siendo la llave maestra para efectos de scroll o Drag&Drop.

**Manejo de Eventos y Temporizadores**

Cuando trabajamos con eventos en elementos anidados, ocurre un fenómeno conocido como fase de "Bubbling" (Burbujeo). Si tienes varios elementos apilados con eventos de click y haces click en el del centro, los eventos se disparan por defecto desde el origen profundo (el que clickeaste) hacia los contenedores padres (hacia afuera). Aprovechando esto, podemos usar la "Delegación de Eventos": en lugar de asignar un evento distinto a cada elemento de una lista infinita, atamos UN SOLO oyente (EventListener) en el padre supremo para que atrape y gestione todas las burbujas que vienen de sus miles de hijos, ahorrando una cantidad colosal de memoria RAM.

Además de los eventos nativos, podemos utilizar `Custom Events` (Eventos Personalizados). Estos te permiten inventar eventos ficticios (ej: `new CustomEvent('usuarioLogueado')`) y dispararlos (`dispatchEvent`) tú mismo, permitiendo que diferentes partes aisladas de tu código se escuchen y se comuniquen entre sí mediante el patrón Pub/Sub.

Finalmente, al usar temporizadores asíncronos como `setTimeout` o `setInterval`, es crítico saber que estos devuelven un ID numérico. Este ID es la única "llave" que te permite luego cancelar, destruir o borrar ese temporizador (usando `clearTimeout(id)` o `clearInterval(id)`) para que no se ejecute eternamente como un virus zombi en memoria, previniendo fugas de memoria cuando la interfaz cambia o se desmonta.