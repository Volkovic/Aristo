## DOM (Document Object Model)

El documento HTML está estructurado como un objeto JavaScript. Cada elemento HTML tiene diferentes propiedades que pueden ayudar a manipularlo. Es posible obtener, crear, añadir o eliminar elementos HTML mediante JavaScript. Compruebe los ejemplos siguientes. La selección de elementos HTML mediante JavaScript es similar a la selección mediante CSS. Para seleccionar un elemento HTML, utilizamos el nombre de la etiqueta, el id, el nombre de la clase u otros atributos. Las siglas DOM significan Document Object Model (Modelo de Objetos del Documento), y es una interfaz de programación que representa la página para que los programas puedan cambiar la estructura, estilo y contenido.

### Obtención del elemento

Podemos acceder al elemento o elementos ya creados mediante JavaScript. Para acceder u obtener elementos utilizamos diferentes métodos. El código siguiente tiene cuatro elementos _h1_. Veamos los diferentes métodos para acceder a los elementos _h1_.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document Object Model - (Modelo de objeto de documento)</title>
  </head>
  <body>
    <h1 class="title" id="first-title">First Title</h1>
    <h1 class="title" id="second-title">Second Title</h1>
    <h1 class="title" id="third-title">Third Title</h1>
    <h1></h1>
  </body>
</html>
```

---


#### Obtener elementos por nombre de etiqueta

**_getElementsByTagName()_**:toma un nombre de etiqueta como parámetro de cadena y este método devuelve un objeto HTMLCollection. Una HTMLCollection es un objeto tipo array de elementos HTML. La propiedad length proporciona el tamaño de la colección. Siempre que usamos este método accedemos a los elementos individuales usando el índice o después de hacer un bucle a través de cada elemento individual. Un HTMLCollection no soporta todos los métodos de los arrays, por lo que deberíamos utilizar un bucle for normal en lugar de forEach.

```js
// sintaxis
document.getElementsByTagName("tagname");
```

```js
const allTitles = document.getElementsByTagName("h1");

console.log(allTitles); //HTMLCollections
console.log(allTitles.length); // 4

for (let i = 0; i < allTitles.length; i++) {
  console.log(allTitles[i]); // imprime cada uno de los elementos de la HTMLCollection
}
```


---

#### Obtener elementos por el nombre de la clase

El método **_getElementsByClassName()_** devuelve un objeto HTMLCollection. Una HTMLCollection es una lista tipo array de elementos HTML. La propiedad length proporciona el tamaño de la colección. Es posible realizar un bucle a través de todos los elementos de HTMLCollection. Vea el siguiente ejemplo

```js
//sintaxis
document.getElementsByClassName("classname");
```

```js
const allTitles = document.getElementsByClassName("title");

console.log(allTitles); //HTMLCollections
console.log(allTitles.length); // 4

for (let i = 0; i < allTitles.length; i++) {
  console.log(allTitles[i]); // imprime cada uno de los elementos de la HTMLCollection
}
```


---

#### Obtener un elemento por id

**_getElementsById()_** tiene como objetivo un único elemento HTML. Pasamos el id sin # como argumento. A diferencia de otros métodos más modernos, este busca exclusivamente por el atributo ID.

```js
//sintaxis
document.getElementById("id");
```

```js
let firstTitle = document.getElementById("first-title");
console.log(firstTitle); // <h1>First Title</h1>
```


---

#### Obtener elementos mediante métodos querySelector

El método _document.querySelector_ puede seleccionar un HTML o elementos HTML por nombre de etiqueta, por id o por nombre de clase. Es un método más genérico y moderno que permite usar sintaxis CSS compleja.

**_querySelector_**: se puede utilizar para seleccionar elementos HTML por su nombre de etiqueta, id o clase. Si se utiliza el nombre de la etiqueta o hay múltiples coincidencias, SÓLO se selecciona el primer elemento que encuentre en el árbol DOM y se detiene de inmediato.

```js
let firstTitle = document.querySelector("h1"); // seleccionar el primer elemento h1 disponible
let firstTitle = document.querySelector("#first-title"); // selecciona el id con first-title
let firstTitle = document.querySelector(".title"); // seleccionar el primer elemento disponible con clase title
```

**_querySelectorAll_**: se puede utilizar para seleccionar elementos html por su nombre de etiqueta o clase. Devuelve una colección estática similar a un array llamada NodeList (Lista de Nodos) que soporta métodos de array. Podemos utilizar **_bucle for_** o **_forEach_** para recorrer cada elemento de nodeList.

```js
const allTitles = document.querySelectorAll('h1') # selects all the available h1 elements in the page

console.log(allTitles.length) // 4
for (let i = 0; i < allTitles.length; i++) {
  console.log(allTitles[i])
}

allTitles.forEach(title => console.log(title))
const allTitles = document.querySelectorAll('.title') // lo mismo ocurre con la selección mediante la clase
```

---


### Añadir atributo

En la etiqueta de apertura de HTML se añade un atributo que proporciona información adicional sobre el elemento. Atributos HTML comunes: id, class, src, style, href, disabled, title, alt. Añadamos id y class para el cuarto título.

```js
const titles = document.querySelectorAll("h1");
titles[3].className = "title";
titles[3].id = "fourth-title";
```


---

#### Añadir un atributo con setAttribute

El método **_setAttribute()_** establece cualquier atributo html. Toma dos parámetros: el tipo de atributo y el nombre del atributo.
Agreguemos la clase y el atributo id para el cuarto título.

```js
const titles = document.querySelectorAll("h1");
titles[3].setAttribute("class", "title");
titles[3].setAttribute("id", "fourth-title");
```


---

#### Añadir atributo sin setAttribute

Podemos utilizar el método normal de configuración de objetos para establecer un atributo, pero esto no puede funcionar para todos los elementos. Algunos atributos son propiedades de los objetos del DOM y se pueden establecer directamente. Por ejemplo, id y class

```js
//otra forma de establecer un atributo
titles[3].className = "title";
titles[3].id = "fourth-title";
```


---

#### Añadir una clase mediante classList

El método classList es un buen método para añadir clases adicionales. No anula la clase original si existe una clase, sino que añade una clase adicional para el elemento.

```js
//otra forma de establecer un atributo: anexar la clase, no se sobrepone a
titles[3].classList.add("title", "header-title");
```


---

#### Eliminación de la clase mediante remove

De forma similar a la adición, también podemos eliminar la clase de un elemento. Podemos eliminar una clase específica de un elemento.

```js
//otra forma de establecer un atributo: anexar la clase, no se sobrepone a
titles[3].classList.remove("title", "header-title");
```


---

### Añadir texto a un elemento HTML

Un HTML es un bloque compuesto por una etiqueta de apertura, una etiqueta de cierre y un contenido de texto. Podemos añadir un contenido de texto utilizando la propiedad _textContent_ o \*innerHTML.

#### Añadir contenido de texto usando textContent

La propiedad _textContent_ se utiliza para añadir texto a un elemento HTML.

```js
const titles = document.querySelectorAll("h1");
titles[3].textContent = "Fourth Title";
```


---

#### Añadir contenido de texto usando innerHTML

La mayoría de la gente se confunde entre _textContent_ y _innerHTML_. _textContent_ está pensado para añadir texto a un elemento HTML, sin embargo innerHTML puede añadir un elemento o elementos de texto o HTML como hijo.

Es vital entender la diferencia de seguridad entre ambos: `textContent` inserta o lee el contenido como texto plano seguro. Por el contrario, `innerHTML` evalúa y renderiza las etiquetas HTML, lo cual puede ser un grave riesgo de seguridad (XSS - Cross-Site Scripting) si se utiliza con datos ingresados por el usuario, ya que un atacante podría inyectar un `<script>` malicioso.

##### textContent

Asignamos la propiedad del objeto HTML _textContent_ a un texto

```js
const titles = document.querySelectorAll("h1");
titles[3].textContent = "Fourth Title";
```


---

##### innerHTML

Usamos la propiedad innerHTML cuando queremos reemplazar o un contenido hijo completamente nuevo a un elemento padre.
El valor que asignemos será una cadena de elementos HTML.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JavaScript para todos:DOM</title>
  </head>
  <body>
    <div class="wrapper">
      <h1>Asabeneh Yetayeh desafíos en 2020</h1>
      <h2>Reto 30DaysOfJavaScript</h2>
      <ul></ul>
    </div>
    <script>
      const lists = `
    <li>30DaysOfPython Challenge Done</li>
            <li>30DaysOfJavaScript Challenge Ongoing</li>
            <li>30DaysOfReact Challenge Coming</li>
            <li>30DaysOfFullStack Challenge Coming</li>
            <li>30DaysOfDataAnalysis Challenge Coming</li>
            <li>30DaysOfReactNative Challenge Coming</li>
            <li>30DaysOfMachineLearning Challenge Coming</li>`;
      const ul = document.querySelector("ul");
      ul.innerHTML = lists;
    </script>
  </body>
</html>
```

---


La propiedad innerHTML puede permitirnos también eliminar todos los hijos de un elemento padre. En lugar de utilizar removeChild() yo recomendaría el siguiente método.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JavaScript for Everyone:DOM</title>
  </head>
  <body>
    <div class="wrapper">
      <h1>Asabeneh Yetayeh challenges in 2020</h1>
      <h2>30DaysOfJavaScript Challenge</h2>
      <ul>
        <li>30DaysOfPython Challenge Done</li>
        <li>30DaysOfJavaScript Challenge Ongoing</li>
        <li>30DaysOfReact Challenge Coming</li>
        <li>30DaysOfFullStack Challenge Coming</li>
        <li>30DaysOfDataAnalysis Challenge Coming</li>
        <li>30DaysOfReactNative Challenge Coming</li>
        <li>30DaysOfMachineLearning Challenge Coming</li>
      </ul>
    </div>
    <script>
      const ul = document.querySelector("ul");
      ul.innerHTML = "";
    </script>
  </body>
</html>
```

---


### Añadir estilo

#### Añadir estilo Color

Añadamos un poco de estilo a nuestros títulos. Si el elemento tiene índice par le damos color verde sino rojo.

```js
const titles = document.querySelectorAll("h1");
titles.forEach((title, i) => {
  title.style.fontSize = "24px"; // todos los títulos tendrán un tamaño de letra de 24px
  if (i % 2 === 0) {
    title.style.color = "green";
  } else {
    title.style.color = "red";
  }
});
```


---

#### Añadir estilo Background Color

Añadamos un poco de estilo a nuestros títulos. Si el elemento tiene índice par le damos color verde sino rojo.

```js
const titles = document.querySelectorAll("h1");
titles.forEach((title, i) => {
  title.style.fontSize = "24px"; // todos los títulos tendrán un tamaño de letra de 24px
  if (i % 2 === 0) {
    title.style.backgroundColor = "green";
  } else {
    title.style.backgroundColor = "red";
  }
});
```


---

#### Añadir estilo Font Size

Añadamos algo de estilo a nuestros títulos. Si el elemento tiene índice par le damos 20px sino 30px

```js
const titles = document.querySelectorAll("h1");
titles.forEach((title, i) => {
  title.style.fontSize = "24px"; // todos los títulos tendrán un tamaño de letra de 24px
  if (i % 2 === 0) {
    title.style.fontSize = "20px";
  } else {
    title.style.fontSize = "30px";
  }
});
```

Como has notado, las propiedades de css cuando lo usamos en JavaScript va a ser un camelCase. Las siguientes propiedades CSS cambian de background-color a backgroundColor, font-size a fontSize, font-family a fontFamily, margin-bottom a marginBottom.

---

---

### Eventos en el DOM

La interactividad en la web se logra escuchando eventos. La sintaxis moderna, escalable y recomendada estándar para adjuntar (escuchar) eventos interactivos a un elemento del DOM es mediante el método **`addEventListener()`**. Este método permite añadir múltiples *listeners* independientes al mismo elemento sin sobrescribirse entre ellos.

```js
const boton = document.querySelector('button');
boton.addEventListener('click', (e) => {
  console.log('Botón clickeado');
});
```

#### El Objeto Event (e) y Comportamientos Nativos
Cuando un evento se dispara, el navegador inyecta silenciosamente un **Objeto Event** (comúnmente llamado `e` o `event`) como primer argumento en la función Callback. Este es un objeto masivo que contiene TODO el contexto situacional (las coordenadas X e Y del mouse, qué tecla del teclado se pulsó, quién originó el click, etc.).

A veces, los elementos tienen comportamientos nativos. Por ejemplo, el comportamiento natural estricto de un formulario (`<form>`) al hacer un 'submit' es recargar (reiniciar) toda la página por completo enviando datos al servidor. Para DETENER este fastidioso comportamiento nativo en SPAs (Single Page Applications), debes llamar a **`e.preventDefault()`** en el primer paso de tu callback.

#### Fases de los Eventos: Captura, Burbujeo y Delegación
Cualquier evento del DOM transcurre cronológicamente en tres fases:
1. **Event Capturing (Fase de Captura o Trickling):** El evento desciende como una cascada desde la raíz (`window`) cruzando los Padres de arriba hacia abajo hasta estrellarse contra el elemento objetivo (Target).
2. **Fase Objetivo (Target):** El evento alcanza el nodo exacto donde ocurrió la acción.
3. **Event Bubbling (Burbujeo de Eventos):** Cuando haces click en un hijo muy profundo, el evento no se queda ahí, sino que 'burbujea' o escala agresivamente hacia arriba en el árbol del DOM, disparando también los listeners de su Padre, de su Abuelo y del Body general.

Si deseas DETENER la propagación del Burbujeo (evitando que los padres, como el Abuelo o el Body, se enteren de que hubo un click en su interior), debes invocar el método vital **`e.stopPropagation()`**.

En eventos con burbujeo, es fundamental entender la diferencia entre dos propiedades del objeto evento:
- **`e.target`**: Es el nodo más profundo que recibió físicamente el click real (el hijo original).
- **`e.currentTarget`**: Es el nodo que tiene atado el listener (el Padre que está capturando la burbuja en este momento).

Basándonos en lo asombroso de `e.target`, surge un patrón de arquitectura de altísimo rendimiento llamado **Event Delegation (Delegación de Eventos)**. Si tienes una lista con 10,000 elementos `<li>` y quieres escuchar los clicks, en lugar de usar un bucle for para inyectar 10,000 `addEventListener`, agregas UN SOLO `addEventListener` al elemento Padre (el contenedor `<ol>` o `<ul>`) y usas `e.target` en el Callback para detectar sobre qué `<li>` específico hizo click el usuario tras la burbuja.

#### Gestión de Listeners y Opciones
Para ahorrar RAM y evitar Memory Leaks fatales cuando se borran componentes en SPAs, puedes eliminar un listener asignado si ya no necesitas escucharlo usando **`removeEventListener('evento', referenciaDeLaFuncionOriginal)`**. Ten en cuenta que para que esto funcione, no puedes usar funciones anónimas; necesitas pasar la referencia estricta en memoria de la función nominal original.

Alternativamente, si pasas el objeto literal de opciones **`{ once: true }`** como el tercer parámetro a tu `addEventListener`, conviertes la escucha en una trampa de UN SOLO USO. El listener reaccionará al primer click y, tan pronto termine, se auto-suicidará y eliminará limpiamente del DOM por ti.

#### Eventos Globales, de Formulario y Táctiles
- **`DOMContentLoaded`**: Es un evento global del documento HTML que sirve para asegurar que todo el árbol HTML puro ha sido parseado, ensamblado y mapeado por el navegador, garantizando que ya es totalmente seguro que tu script empiece a buscar selectores del DOM sin recibir un desastroso 'null'.
- **Eventos de Input**: Si tienes un campo de texto (`<input type="text">`) y quieres ejecutar validaciones dinámicas EN TIEMPO REAL por CADA letra nueva que el usuario tipea, utilizas el asombroso evento **`input`**. A diferencia del evento **`change`**, que solo se dispara cuando el usuario finaliza y pierde el foco.
- **Eventos de Foco**: Cuando un elemento (como un `<div tabindex="0">`) gana interactividad o el foco de atención (ej. usando el tabulador y se ilumina), estalla el evento **`focus`**. Cuando pierde ese foco, se dispara el evento **`blur`**.
- **Eventos Táctiles (Touch API)**: En dispositivos móviles o aplicaciones táctiles, para detectar en JS cuando el usuario coloca el dedo y 'desliza' ininterrumpidamente a lo largo de la pantalla (como para dibujar o mover un slider), se utiliza el evento **`touchmove`**.

#### Rendimiento: Debouncing y Throttling
Si un usuario teclea desesperadamente en un campo de texto, invocando una API Fetch gigante en el evento `input` decenas de veces por segundo de forma redundante, puede aplastar tu servidor. El 'Patrón de Rendimiento y Diseño de UI' que es la respuesta universal a este caos se conoce como **Debouncing (Rebote)** o **Throttling (Acelerador)**. Son envoltorios (Closures) que pausan o promedian la ejecución de funciones ruidosas, asegurando que tu Fetch dispare SOLO si el usuario ha hecho una pausa (ej. de 500ms) de teclear.

---

## 💻 Ejercicios Prácticos (DOM - Selección)

**Consigna 1:** Crea una etiqueta `<p>` en un documento HTML con el id `mi-texto`. Selecciónala usando `document.getElementById` y muestra en consola su texto.
**[Solución]**
```javascript
// HTML: <p id="mi-texto">Hola Mundo</p>
const parrafoId = document.getElementById('mi-texto');
console.log(parrafoId.textContent); // Hola Mundo
```

**Consigna 2:** Selecciona el mismo párrafo anterior pero esta vez utiliza el método genérico `document.querySelector`.
**[Solución]**
```javascript
const parrafoQuery = document.querySelector('#mi-texto');
console.log(parrafoQuery.innerHTML); // Hola Mundo
```

**Consigna 3:** Si tuvieras múltiples etiquetas `<li>` en tu página, utiliza `document.querySelectorAll` para seleccionarlas todas e itera sobre ellas para imprimir su contenido en consola.
**[Solución]**
```javascript
// HTML: <li>Manzana</li><li>Banana</li><li>Pera</li>
const elementosLista = document.querySelectorAll('li');

elementosLista.forEach(elemento => {
  console.log(elemento.textContent);
});
// Manzana
// Banana
// Pera
```