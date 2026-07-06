## Storage (Almacenamiento) web HTML5

Web Storage (sessionStorage y localStorage) es una nueva API de HTML5 que ofrece importantes ventajas sobre las cookies tradicionales. Antes de HTML5, los datos de las aplicaciones debían almacenarse en cookies, incluidas en cada solicitud del servidor. Web storage es más seguro, y se pueden almacenar grandes cantidades de datos localmente, sin afectar al rendimiento del sitio web. El límite de almacenamiento de datos de las cookies en muchos navegadores web es de unos 4 KB por cookie. Nosotros almacenamos datos mucho más grandes (al menos 5MB) y nunca los transferimos al servidor. Todos los sitios del mismo o único origen pueden almacenar y acceder a los mismos datos.

Se puede acceder a los datos almacenados mediante JavaScript, lo que permite aprovechar las secuencias de comandos del lado del cliente para hacer muchas cosas que tradicionalmente han implicado la programación del lado del servidor y las bases de datos relacionales. Hay dos objetos de almacenamiento web:

- sessionStorage
- localStorage

localStorage es similar a sessionStorage, excepto que mientras los datos almacenados en localStorage no tienen tiempo de caducidad, los datos almacenados en sessionStorage se borran cuando termina la sesión de la página, es decir, cuando se cierra la página.

Hay que tener en cuenta que los datos almacenados en localStorage o sessionStorage son específicos del protocolo de la página.

Las claves y los valores son siempre cadenas (tenga en cuenta que, al igual que con los objetos, las claves enteras se convertirán automáticamente en cadenas).




---

### sessionStorage

sessionStorage sólo está disponible dentro de la sesión de la pestaña o ventana del navegador. Está diseñado para almacenar datos en una sola sesión de la página web. Esto significa que si la ventana se cierra, los datos de la sesión se eliminarán. Como sessionStorage y localStorage tienen métodos similares, nos centraremos sólo en localStorage.

### localStorage

El localStorage de HTML5 es la para la API de almacenamiento web que se utiliza para almacenar datos en el navegador sin caducidad. Los datos estarán disponibles en el navegador incluso después de cerrarlo. localStorage se mantiene incluso entre sesiones del navegador. Esto significa que los datos siguen estando disponibles cuando se cierra y se vuelve a abrir el navegador, y también de forma instantánea entre pestañas y ventanas.

En ambos casos, los datos del almacenamiento web no están disponibles entre distintos navegadores. Por ejemplo, no se puede acceder a los objetos de almacenamiento creados en Firefox en Internet Explorer, exactamente igual que las cookies. Hay cinco métodos para trabajar en el almacenamiento local:
_setItem(), getItem(), removeItem(), clear(), key()_


---

### Caso de uso de los almacenamientos web

Algunos casos de uso de los almacenes web son

- almacenar datos temporalmente.
- guardar los productos que el usuario pone en su carrito de la compra.
- los datos pueden estar disponibles entre peticiones de página, múltiples pestañas del navegador y también entre sesiones del navegador utilizando localStorage.
- puede utilizarse completamente sin conexión utilizando localStorage.
- El almacenamiento en la web puede suponer una gran ganancia de rendimiento cuando algunos datos estáticos se almacenan en el cliente para minimizar el número de peticiones posteriores. Incluso las imágenes pueden almacenarse en cadenas utilizando la codificación Base64.
- se puede utilizar para el método de autenticación del usuario.

Para los ejemplos mencionados anteriormente, tiene sentido utilizar localStorage. Te preguntarás, entonces, cuándo debemos utilizar sessionStorage.

En algunos casos, queremos deshacernos de los datos en cuanto se cierra la ventana. O, quizás, si no queremos que la aplicación interfiera con la misma aplicación que está abierta en otra ventana. Estos escenarios se sirven mejor con sessionStorage.

Ahora, vamos a ver cómo hacer uso de estas APIs de almacenamiento web.


---

## Objetos de almacenamiento web HTML5

El almacenamiento (storage) web HTML proporciona dos objetos para almacenar datos en el cliente:

- window.localStorage - almacena datos sin fecha de caducidad
- window.sessionStorage - almacena datos para una sesión (los datos se pierden cuando se cierra la pestaña del navegador)La mayoría de los navegadores modernos soportan Web Storage, sin embargo es bueno comprobar el soporte del navegador para localStorage y sessionStorage. Veamos los métodos disponibles para los objetos Web Storage.

Objetos Web Storage:

- _localStorage_ - para mostrar el objeto localStorage
- _localStorage.clear()_ - para remover todo lo que hay en el almacenamiento local
- _localStorage.setItem()_ - para almacenar datos en el localStorage. Toma como parámetros una clave y un valor.
- _localStorage.getItem()_ - para mostrar los datos almacenados en el localStorage. Toma una clave como parámetro.
- _localStorage.removeItem()_ - para remover un ítem almacenado de un localStorage. Toma la clave como parámetro.
- _localStorage.key()_ - para mostrar un dato almacenado en un localStorage. Toma el índice como parámetro.




---

### Establecer el elemento en el localStorage

Cuando establecemos conjunto los datos que se almacenan en un localStorage, se almacenarán como una cadena. Si estamos almacenando un array o un objeto, debemos encadenarlo primero para mantener el formato, a menos que perdamos la estructura del array o del objeto de los datos originales.

Almacenamos los datos en el localStorage utilizando el método _localStorage.setItem_.

```js
//sintaxis
localStorage.setItem("key", "value");
```

- Almacenamiento de una cadena en un localStorage

```js
localStorage.setItem("firstName", "Asabeneh"); // ya que el valor es una cadena, no lo encadenamos
console.log(localStorage);
```

```sh
Storage {firstName: 'Asabeneh', length: 1}
```

- Almacenar el número en un storage local

---


```js
localStorage.setItem("age", 200);
console.log(localStorage);
```

```sh
 Storage {age: '200', firstName: 'Asabeneh', length: 2}
```

- Almacenando un array en un localStorage. Si estamos almacenando un array, un objeto o una matriz de objetos, debemos encadenar el objeto primero. Véase el ejemplo siguiente.

```js
const skills = ["HTML", "CSS", "JS", "React"];
//El array de Skills tiene que ser encadenado primero para mantener el formato.
const skillsJSON = JSON.stringify(skills, undefined, 4);
localStorage.setItem("skills", skillsJSON);
console.log(localStorage);
```

```sh
Storage {age: '200', firstName: 'Asabeneh', skills: 'HTML,CSS,JS,React', length: 3}
```

---


```js
let skills = [
  { tech: "HTML", level: 10 },
  { tech: "CSS", level: 9 },
  { tech: "JS", level: 8 },
  { tech: "React", level: 9 },
  { tech: "Redux", level: 10 },
  { tech: "Node", level: 8 },
  { tech: "MongoDB", level: 8 },
];

let skillJSON = JSON.stringify(skills);
localStorage.setItem("skills", skillJSON);
```

- Almacenamiento de un objeto en un localStorage. Antes de almacenar los objetos en un localStorage, el objeto tiene que ser stringificado.

```js
const user = {
  firstName: "Asabeneh",
  age: 250,
  skills: ["HTML", "CSS", "JS", "React"],
};

const userText = JSON.stringify(user, undefined, 4);
localStorage.setItem("user", userText);
```

---


### Obtener un elemento de localStorage

Obtenemos los datos del almacenamiento local utilizando el método _localStorage.getItem()_.

```js
//sintaxis
localStorage.getItem("key");
```

```js
let firstName = localStorage.getItem("firstName");
let age = localStorage.getItem("age");
let skills = localStorage.getItem("skills");
console.log(firstName, age, skills);
```

```sh
 'Asabeneh', '200', '['HTML','CSS','JS','React']'
```

Como puedes ver la habilidad está en un formato de cadena. Utilicemos JSON.parse() para convertirlo en un array normal.

---


```js
let skills = localStorage.getItem("skills");
let skillsObj = JSON.parse(skills, undefined, 4);
console.log(skillsObj);
```

```sh
['HTML','CSS','JS','React']
```


---

### Limpiando el localStorage

El método clear, borrará todo lo almacenado en la memoria local

```js
localStorage.clear();
```