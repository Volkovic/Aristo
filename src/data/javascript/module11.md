## Desestructuración y Spread

La desestructuración es una forma de desempaquetar arrays y objetos y asignarlos a una variable distinta.

### Desestructuración de Arrays

```js
const numbers = [1, 2, 3];
let [numOne, numTwo, numThree] = numbers;

console.log(numOne, numTwo, numThree);
```

```sh
  1 2 3
```

```js
const names = ["Asabeneh", "Brook", "David", "John"];
let [firstPerson, secondPerson, thirdPerson, fourthPerson] = names;

console.log(firstPerson, secondPerson, thirdPerson, fourthPerson);
```

---


```sh
Asabeneh Brook David John
```

```js
const scientificConstants = [2.72, 3.14, 9.81, 37, 100];
let [e, pi, gravity, bodyTemp, boilingTemp] = scientificConstants;

console.log(e, pi, gravity, bodyTemp, boilingTemp);
```

```sh
2.72 3.14 9.81 37 100
```

```js
const fullStack = [
  ["HTML", "CSS", "JS", "React"],
  ["Node", "Express", "MongoDB"],
];
const [frontEnd, backEnd] = fullStack;

console.log(frontEnd);
console.log(backEnd);
```

---


```sh
["HTML", "CSS", "JS", "React"]
["Node", "Express", "MongoDB"]
```

Si queremos omitir uno de los valores del array utilizamos una coma adicional. La coma ayuda a omitir el valor en ese índice específico.

```js
const numbers = [1, 2, 3];
let [numOne, , numThree] = numbers; //2 es omitido

console.log(numOne, numThree);
```

```sh
1 3
```

```js
const names = ["Asabeneh", "Brook", "David", "John"];
let [, secondPerson, , fourthPerson] = names; // primera y tercera persona es omitido

console.log(secondPerson, fourthPerson);
```

---


```sh
Brook John
```

Podemos utilizar el valor por defecto en caso de que el valor del array para ese índice sea undefined:

```js
const names = [undefined, "Brook", "David"];
let [
  firstPerson = "Asabeneh",
  secondPerson,
  thirdPerson,
  fourthPerson = "John",
] = names;

console.log(firstPerson, secondPerson, thirdPerson, fourthPerson);
```

```sh
Asabeneh Brook David John
```

---


No podemos asignar una variable a todos los elementos del array. Podemos desestructurar algunos de los primeros y podemos obtener los restantes como array utilizando el operador rest(...).

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let [num1, num2, num3, ...rest] = nums;

console.log(num1, num2, num3);
console.log(rest);
```

```sh
1 2 3
[4, 5, 6, 7, 8, 9, 10]
```

Es importante destacar que el operador rest (`...`) debe ubicarse de manera estricta y obligatoria como el **último elemento** en la desestructuración, ya que su labor es recoger "el resto". Si intentas colocarlo en medio (por ejemplo, `const [primero, ...medio, ultimo] = arr;`), JavaScript lanzará un `SyntaxError` (Rest element must be last element).

Además, la desestructuración de arrays nos ofrece un truco muy elegante para **intercambiar (swap) variables** limpiamente sin necesidad de crear una tercera variable temporal. Al hacer `[a, b] = [b, a];`, se crea un array temporal en el lado derecho y se desestructura inmediatamente hacia las variables de la izquierda en orden inverso.

---

### Desestructuración durante la iteración

```js
const countries = [
  ["Finland", "Helsinki"],
  ["Sweden", "Stockholm"],
  ["Norway", "Oslo"],
];

for (const [country, city] of countries) {
  console.log(country, city);
}
```

```sh
Finland Helsinki
Sweden Stockholm
Norway Oslo
```

---


```js
const fullStack = [
  ["HTML", "CSS", "JS", "React"],
  ["Node", "Express", "MongoDB"],
];

for (const [first, second, third] of fullStack) {
  console.log(first, second, third);
}
```

```sh
HTML CSS JS
Node Express MongoDB
```


---

### Desestructuración de objetos

Cuando desestructuremos el nombre de la variable que usamos para desestructurar debe ser exactamente el mismo que la clave o propiedad del objeto. Vea el ejemplo siguiente.

```js
const rectangle = {
  width: 20,
  height: 10,
  area: 200,
};
let { width, height, area, perimeter } = rectangle;

console.log(width, height, area, perimeter);
```

```sh
20 10 200 undefined
```


---

### Renombrar durante la estructuración

```js
const rectangle = {
  width: 20,
  height: 10,
  area: 200,
};
let { width: w, height: h, area: a, perimeter: p } = rectangle;

console.log(w, h, a, p);
```

```sh
20 10 200 undefined
```

Si la clave no se encuentra en el objeto, la variable se asignará a undefined. A veces la clave puede no estar en el objeto, en ese caso podemos dar un valor por defecto durante la declaración. Vea el ejemplo.

```js
const rectangle = {
  width: 20,
  height: 10,
  area: 200,
};
let { width, height, area, perimeter = 60 } = rectangle;

console.log(width, height, area, perimeter); //20 10 200 60
//Modifiquemos el objeto: anchura a 30 y perímetro a 80
```

---


```js
const rectangle = {
  width: 30,
  height: 10,
  area: 200,
  perimeter: 80,
};
let { width, height, area, perimeter = 60 } = rectangle;
console.log(width, height, area, perimeter); //30 10 200 80
```

También es posible realizar **desestructuración anidada** para extraer propiedades profundas de un objeto en un solo paso. Por ejemplo, si tenemos un objeto anidado `const user = { auth: { token: '123' } };`, podemos aislar y extraer el token directamente siguiendo la forma del objeto con llaves internas: `const { auth: { token } } = user;`.

Aunque es inusual, la sintaxis de JavaScript permite desestructurar la misma propiedad origen en múltiples variables distintas simultáneamente. Por ejemplo, `const { a: x, a: y } = { a: 100 };` es totalmente válido y asignará el valor `100` tanto a `x` como a `y`.

Desestructuración de keys como parámetros de una función. Creemos una función que toma un objeto rectángulo y devuelve el perímetro de un rectángulo.


---

### Parámetro de objeto sin desestructuración

```js
// Sin desestructuración
const rect = {
  width: 20,
  height: 10,
};
const calculatePerimeter = (rectangle) => {
  return 2 * (rectangle.width + rectangle.height);
};

console.log(calculatePerimeter(rect)); // 60
//with destructuring
```

```js
//Otro ejemplo
const person = {
  firstName: "Asabeneh",
  lastName: "Yetayeh",
  age: 250,
  country: "Finland",
  job: "Instructor and Developer",
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Redux",
    "Node",
    "MongoDB",
    "Python",
    "D3.js",
  ],
  languages: ["Amharic", "English", "Suomi(Finnish)"],
};
// Creemos una función que proporcione información sobre el objeto persona sin desestructurar

const getPersonInfo = (obj) => {
  const skills = obj.skills;
  const formattedSkills = skills.slice(0, -1).join(", ");
  const languages = obj.languages;
  const formattedLanguages = languages.slice(0, -1).join(", ");

  personInfo = `${obj.firstName} ${obj.lastName} lives in ${
    obj.country
  }. He is  ${obj.age} years old. He is an ${
    obj.job
  }. He teaches ${formattedSkills} and ${
    skills[skills.length - 1]
  }. He speaks ${formattedLanguages} and a little bit of ${languages[2]}.`;

  return personInfo;
};

console.log(getPersonInfo(person));
```

---


### Parámetro de objeto con desestructuración

```js
const calculatePerimeter = ({ width, height }) => {
  return 2 * (width + height);
};

console.log(calculatePerimeter(rect)); // 60
```

```js
// Creemos una función que proporcione información sobre el objeto persona con desestructuración
const getPersonInfo = ({
  firstName,
  lastName,
  age,
  country,
  job,
  skills,
  languages,
}) => {
  const formattedSkills = skills.slice(0, -1).join(", ");
  const formattedLanguages = languages.slice(0, -1).join(", ");

  personInfo = `${firstName} ${lastName} lives in ${country}. He is ${age} years old. He is an ${job}. He teaches ${formattedSkills} and ${
    skills[skills.length - 1]
  }. He speaks ${formattedLanguages} and a little bit of ${languages[2]}.`;

  return personInfo;
};
console.log(getPersonInfo(person));
/*
Asabeneh Yetayeh lives in Finland. He is  250 years old. He is an Instructor and Developer. He teaches HTML, CSS, JavaScript, React, Redux, Node, MongoDB, Python and D3.js. He speaks Amharic, English and a little bit of Suomi(Finnish)
*/
```

De la misma manera que desestructuramos objetos en los parámetros, también es posible **desestructurar un array directamente en la declaración de los parámetros** de una función. Esto es totalmente válido y muy común para extraer datos limpios de un argumento complejo sin declarar más variables. Por ejemplo: `function imprimir([primero, segundo]) { ... }`.

---


### Desestructuración del objeto durante la iteración

```js
const todoList = [
  {
    task: "Prepare JS Test",
    time: "4/1/2020 8:30",
    completed: true,
  },
  {
    task: "Give JS Test",
    time: "4/1/2020 10:00",
    completed: false,
  },
  {
    task: "Assess Test Result",
    time: "4/1/2020 1:00",
    completed: false,
  },
];

for (const { task, time, completed } of todoList) {
  console.log(task, time, completed);
}
```

---


```sh
Prepare JS Test 4/1/2020 8:30 true
Give JS Test 4/1/2020 10:00 false
Assess Test Result 4/1/2020 1:00 false
```


---

### Operador Spread o Rest

Cuando desestructuramos un array utilizamos el operador rest(...) para obtener el resto de elementos como array. Además utilizamos el operador spread para repartir los elementos del array en otro array.

El operador Spread `...` y el operador Rest `...` lucen idénticos. ¿Cómo los distingue el motor de JavaScript? Depende de dónde los uses: el operador **Rest** *RECOPILA* elementos (se usa del lado izquierdo de una asignación o en los parámetros de una función para agrupar el sobrante en un array real). Por otro lado, el operador **Spread** *EXPANDE* o desempaqueta elementos (se usa del lado derecho de una asignación, al crear nuevos arrays/objetos, o en llamadas a función).

### Operador Rest para obtener el resto de elementos del array

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let [num1, num2, num3, ...rest] = nums
​
console.log(num1, num2, num3)
console.log(rest)
```

```sh
1 2 3
[4, 5, 6, 7, 8, 9, 10]
```

```js
const countries = [
  "Germany",
  "France",
  "Belgium",
  "Finland",
  "Sweden",
  "Norway",
  "Denmark",
  "Iceland",
];

let [gem, fra, , ...nordicCountries] = countries;

console.log(gem);
console.log(fra);
console.log(nordicCountries);
```

---


```sh
Germany
France
["Finland", "Sweden", "Norway", "Denmark", "Iceland"]
```


---

### Spread operator to copy array

```js
const evens = [0, 2, 4, 6, 8, 10];
const evenNumbers = [...evens];

const odds = [1, 3, 5, 7, 9];
const oddNumbers = [...odds];

const wholeNumbers = [...evens, ...odds];

console.log(evenNumbers);
console.log(oddNumbers);
console.log(wholeNumbers);
```

```sh
[0, 2, 4, 6, 8, 10]
[1, 3, 5, 7, 9]
[0, 2, 4, 6, 8, 10, 1, 3, 5, 7, 9]
```

Puedes usar el operador Spread varias veces dentro del mismo array literal nuevo e incluso intercalarlo con valores primitivos. Por ejemplo: `const fusion = [...arr1, 99, ...arr2];` es totalmente legal.

Además, como los strings son estructuras iterables, el Spread Operator puede desempaquetarlos carácter por carácter. Si haces `const arr = [...'Hola'];`, el resultado será `['H', 'o', 'l', 'a']`.

El operador Spread también es sumamente útil para pasar elementos de un array como argumentos individuales a una función. Por ejemplo, `Math.max()` espera números sueltos separados por comas, no un array. Si tienes `const nums = [5, 9, 2];`, puedes usar `Math.max(...nums)` para desempaquetar el array y obtener el número mayor.

---


```js
const frontEnd = ["HTML", "CSS", "JS", "React"];
const backEnd = ["Node", "Express", "MongoDB"];
const fullStack = [...frontEnd, ...backEnd];

console.log(fullStack);
```

```sh
["HTML", "CSS", "JS", "React", "Node", "Express", "MongoDB"]
```


---

### Spread operator to copy object

Podemos copiar un objeto utilizando un operador spread (shallow copy) de manera muy elegante.

```js
const user = {
  name: "Asabeneh",
  title: "Programmer",
  country: "Finland",
  city: "Helsinki",
};

const copiedUser = { ...user };
console.log(copiedUser);
```

```sh
{name: "Asabeneh", title: "Programmer", country: "Finland", city: "Helsinki"}
```

Modificar o cambiar el objeto mientras se copia

---


```js
const user = {
  name: "Asabeneh",
  title: "Programmer",
  country: "Finland",
  city: "Helsinki",
};

const copiedUser = { ...user, title: "instructor" };
console.log(copiedUser);
```

```sh
{name: "Asabeneh", title: "instructor", country: "Finland", city: "Helsinki"}
```

Cuando fusionamos múltiples objetos usando el operador spread (por ejemplo, `const mixto = { ...obj1, ...obj2 };`), **el orden importa**. Las propiedades del último objeto inyectado sobreescribirán las propiedades con la misma clave de los objetos inyectados anteriormente. Si `obj1` tiene `{ a: 1 }` y `obj2` tiene `{ a: 2, b: 3