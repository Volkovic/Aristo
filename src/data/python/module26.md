# Día 26 - Programación Web con Python

## Programación web con Python

El protocolo HTTP (Hypertext Transfer Protocol) es la columna vertebral absoluta de la World Wide Web (WWW) y dicta exactamente cómo se formatean y transmiten los mensajes entre tu Navegador Web (el Cliente) y la computadora remota que aloja el sitio (el Servidor). En el Desarrollo Web tradicional, Python brilla detrás de escena programando el Backend (Lado del Servidor). Mientras que tecnologías como JavaScript dominan el Frontend (lo que ves y tocas), Python maneja la lógica pesada, consultas a la base de datos y la seguridad, devolviendo la información procesada al usuario.

Para facilitar este trabajo, utilizamos un Framework Web de Python, que es una colección de código pre-escrito que provee una arquitectura, herramientas de enrutamiento y utilidades para construir aplicaciones web sin programar todo desde cero (como un servidor HTTP puro). Python tiene muchos marcos web disponibles. Django y Flask son los dos frameworks más legendarios y diametralmente opuestos. Django es el titán "con baterías incluidas" (trae todo pre-hecho, ideal para proyectos grandes), mientras que Flask es un "Micro-framework" minimalista (te da un lienzo en blanco ligero, ideal para APIs y microservicios). Hoy, aprenderemos a usar Flask para el desarrollo web.

### Flask

Flask es un micro-framework de desarrollo web escrito en Python que es minimalista y extremadamente flexible, ya que no impone una arquitectura estricta ni un ORM por defecto. Flask utiliza el motor de plantillas Jinja2. Flask también se puede usar con otras bibliotecas modernas de frontend como React.

Si aún no has instalado el paquete virtualenv, instálalo primero. Un entorno virtual permitirá aislar las dependencias del proyecto de las dependencias de la máquina local.

#### Estructura de carpetas

Después de completar todos los pasos, la estructura de archivos de tu proyecto debería ser la siguiente:

```sh
├── Procfile
├── app.py
├── env
│   ├── bin
├── requirements.txt
├── static
│   └── css
│       └── main.css
└── templates
    ├── about.html
    ├── home.html
    ├── layout.html
    ├── post.html
    └── result.html
```


---

### Configurar el proyecto

Comienza a usar Flask siguiendo estos pasos.

Paso 1: Instala virtualenv con el siguiente comando.

```sh
pip install virtualenv
```

Paso 2:

```sh
asabeneh@Asabeneh:~/Desktop$ mkdir python_for_web
asabeneh@Asabeneh:~/Desktop$ cd python_for_web/
asabeneh@Asabeneh:~/Desktop/python_for_web$ virtualenv venv
asabeneh@Asabeneh:~/Desktop/python_for_web$ source venv/bin/activate
(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze
(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip install Flask
(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze
Click==7.0
Flask==1.1.1
itsdangerous==1.1.0
Jinja2==2.10.3
MarkupSafe==1.1.1
Werkzeug==0.16.0
(env) asabeneh@Asabeneh:~/Desktop/python_for_web$
```

Hemos creado un directorio de proyecto llamado python_for_web. Dentro del proyecto, hemos creado un entorno virtual llamado *venv*, que puede tener cualquier nombre. Luego, activamos el entorno virtual. Usamos pip freeze para verificar los paquetes instalados en el directorio del proyecto. El resultado de pip freeze está vacío porque aún no se han instalado paquetes.

Ahora, creemos el archivo app.py en el directorio del proyecto y escribamos el siguiente código. El archivo app.py será el archivo principal del proyecto. El siguiente código contiene el módulo flask y el módulo os.


---

### Crear rutas

Ruta de inicio.

```py
# importar flask
from flask import Flask
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home ():
    return '<h1>Bienvenido</h1>'

@app.route('/about')
def about():
    return '<h1>Acerca de nosotros</h1>'


if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

El decorador de ruta (Routing Decorator) como `@app.route('/')` o `@app.route('/about')` colocado justo encima de la función enlaza matemáticamente la URL del navegador con tu código Python. Cuando el servidor detecta que alguien entró a esa ruta, dispara inmediatamente tu función.

También puedes crear Rutas Dinámicas (Dynamic Routing) para construir una URL que acepte variables dinámicas. Por ejemplo, si escribes `@app.route('/usuario/<nombre>')`, Flask le pasará el `<nombre>` como un parámetro a tu función de Python, evitando tener que escribir mil funciones separadas para mil usuarios distintos.

Al final del archivo, el comando `if __name__ == '__main__': app.run(debug=True)` inicia el servidor de desarrollo local. Con `debug=True`, activa el recargo automático ante cambios y muestra una consola de errores en el navegador. Es ideal para codificar y ver resultados en vivo.

Para ejecutar la aplicación flask, ingresa python app.py en el directorio principal de la aplicación flask.

Después de ejecutar _python app.py_, verifica el puerto 5000 de tu localhost.

Agreguemos una ruta adicional creando la ruta "acerca de".

```py
# importar flask
from flask import Flask
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home ():
    return '<h1>Bienvenido</h1>'

@app.route('/about')
def about():
    return '<h1>Acerca de nosotros</h1>'

if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Ahora, hemos agregado la ruta acerca de en el código anterior. ¿Pero qué pasa si queremos renderizar un archivo HTML en lugar de una cadena? Podemos renderizar un archivo HTML usando la función *render_template*. Creamos una carpeta llamada templates en el directorio del proyecto y dentro de ella, creamos home.html y about.html. También importamos *render_template* desde flask.


---

### Crear plantillas

La carpeta obligatoria llamada `templates` sirve para alojar exclusivamente todos tus archivos de interfaz `.html`. Flask buscará automáticamente las páginas web allí adentro cuando uses la función `render_template()`, manteniendo una separación limpia de responsabilidades.

Dentro de estos archivos HTML, el motor de plantillas Jinja2 integrado en Flask permite inyectar variables de Python y usar estructuras de control. La sintaxis mágica de Jinja2 utiliza la doble llave `{{ variable }}` exclusivamente para 'imprimir' el valor de una variable de Python dentro del HTML, y las llaves-porcentaje `{% if condicion %}` o `{% for item in lista %}` para ejecutar lógica de control dentro del HTML.

Crea archivos HTML dentro de la carpeta templates.

home.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Página principal</title>
  </head>

  <body>
    <h1>Bienvenido de vuelta</h1>
  </body>
</html>
```

about.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acerca</title>
  </head>

  <body>
    <h1>Acerca de nosotros</h1>
  </body>
</html>
```


---

### Script de Python (con render_template)

app.py

```py
# importar flask
from flask import Flask, render_template
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home ():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Como puedes ver, para acceder a diferentes páginas o navegar, necesitamos un sistema de navegación. Agreguemos un enlace para cada página, o creemos un diseño que usemos para cada página.


---

### Navegación

```html
<ul>
  <li><a href="/">Inicio</a></li>
  <li><a href="/about">Acerca</a></li>
</ul>
```

Ahora, podemos navegar entre páginas usando los enlaces anteriores. Creamos una página adicional para manejar los datos del formulario. Puedes nombrarla como quieras, yo prefiero llamarla post.html.

Podemos inyectar datos en el archivo HTML usando el motor de plantillas Jinja2.

```py
# importar flask
from flask import Flask, render_template, request, redirect, url_for
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home ():
    techs = ['HTML', 'CSS', 'Flask', 'Python']
    name = '30 días de desafío de programación en Python'
    return render_template('home.html', techs=techs, name=name, title='Página principal')

@app.route('/about')
def about():
    name = '30 días de desafío de programación en Python'
    return render_template('about.html', name=name, title='Acerca de nosotros')

@app.route('/post')
def post():
    name = 'Artículos sobre programación'
    path = request.path
    return render_template('post.html', name=name, path=path, title='Artículos')

if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

home.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/about">Acerca</a></li>
      <li><a href="/post">Publicaciones</a></li>
    </ul>
    <h1>Bienvenido de vuelta a {{name}}</h1>
    <ul>
      {% for tech in techs %}
      <li>{{tech}}</li>
      {% endfor %}
    </ul>
  </body>
</html>
```

about.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/about">Acerca</a></li>
      <li><a href="/post">Publicaciones</a></li>
    </ul>
    <h1>Acerca de {{name}}</h1>
  </body>
</html>
```

post.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/about">Acerca</a></li>
      <li><a href="/post">Publicaciones</a></li>
    </ul>
    <h1>{{name}}</h1>
    <p>Ruta actual: {{path}}</p>
    <form action="/result" method="POST">
      <div>
        <input
          type="text"
          name="first_name"
          placeholder="Nombre"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          required
        />
      </div>
      <div>
        <input type="text" name="old_job" placeholder="Trabajo anterior" />
      </div>
      <div>
        <input type="text" name="current_job" placeholder="Trabajo actual" />
      </div>
      <div>
        <input type="text" name="country" placeholder="País" />
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  </body>
</html>
```

El método HTTP `POST` es crucial porque permite que el usuario envíe datos (como formularios) hacia el servidor para ser procesados, enviando la información en el cuerpo de la petición (a diferencia de GET, que pide información y expone parámetros en la URL). Por seguridad radical, Flask bloquea todas las peticiones POST por defecto. Para que un decorador de ruta acepte envíos de formularios, debes indicarlo explícitamente con el parámetro `methods`, por ejemplo: `@app.route('/login', methods=['GET', 'POST'])`.

En una ruta que acepta ambos métodos, puedes comprobar dentro de la función si el usuario simplemente entró a ver la página o si acaba de enviar el formulario validando `if request.method == 'POST':`. Luego, para extraer de forma segura la información que el usuario tipeó en un input (ej. `<input name='correo'>`), utilizas el diccionario `request.form`, por ejemplo con `request.form.get('correo')` o `request.form['correo']`.

Ahora, agreguemos una ruta que procese los datos del formulario. Usamos el método POST porque recibiremos datos del formulario.

```py
# importar flask
from flask import Flask, render_template, request, redirect, url_for
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home():
    techs = ['HTML', 'CSS', 'Flask', 'Python']
    name = '30 días de desafío de programación en Python'
    return render_template('home.html', techs=techs, name=name, title='Página principal')

@app.route('/about')
def about():
    name = '30 días de desafío de programación en Python'
    return render_template('about.html', name=name, title='Acerca de nosotros')

@app.route('/post')
def post():
    name = 'Artículos'
    return render_template('post.html', name=name, title='Artículos')


@app.route('/result', methods=['POST'])
def result():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    old_job = request.form['old_job']
    current_job = request.form['current_job']
    country = request.form['country']
    print(first_name, last_name, old_job, current_job, country)
    result_data = {
        'first_name':first_name,
        'last_name':last_name,
        'old_job': old_job,
        'current_job': current_job,
        'country':country
    }
    return render_template('result.html', result_data = result_data, title= 'Resultado')

if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

result.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/about">Acerca</a></li>
      <li><a href="/post">Publicaciones</a></li>
    </ul>
    <h1>Datos del formulario</h1>

    <ul>
      <li>Nombre: {{result_data.first_name}}</li>
      <li>Apellido: {{result_data.last_name}}</li>
      <li>Trabajo anterior: {{result_data.old_job}}</li>
      <li>Trabajo actual: {{result_data.current_job}}</li>
      <li>País: {{result_data.country}}</li>
    </ul>
  </body>
</html>
```

En el mundo real, no repetiríamos el código HTML en todas las páginas. En su lugar, crearíamos una plantilla base y las demás heredarían de ella. Usemos la herencia (plantillas). Ahora, en lugar de tres archivos diferentes, necesitamos crear un archivo de diseño llamado layout.html. Luego, otros archivos heredarán de él.


---

### Crear plantilla base (layout)

layout.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css?family=Lato:300,400|Nunito:300,400|Raleway:300,400&display=