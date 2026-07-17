# Día 29 - Construyendo una API

## Día 29

## Construyendo una API

En esta sección presentaremos una API RESTful que utiliza métodos HTTP como GET, PUT, POST y DELETE para manejar datos.

Una API RESTful es una interfaz de programación de aplicaciones (API) que usa solicitudes HTTP para GET, PUT, POST y DELETE datos. En secciones anteriores aprendimos Python, Flask y MongoDB. Aprovecharemos ese conocimiento para desarrollar una API RESTful usando Python, Flask y MongoDB. Toda aplicación con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) suele exponer una API para crear datos en la base, obtener datos, actualizarlos o borrarlos.

Los navegadores solo manejan solicitudes GET. Por eso necesitamos una herramienta que nos permita manejar todos los métodos (GET, POST, PUT, DELETE).

Ejemplos de APIs:

- API de países: https://restcountries.eu/rest/v2/all
- API de razas de gatos: https://api.thecatapi.com/v1/breeds

[Postman](https://www.getpostman.com/) es una herramienta muy popular en el desarrollo de APIs. Si quieres seguir esta sección, descarga [Postman](https://www.getpostman.com/). Una alternativa a Postman es [Insomnia](https://insomnia.rest/download).

![Postman](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/postman.png)


---

### Estructura de la API

Un endpoint de API es una URL que ayuda a recuperar, crear, actualizar o eliminar un recurso. La estructura suele ser:
Ejemplo de endpoint:
https://api.twitter.com/1.1/lists/members.json
Este endpoint devuelve los miembros de una lista específica. Las listas privadas muestran miembros solo si el usuario autenticado posee la lista.
El nombre de la empresa va seguido de la versión y del propósito de la API.
Métodos:
Métodos HTTP: método y URL

La API usa los siguientes métodos HTTP para operar sobre objetos:

```sh
GET        para recuperar objetos
POST       para crear objetos y operaciones relacionadas
PUT        para actualizar objetos
DELETE     para eliminar objetos
```

Construiremos una API para recopilar información sobre estudiantes de 30DaysOfPython. Recogemos nombre, país, ciudad, año de nacimiento, habilidades y biografía.

Para implementar esta API utilizaremos:

- Postman
- Python
- Flask
- MongoDB


---

### Obtener datos con GET

En este paso usaremos datos ficticios y los devolveremos como JSON. Para retornarlos como JSON usaremos el módulo json y Response.

```py
# importar flask

from flask import Flask,  Response
import json

app = Flask(__name__)

@app.route('/api/v1.0/students', methods = ['GET'])
def students ():
    student_list = [
        {
            'name':'Asabeneh',
            'country':'Finland',
            'city':'Helsinki',
            'skills':['HTML', 'CSS','JavaScript','Python']
        },
        {
            'name':'David',
            'country':'UK',
            'city':'London',
            'skills':['Python','MongoDB']
        },
        {
            'name':'John',
            'country':'Sweden',
            'city':'Stockholm',
            'skills':['Java','C#']
        }
    ]
    return Response(json.dumps(student_list), mimetype='application/json')


if __name__ == '__main__':
    # usado en despliegue
    # para que funcione en producción y desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Si solicitas http://localhost:5000/api/v1.0/students en el navegador obtendrás:

![GET en navegador](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/get_on_browser.png)

Si solicitas la misma URL en Postman obtendrás:

![GET en Postman](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/get_on_postman.png)

En lugar de datos ficticios, conectaremos la aplicación Flask a MongoDB y obtendremos datos desde la base.

```py
# importar flask

from flask import Flask,  Response
import json
import pymongo


app = Flask(__name__)

#
MONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
#Nota: nunca incluyas credenciales reales en el código.
client = pymongo.MongoClient(MONGODB_URI)
db = client['thirty_days_of_python'] # acceder a la base de datos

@app.route('/api/v1.0/students', methods = ['GET'])
def students ():

    return Response(json.dumps(student), mimetype='application/json')


if __name__ == '__main__':
    # usado en despliegue
    # para que funcione en producción y desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Al conectar Flask con MongoDB podemos obtener la colección students de la base thirty_days_of_python:

```sh
[
    {
        "_id": {
            "$oid": "5df68a21f106fe2d315bbc8b"
        },
        "name": "Asabeneh",
        "country": "Finland",
        "city": "Helsinki",
        "age": 38
    },
    {
        "_id": {
            "$oid": "5df68a23f106fe2d315bbc8c"
        },
        "name": "David",
        "country": "UK",
        "city": "London",
        "age": 34
    },
    {
        "_id": {
            "$oid": "5df68a23f106fe2d315bbc8e"
        },
        "name": "Sami",
        "country": "Finland",
        "city": "Helsinki",
        "age": 25
    }
]
```


---

### Obtener un documento por ID

Podemos acceder a un documento individual por su ID. Por ejemplo, accedamos a Asabeneh:
http://localhost:5000/api/v1.0/students/5df68a21f106fe2d315bbc8b

```py
# importar flask

from flask import Flask,  Response
import json
from bson.objectid import ObjectId
import json
from bson.json_util import dumps
import pymongo


app = Flask(__name__)

#
MONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
#Nota: nunca incluyas credenciales reales en el código.
client = pymongo.MongoClient(MONGODB_URI)
db = client['thirty_days_of_python'] # acceder a la base de datos

@app.route('/api/v1.0/students', methods = ['GET'])
def students ():

    return Response(json.dumps(student), mimetype='application/json')
@app.route('/api/v1.0/students/<id>', methods = ['GET'])
def single_student (id):
    student = db.students.find({'_id':ObjectId(id)})
    return Response(dumps(student), mimetype='application/json')

if __name__ == '__main__':
    # usado en despliegue
    # para que funcione en producción y desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Respuesta de ejemplo:

```sh
[
    {
        "_id": {
            "$oid": "5df68a21f106fe2d315bbc8b"
        },
        "name": "Asabeneh",
        "country": "Finland",
        "city": "Helsinki",
        "age": 38
    }
]
```


---

### Crear datos con POST

Usamos el método POST para crear datos.

```py
# importar flask

from flask import Flask,  Response, Request
import json
from bson.objectid import ObjectId
import json
from bson.json_util import dumps
import pymongo
from datetime import datetime



app = Flask(__name__)

#
MONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
#Nota: nunca incluyas credenciales reales en el código.
client = pymongo.MongoClient(MONGODB_URI)
db = client['thirty_days_of_python'] # acceder a la base de datos

@app.route('/api/v1.0/students', methods = ['GET'])
def students ():

    return Response(json.dumps(student), mimetype='application/json')
@app.route('/api/v1.0/students/<id>', methods = ['GET'])
def single_student (id):
    student = db.students.find({'_id':ObjectId(id)})
    return Response(dumps(student), mimetype='application/json')
@app.route('/api/v1.0/students', methods = ['POST'])
def create_student ():
    name = request.form['name']
    country = request.form['country']
    city = request.form['city']
    skills = request.form['skills'].split(', ')
    bio = request.form['bio']
    birthyear = request.form['birthyear']
    created_at = datetime.now()
    student = {
        'name': name,
        'country': country,
        'city': city,
        'birthyear': birthyear,
        'skills': skills,
        'bio': bio,
        'created_at': created_at

    }
    db.students.insert_one(student)
    return ;
def update_student (id):
if __name__ == '__main__':
    # usado en despliegue
    # para que funcione en producción y desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```


---

### Actualizar con PUT

```py
# importar flask

from flask import Flask,  Response
import json
from bson.objectid import ObjectId
import json
from bson.json_util import dumps
import pymongo
from datetime import datetime


app = Flask(__name__)

#
MONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
#Nota: nunca incluyas credenciales reales en el código.
client = pymongo.MongoClient(MONGODB_URI)
db = client['thirty_days_of_python'] # acceder a la base de datos

@app.route('/api/v1.0/students', methods = ['GET'])
def students ():

    return Response(json.dumps(student), mimetype='application/json')
@app.route('/api/v1.0/students/<id>', methods = ['GET'])
def single_student (id):
    student = db.students.find({'_id':ObjectId(id)})
    return Response(dumps(student), mimetype='application/json')
@app.route('/api/v1.0/students', methods = ['POST'])
def create_student ():
    name = request.form['name']
    country = request.form['country']
    city = request.form['city']
    skills = request.form['skills'].split(', ')
    bio = request.form['bio']
    birthyear = request.form['birthyear']
    created_at = datetime.now()
    student = {
        'name': name,
        'country': country,
        'city': city,
        'birthyear': birthyear,
        'skills': skills,
        'bio': bio,
        'created_at': created_at

    }
    db.students.insert_one(student)
    return
@app.route('/api/v1.0/students/<id>', methods = ['PUT']) # este decorador crea la ruta para actualizar
def update_student (id):
    query = {"_id":ObjectId(id)}
    name = request.form['name']
    country = request.form['country']
    city = request.form['city']
    skills = request.form['skills'].split(', ')
    bio = request.form['bio']
    birthyear = request.form['birthyear']
    created_at = datetime.now()
    student = {
        'name': name,
        'country': country,
        'city': city,
        'birthyear': birthyear,
        'skills': skills,
        'bio': bio,
        'created_at': created_at

    }
    db.students.update_one(query, {"$set": student})
    # return Response(dumps({"result":"a new student has been created"}), mimetype='application/json')
    return
def update_student (id):
if __name__ == '__main__':
    # usado en despliegue
    # para que funcione en producción y desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```


---

### Eliminar documentos con DELETE

```py
# importar flask

from flask import Flask,  Response
import json
from bson.objectid import ObjectId
import json
from bson.json_util import dumps
import pymongo
from datetime import datetime


app = Flask(__name__)

#
MONGODB_URI='mongodb+srv://asabeneh:your_password@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
#Nota: nunca incluyas credenciales reales en el código.
client = pymongo.MongoClient(MONGODB_URI)
db = client['thirty_days_of_python'] # acceder a la base de datos

@app.route('/api/v1.0/students', methods = ['GET'])
def students ():

    return Response(json.dumps(student), mimetype='application/json')
@app.route('/api/v1.0/students/<id>', methods = ['GET'])
def single_student (id):
    student = db.students.find({'_id':ObjectId(id)})
    return Response(dumps(student), mimetype='application/json')
@app.route('/api/v1.0/students', methods = ['POST'])
def create_student ():
    name = request.form['name']
    country = request.form['country']
    city = request.form['city']
    skills = request.form['skills'].split(', ')
    bio = request.form['bio']
    birthyear = request.form['birthyear']
    created_at = datetime.now()
    student = {
        'name': name,
        'country': country,
        'city': city,
        'birthyear': birthyear,
        'skills': skills,
        'bio': bio,
        'created_at': created_at

    }
    db.students.insert_one(student)
    return
@app.route('/api/v1.0/students/<id>', methods = ['PUT']) # este decorador crea la ruta para actualizar
def update_student (id):
    query = {"_id":ObjectId(id)}
    name = request.form['name']
    country = request.form['country']
    city = request.form['city']
    skills = request.form['skills'].split(', ')
    bio = request.form['bio']
    birthyear = request.form['birthyear']
    created_at = datetime.now()
    student = {
        'name': name,
        'country': country,
        'city': city,
        'birthyear': birthyear,
        'skills': skills,
        'bio': bio,
        'created_at': created_at

    }
    db.students.update_one(query, {"$set": student})
    # return Response(dumps({"result":"a new student has been created"}), mimetype='application/json')
    return ;
@app.route('/api/v1.0/students/<id>', methods = ['DELETE'])
def delete_student (id):
    db.students.delete_one({"_id":ObjectId(id)})
    return
if __name__ == '__main__':
    # usado en despliegue
    # para que funcione en producción y desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

---

### Evolución Moderna: FastAPI y Conceptos Avanzados

Aunque Flask es una excelente herramienta para aprender y construir APIs, en los últimos años **FastAPI** ha revolucionado el desarrollo en Python. Es un framework moderno y de altísimo rendimiento construido desde cero que exprime el Tipado Estático (Type Hints) y la Asincronía (Async/Await) de Python, compitiendo en velocidad pura con lenguajes veloces como NodeJS y Go. Para arrancar aplicaciones programadas en FastAPI, se utiliza universalmente **Uvicorn**, un servidor web ASGI (Asynchronous Server Gateway Interface) ultrarrápido.

Una de las mayores ventajas de productividad (Developer Experience) que ofrece FastAPI de manera completamente gratuita e inmediata es que autogenera y actualiza mágicamente una Documentación interactiva impecable (utilizando Swagger UI) en la ruta `/docs`. Esto se logra gracias a que FastAPI se basa en la especificación **OpenAPI**, el estándar mundial que formaliza contractualmente cómo luce la interfaz de una API RESTful, permitiendo generar clientes en más de 50 lenguajes automáticamente.

#### Sintaxis, Asincronía y Pydantic

A diferencia de Flask, la sintaxis en FastAPI declara la intención desde el decorador, por ejemplo: `@app.get('/')`. Además, es fuertemente recomendado el uso de `async def` al crear funciones de ruta (Endpoints). La palabra `async` permite la Asincronía (Non-Blocking I/O): mientras tu ruta espera a que la base de datos responda, el servidor puede atender miles de otras peticiones entrantes sin congelar el hilo principal.

FastAPI utiliza la librería **Pydantic** como motor encargado de la validación mágica y conversión de los datos usando los Type Hints. Si declaras una ruta con un parámetro en la URL como `@app.get('/usuarios/{item_id}')`, debes inyectarlo en la firma de la función: `async def leer_usuario(item_id: int):`. Pydantic forzará la conversión a entero. Si agregas un parámetro a la función que NO formaba parte de la URL (Ej: `buscar: str = None`), FastAPI asume automáticamente que se trata de un Query Parameter (`?buscar=algo`) y te lo inyecta listo para usarse.

Para recibir y validar el Cuerpo JSON (Payload) complejo de un método `POST`, debes obligatoriamente heredar tu modelo de datos de la clase `BaseModel` perteneciente a Pydantic. Al devolver respuestas al cliente, simplemente haces `return datos` (ya sea un diccionario, lista o modelo Pydantic) y FastAPI serializa de forma automática y asombrosa todo a texto JSON HTTP. Si necesitas devolver un error controlado (Ej: código 404), importas y levantas una excepción con `raise HTTPException(status_code=404, detail='Usuario No Encontrado')`.

#### Arquitectura, Seguridad y Despliegue

A medida que tu API crece, FastAPI ofrece herramientas avanzadas:
- **Inyección de Dependencias:** Usando la función `Depends()`, FastAPI provee un mecanismo modular extremadamente poderoso que permite compartir lógica común (como verificar contraseñas o abrir conexiones) inyectándola en las rutas automáticamente justo antes de que se ejecuten.
- **APIRouter:** Para evitar que tu archivo principal engorde a miles de líneas, se recomienda usar el módulo `APIRouter` (`router = APIRouter()`). Construyes mini-FastAPIs en otros archivos y luego los enchufas al árbol principal.
- **Middlewares y CORS:** Los Middlewares son funciones centinelas que interceptan TODO el tráfico global (cada Request que entra y Response que sale), ideales para medir tiempos o registrar IPs. Aquí también se configura el **CORS** (Cross-Origin Resource Sharing), un mecanismo de seguridad de los navegadores que bloquea peticiones hechas hacia tu API desde dominios Web (URLs Frontend) que tú no hayas autorizado explíc