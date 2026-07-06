# Día 1 - Introducción


## ¡Bienvenido!

**Felicidades** por decidir participar en el desafío de programación _30 Días de Python_. En este reto aprenderás todo lo necesario para convertirte en programador Python y la mayoría de los conceptos de programación. Al finalizar el reto recibirás un certificado del desafío _30DaysOfPython_.

Si quieres participar activamente, únete al grupo de Telegram [30DaysOfPython challenge](https://t.me/ThirtyDaysOfPython).

## Introducción

Python es un lenguaje de programación de alto nivel, de propósito general. Es un lenguaje de código abierto, interpretado y orientado a objetos. Python fue creado por el programador holandés Guido van Rossum. El nombre del lenguaje proviene del show cómico británico _Monty Python's Flying Circus_. La primera versión se lanzó el 20 de febrero de 1991. Este desafío de 30 días te ayudará a aprender progresivamente la versión más reciente de Python, Python 3. Cada día cubre un tema diferente con explicaciones claras, ejemplos del mundo real, y muchos ejercicios y proyectos prácticos.

El reto es adecuado para principiantes y profesionales que quieran aprender Python. Completar el reto puede tomar de 30 a 100 días; los miembros activos del grupo de Telegram tienen más probabilidades de terminarlo.

Este reto fue escrito inicialmente en inglés sencillo, y luego traducido al chino. El reto es motivador, accesible y desafiante. Requiere dedicación para completarlo. Si aprendes mejor con vídeos, visita el canal Washera en YouTube: <a href="https://www.youtube.com/channel/UC7PNRuno1rzYPb1xLa4yktw">
Washera YouTube channel</a>. Puedes empezar por el video [Python for absolute beginners](https://youtu.be/OCCWZheOesI). Suscríbete, deja tus preguntas en los comentarios y sé proactivo; el autor te podrá notar.

El autor aprecia tus comentarios, que compartas el contenido y la retroalimentación sobre el reto 30DaysOfPython. Puedes dejar feedback aquí: [link](https://www.asabeneh.com/testimonials)


---

## ¿Por qué elegir Python?

Python es un lenguaje con sintaxis cercana al lenguaje humano, sencillo y fácil de aprender y usar.
Python es usado en muchas industrias y empresas (incluido Google). Se usa para desarrollar aplicaciones web, de escritorio, administración de sistemas y librerías de aprendizaje automático. Python está ampliamente adoptado en la comunidad de ciencia de datos y machine learning. Si esto no te convence, ¡es hora de empezar!

## Configuración del entorno

### Instalar Python

Para ejecutar scripts escritos en Python necesitas instalar Python. Visita la página de descargas de Python: [https://www.python.org/](https://www.python.org/).

Si usas Windows haz clic en el botón marcado en la imagen.

[![Instalar en Windows](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/installing_on_windows.png)](https://www.python.org/)

Si usas macOS haz clic en el botón marcado en la imagen.

[![Instalar en macOS](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/installing_on_macOS.png)](https://www.python.org/)

Para comprobar si Python está instalado, abre la terminal y ejecuta:

```shell
python --version
```

![Versión de Python](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/python_versio.png)

En mi terminal aparece Python 3.7.5. Tu versión puede variar, pero debe ser 3.6 o superior. Si ves la versión, Python está instalado. Continúa al siguiente apartado.


---

### Python Shell

Python es un lenguaje interpretado, no necesita compilación. Se ejecuta línea por línea. Python incluye el Python Shell (intérprete interactivo), también llamado REPL (Read Eval Print Loop). Se usa para ejecutar comandos Python individuales y ver resultados al instante.

El Python Shell espera código Python. Al escribir código lo interpreta y muestra el resultado.
Abre la terminal o el símbolo del sistema (cmd) y escribe:

```shell
python
```

![Python Scripting Shell](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/opening_python_shell.png)

El intérprete interactivo de Python estará abierto y mostrará el prompt >>> para que escribas comandos Python. Escribe tu primer script y pulsa Enter.
Veamos un ejemplo en el Shell interactivo.

![Script Python en el shell](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/adding_on_python_shell.png)

Genial: escribiste tu primer script en el Shell interactivo. ¿Cómo salir del Shell?
Para salir escribe **exit()** y pulsa Enter.

![Salir del shell de Python](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/exit_from_shell.png)

Ahora sabes cómo abrir y cerrar el intérprete interactivo.

Si escribes código inválido, Python mostrará un error. Probemos un error intencional:

![Error de sintaxis inválida](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/invalid_syntax_error.png)

El error indica Syntax Error: Invalid Syntax. Usar x para multiplicar no es válido en Python; el operador correcto es el asterisco (*). El error señala exactamente lo que hay que corregir.

El proceso de encontrar y corregir errores se llama depuración (debugging). Reemplazamos x por * y volvemos a ejecutar:

![Corrigiendo Error de sintaxis](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/fixing_syntax_error.png)

El error se corrige y el código produce el resultado esperado. Verás errores así a diario; aprender a depurar es esencial. Para depurar bien debes reconocer los tipos de errores: SyntaxError, IndexError, NameError, ModuleNotFoundError, KeyError, ImportError, AttributeError, TypeError, ValueError, ZeroDivisionError, etc. Los explicaremos más adelante.

Practiquemos más en el Python Shell. Abre la terminal y escribe python.

![Python Scripting Shell](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/opening_python_shell.png)

Con el Shell abierto hagamos operaciones matemáticas básicas: suma, resta, multiplicación, división, módulo y potencia.

Antes de programar, hagamos algunos cálculos:

- 2 + 3 = 5
- 3 - 2 = 1
- 3 * 2 = 6
- 3 / 2 = 1.5
- 3 ** 2 = 9

En Python también tenemos:

- 3 % 2 = 1 => resto de la división
- 3 // 2 = 1 => división entera (sin resto)

Conviértelo a código Python en el Shell. Primero escribe un comentario.

Un comentario es texto ignorado por Python. Sirve para documentar y mejorar la legibilidad. En Python los comentarios empiezan con #.
Así se escribe un comentario en Python:

```python
# Los comentarios comienzan con una almohadilla
# Este es un comentario en Python porque empieza con (#)
```

![Operaciones en el shell de Python](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/maths_on_python_shell.png)

Antes de continuar, practica más: cierra el Shell con _exit()_ y vuelve a abrirlo; escribe texto en el Shell:

![Escribir cadena en el shell de Python](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/writing_string_on_shell.png)



---

## Fundamentos de Python

### Sintaxis de Python

Los scripts Python se pueden escribir en el Shell interactivo o en un editor. Los archivos Python usan la extensión .py.

### Indentación en Python

La indentación son espacios en blanco en el código. En muchos lenguajes se usa para mejorar legibilidad; en Python se usa para definir bloques de código. En otros lenguajes se usan llaves. Un error común en Python es el error de indentación.

![Error de indentación](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/indentation.png)


---

### Comentarios

Los comentarios son importantes para la legibilidad. Python no ejecuta el texto dentro de comentarios.
Cualquier texto que comience con # en Python es un comentario.

# Ejemplo: comentario de una sola línea

```shell
# Este es el primer comentario
# Este es el segundo comentario
# Python se está apoderando del mundo
```

# Ejemplo: comentario multilínea (docstring)

Se pueden usar comillas triples para comentarios multilínea si no se asignan a una variable.

```shell
"""Este es un comentario multilínea
Los comentarios multilínea ocupan varias líneas.
Python se está apoderando del mundo
"""
```


---

### Tipos de datos

Python tiene varios tipos de datos. Empecemos por los más comunes. Veremos otros tipos más en detalle en secciones posteriores. A continuación un resumen para familiarizarte.

#### Números

- Enteros: ... -3, -2, -1, 0, 1, 2, 3 ...
- Flotantes: ... -3.5, -2.25, -1.0, 0.0, 1.1, 2.2, 3.5 ...
- Complejos: 1 + j, 2 + 4j

#### Cadenas

Texto entre comillas simples o dobles; para multilínea se usan comillas triples.

**Ejemplos:**

```py
'Asabeneh'
'Finland'
'Python'
'I love teaching'
'I hope you are enjoying the first day of 30DaysOfPython Challenge'
```

#### Booleanos

True o False. Deben estar en mayúscula.


---

**Ejemplo:**

```python
True  # ¿La luz está encendida? Si sí, el valor es True
False # ¿La luz está encendida? Si no, el valor es False
```

#### Listas

Lista ordenada que puede contener distintos tipos, similar a un array en JavaScript.

**Ejemplos:**

```py
[0, 1, 2, 3, 4, 5] # todos números
['Banana', 'Orange', 'Mango', 'Avocado'] # todos cadenas
['Finland','Estonia', 'Sweden','Norway'] # todos cadenas (países)
['Banana', 10, False, 9.81] # mezcla de tipos
```

#### Diccionarios

Colección no ordenada de pares clave:valor.


---

**Ejemplo:**

```py
{
'first_name':'Asabeneh',
'last_name':'Yetayeh',
'country':'Finland',
'age':250,
'is_married':True,
'skills':['JS', 'React', 'Node', 'Python']
}
```

#### Tuplas

Colección ordenada e inmutable.

**Ejemplo:**

```py
('Asabeneh', 'Pawel', 'Brook', 'Abraham', 'Lidiya') # nombres
```

```py
('Earth', 'Jupiter', 'Neptune', 'Mars', 'Venus', 'Saturn', 'Uranus', 'Mercury') # planetas
```

#### Conjuntos

Colección no ordenada que almacena elementos únicos (sin duplicados).

**Ejemplos:**

```py
{2, 4, 3, 5}
{3.14, 9.81, 2.7} # el orden en un set no importa
```

Detallaremos cada tipo de dato en secciones posteriores.


---

### Comprobar tipos de datos

Usa la función built-in **type** para comprobar el tipo de una variable. En la imagen puedes ver ejemplos:

![Comprobando tipos de datos](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/checking_data_types.png)

### Archivos Python

Abre tu carpeta de proyecto 30DaysOfPython (créala si no existe). Dentro crea helloworld.py. Repite lo que hicimos en el Shell pero usando print() para ver resultados en consola desde un archivo.

En el intérprete se imprime sin print, pero en tu editor debes usar la función _print()_. Ejemplo de uso: _print('argumento1', 'argumento2')_.

**Ejemplo:** archivo helloworld.py

```py
# Día 1 - Desafío 30DaysOfPython

print(2 + 3)             # Suma (+)
print(3 - 1)             # Resta (-)
print(2 * 3)             # Multiplicación (*)
print(3 / 2)             # División (/)
print(3 ** 2)            # Potencia (**)
print(3 % 2)             # Módulo (%)
print(3 // 2)            # División entera (//)

# Comprobar tipos de datos
print(type(10))          # entero
print(type(3.14))        # flotante
print(type(1 + 3j))      # complejo
print(type('Asabeneh'))  # cadena
print(type([1, 2, 3]))   # lista
print(type({'name':'Asabeneh'})) # diccionario
print(type({9.8, 3.14, 2.7}))    # conjunto
print(type((9.8, 3.14, 2.7)))    # tupla
```

Para ejecutar el archivo: en tu editor usa el botón verde o en la terminal escribe _python helloworld.py_.

![Ejecutando script Python](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/running_python_script.png)

Genial. Completaste el Día 1. Practica con los ejercicios siguientes.


---