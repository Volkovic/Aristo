## Tipos de Datos

En la sección anterior, mencionamos un poco sobre los tipos de datos. Los datos o valores tienen tipos de datos. Los tipos de datos describen las características de los datos. Los tipos de datos se pueden dividir en dos:

1. Tipos de datos primitivos
2. Tipos de datos que no son primitivos (referencias de objetos)

### Tipos de datos primitivos

Los tipos de datos primitivos en JavaScript incluyen:

1.  Números: enteros, flotantes
2.  Cadenas: cualquier dato entre comillas simples, comillas dobles o comillas invertidas
3.  Booleanos: valor verdadero o falso
4.  Nulo - valor vacío o sin valor
5.  Indefinido - una variable declarada sin un valor

Los tipos de datos que no son primitivos en JavaScript incluyen:

1. Objetos
2. Funciones
3. Matrices

Ahora, veamos qué significan exactamente los tipos de datos primitivos y no primitivos.
Los tipos de datos _primitivos_ son tipos de datos inmutables (no modificables). Una vez que se crea un tipo de datos primitivo, no podemos modificarlo.

---


**Ejemplo:**

```js
let word = "JavaScript";
```

Si intentamos modificar la cadena almacenada en la variable _word_, JavaScript debería generar un error. Cualquier tipo de datos bajo comillas simples, comillas dobles o comillas invertidas son un tipo de datos de cadena.

```js
word[0] = "Y";
```

Esta expresión no cambia la cadena almacenada en la variable _word_. Entonces, podemos decir que las cadenas no son modificables o, en otras palabras, inmutables. Los tipos de datos primitivos se comparan por sus valores. Comparemos diferentes valores de datos. Vea el ejemplo a continuación:

```js
let numOne = 3;
let numTwo = 3;

console.log(numOne == numTwo); // Verdadero

let js = "JavaScript";
let py = "Python";

console.log(js == py); // Falso

let lightOn = true;
let lightOff = false;

console.log(lightOn == lightOff); // Falso
```

Además de compararse por valor, los tipos primitivos se **asignan por valor**. Esto significa que si asignamos una variable primitiva a otra, se crea una copia independiente. Por ejemplo, si hacemos `let a = 1; let b = a; a = 2;`, la variable `b` seguirá valiendo `1` porque recibió una copia del valor, no una referencia.

---


### Tipos de datos no primitivos

Los tipos de datos _no primitivos_ son modificables o mutables. Podemos modificar el valor de los tipos de datos no primitivos después de su creación.
Veamos creando una matriz. Una matriz es una lista de valores de datos entre corchetes. Las matrices pueden contener tipos de datos iguales o diferentes. Los valores de matriz están referenciados por su índice. En el índice de matriz de JavaScript comienza en cero. Es decir, el primer elemento de una matriz se encuentra en el índice cero, el segundo elemento en el índice uno y el tercer elemento en el índice dos, etc.

```js
let nums = [1, 2, 3];
nums[0] = 10;

console.log(nums); // [10, 2, 3]
```

Como puede ver, una matriz, que es un tipo de datos no primitivo, es mutable. Los tipos de datos no primitivos no se pueden comparar por valor. Incluso si dos tipos de datos no primitivos tienen las mismas propiedades y valores, no son estrictamente iguales.

```js
let nums = [1, 2, 3];
let numberos = [1, 2, 3];

console.log(nums == numbers); // Falso

let usuarioUno = {
  nombre: "Asabeneh",
  papel: "teaching",
  pais: "Finland",
};

let usuarioDos = {
  nombre: "Asabeneh",
  papel: "teaching",
  pais: "Finland",
};

console.log(usuarioUno == usuarioDos); // Falso
```

---


Como regla general, no comparamos tipos de datos no primitivos. No compare matrices, funciones u objetos.
Los valores no primitivos se conocen como tipos de referencia, porque se comparan por referencia en lugar de por valor. Dos objetos solo son estrictamente iguales si se refieren al mismo objeto subyacente.

```js
let nums = [1, 2, 3];
let numberos = nums;

console.log(nums == numbers); // Verdadero

let usuarioUno = {
  nombre: "Asabeneh",
  papel: "teaching",
  pais: "Finland",
};

let userTwo = userOne;

console.log(usuarioUno == usuarioDos); // Verdadero
```

Si tiene dificultades comprendiendo la diferencia entre los tipos de datos primitivos y los tipos de datos no primitivos, no es el único. Cálmate y ve a la siguiente sección e intenta volver después de un tiempo. Ahora comencemos los tipos de datos por tipo de número.


---

## Números

Los números son números enteros y valores decimales que pueden hacer todas las operaciones aritméticas.
Veamos algunos ejemplos de Números.

### Declaración de tipos de datos numéricos

```js
let edad = 35;
const gravedad = 9.81; // usamos const para valores que no cambian, constante gravitacional en m/s2
let masa = 72; // masa en Kilogramo
const PI = 3.14; // pi una constante geométrica

// Más ejemplos
const boilingPoint = 100; // temperatura en oC, punto de ebullición del agua que es una constante
const bodyTemp = 37; // oC la temperatura corporal promedio del ser humano, que es una constante

console.log(edad, gravedad, masa, PI, boilingPoint, bodyTemp);
```

En JavaScript, los números utilizan un formato de coma flotante de doble precisión. El valor máximo seguro para un número entero antes de perder precisión es `Number.MAX_SAFE_INTEGER` (aproximadamente 9 mil billones); para sobrepasar eso, se usa el tipo `BigInt`.
Además, a diferencia de otros lenguajes que arrojan una excepción fatal, dividir un número positivo entre cero (por ejemplo, `let z = 5 / 0;`) devolverá el valor especial numérico `Infinity`.
Para realizar operaciones de potenciación, además del objeto Math, desde ES7 podemos usar el operador de exponenciación `**`. Por ejemplo, 2 elevado al cubo se escribe como `2 ** 3`, lo cual da 8.

---

### Objeto matemático

En JavaScript, el objeto matemático proporciona muchos métodos para trabajar con números.

```js
const PI = Math.PI;

console.log(PI); // 3.141592653589793

// Redondeo al número más cercano
// si es superior a 0,5 hacia arriba si es inferior a 0,5 redondeo hacia abajo

console.log(Math.round(PI)); // 3 para redondear valores al número más cercano

console.log(Math.round(9.81)); // 10

console.log(Math.floor(PI)); // 3 redondeando hacia abajo

console.log(Math.ceil(PI)); // 4 redondeando hacia arriba

console.log(Math.min(-5, 3, 20, 4, 5, 10)); // -5, devuelve el valor mínimo

console.log(Math.max(-5, 3, 20, 4, 5, 10)); // 20, devuelve el valor máximo

const randNum = Math.random(); // crea un número aleatorio entre 0 y 0,999999
console.log(randNum);

// Vamos a crear un número aleatorio entre 0 y 10

const num = Math.floor(Math.random() * 11); // crea un número aleatorio entre 0 y 10
console.log(num);

//Valor absoluto
console.log(Math.abs(-10)); // 10

//Raíz cuadrada
console.log(Math.sqrt(100)); // 10

console.log(Math.sqrt(2)); // 1.4142135623730951

// Poder
console.log(Math.pow(3, 2)); // 9

console.log(Math.E); // 2.718

// Logaritmo
// Devuelve el logaritmo natural con base E de x, Math.log(x)
console.log(Math.log(2)); // 0.6931471805599453
console.log(Math.log(10)); // 2.302585092994046

// Devuelve el logaritmo natural de 2 y 10 respectivamente
console.log(Math.LN2); // 0.6931471805599453
console.log(Math.LN10); // 2.302585092994046

// Trigonometría
Math.sin(0);
Math.sin(60);

Math.cos(0);
Math.cos(60);
```

---


#### Generador de números aleatorios

El objeto matemático de JavaScript tiene un generador de números de método random() que genera un número de 0 a 0.999999999...

```js
let randomNum = Math.random(); // genera 0 a 0.999...
```

Ahora, veamos cómo podemos usar el método random() para generar un número aleatorio entre 0 y 10:

```js
let randomNum = Math.random(); //  0 a 0.999
let numBtnZeroAndTen = randomNum * 11;

console.log(numBtnZeroAndTen); // esto da: min 0 y max 10.99

let randomNumRoundToFloor = Math.floor(numBtnZeroAndTen);
console.log(randomNumRoundToFloor); // esto da entre 0 y 10
```


---

## Cadenas

Las cadenas son textos, que están debajo de **_single_** , **_double_**, **_back-tick_** comillas. Para declarar una cadena, necesitamos un nombre de variable, un operador de asignación, un valor entre comillas simples, comillas dobles o comillas invertidas.
Veamos algunos ejemplos de cadenas:

```js
let espacio = " "; // una cadena de espacio vacío
let primerNombre = "Asabeneh";
let apellido = "Yetayeh";
let pais = "Finland";
let ciudad = "Helsinki";
let idioma = "JavaScript";
let trabajo = "teacher";
let cita = "The saying,'Seeing is Believing' is not correct in 2020.";
let quotConBackTick = `The saying,'Seeing is Believing' is not correct in 2020.`;
```


---

### Concatenación de cadenas

La conexión de dos o más cadenas entre sí se llama concatenación.
Usando las cadenas declaradas en la sección de Cadenas anterior:

```js
let nombreCompleto = primerNombre + espacio + apellido; // concatenación, fusionando dos cadenas juntas.
console.log(nombreCompleto);
```

```sh
Asabeneh Yetayeh
```

Podemos concatenar cadenas de diferentes formas.


---

#### Concatenar usando el operador de suma

Concatenar usando el operador de suma es una forma antigua. Esta forma de concatenar es tediosa y propensa a errores. Es bueno saber cómo concatenar de esta manera, pero recomiendo enfáticamente usar las cadenas de plantilla ES6 (explicadas más adelante).

```js
// Declarar diferentes variables de diferentes tipos de datos
let espacio = " ";
let primerNombre = "Asabeneh";
let apellido = "Yetayeh";
let pais = "Finland";
let ciudad = "Helsinki";
let idioma = "JavaScript";
let trabajo = "teacher";
let edad = 250;

let nombreCompleto = primerNombre + espacio + apellido;
let datosPersonaUno =
  nombreCompleto + ". Yo tengo " + edad + ". Vivo en" + pais; // Adición de cadena ES5

console.log(personInfoOne);
```

---


```sh
Asabeneh Yetayeh. Yo tengo 250v Finland
```

#### Cadenas literales largas

Una cadena puede ser un solo carácter, un párrafo o una página. Si la longitud de la cadena es demasiado grande, no cabe en una línea. Podemos usar el carácter de barra invertida (\\) al final de cada línea para indicar que la cadena continuará en la línea siguiente.
**Ejemplo:**

```js
const parrafo =
  "Mi nombre es Asabeneh Yetayeh. Vivo en Finlandia, Helsinki.\
Soy profesora y me encanta enseñar. Enseño HTML, CSS, JavaScript, React, Redux, \
Node.js, Python, Data Analysis y D3.js para cualquier persona interesada en aprender. \
A fines de 2019, estaba pensando en expandir mi enseñanza y llegar a \
a la audiencia global y comencé un desafío de Python del 20 de noviembre al 19 de diciembre.\
Fue una de las experiencias más gratificantes e inspiradoras.\
Ahora, estamos en 2020. Disfruto preparando el desafío 30DaysOfJavaScript y \
Espero que tú también estés disfrutando.";

console.log(parrafo);
```

---


#### Secuencias de escape en cadenas

En JavaScript y otros lenguajes de programación \ seguido de algunos caracteres es una secuencia de escape. Veamos los caracteres de escape más comunes:

-\n: nueva linea

- \t: Tabulador, significa 8 espacios
- \\\\: barra invertida
- \\': Una frase (')
- \\": comillas dobles (")

```js
console.log(
  "Espero que todos estén disfrutando el desafío de 30 días de JavaScript.¿Y tú?"
); // salto de línea
console.log("Días\temasEjercicios");
console.log("Día 1\t3\t5");
console.log("Día 2\t3\t5");
console.log("Día 3\t3\t5");
console.log("Día 4\t3\t5");
console.log("Este es un símbolo de barra invertida (\\)"); // Para escribir una barra invertida
console.log(
  'En todos los lenguajes de programación comienza con "¡Hola, mundo!"'
);
console.log(
  "En todos los lenguajes de programación comienza con '¡Hola, mundo!'"
);
console.log("El dicho 'Ver para creer' no es correcto en 2022");
```

---


Salida en consola:

```sh
Espero que todos estén disfrutando el desafío de 30 días de JavaScript.
¿Y tú?

Días temas Ejercicios
Día 1 3 5
Día 2 3 5
Día 3 3 5
Día 4 3 5
Este es un símbolo de barra invertida (\)
En todos los lenguajes de programación comienza con"¡Hola, mundo!"
En todos los lenguajes de programación comienza con"¡Hola, mundo!"
El dicho 'Ver para creer' no es correcto en 2022
```


---

#### Literales de plantilla

Para crear una plantilla de cadenas(cadenas de plantilla), usamos dos tildes de retroceso. Podemos inyectar datos como expresiones dentro de una cadena de plantilla. Para inyectar datos, encerramos la expresión con un corchete ({}) precedido por un signo $. Consulte la sintaxis a continuación.

```js
//Sintaxis
`Texto literal de cadena``Cadena de texto literal ${expresión}`;
```

**Ejemplo: 1**