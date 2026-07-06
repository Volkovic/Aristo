## Añadiendo JavaScript a una página web

JavaScript puede ser añadido a una página web de tres maneras diferentes:

- **_Script en línea ('Inline script')_**
- **_Script interno_**
- **_Script externo_**
- **_Múltiples scripts_**

Las siguientes secciones muestran diferentes formas de añadir código JavaScript a nuestra página web.


---

### Script en línea

Crea una carpeta en tu escritorio y llámala 30DíasDeJS o en cualquier lugar y crea un archivo **_index.html_** en la carpeta del proyecto. Luego pega el siguiente código y ábrelo en un navegador, ya sea en [Chrome](https://www.google.com/chrome/).

    <!DOCTYPE html>
      <html>
       <head>
         <title>30DíasDeJS:Inline Script</title>
       </head>

       <body>
         <button onclick="alert('Bienvenido a 30DaysOfJavaScript!')">Hazme Click</button>
       </body>
    </html>

Ahora, escribiste tu primer inline script. Podemos crear un mensaje de alerta emergente usando la función integrada _alert()_.


---

### Script interno

El Script interno puede ser escrito en la cabecera del código _('head')_ o en el cuerpo _('body')_, pero es preferible ponerlo en el cuerpo del documento HTML. Primero, escribamos en la parte de la cabeza de la página.

    <!DOCTYPE html>
    <html>
        <head>
        <title>30DíasDeJS:Scripts Internos</title>
        <script>
            console.log("Bienvenido a 30DaysOfJavaScript!")
        </script>
        </head>
        <body>
        </body>
    </html>

Así es como escribimos el guión interno la mayor parte del tiempo. Escribir el código de JavaScript en la sección del body es el lugar más recomendado. Abre la consola del navegador para ver la respuesta del console.log()

    <!DOCTYPE html>
    <html>
        <head>
         <title>30DíasDeJS:Scripts Internos</title>
        </head>
        <body>
        <button onclick="alert('Bienvenido a 30DaysOfJavaScript!');">Click Me</button>
        <script>
            console.log("Bienvenido a 30DaysOfJavaScript!");
        </script>
        </body>
    </html>

---


Abre la consola del navegador para ver la respuesta del console.log()



### Script externo

Al igual que el script interno, el enlace del script externo puede estar en la cabecera del código ('head') o en el cuerpo ('body'), pero igualmente es recomendado ponerlo en el 'body'. Primero, debemos crear un archivo JavaScript externo con extensión .js. Cualquier archivo JavaScript termina con .js. Crea un archivo introduccion.js dentro del directorio del proyecto y escribe el siguiente código y enlaza este archivo .js en la parte inferior del cuerpo.

    console.log('Bienvenido a 30DaysOfJavaScript')

**Script externo en la cabecera**

    <!DOCTYPE html>
    <html>
        <head>
         <title>30DíasDeJS:Scripts Externos</title>
        <script src="introduction.js"></script>
        </head>
        <body>
        </body>
        </html>

**Script externo en el cuerpo**

    <!DOCTYPE html>
    <html>
        <head>
         <title>30DíasDeJS:Scripts Externos</title>
        </head>
        <body>
        //Podría estar en la cabecera o en el cuerpo...
        // Aquí está el lugar recomendado para poner el script externo
        <script src="introduction.js"></script>
        </body>
        </html>

---


Abre la consola del navegador para ver la respuesta del console.log()

### Múltiples Scripts externos

Podemos enlazar múltiples archivos externos de JavaScript a una página web. Crea un archivo holamundo.js dentro de la carpeta 30DiasDeJS y escribe el siguiente código.

    console.log('¡Hola, Mundo!')


    <!DOCTYPE html>
    <html>
        <cabeza>
        <título>Múltiples guiones externos</título>
        </cabeza>
        <cuerpo>

        <script src ="./holamundo.js"></script>
        <script src="./introduccion.js"></script>
        </cuerpo>
    </html>

Tu archivo main.js debería estar por debajo de todos los otros scripts. Ten cuidado con tu ejercicio para entender esta línea.




---

## Introducción a los tipos de datos

En JavaScript y también en otros lenguajes de programación, hay diferentes tipos de datos. Los siguientes son los tipos de datos primitivos de JavaScript: _Cadenas de texto ('string'), Números, Booleanos, undefined, Null_ y _Symbol_.

### Números

- Enteros: Números enteros (negativos, cero y positivos) Ejemplo: ... -3, -2, -1, 0, 1, 2, 3 ...
- Float: Números decimales Ejemplo ... -3.5, -2.25, -1.0, 0.0, 1.1, 2.2, 3.5 ...


---

### Cadenas de texto

Una colección de uno o más carácteres entre comillas. **Ejemplo:**

    "Asabeneh"
    "Finlandia"
    'JavaScript es un hermoso lenguaje de programación'.
    "Me encanta enseñar"
    "Espero que estés disfrutando del primer día"
    `También podemos crear una cadena usando un backtick`


---

### Booleanos

Un valor booleano es verdadero o falso. Cualquier comparación devuelve un valor booleano, que es verdadero o falso.

Un tipo de datos booleano es un valor Verdadero o Falso.

**Ejemplo:**

    true // si la luz está encendida, el valor es true
    falso // si la luz está apagada, el valor es Falso


---

### Undefined

En JavaScript, si no asignamos un valor a una variable, el valor es indefinido. Además, si una función no devuelve nada, devuelve undefined.

    let nombre;
    console.log(nombre); //no está definida, porque no está asignada a un valor todavía

### Null

Null en JavaScript significa un valor vacío/nulo.

    let valorVacio = null


---

## Comprobando los tipos de datos

Para comprobar el tipo de datos de un determinado valor, utilizamos el operador **'typeof'**. Véase el siguiente ejemplo.

    console.log(typeof 'Asabeneh') // string
    console.log(typeof 5) // número
    console.log(typeof true ) // boolean
    console.log(typeof null) // tipo de objeto
    console.log(typeof undefined) // undefined


---

## Comentarios

Los comentarios en JavaScript son similares a los de otros lenguajes de programación. Los comentarios son importantes para hacer tu código más legible. Hay dos maneras de comentar:

- _Comentario en una sola línea_
- _Comentario multilineal_

        // comentando el código mismo con un solo comentario
        // let nombre = 'Asabeneh'; comentario de una sola línea
        // let apellido = 'Yetayeh'; comentario de una sola línea

Comentario multilineal:

    /*
        let ubicación = 'Helsinki';
        let edad = 100;
        let casado = verdadero;
        Este es un comentario de varias líneas
     */


---

### Variables

Las variables son contenedores de datos. Las variables se utilizan para almacenar datos en una ubicación de memoria. Cuando se declara una variable, se reserva una ubicación de memoria. Cuando se asigna una variable a un valor (data), el espacio de memoria se llena con esos datos. Para declarar una variable, usamos palabras clave _var_, _let_ o _const_. Hablaremos más sobre var, let y const en detalle en otras secciones (ámbito). Por ahora, la explicación anterior es suficiente.

Para una variable que cambia en un momento diferente, usamos _let_. Si los datos no cambian en absoluto, usamos _const_. Por ejemplo, PI, nombre del país, gravedad no cambian, y podemos usar _const._

- El nombre de una variable en JavaScript no debe comenzar con un número.
- Un nombre de variable JavaScript no permite caracteres especiales excepto el signo de dólar y el guión bajo.
- Los nombres de las variables en JavaScript siguen una convención 'CamelCase'.
- El nombre de una variable no debe tener espacio entre palabras.

Los siguientes son ejemplos válidos de variables JavaScript.

Variables válidas en JavaScript:

    primerNombre
    apellido
    país
    ciudadCapital
    capital
    edad
    estaCasado

---


    nombre_de_pila
    apellido
    esta_casado
    ciudad_capital

    num1
    num_1
     _num_1
    $num1
    año2020
    año_2020

camelCase es convencional en JavaScript. En este material, usaremos variables de CamelCase.

Variables inválidas:

    primer-nombre
    1_numero
    num_#_1

Declaremos las variables con diferentes tipos de datos. Para declarar una variable, necesitamos usar la palabra clave let o const antes del nombre de la variable. Después del nombre de la variable, escribimos un signo igual (operador de asignación), y un valor.

---


    # Sintaxis
    let nombreDeLaVariable = valor

**Ejemplos: Variables**

    // Declarando diferentes variables de diferentes tipos de datos
    let nombre = 'Asabeneh' // nombre de una persona
    let apellido = 'Yetayeh' // apellido de una persona
    let pais = 'Finland' // país
    let ciudad = 'Helsinki' // ciudad capital
    let edad = 100 // edad en años
    let estaCasado = true

    console.log(nombre, apellido, país, ciudad, edad, estáCasado)


    Asabeneh Yetayeh Finlandia Helsinki 100 True

    // Declarando variables con valores numéricos
    let edad = 100 // edad en años
    const constante = 9,81 // gravedad terrestre en m/s2
    const puntoDeEbullición  = 100 // punto de ebullición del agua, temperatura en oC
    const PI = 3.14 // constante geométrica

---


    console.log(gravedad, punto de ebullición, PI)


    9.81 100 3.14


    // Las variables también pueden ser declaradas en una línea separada por una coma
    let nombre = 'Asabeneh', // nombre de una persona
    trabajo = 'profesor',
    viveEn = 'Finlandia';
    console.log(nombre, trabajo, viveEn);


    Asabeneh profesor de Finlandia

Cuando ejecutas los archivos en la carpeta Día_1 deberías obtener esto: