# Día 20 - PIP

## Python PIP - Gestor de paquetes de Python

### ¿Qué es PIP?

PIP significa Preferred Installer Program, que en español puede traducirse como «programa de instalación preferido». También es conocido por el acrónimo recursivo clásico **«PIP Installs Packages»**. Usamos _pip_ para instalar paquetes de Python.
Un paquete es una colección de módulos (o subpaquetes) que podemos instalar y luego importar en nuestras aplicaciones.
En la práctica, en lugar de reescribir utilidades comunes, instalamos paquetes útiles y los importamos.

Cuando ejecutas un comando de instalación, la herramienta PIP se conecta silenciosamente a los servidores web del **PyPI (Python Package Index)**. PyPI es el repositorio de software oficial público en internet donde residen todos los paquetes de terceros (third-party) alojados por la comunidad global de Python. Desde allí, PIP busca el código fuente y lo descarga a tu computadora.


---

### Instalar PIP

Si aún no tienes pip instalado, instálalo ahora. En la terminal o símbolo del sistema ejecuta:

```sh
pip install pip
```

Comprueba si pip está instalado con:

```sh
pip --version
```

```py
pip --version
# ejemplo de salida:
# pip 21.1.3 from /usr/local/lib/python3.7/site-packages/pip (python 3.9.6)
```

Si ves un número diferente, significa que pip está instalado en tu sistema.

A veces, al usar PIP, puedes ver un mensaje de advertencia (WARNING) indicando que hay una nueva versión disponible (ej. *'You are using pip version 20.2.3; however, version 23.2 is available'*). Esto ocurre porque PIP es un programa en sí mismo y los desarrolladores lanzan nuevas versiones constantemente. Mantener PIP actualizado previene errores bizarros al instalar dependencias modernas que usan nuevos sistemas de compilación. Para decirle a PIP que se actualice a sí mismo a la última versión, debes ejecutar `python -m pip install --upgrade pip`. Al usar `python -m`, le decimos a Python que ejecute PIP como un módulo, lo que permite que PIP se sobrescriba a sí mismo (especialmente en Windows) sin lanzar un error de 'archivo en uso'.


---

### Instalar paquetes con pip

Probemos a instalar _numpy_, una librería numérica de Python muy usada en ciencia de datos y aprendizaje automático.

- NumPy ofrece:
  - Potentes arrays N-dimensionales
  - Operaciones vectorizadas (broadcasting)
  - Herramientas para integrar con C/C++ y Fortran
  - Funciones de álgebra lineal, transformadas de Fourier y generadores aleatorios

```sh
pip install numpy
```

Ejemplo de uso en el intérprete de Python:

```py
>>> import numpy
>>> numpy.version.version
'1.20.1'
>>> lst = [1, 2, 3, 4, 5]
>>> np_arr = numpy.array(lst)
>>> np_arr
array([1, 2, 3, 4, 5])
>>> len(np_arr)
5
>>> np_arr * 2
array([ 2,  4,  6,  8, 10])
>>> np_arr + 2
array([3, 4, 5, 6, 7])
```

Pandas es otra librería muy usada para estructuras de datos y análisis. Instalémosla:

```sh
pip install pandas
```

```py
>>> import pandas
```

Cuando haces `pip install`, las librerías se instalan físicamente en la carpeta `site-packages` dentro del entorno activo de Python. El `sys.path` de Python siempre busca primero ahí adentro cuando usas la instrucción `import`.

Si necesitas obligar a PIP a actualizar un paquete de terceros que ya está instalado en tu máquina a su versión más nueva, puedes usar el flag `--upgrade` (o `-U`). Por ejemplo: `pip install pandas --upgrade`. Esto le dice a PIP que ignore la versión actual, la borre y descargue lo más nuevo que encuentre.

En ocasiones, una versión nueva puede romper tu código. Si quieres instalar una versión ESPECÍFICA de un paquete, usas el doble igual (`==`), lo que obliga a PIP a buscar en los repositorios históricos e instalar la versión estricta solicitada: `pip install pandas==1.20.0`. PIP también soporta expresiones matemáticas y operadores relacionales (>=, <=, <) para resolver matemáticamente la mejor versión segura. Por ejemplo, para instalar una versión mayor o igual a 1.0.0 pero menor a 2.0.0, usarías: `pip install "pandas>=1.0.0,<2.0.0"`.

Si al ejecutar un comando de instalación PIP te arroja el error *'Could not find a version that satisfies the requirement'*, significa que no tienes conexión a PyPI, escribiste muy mal el nombre (typo) o la librería simplemente no existe.

**Nota de seguridad:** NUNCA se recomienda instalar librerías globalmente usando permisos de Administrador (ej. `sudo pip install` en Linux/Mac). Hacerlo sobrescribirá o romperá las librerías propias que usa el Sistema Operativo (que muchas veces está escrito en Python), llevando a un daño crítico del sistema. Por esta razón nacieron los Entornos Virtuales.

Esta sección no pretende profundizar en NumPy o Pandas, sino solo mostrar cómo instalar e importar paquetes.

Hay módulos de la librería estándar, por ejemplo _webbrowser_, que permiten abrir sitios web. No necesitan instalación.

```py
import webbrowser  # módulo para abrir sitios web

# lista de URLs de ejemplo
url_lists = [
    'http://www.python.org',
    'https://www.linkedin.com/in/asabeneh/',
    'https://github.com/Asabeneh',
    'https://twitter.com/Asabeneh',
]

# abrir cada URL en una nueva pestaña
for url in url_lists:
    webbrowser.open_new_tab(url)
```


---

### Desinstalar paquetes

Para eliminar un paquete instalado y purgar sus archivos fuente de tu instalación local (liberando espacio y evitando conflictos):

```sh
pip uninstall packagename
```

### Lista de paquetes

Para imprimir en pantalla un reporte en formato lista de TODOS los paquetes actualmente instalados en tu entorno (mostrando el nombre exacto y su versión):

```sh
pip list
```


---

### Mostrar información del paquete

Para verificar los metadatos de un paquete instalado (quién lo creó, dónde está instalado en tu disco duro, su licencia, etc.):

```sh
pip show packagename
```

Ejemplo:

```sh
pip show pandas
```

Salida de ejemplo:

```txt
Name: pandas
Version: 1.2.3
Summary: Powerful data structures for data analysis, time series, and statistics
Home-page: http://pandas.pydata.org
Author: None
Author-email: None
License: BSD
Location: /usr/local/lib/python3.7/site-packages
Requires: python-dateutil, pytz, numpy
Required-by:
```

Si quieres más detalles puedes añadir --verbose.

Históricamente, existía el comando `pip search nombre_paquete` para realizar búsquedas por palabras clave en la base de datos pública y encontrar librerías que no recordabas cómo se llamaban. Sin embargo, debido a bots y scraping masivo, el equipo de PyPI deshabilitó esta función, por lo que ahora debes buscar los paquetes manualmente en la página web pypi.org.


---

### PIP Freeze

Genera una lista de paquetes instalados EXACTAMENTE en el formato requerido por los archivos de requerimientos (ej. `requests==2.31.0`). A diferencia de `pip list`, exporta con la sintaxis de doble igual:

```sh
pip freeze
```

Salida de ejemplo:

```txt
docutils==0.11
Jinja2==2.7.2
MarkupSafe==0.19
Pygments==1.6
Sphinx==1.2.2
```

La convención mundial para el nombre del archivo de texto que almacena la lista de dependencias de tu proyecto es `requirements.txt`. Cualquier desarrollador que clone tu proyecto de GitHub buscará instintivamente este archivo para saber qué librerías necesita instalar.

Para crear este archivo de dependencias utilizando la salida directa de PIP en la terminal, usamos el operador de redirección `>`:

```sh
pip freeze > requirements.txt
```

El operador `>` toma la salida del comando y, en vez de mostrarla en pantalla, la inyecta directamente dentro del archivo de texto. Si tienes un nuevo proyecto y te pasaron el archivo `requirements.txt`, puedes leer el archivo e instalar automáticamente todas las librerías que contiene de un solo golpe usando el flag `-r` (requirement):

```sh
pip install -r requirements.txt
```

Para mantener la salud de tu entorno, puedes usar el comando `pip check`. Este comando hace un chequeo de cordura interno para verificar si hay conflictos (librerías que requieren versiones incompatibles de la misma dependencia cruzada, lo que se conoce como Dependency Hell).


---

### Leer datos desde una URL

A veces queremos leer datos desde una URL (por ejemplo APIs que devuelven JSON). Para eso usamos el paquete _requests_.

Instálalo con:

```sh
pip install requests
```

En requests veremos métodos y atributos como _get()_, _status_code_, _headers_, _text_, _json()_:
  - _get()_: solicita una URL y devuelve un objeto Response
  - _status_code_: código HTTP de la respuesta
  - _headers_: cabeceras de la respuesta
  - _text_: contenido en texto
  - _json()_: parsea JSON y devuelve estructuras de Python

Ejemplo leyendo un archivo de texto desde la web:

```py
import requests  # importar requests

url = 'https://www.w3.org/TR/PNG/iso_8859-1.txt'  # URL con texto

response = requests.get(url)  # solicitar URL
print(response)
print(response.status_code)  # código de estado, 200 indica éxito
print(response.headers)      # cabeceras de la respuesta
print(response.text)         # contenido en texto
```

Ejemplo leyendo una API que devuelve JSON (API de países):

```py
import requests
url = 'https://restcountries.eu/rest/v2/all'  # API con información de países
response = requests.get(url)
print(response)                # objeto Response
print(response.status_code)    # 200 indica éxito
countries = response.json()
print(countries[:1])           # imprimimos el primer país por brevedad
```

Veamos otro ejemplo con la API del Banco Mundial (datos de Etiopía):

```py
import requests
from pprint import pp  # pretty print para mostrar resultados legibles

url = 'http://api.worldbank.org/countries/et?format=json'  # API del Banco Mundial para Etiopía
response = requests.get(url)
print(response)                # objeto Response
print(response.status_code)    # 200 indica éxito
ethiopia_data = response.json()
pp(ethiopia_data)              # mostrar datos de forma legible
```


---

### Crear paquetes

También podemos crear nuestros propios paquetes y subirlos a PyPI. Ejemplo simple: crea un directorio llamado mypackage con un __init__.py (puede estar vacío) y los siguientes módulos.

```py
# mypackage/arithmetics.py
def add_numbers(*args):
    total = 0
    for num in args:
        total += num
    return total

def subtract(a, b):
    return (a - b)

def multiple(a, b):
    return a * b

def division(a, b):
    return a / b

def remainder(a, b):
    return a % b

def power(a, b):
    return a ** b
```

```py
# mypackage/greet.py
def greet_person(firstname, lastname):
    return f'{firstname} {lastname}, welcome to 30DaysOfPython Challenge!'
```

__init__.py no es estrictamente necesario en Python ≥3.3, pero se recomienda para compatibilidad.

Usando el paquete:

```py
from mypackage import arithmetics
print(arithmetics.add_numbers(1, 2, 3, 5))
print(arithmetics.subtract(5, 3))
print(arithmetics.multiple(5, 3))
print(arithmetics.division(5, 3))
print(arithmetics.remainder(5, 3))
print(arithmetics.power(5, 3))

from mypackage import greet
print(greet.greet_person('Juan', 'Pérez'))
```


---

### Más información sobre paquetes

- Python tiene paquetes y módulos incorporados; otros deben instalarse.
- pip es la herramienta recomendada para instalar y gestionar paquetes desde PyPI.
- Para capturar las dependencias de un proyecto usa pip freeze > requirements.txt.
- Para instalar dependencias desde un archivo usa pip install -r requirements.txt.
- Para desinstalar: pip uninstall packagename o pip uninstall -r requirements.txt.
- Virtualenv (y venv) permiten crear entornos aislados:
  - Instalar virtualenv: pip install virtualenv
  - Crear entornos aislados evita conflictos entre proyectos.