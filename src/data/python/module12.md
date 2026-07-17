# Día 12 - Módulos

## Módulos

### ¿Qué es un módulo?

Un módulo es un archivo que contiene un conjunto de código o funciones que se pueden incluir en una aplicación. Un módulo puede ser un archivo con una sola variable, una función o una biblioteca de gran escala. En Python, cualquier archivo de texto con extensión `.py` que contenga funciones, clases y variables diseñadas para ser incluidas en otros proyectos se considera un módulo.

### Crear módulos

Para crear un módulo, escribimos código en un script de Python y lo guardamos con extensión .py. En la carpeta del proyecto crea un archivo llamado mymodule.py. Escribamos algo de código en ese archivo.

```py
# archivo mymodule.py
def generate_full_name(firstname, lastname):
    return firstname + ' ' + lastname
```

En el directorio del proyecto crea un archivo main.py e importa mymodule.py.

Si tienes muchos módulos, puedes agruparlos en carpetas. En Python, para que una simple carpeta llena de módulos `.py` se transforme formalmente en un "Paquete" (Package) importable, debes incluir un archivo (usualmente vacío) llamado `__init__.py` dentro de ese directorio.


---

### Importar módulos

Para importar archivos usamos la palabra clave import y el nombre del archivo.

```py
# archivo main.py
import mymodule
print(mymodule.generate_full_name('Asabeneh', 'Yetayeh')) # Asabeneh Yetayeh
```

Es importante saber qué ocurre internamente al importar un módulo. Cuando importas un archivo por primera vez, Python compila y ejecuta todo el código de nivel superior (fuera de funciones o clases) de arriba a abajo. Para optimizar el rendimiento (Performance), Python guarda el módulo en caché en la memoria RAM; si otro archivo vuelve a intentar importarlo, usará la versión cacheada en lugar de volver a leerlo desde el disco duro.

Para evitar que cierto código (como pruebas o impresiones en consola) se ejecute accidentalmente al ser importado, se utiliza la condición mágica `if __name__ == '__main__':`. Este bloque de seguridad asegura que el código en su interior SOLO se ejecute si el archivo es ejecutado directamente desde la consola, pero se ignora si el archivo fue importado como módulo en otro script.

Por convención y buenas prácticas (Guía de Estilos PEP 8), todas tus sentencias `import` deben colocarse siempre en bloque en la parte superior absoluta del archivo.


---

### Importar funciones desde un módulo

Podemos tener muchas funciones en un archivo y podemos importar cada una por separado. Python detecta automáticamente los archivos locales en la misma ruta, por lo que puedes importar usando el nombre del archivo sin la extensión `.py`.

```py
# archivo main.py
from mymodule import generate_full_name, sum_two_nums, person, gravity
print(generate_full_name('Asabneh','Yetayeh'))
print(sum_two_nums(1,9))
mass = 100
weight = mass * gravity
print(weight)
print(person['firstname'])
```


---

### Importar funciones y renombrarlas

Durante la importación también podemos renombrar nombres.

```py
# archivo main.py
from mymodule import generate_full_name as fullname, sum_two_nums as total, person as p, gravity as g
print(fullname('Asabneh','Yetayeh'))
print(total(1, 9))
mass = 100
weight = mass * g
print(weight)
print(p)
print(p['firstname'])
```

También es posible importar un módulo completo y darle un alias (un apodo más corto) para no escribir su nombre largo todo el tiempo usando la sintaxis `import nombre_modulo as alias`, por ejemplo: `import pandas as pd`.

*Nota sobre colisiones:* Si usas la sintaxis `from modulo import *`, importarás absolutamente todas las funciones y variables directamente a tu espacio de nombres global. Esto se considera una mala práctica porque puede generar conflictos. Por ejemplo, si tienes una variable local `pi = 3` y luego haces `from math import pi`, el valor importado sobrescribirá en memoria a tu variable original (fenómeno conocido como *Shadowing* o colisión de nombres).


---

## Importar módulos incorporados

Al igual que otros lenguajes, podemos importar módulos usando la palabra clave import. A esta gigantesca colección de módulos integrados que vienen preinstalados al descargar Python se le conoce como la **Librería Estándar (Standard Library)**. Gracias a ella, se dice que Python viene con "baterías incluidas", ya que provee soluciones listas para usarse sin necesidad de descargas adicionales. A continuación importamos algunos módulos incorporados que usamos con frecuencia. Algunos módulos comunes son: math, datetime, os, sys, random, statistics, collections, json, re.

Para instalar módulos o paquetes de terceros (creados por la comunidad, ajenos a la librería estándar), se utiliza el gestor de paquetes de la terminal con el comando `pip install nombre_del_paquete`.

### Módulo OS

El módulo os de Python permite automatizar muchas tareas del sistema operativo. El módulo OS ofrece funciones para crear, cambiar directorio de trabajo, eliminar directorios (carpetas), obtener su contenido y reconocer/cambiar el directorio actual.

```py
# importar módulo
import os
# crear directorio
os.mkdir('directory_name')
# cambiar el directorio actual
os.chdir('path')
# obtener el directorio actual
os.getcwd()
# eliminar directorio
os.rmdir()
```


---

### Módulo sys

El módulo sys provee funciones y variables para interactuar con diferentes partes del entorno de ejecución de Python. La función sys.argv devuelve la lista de argumentos de la línea de comandos pasados al script de Python. El elemento en el índice 0 de esa lista es siempre el nombre del script, el índice 1 es el primer argumento pasado desde la línea de comandos.

Ejemplo archivo script.py:

```py
import sys
#print(sys.argv[0], argv[1],sys.argv[2])  # esta línea imprimirá: nombre_archivo argumento1 argumento2
print('Welcome {}. Enjoy  {} challenge!'.format(sys.argv[1], sys.argv[2]))
```

Para ver cómo funciona el script, en la línea de comandos escribe:

```sh
python script.py Asabeneh 30DaysOfPython
```

Resultado:

```sh
Welcome Asabeneh. Enjoy  30DayOfPython challenge!
```

Algunos comandos útiles de sys:

```py
# salir del script
sys.exit()
# conocer el tamaño máximo de un entero
sys.maxsize
# sys.path es una lista de directorios (paths) donde el intérprete buscará exhaustivamente un módulo al hacer import
sys.path
# conocer la versión de Python en uso
sys.version
```


---

### Módulo statistics

El módulo statistics proporciona funciones de estadísticas para datos numéricos. Algunas funciones comunes definidas en este módulo: mean, median, mode, stdev, etc.

```py
from statistics import * # importar todo del módulo statistics
ages = [20, 20, 4, 24, 25, 22, 26, 20, 23, 22, 26]
print(mean(ages))       # ~22.9
print(median(ages))     # 23
print(mode(ages))       # 20
print(stdev(ages))      # ~2.3
```


---

### Módulo math

Contiene muchas operaciones matemáticas y constantes.

```py
import math
print(math.pi)           # 3.141592653589793, constante pi
print(math.sqrt(2))      # 1.4142135623730951, raíz cuadrada
print(math.pow(2, 3))    # 8.0, potencia
print(math.floor(9.81))  # 9, redondeo hacia abajo
print(math.ceil(9.81))   # 10, redondeo hacia arriba
print(math.log10(100))   # 2, logaritmo base 10
```

Ahora que hemos importado el módulo math con muchas funciones útiles, podemos ver qué funciones contiene usando `help(math)` o la función integrada `dir(math)`. La función `dir(modulo)` es una excelente herramienta de introspección que devuelve una lista ordenada alfabéticamente de TODOS los nombres (funciones, variables, clases) definidos o exportables por ese módulo. Si sólo queremos importar funciones específicas podemos hacerlo así:

```py
from math import pi
print(pi)
```

También podemos importar múltiples funciones:

```py
from math import pi, sqrt, pow, floor, ceil, log10
print(pi)                 # 3.141592653589793
print(sqrt(2))            # 1.4142135623730951
print(pow(2, 3))          # 8.0
print(floor(9.81))        # 9
print(ceil(9.81))         # 10
print(math.log10(100))    # 2
```

Si queremos importar todas las funciones del módulo matemático podemos usar *.

```py
from math import *
print(pi)                  # 3.141592653589793, constante pi
print(sqrt(2))             # 1.4142135623730951, raíz cuadrada
print(pow(2, 3))           # 8.0, potencia
print(floor(9.81))         # 9, redondeo hacia abajo
print(ceil(9.81))          # 10, redondeo hacia arriba
print(math.log10(100))     # 2
```

También podemos renombrar funciones al importarlas.

```py
from math import pi as PI
print(PI) # 3.141592653589793
```


---

### Módulo string

El módulo string es muy útil. Los siguientes ejemplos muestran algunos usos.

```py
import string
print(string.ascii_letters) # abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
print(string.digits)        # 0123456789
print(string.punctuation)   # !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```


---

### Módulo random

Ahora que sabes importar módulos, familiaricémonos con random. El módulo random nos da números aleatorios entre 0 y 0.9999. El módulo tiene muchas funciones; aquí usamos random, randint y choice.

```py
from random import random, randint, choice
print(random())   # no necesita parámetros; devuelve un valor entre 0 y 0.9999
print(randint(5, 20)) # devuelve un entero aleatorio en [5, 20] (inclusive)
usuarios = ['A', 'B', 'C']
print(choice(usuarios)) # toma una secuencia (como una lista) y retorna un elemento al azar de manera equitativa
```