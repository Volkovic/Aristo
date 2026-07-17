## JSON

JSON son las siglas de JavaScript Object Notation (Notación de objetos de JavaScript). La sintaxis JSON se deriva de la sintaxis de notación de objetos de JavaScript, pero el formato JSON es sólo de texto o cadena. JSON es un formato de datos ligero para almacenar y transportar. JSON se utiliza sobre todo cuando se envían datos de un servidor a un cliente. JSON es una alternativa más fácil de usar que XML.

**Ejemplo:**

```js
{
"users":[
  {
    "firstName":"Asabeneh",
    "lastName":"Yetayeh",
    "age":250,
    "email":"asab@asb.com"
  },
  {
    "firstName":"Alex",
    "lastName":"James",
    "age":25,
    "email":"alex@alex.com"
  },
  {
  "firstName":"Lidiya",
  "lastName":"Tekle",
  "age":28,
  "email":"lidiya@lidiya.com"
  }
]
}
```

---


El ejemplo JSON anterior no es muy diferente de un objeto normal. Entonces, ¿cuál es la diferencia? La diferencia es que la clave de un objeto JSON debe ir con comillas dobles o debe ser una cadena. JavaScript Object y JSON son muy similares por lo que podemos cambiar JSON a Object y Object a JSON.

Veamos el ejemplo anterior con más detalle, comienza con una llave. Dentro de la corchete, hay una clave "usuarios" que tiene una matriz de valores. Dentro del array tenemos diferentes objetos y cada objeto tiene claves, cada clave tiene que tener comillas dobles. Por ejemplo, utilizamos "firstNaMe" en lugar de sólo firstName, sin embargo en el objeto utilizamos claves sin comillas dobles. Esta es la mayor diferencia entre un objeto y un JSON. 

Es importante destacar que el estándar JSON es sumamente estricto. A diferencia de JavaScript, el formato JSON puro (como el que se guarda en archivos `.json`) **no admite ningún tipo de comentarios** (ni `//` ni `/* */`). Un ejemplo crítico de esto es el archivo `package.json`, núcleo de todo proyecto Node o React; al ser un archivo JSON puro, será parseado estrictamente por gestores como npm o yarn, y fallará con cualquier error de sintaxis si incluyes comentarios, comillas simples o una coma sobrante (trailing comma) al final de la última propiedad. Además, aunque solemos ver objetos como raíz, JSON soporta arrays como la raíz de su estructura validada, por lo que un string como `'[1, 2, 3]'` es perfectamente válido y `JSON.parse` lo regenerará como un verdadero Array de JS. Veamos más ejemplos sobre JSON.

**Ejemplo:**

```js
{
    "Alex": {
        "email": "alex@alex.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        "age": 20,
        "isLoggedIn": false,
        "points": 30
    },
    "Asab": {
        "email": "asab@asab.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "Redux",
            "MongoDB",
            "Express",
            "React",
            "Node"
        ],
        "age": 25,
        "isLoggedIn": false,
        "points": 50
    },
    "Brook": {
        "email": "daniel@daniel.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Redux"
        ],
        "age": 30,
        "isLoggedIn": true,
        "points": 50
    },
    "Daniel": {
        "email": "daniel@alex.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        "age": 20,
        "isLoggedIn": false,
        "points": 40
    },
    "John": {
        "email": "john@john.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Redux",
            "Node.js"
        ],
        "age": 20,
        "isLoggedIn": true,
        "points": 50
    },
    "Thomas": {
        "email": "thomas@thomas.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "React"
        ],
        "age": 20,
        "isLoggedIn": false,
        "points": 40
    },
    "Paul": {
        "email": "paul@paul.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "MongoDB",
            "Express",
            "React",
            "Node"
        ],
        "age": 20,
        "isLoggedIn": false,
        "points": 40
    }
}
```

---


### Convertir JSON en objeto JavaScript

La mayoría de las veces obtenemos los datos JSON de la respuesta HTTP o de un archivo, pero podemos almacenar el JSON como una cadena y podemos cambiarlo por un objeto para la demostración. En JavaScript la palabra clave _JSON_ tiene los métodos _parse()_ y _stringify()_. Cuando queremos cambiar el JSON a un objeto, parseamos el JSON usando _JSON.parse()_. Cuando queremos pasar el objeto a JSON utilizamos _JSON.stringify()_.

#### JSON.parse()

```js
JSON.parse(json[, reviver])
// json or text , los datos
//reviver es una función opcional de callback
/* JSON.parse(json, (key, value) => {

})
*/
```

```js
const usersText = `{
"users":[
  {
    "firstName":"Asabeneh",
    "lastName":"Yetayeh",
    "age":250,
    "email":"asab@asb.com"
  },
  {
    "firstName":"Alex",
    "lastName":"James",
    "age":25,
    "email":"alex@alex.com"
  },
  {
  "firstName":"Lidiya",
  "lastName":"Tekle",
  "age":28,
  "email":"lidiya@lidiya.com"
  }
]
}`;

const usersObj = JSON.parse(usersText, undefined, 4);
console.log(usersObj);
```

Debido a la rigidez del estándar, si pasas un JSON inválido a la función `JSON.parse()` (por ejemplo, un string que usa comillas simples en lugar de dobles para sus claves), el motor lanzará un `SyntaxError` que detendrá la ejecución si no se envuelve en un bloque `try/catch`. 

Por otro lado, una técnica muy frecuente (un "hack" clásico) que combina ambos métodos es `JSON.parse(JSON.stringify(obj))`. Esto se utiliza para crear una clonación profunda (Deep Copy) de un objeto, destruyéndolo a texto plano y reconstruyéndolo para crear referencias en memoria completamente nuevas, siempre y cuando el objeto no contenga funciones ni referencias circulares.

---


### Uso de una función de recuperación con JSON.parse()

Para utilizar la función reviver como formateador, ponemos las claves que queremos para formatear el valor del nombre y del apellido. Digamos que estamos interesados en formatear el nombre y el apellido de los datos JSON.

```js
const usersText = `{
"users":[
  {
    "firstName":"Asabeneh",
    "lastName":"Yetayeh",
    "age":250,
    "email":"asab@asb.com"
  },
  {
    "firstName":"Alex",
    "lastName":"James",
    "age":25,
    "email":"alex@alex.com"
  },
  {
  "firstName":"Lidiya",
  "lastName":"Tekle",
  "age":28,
  "email":"lidiya@lidiya.com"
  }
]
}`;

const usersObj = JSON.parse(usersText, (key, value) => {
  let newValue =
    typeof value == "string" && key != "email" ? value.toUpperCase() : value;
  return newValue;
});
console.log(usersObj);
```

---


El _JSON.parse()_ es muy práctico de usar. No tienes que pasar el parámetro opcional, puedes simplemente usarlo con el parámetro requerido y lograrás bastante.

### Conversión de objetos a JSON

Cuando queremos pasar el objeto a JSON utilizamos _JSON.stringify()_. El método stringify toma un parámetro obligatorio y dos opcionales. _Replacer_ se utiliza como filtro (para filtrar o transformar los valores de las propiedades antes de que se conviertan a string) y _space_ es una indentación (añade espacios de sangría por nivel al string resultante, haciéndolo visualmente 'bonito' para lectura humana). Si no queremos filtrar ninguna de las claves del objeto podemos pasar simplemente undefined.

```js
JSON.stringify(obj, replacer, space);
// json or text , los datos
// reviver es una función opcional de callback
```

Convirtamos el siguiente objeto en una cadena. Primero mantengamos todas las claves y también tengamos una indentación de 4 espacios.

```js
const users = {
  Alex: {
    email: "alex@alex.com",
    skills: ["HTML", "CSS", "JavaScript"],
    age: 20,
    isLoggedIn: false,
    points: 30,
  },
  Asab: {
    email: "asab@asab.com",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Redux",
      "MongoDB",
      "Express",
      "React",
      "Node",
    ],
    age: 25,
    isLoggedIn: false,
    points: 50,
  },
  Brook: {
    email: "daniel@daniel.com",
    skills: ["HTML", "CSS", "JavaScript", "React", "Redux"],
    age: 30,
    isLoggedIn: true,
    points: 50,
  },
  Daniel: {
    email: "daniel@alex.com",
    skills: ["HTML", "CSS", "JavaScript", "Python"],
    age: 20,
    isLoggedIn: false,
    points: 40,
  },
  John: {
    email: "john@john.com",
    skills: ["HTML", "CSS", "JavaScript", "React", "Redux", "Node.js"],
    age: 20,
    isLoggedIn: true,
    points: 50,
  },
  Thomas: {
    email: "thomas@thomas.com",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    age: 20,
    isLoggedIn: false,
    points: 40,
  },
  Paul: {
    email: "paul@paul.com",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "MongoDB",
      "Express",
      "React",
      "Node",
    ],
    age: 20,
    isLoggedIn: false,
    points: 40,
  },
};

const txt = JSON.stringify(users, undefined, 4);
console.log(txt); // text significa JSON- porque json es una forma de cadena de un objeto.
```

Al usar `JSON.stringify()`, debes tener en cuenta qué tipos de datos son soportados. JSON es un formato de intercambio de datos puro, por lo que **no soporta funciones, el valor `undefined` ni Symbols**. Si intentas convertir un objeto que contiene estos valores (ej. `{ a: undefined, b: function(){} }`), el método stringify silenciosamente descartará y eliminará esas propiedades enteras, dando como resultado un string vacío `"{}"`. Mandar código ejecutable a través de la red es un riesgo de seguridad, por lo que JSON lo prohíbe y solo transmite datos pasivos.

Además, si tu objeto tiene propiedades que se referencian a sí mismas (referencias circulares, ej. `a.hijo = b; b.padre = a`), `JSON.stringify()` no podrá mapearlo y lanzará un fatal `TypeError: Converting circular structure to JSON` para evitar un bucle infinito. En el caso de las fechas reales (`new Date()`), el objeto nativo Date posee su propio método `.toJSON()` integrado, por lo que al ser tocado por stringify, se convierte internamente al formato de fecha estándar de texto ISO-8601 (String).

---


```sh
{
    "Alex": {
        "email": "alex@alex.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        "age": 20,
        "isLoggedIn": false,
        "points": 30
    },
    "Asab": {
        "email": "asab@asab.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "Redux",
            "MongoDB",
            "Express",
            "React",
            "Node"
        ],
        "age": 25,
        "isLoggedIn": false,
        "points": 50
    },
    "Brook": {
        "email": "daniel@daniel.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Redux"
        ],
        "age": 30,
        "isLoggedIn": true,
        "points": 50
    },
    "Daniel": {
        "email": "daniel@alex.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        "age": 20,
        "isLoggedIn": false,
        "points": 40
    },
    "John": {
        "email": "john@john.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Redux",
            "Node.js"
        ],
        "age": 20,
        "isLoggedIn": true,
        "points": 50
    },
    "Thomas": {
        "email": "thomas@thomas.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "React"
        ],
        "age": 20,
        "isLoggedIn": false,
        "points": 40
    },
    "Paul": {
        "email": "paul@paul.com",
        "skills": [
            "HTML",
            "CSS",
            "JavaScript",
            "MongoDB",
            "Express",
            "React",
            "Node"
        ],
        "age": 20,
        "isLoggedIn": false,
        "points": 40
    }
}
```

---


### Usando un filtro de array con JSON.stringify

Ahora, vamos a utilizar replacer como un filtro. El objeto usuario tiene una larga lista de claves, pero sólo nos interesan algunas de ellas. Ponemos las claves que queremos conservar en un array como se muestra en el ejemplo y lo utilizamos en lugar del replacer.

```js
const user = {
  firstName: "Asabeneh",
  lastName: "Yetayeh",
  country: "Finland",
  city: "Helsinki",
  email: "alex@alex.com",
  skills: ["HTML", "CSS", "JavaScript", "React", "Python"],
  age: 250,
  isLoggedIn: false,
  points: 30,
};

const txt = JSON.stringify(
  user,
  ["firstName", "lastName", "country", "city", "age"],
  4
);
console.log(txt);
```

---


```sh
{
    "firstName": "Asabeneh",
    "lastName": "Yetayeh",
    "country": "Finland",
    "city": "Helsinki",
    "age": 250
}
```

### Trabajando con JSON en la Web y Servidores

En el desarrollo moderno, la forma estándar de descargar recursos como JSON desde una URL a través de la red es utilizando la función asíncrona nativa **`fetch()`** (introducida en ES6, reemplazando a la arcaica `XMLHttpRequest` o AJAX). Sin embargo, `fetch()` devuelve un stream bruto de red. El paso necesario e indispensable para transformar esa respuesta cruda a un Objeto JS utilizable es llamar asíncronamente al método `.json()` sobre el objeto de respuesta, por ejemplo: `await response.json()`.

Al consumir estas APIs, es muy común usar la destructuración anidada para extraer instantáneamente la pieza de información requerida desde un enorme objeto JSON. Por ejemplo, si la respuesta es `{ data: { user: { id: 5 } } }`, puedes recuperarlo en una sola línea con: `const { data: { user: { id } } } = await response.json();`.

A veces, al intentar recuperar datos desde una web externa o API pública con `fetch()`, el navegador bloquea la petición lanzando un error en rojo. Esto se debe comúnmente a la política de **CORS (Cross-Origin Resource Sharing)**, un mecanismo de seguridad del navegador que impide que tu dominio local acceda a recursos de un dominio externo sin los permisos adecuados.

Finalmente, aunque en el Frontend enviamos y recibimos JSON en formato de texto a través del protocolo HTTP, en el Backend las cosas pueden ser distintas. Bases de datos NoSQL como MongoDB utilizan **BSON (Binary JSON)**, un formato serializado en formato binario que es más rápido de recorrer y soporta más tipos de datos nativos (como Dates reales) que el JSON de texto tradicional.