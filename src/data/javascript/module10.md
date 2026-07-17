## Set

Set (conjunto) es una colección de elementos. Set sólo puede contener elementos únicos.
A diferencia de los objetos tradicionales, los Sets (y Maps) en JavaScript conservan el orden cronológico estricto en el que los elementos fueron insertados. Además, aunque en JavaScript `NaN !== NaN`, un Set utiliza un algoritmo interno (SameValueZero) que considera que todos los `NaN` son idénticos, por lo que sí puedes almacenar `NaN` como un valor válido y el Set no permitirá duplicados de este.
Veamos cómo crear set en la sección siguiente.

### Creación de set vacío

```js
const companies = new Set();
console.log(companies);
```

```sh
Set(0) {}
```


---

### Creación de set a partir de array

```js
const languages = [
  "English",
  "Finnish",
  "English",
  "French",
  "Spanish",
  "English",
  "French",
];

const setOfLanguages = new Set(languages);
console.log(setOfLanguages);
```

```sh
Set(4) {"English", "Finnish", "French", "Spanish"}
```

Este comportamiento es muy útil para crear rápidamente un array con elementos únicos a partir de un array que tiene duplicados. Para convertir el Set de vuelta a un array, puedes usar el método `Array.from(new Set(arr))` o el operador de dispersión `[...new Set(arr)]`.

---


Set es un objeto iterable y podemos iterar a través de cada elemento.

```js
const languages = [
  "English",
  "Finnish",
  "English",
  "French",
  "Spanish",
  "English",
  "French",
];

const setOfLanguages = new Set(languages);

for (const language of setOfLanguages) {
  console.log(language);
}
```

---


```sh
  English
  Finnish
  French
  Spanish
```


---

### Añadir un elemento a set

```js
const companies = new Set(); // crear set vacío
console.log(companies.size); // 0

companies.add("Google"); // añadir un elemento a set
companies.add("Facebook");
companies.add("Amazon");
companies.add("Oracle");
companies.add("Microsoft");
console.log(companies.size); // 5 elements in set
console.log(companies);
```

```sh
Set(5) {"Google", "Facebook", "Amazon", "Oracle", "Microsoft"}
```

También podemos utilizar el bucle para añadir elementos a set.

---


```js
const companies = ["Google", "Facebook", "Amazon", "Oracle", "Microsoft"];
setOfCompanies = new Set();
for (const company of companies) {
  setOfCompanies.add(company);
}
```

```sh
Set(5) {"Google", "Facebook", "Amazon", "Oracle", "Microsoft"}

```


---

### Borrar un elemento a set

Podemos eliminar un elemento de set utilizando un método de eliminación.

```js
console.log(companies.delete("Google"));
console.log(companies.size); // 4 elementos en set
```


---

### Comprobación de un elemento en set

El método has puede ayudar a saber si un determinado elemento existe en set.

```js
console.log(companies.has("Apple")); // false
console.log(companies.has("Facebook")); // true
```


---

### Limpiar set

Elimina todos los elementos de set.

```js
companies.clear();
console.log(companies);
```

```sh
Set(0) {}
```

Vea el ejemplo siguiente para aprender a utilizar set.

```js
const languages = [
  "English",
  "Finnish",
  "English",
  "French",
  "Spanish",
  "English",
  "French",
];
const langSet = new Set(languages);
console.log(langSet); // Set(4) {"English", "Finnish", "French", "Spanish"}
console.log(langSet.size); // 4

const counts = [];
const count = {};

for (const l of langSet) {
  const filteredLang = languages.filter((lng) => lng === l);
  console.log(filteredLang); // ["English", "English", "English"]
  counts.push({ lang: l, count: filteredLang.length });
}
console.log(counts);
```

---


```js
[
  { lang: "English", count: 3 },
  { lang: "Finnish", count: 1 },
  { lang: "French", count: 2 },
  { lang: "Spanish", count: 1 },
];
```

Otros casos de uso de set. Por ejemplo, para contar elementos únicos en un array.

```js
const numbers = [5, 3, 2, 5, 5, 9, 4, 5];
const setOfNumbers = new Set(numbers);

console.log(setOfNumbers);
```

```sh
Set(5) {5, 3, 2, 9, 4}
```

---


### Unión de sets

Para encontrar la unión de dos sets se puede utilizar el operador de dispersión. Busquemos la unión del set A y el set B (A U B)

```js
let a = [1, 2, 3, 4, 5];
let b = [3, 4, 5, 6];
let c = [...a, ...b];

let A = new Set(a);
let B = new Set(b);
let C = new Set(c);

console.log(C);
```

```sh
Set(6) {1, 2, 3, 4, 5,6}
```


---

### Intersección de sets

Para encontrar la intersección de dos sets se puede utilizar un filtro. Vamos a encontrar la intersección del set A y el set B (A ∩ B)

```js
let a = [1, 2, 3, 4, 5];
let b = [3, 4, 5, 6];

let A = new Set(a);
let B = new Set(b);

let c = a.filter((num) => B.has(num));
let C = new Set(c);

console.log(C);
```

```sh
Set(3) {3, 4, 5}
```


---

### Diferencia de sets

Para encontrar la diferencia entre dos sets se puede utilizar un filtro. Vamos a encontrar la diferencia del set A y el set B (A \ B)

```js
let a = [1, 2, 3, 4, 5];
let b = [3, 4, 5, 6];

let A = new Set(a);
let B = new Set(b);

let c = a.filter((num) => !B.has(num));
let C = new Set(c);

console.log(C);
```

```sh
Set(2) {1, 2}
```


---

## Map

La diferencia más importante entre un `Map` y un `Object` clásico de JavaScript es que en un Objeto literal las claves solo pueden ser strings o symbols, mientras que en un Map, las claves pueden ser de cualquier tipo (incluso objetos, funciones o booleanos). Si utilizas un objeto como clave, el Map almacena la referencia de ese objeto en memoria como la clave legítima. Al igual que los Sets, los Maps conservan el orden cronológico estricto en el que los elementos/claves fueron insertados.

### Creación de un Map vacío

```js
const map = new Map();
console.log(map);
```

```sh
Map(0) {}
```


---

### Creación de un Map a partir de un array

```js
countries = [
  ["Finland", "Helsinki"],
  ["Sweden", "Stockholm"],
  ["Norway", "Oslo"],
];
const map = new Map(countries);
console.log(map);
console.log(map.size);
```

```sh
Map(3) {"Finland" => "Helsinki", "Sweden" => "Stockholm", "Norway" => "Oslo"}
3
```


---

### Añadir valores a Map

```js
const countriesMap = new Map();
console.log(countriesMap.size); // 0
countriesMap.set("Finland", "Helsinki");
countriesMap.set("Sweden", "Stockholm");
countriesMap.set("Norway", "Oslo");
console.log(countriesMap);
console.log(countriesMap.size);
```

```sh
Map(3) {"Finland" => "Helsinki", "Sweden" => "Stockholm", "Norway" => "Oslo"}
3
```

Si intentas hacer un `.set()` en un Map con una clave que ya existe, este no creará un duplicado, sino que sobrescribirá el valor anterior asociado a esa clave.

---

### Obtención de un valor de Map

```js
console.log(countriesMap.get("Finland"));
```

```sh
Helsinki
```

Si intentas obtener el valor de una clave que no existe en el Map (por ejemplo, `countriesMap.get('clave_falsa')`), el método simplemente retorna `undefined`.

---

### Comprobar key en Map

Comprueba si una key existe en un map usando el método _has_. Retorna _true_ o _false_.

```js
console.log(countriesMap.has("Finland"));
```

```sh
true
```

Obtención de todos los valores de map usando un bucle

```js
for (const country of countriesMap) {
  console.log(country);
}
```

```sh
(2) ["Finland", "Helsinki"]
(2) ["Sweden", "Stockholm"]
(2) ["Norway", "Oslo"]
```

Si quieres iterar sobre partes específicas de un Map, puedes usar sus métodos iteradores: `.keys()` para las claves, `.values()` para iterar solo sobre los valores, y `.entries()` para los pares.

---


```js
for (const [country, city] of countriesMap) {
  console.log(country, city);
}
```

```sh
Finland Helsinki
Sweden Stockholm
Norway Oslo
```

---

## WeakMap y WeakSet

Además de las estructuras anteriores, JavaScript cuenta con `WeakMap` y `WeakSet`. La diferencia principal entre `Map` y `WeakMap` es que `WeakMap` solo acepta OBJETOS como claves y utiliza referencias débiles. Esto significa que no previene que el recolector de basura (Garbage Collector) elimine esos objetos si no hay otras referencias a ellos, evitando fugas de memoria.

Debido a que sus claves están débilmente referenciadas y el Garbage Collector podría borrarlas en cualquier momento, su "tamaño" es impredecible en tiempo de ejecución. Por esta razón, en un `WeakMap` o `WeakSet` NO puedes usar la propiedad `.size` ni iterarlos con bucles como `for...of`.