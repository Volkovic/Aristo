# Día 27 - Python y MongoDB

# Python y MongoDB

Python es una tecnología backend que puede conectarse a distintas bases de datos. Puede conectarse a bases de datos SQL y NoSQL. En esta sección conectaremos Python con la base de datos MongoDB, que es una base de datos NoSQL.

## MongoDB

MongoDB es una base de datos NoSQL, orientada a documentos. MongoDB almacena datos en documentos tipo JSON (internamente guardados en un formato binario flexible llamado **BSON**), lo que hace a MongoDB muy flexible y escalable. Veamos la terminología que difiere entre bases de datos SQL y NoSQL. La siguiente tabla mostrará la diferencia entre SQL y NoSQL.


---

### Comparación entre SQL y NoSQL

![SQL vs NoSQL](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/sql-vs-nosql.png)

En esta sección nos centraremos en la base de datos NoSQL MongoDB. En lugar de alojar obligatoriamente la base de datos en tu propia computadora o servidor Linux (on-premise), la mayoría de proyectos y startups utilizan **MongoDB Atlas**, un servicio de base de datos en la nube (DBaaS). Atlas provee bases de datos súper seguras y administradas globalmente (en AWS, Google Cloud, etc.) de forma gratuita para iniciar. Regístrate en [MongoDB](https://www.mongodb.com/) haciendo clic en registrarse y luego en la página siguiente confirma el registro.

![Página de registro de MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-signup-page.png)

Rellena el formulario y haz clic en continuar..

![Registro MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-register.png)

Elige el plan gratuito

![Plan gratuito de MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-free.png)

Elige la región gratuita más cercana y ponle un nombre a tu clúster.

![Nombre del clúster de MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-cluster-name.png)

Ahora se ha creado un sandbox gratuito

![Sandbox de MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-sandbox.png)

Permitir el acceso desde todos los hosts locales

![Permitir acceso IP en MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-allow-ip-access.png)

Agregar usuario y contraseña

![Agregar usuario en MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-add-user.png)

Crear enlace URI de MongoDB

![Crear URI de MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-create-uri.png)

Selecciona el driver para Python 3.6 o superior

![Driver Python para MongoDB](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-python-driver.png)


---

### Obtener la cadena de conexión (URI de MongoDB)

Copia la cadena de conexión; obtendrás algo similar a esto:

```sh
mongodb+srv://asabeneh:<password>@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority
```

No te preocupes por esta URL; es la forma de conectar tu aplicación con MongoDB. Es una cadena de texto larga (URL especial) que contiene toda la información necesaria (protocolo, usuario, contraseña, servidor) para que el driver localice y autorice tu conexión hacia la base de datos.
Reemplaza el marcador de contraseña con la contraseña que creaste al añadir el usuario.

Ejemplo:

```sh
mongodb+srv://asabeneh:123123123@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority
```

En este ejemplo reemplacé todo y la contraseña es 123123123; el nombre de la base de datos es *thirty_days_python*. Esto solo es un ejemplo; tu contraseña debe ser más segura.

Python necesita drivers para acceder a MongoDB. Usaremos _pymongo_ y _dnspython_ para conectar nuestra aplicación con la base de MongoDB. **PyMongo** es el driver (controlador) oficial de Python que permite que tu código se comunique bidireccionalmente con el servidor o nube de MongoDB, encargándose de traducir tus diccionarios de Python al formato BSON. Instala pymongo y dnspython en tu directorio de proyecto:

```sh
pip install pymongo dnspython
```

Para usar el URI mongodb+srv:// debes instalar el módulo "dnspython". dnspython es un paquete de utilidades DNS para Python que soporta prácticamente todos los tipos de registros.


---

### Conectar una aplicación Flask a un clúster de MongoDB

```py
# importar flask
from flask import Flask, render_template
import os # importar el módulo os
MONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(MONGODB_URI)
print(client.list_database_names())

app = Flask(__name__)
if __name__ == '__main__':
    # en despliegue usamos variables de entorno
    # para que funcione tanto en producción como en desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Al ejecutar el código anterior obtendremos las bases de datos por defecto de MongoDB.

```sh
['admin', 'local']
```


---

### Crear base de datos y colecciones

Creemos una base de datos; si la base de datos y la colección no existen en MongoDB, se crearán. Crearemos una base de datos llamada *thirty_days_of_python* y una colección *students*.

Formas de crear la base de datos:

```sh
db = client.name_of_database # podemos crear la base de datos así, o usar la segunda forma
db = client['name_of_database']
```

```py
# importar flask
from flask import Flask, render_template
import os # importar el módulo os
MONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(MONGODB_URI)
# crear la base de datos
db = client.thirty_days_of_python
# crear la colección students e insertar un documento
db.students.insert_one({'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250})
print(client.list_database_names())

app = Flask(__name__)
if __name__ == '__main__':
    # en despliegue usamos variables de entorno
    # para que funcione tanto en producción como en desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Después de crear la base de datos, también creamos la colección students y usamos *insert_one()* para insertar un documento.
Ahora la base de datos *thirty_days_of_python* y la colección *students* han sido creadas y el documento insertado.
Revisa tu clúster MongoDB y verás la base de datos y la colección, con un documento dentro.

```sh
['thirty_days_of_python', 'admin', 'local']
```

Si ves lo anterior en tu clúster, significa que has creado con éxito una base de datos y una colección.

![Crear base de datos y colección](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/mongoDB/mongodb-creating_database.png)

Si ves la imagen anterior, el documento fue creado con un ID largo como clave primaria. Cada vez que incrustamos un documento sin especificar un ID, MongoDB genera automáticamente y le inyecta un campo único, hexadecimal e irrepetible llamado `_id` (ObjectId), basado en milisegundos, para garantizar que jamás haya duplicados puros.


---

### Insertar múltiples documentos en una colección

*insert_one()* inserta un elemento a la vez; si queremos insertar múltiples documentos de una vez podemos usar *insert_many()* o un bucle for.
Podemos usar un bucle for para insertar varios documentos a la vez, pero usar *insert_many()* es una operación masiva (Bulk) ultra rápida que envía todos los documentos en bloque, ahorrando tiempo de red.

```py
# importar flask
from flask import Flask, render_template
import os # importar el módulo os
MONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(MONGODB_URI)

students = [
        {'name':'David','country':'UK','city':'London','age':34},
        {'name':'John','country':'Sweden','city':'Stockholm','age':28},
        {'name':'Sami','country':'Finland','city':'Helsinki','age':25},
    ]
for student in students:
    db.students.insert_one(student)
# Alternativamente, de forma más eficiente: db.students.insert_many(students)

app = Flask(__name__)
if __name__ == '__main__':
    # en despliegue usamos variables de entorno
    # para que funcione tanto en producción como en desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```


---

### Consultas en MongoDB

Los métodos *find()* y *find_one()* son formas comunes de buscar datos en una colección MongoDB. Son similares al SELECT en MySQL.
Usemos _find_one()_ para obtener un documento de la colección.

- *find_one({"_id": ObjectId("id")}): si no se proporciona id ni ningún filtro, devuelve rápida y aleatoriamente la primera aparición absoluta que exista en la colección.

```py
# importar flask
from flask import Flask, render_template
import os # importar el módulo os
MONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(MONGODB_URI)
db = client['thirty_days_of_python'] # acceder a la base de datos
student = db.students.find_one()
print(student)

app = Flask(__name__)
if __name__ == '__main__':
    # en despliegue usamos variables de entorno
    # para que funcione tanto en producción como en desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

```sh
{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}
```

La consulta anterior devuelve la primera entrada, pero podemos usar un _id_ específico para ubicar un documento concreto. Por ejemplo, usemos el id de David para obtener el objeto David.
'_id':ObjectId('5df68a23f106fe2d315bbc8c')

```py
# importar flask
from flask import Flask, render_template
import os # importar el módulo os
from bson.objectid import ObjectId # objeto id
MONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(MONGODB_URI)
db = client['thirty_days_of_python'] # acceder a la base de datos
student = db.students.find_one({'_id':ObjectId('5df68a23f106fe2d315bbc8c')})
print(student)

app = Flask(__name__)
if __name__ == '__main__':
    # en despliegue usamos variables de entorno
    # para que funcione tanto en producción como en desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

```sh
{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}
```

Hemos visto cómo usar _find_one()_. Veamos ahora _find()_.

- _find()_: si no pasamos un objeto consulta devuelve todas las apariciones en la colección. El resultado es un objeto `pymongo.cursor`. Un Cursor es básicamente un puntero iterativo en la memoria del servidor que protege tu memoria RAM. Si intentas descargar millones de registros de golpe casteando el cursor violentamente a una lista de Python (ej. `list(students)`), tu PC podría crashear por falta de RAM (MemoryError). Por eso, la forma correcta de procesar y descargar físicamente los resultados es iterar el cursor con un bucle `for`, extrayendo de a un documento a la vez a través de la red.

```py
# importar flask
from flask import Flask, render_template
import os # importar el módulo os

MONGODB_URI = 'mongodb+srv://asabeneh:your_password_goes_here@30daysofpython-twxkr.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(MONGODB_URI)
db = client['thirty_days_of_python'] # acceder a la base de datos
students = db.students.find()
for student in students:
    print(student)

app = Flask(__name__)
if __name__ == '__main__':
    # en despliegue usamos variables de entorno
    # para que funcione tanto en producción como en desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

```sh
{'_id': ObjectId('5df68a21f106fe2d315bbc8b'), 'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}
{'_id': ObjectId('5df68a23f106fe2d315bbc8c'), 'name': 'David', 'country': 'UK', 'city': 'London', 'age': 34}
{'_id': ObjectId('5df68