## Storage (Almacenamiento) web HTML5

Web Storage (sessionStorage y localStorage) es una nueva API de HTML5 que ofrece importantes ventajas sobre las cookies tradicionales. Antes de HTML5, los datos de las aplicaciones debían almacenarse en cookies, incluidas en cada solicitud del servidor. Web storage es más seguro, y se pueden almacenar grandes cantidades de datos localmente, sin afectar al rendimiento del sitio web. El límite de almacenamiento de datos de las cookies en muchos navegadores web es de unos 4 KB por cookie. Nosotros almacenamos datos mucho más grandes (entre 5 MB y 10 MB por dominio/origen) y nunca los transferimos al servidor. 

Todos los sitios del mismo o único origen pueden almacenar y acceder a los mismos datos. El Web Storage está rígidamente ligado y protegido por la **Política del Mismo Origen (Same-Origin Policy)**. Esto significa que un dominio no puede bajo ningún concepto cruzar la barrera para leer o escribir en la caja fuerte de memoria de otro dominio. Sin embargo, entre pestañas del *mismo* dominio, JavaScript ofrece el evento nativo **`storage`** (disparado sobre el objeto `window`). Este evento se activa en las pestañas hermanas (pero no en la que originó el cambio), lo que es excelente para notificar a otras pestañas si el usuario modifica el almacenamiento (por ejemplo, al iniciar sesión) y así poder actualizar la interfaz.

Se puede acceder a los datos almacenados mediante JavaScript, lo que permite aprovechar las secuencias de comandos del lado del cliente para hacer muchas cosas que tradicionalmente han implicado la programación del lado del servidor y las bases de datos relacionales. Hay dos objetos de almacenamiento web:

- sessionStorage
- localStorage

localStorage es similar a sessionStorage, excepto que mientras los datos almacenados en localStorage no tienen tiempo de caducidad, los datos almacenados en sessionStorage se borran permanentemente cuando termina la sesión de la página, es decir, en el instante en el que la pestaña o el proceso del navegador se cierran definitivamente.

Hay que tener en cuenta que los datos almacenados en localStorage o sessionStorage son específicos del protocolo de la página.

Las claves y los valores son siempre cadenas (tenga en cuenta que, al igual que con los objetos, las claves enteras se convertirán automáticamente en cadenas). Si pasas un número a `setItem`, el navegador realiza una coerción implícita y lo almacena permanentemente como un String de texto.




---

### sessionStorage

sessionStorage sólo está disponible dentro de la sesión de la pestaña o ventana del navegador. Está diseñado para almacenar datos en una sola sesión de la página web. Esto significa que si la ventana se cierra, los datos de la sesión se eliminarán. Como sessionStorage y localStorage tienen métodos similares, nos centraremos sólo en localStorage.

### localStorage

El localStorage de HTML5 es la para la API de almacenamiento web que se utiliza para almacenar datos en el navegador sin caducidad. A diferencia de las cookies, **no es posible establecer una fecha de 'caducidad' o expiración (Expiration Time) nativa** a una clave en localStorage. Si deseas 'expiración', debes programarla tú mismo (por ejemplo, guardando un objeto con el dato y un timestamp, y validándolo matemáticamente al leer). Los datos estarán disponibles en el navegador incluso después de cerrarlo. localStorage se mantiene incluso entre sesiones del navegador. Esto significa que los datos siguen estando disponibles cuando se cierra y se vuelve a abrir el navegador, y también de forma instantánea entre pestañas y ventanas.

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

A pesar de sus ventajas, el Web Storage tiene limitaciones importantes. Es una API de carácter estrictamente **sincrónico**, lo que significa que congelaría (bloquearía) el Hilo Principal (la UI) al intentar guardar o leer grandes volúmenes de datos binarios asíncronos (como archivos pesados o Blobs de imágenes). Para datos masivos, se usa IndexedDB. Además, **no es seguro para datos sensibles** (como contraseñas o tokens bancarios) porque es accesible vía JavaScript y vulnerable a ataques XSS. Finalmente, si un usuario activa el **Modo Incógnito** (o Ventana Privada), el localStorage funciona temporalmente igual que un sessionStorage: te deja guardar y leer, pero al cerrar la ventana de incógnito, destruye todo el archivo por seguridad.

Ahora, vamos a ver cómo hacer uso de estas APIs de almacenamiento web.


---

## Objetos de almacenamiento web HTML5

El almacenamiento (storage) web HTML proporciona dos objetos para almacenar datos en el cliente:

- window.localStorage - almacena datos sin fecha de caducidad
- window.sessionStorage - almacena datos para una sesión (los datos se pierden cuando se cierra la pestaña del navegador)La mayoría de los navegadores modernos soportan Web Storage, sin embargo es bueno comprobar el soporte del navegador para localStorage y sessionStorage. Veamos los métodos disponibles para los objetos Web Storage.

Objetos Web Storage:

- _localStorage_ - para mostrar el objeto localStorage
- _localStorage.clear()_ - para remover todo lo que hay en el almacenamiento local de un dominio específico en un solo paso.
- _localStorage.setItem()_ - para almacenar datos en el localStorage. Toma como parámetros una clave y un valor.
- _localStorage.getItem()_ - para mostrar los datos almacenados en el localStorage. Toma una clave como parámetro.
- _localStorage.removeItem()_ - para remover un ítem almacenado de un localStorage. Toma la clave como parámetro.
- _localStorage.key()_ - sirve para iterar. Si le pasas el índice numérico (ej. 0), devuelve el nombre de la Clave (string) que se encuentra almacenada en esa posición específica del Storage.




---

### Establecer el elemento en el localStorage

Cuando establecemos conjunto los datos que se almacenan en un localStorage, se almacenarán como una cadena. Si estamos almacenando un array o un objeto, debemos encadenarlo primero para mantener el formato, a menos que perdamos la estructura del array o del objeto de los datos originales.

Almacenamos los datos en el localStorage utilizando el método _localStorage.setItem_. Aunque los métodos `.setItem()` y `.getItem()` son la forma oficial y segura, como localStorage hereda del objeto genérico, existe una forma secundaria e informal (no recomendada) de acceder y modificar ese valor como si fuera una propiedad regular de objeto: `localStorage.tema = 'claro';`.

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

Por especificación del estándar W3C, si intentas obtener una clave que jamás fue guardada en memoria, la API `.getItem()` retorna explícitamente el valor primitivo **`null`**. Es importante saber que ejecutar `JSON.parse(null)` retorna `null` y es completamente seguro. Por esta razón, es un patrón muy común usar el operador OR al recuperar datos: `const tareas = JSON.parse(localStorage.getItem('tareas')) || []`. Si la clave no existía, `getItem` da `null`, `parse(null)` da `null`, y el operador OR asigna un array vacío de seguridad.

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

### Depuración en DevTools

¿En qué pestaña de las Herramientas de Desarrollo (DevTools) de Chrome puedes visualizar, modificar y eliminar manualmente los registros de Web Storage? Para hacerlo, debes abrir las DevTools y dirigirte a la pestaña **Application (Aplicación) -> Local Storage**. Esto te permite inspeccionar la base de datos visualmente en tiempo real, facilitando enormemente el debugging de tu aplicación.