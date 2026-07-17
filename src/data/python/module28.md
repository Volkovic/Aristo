# Día 28 - API

# Interfaz de Programación de Aplicaciones (API)

## API

API son las siglas de Application Programming Interface (Interfaz de Programación de Aplicaciones). El tipo de API que veremos en esta sección es la Web API.
Una Web API es una interfaz definida que permite la interacción entre organizaciones y las aplicaciones que consumen sus recursos; también actúa como un contrato de nivel de servicio (SLA) que especifica al proveedor de la funcionalidad y expone rutas o URLs de servicio a los usuarios de la API.

En el contexto del desarrollo web, una API se define como un conjunto de especificaciones, por ejemplo mensajes de solicitud HTTP y la estructura de los mensajes de respuesta, normalmente en formato XML o JSON (JavaScript Object Notation).

Las Web APIs han evolucionado de servicios web basados en SOAP y arquitecturas orientadas a servicios (SOA) hacia recursos web más directos en estilo REST.

Los servicios de redes sociales y las Web APIs han permitido a la comunidad web compartir contenido y datos entre comunidades y plataformas.

Con las APIs, el contenido creado en un lugar puede publicarse y actualizarse dinámicamente en múltiples lugares de la web.

Por ejemplo, la REST API de Twitter permite a los desarrolladores acceder a los datos principales de Twitter, mientras que la Search API ofrece formas de interactuar con los datos de búsqueda y tendencias de Twitter.

Muchas aplicaciones exponen endpoints de API. Un Endpoint (Punto de terminación) es una URL específica de la API que representa un recurso o funcionalidad particular (por ejemplo, `/v1/usuarios` para gestionar usuarios). Algunos ejemplos de APIs son la [API de países](https://restcountries.eu/rest/v2/all) y la [API de razas de gatos](https://api.thecatapi.com/v1/breeds).

Consumir una API oficial es la vía profesional, ética y estable de obtener datos. A diferencia del Web Scraping (usando herramientas como BeautifulSoup), que extrae código HTML propenso a romperse ante cambios de diseño, las APIs entregan datos crudos y estructurados. El Scraping suele ser un recurso de emergencia cuando un sitio no ofrece una API. Al hacer peticiones a estos endpoints, el servidor suele devolver los datos casi por unanimidad global en formato JSON (JavaScript Object Notation). JSON ganó la guerra de formatos por su inmensa ligereza y porque su sintaxis se traduce de forma nativa a Listas y Diccionarios en lenguajes de programación modernos.

Además, la mayoría de las APIs modernas siguen el estándar REST (Representational State Transfer). REST no es un protocolo, sino un conjunto de principios arquitectónicos. Una "API RESTful" sigue estas normas, siendo "stateless" (sin estado) y utilizando los métodos HTTP estándar, lo que permite que cualquier desarrollador del mundo sepa instintivamente cómo interactuar con ella.

En esta sección presentaremos una API RESTful que utiliza métodos de solicitud HTTP como GET, PUT, POST y DELETE para manejar datos.


---

## Construir una API

Una API RESTful es una interfaz que usa solicitudes HTTP para GET, PUT, POST y DELETE datos. En secciones anteriores aprendimos Python, Flask y MongoDB. Aprovecharemos ese conocimiento para desarrollar una API RESTful usando Python, Flask y la base de datos MongoDB. Toda aplicación con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) suele exponer una API para crear datos en la base, obtener datos, actualizarlos o borrarlos.

Para construir una API es útil entender el protocolo HTTP y el ciclo de solicitud-respuesta HTTP.

## HTTP (Protocolo de transferencia de hipertexto)

HTTP es el protocolo de comunicación establecido entre cliente y servidor. En este caso, el cliente es el navegador y el servidor es el lugar desde donde obtienes los datos. HTTP es un protocolo de red utilizado para transferir recursos en la web, como archivos HTML, imágenes, resultados de consultas, scripts u otros tipos de archivos.

El navegador actúa como cliente HTTP porque envía solicitudes al servidor HTTP (servidor web), y el servidor responde al cliente.


---

## Estructura de HTTP

HTTP utiliza un modelo cliente-servidor. El cliente HTTP abre una conexión y envía un mensaje de solicitud al servidor HTTP; el servidor HTTP devuelve un mensaje de respuesta, es decir, el recurso solicitado. Cuando el ciclo solicitud-respuesta termina, el servidor cierra la conexión.

![Ciclo de solicitud-respuesta HTTP](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/http_request_response_cycle.png)

Los formatos de los mensajes de solicitud y respuesta son similares. Ambos mensajes contienen:

- Una línea inicial
- Cero o más líneas de cabecera
- Una línea en blanco (es decir, un CRLF por separado)
- Un cuerpo de mensaje opcional (por ejemplo, un archivo, datos de formulario o la salida de una consulta)

Navega por este sitio para ver un ejemplo de mensaje de solicitud y respuesta: https://thirtydaysofpython-v1-final.herokuapp.com/. Este sitio está desplegado en un dyno gratuito de Heroku y puede no estar disponible en algunos meses debido al alto tráfico. Apoyar este proyecto ayuda a mantener el servidor activo.

![Cabeceras de solicitud y respuesta](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/request_response_header.png)


---

## Línea inicial de solicitud (línea de estado)

La línea inicial de la solicitud difiere de la de la respuesta.
La línea de solicitud tiene tres partes separadas por espacios:

- El nombre del método (GET, POST, HEAD)
- La ruta del recurso solicitado
- La versión HTTP utilizada. Por ejemplo: GET / HTTP/1.1

GET es el método HTTP más común, usado para obtener o leer recursos, mientras que POST es un método común para crear recursos.


---

### Línea inicial de respuesta (línea de estado)

La línea inicial de la respuesta, llamada línea de estado, también tiene tres partes separadas por espacios:

- La versión HTTP
- El código de estado de la respuesta, que indica el resultado de la solicitud, junto con una razón que describe dicho código. Ejemplos de líneas de estado:
  HTTP/1.0 200 OK
  o
  HTTP/1.0 404 Not Found
  **Nota:**

Los códigos de estado se agrupan por familias para indicar el resultado:
- **2XX (Éxito / Success):** Indican que el servidor recibió, entendió y procesó correctamente la petición. Ejemplos: 200 (OK) y 201 (Created), este último devuelto tras un POST exitoso para confirmar que el registro fue grabado en disco.
- **4XX (Error del Cliente / Client Error):** Indican que la petición contiene sintaxis incorrecta, falta de autenticación o solicita un recurso inexistente. Ejemplos: 400 (Bad Request), 401 (Unauthorized) o 403 (Forbidden) si no enviaste un token válido, y 404 (Not Found).
- **5XX (Error del Servidor / Server Error):** El servidor falló al cumplir una solicitud aparentemente válida debido a un problema interno o sobrecarga. Ejemplos: 500 (Internal Server Error) o 503 (Service Unavailable). Si recibes un 5XX, el problema está en los servidores de la API, no en tu código.

La lista completa de códigos de estado HTTP puede encontrarse [aquí](https://httpstatuses.com/). También puedes verla [aquí](https://httpstatusdogs.com/).


---

### Campos de cabecera

Como se observa en la captura anterior, las líneas de cabecera proporcionan información sobre la solicitud o la respuesta, o sobre el objeto enviado en el cuerpo del mensaje. Tienen una función vital: transmitir metadatos de la petición. Aquí es donde se envían los tokens de autenticación (ej. `Authorization: Bearer 12345`), se define el tipo de contenido enviado (`Content-Type`) o el formato esperado (`Accept`). El flujo profesional avanzado con APIs implica siempre configurar correctamente estas cabeceras.

```sh
GET / HTTP/1.1
Host: thirtydaysofpython-v1-final.herokuapp.com
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36
Sec-Fetch-User: ?1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Referer: https://thirtydaysofpython-v1-final.herokuapp.com/post
Accept-Encoding: gzip, deflate, br
Accept-Language: en-GB,en;q=0.9,fi-FI;q=0.8,fi;q=0.7,en-CA;q=0.6,en-US;q=0.5,fr;q=0.4
```


---

### Cuerpo del mensaje

Un mensaje HTTP puede llevar un cuerpo después de las cabeceras. En una respuesta, este es el lugar donde el recurso solicitado se devuelve al cliente (el uso más común del cuerpo). Si hay un error, puede contener texto explicativo. En una solicitud, es el lugar donde se envían los datos introducidos por el usuario o los archivos subidos al servidor.

Si un mensaje HTTP contiene un cuerpo, normalmente hay cabeceras que describen ese cuerpo, en particular:

Content-Type: indica el tipo MIME de los datos en el cuerpo (text/html, application/json, text/plain, text/css, image/gif).
Content-Length: indica el número de bytes en el cuerpo del mensaje.

### Métodos de solicitud

GET, POST, PUT y DELETE son los métodos HTTP que usaremos para implementar la API y las operaciones CRUD.

1. GET: el método GET se usa para recuperar y obtener información desde el servidor dado un URI. Las solicitudes GET deben únicamente recuperar datos y no producir otros efectos.
2. POST: las solicitudes POST se usan para crear datos y enviar datos al servidor, por ejemplo al crear una nueva entrada con un formulario HTML o subir archivos.
3. PUT / PATCH: PUT reemplaza la representación actual completa del recurso objetivo con la carga enviada. A menudo se acompaña de PATCH, que se utiliza para modificar solo una parte del recurso (por ejemplo, cambiar solo el avatar). En conjunto, PUT y PATCH se usan para Actualizar (Update) registros.
4. DELETE: elimina datos.


---

### Consumo de APIs con Python (Librería requests)

Para interactuar con APIs en Python, el estándar de la industria es la librería `requests`. Por ejemplo, al hacer una petición GET (`r = requests.get('https://api.github.com/users/octocat')`), puedes usar el método especial `r.json()`. Este método parsea y traduce automáticamente la respuesta JSON del servidor directamente a un Diccionario de Python interactivo, ahorrándote conversiones manuales.

A menudo, las URLs incluyen Parámetros de Consulta (Query Parameters), que son pares clave-valor añadidos al final de la URL tras un `?` (ej. `api.com/clima?ciudad=lima&unidades=metric`). Se usan principalmente en peticiones GET para filtrar, ordenar o paginar resultados. En `requests`, esto se maneja pasando un diccionario al argumento `params` (`requests.get(url, params={'ciudad': 'lima'})`).

Hablando de paginación (Pagination), esta es una técnica donde la API devuelve los resultados en bloques o "páginas" limitadas (ej. 50 registros por petición) para evitar sobrecargar la memoria del servidor y del cliente al transmitir grandes volúmenes de datos. Además, casi todas las APIs mundiales imponen un "Rate Limiting" (Límite de Tasa), una restricción que limita la cantidad de peticiones que un cliente puede hacer en un periodo de tiempo. Si lo excedes, recibirás un Error 429, lo que obliga a implementar pausas en tu código usando `time.sleep()`.

Para enviar Datos de Carga Útil (Payload) en un método POST (como registrar un nuevo usuario), normalmente pasas un diccionario al argumento `json=` (o `data=`) en `requests.post(url, json=mi_diccionario)`. Esto serializa silenciosamente los datos y los envía en el cuerpo (body) de la petición HTTP.

### Autenticación y Seguridad: API Keys

Muchas APIs que manejan datos sensibles o servicios de pago no son públicas y requieren un API Key (Llave) o Access Token. Esta es una cadena de caracteres única que se envía en las peticiones (usualmente en los Headers) para autenticar al cliente y autorizar el acceso. 

NUNCA, bajo ningún concepto, debes escribir tu API Key secreta visiblemente (en crudo / hardcodeada) dentro de tus scripts subidos a GitHub. Bots maliciosos escanean repositorios públicos constantemente y, si exponen tu llave, podrían consumir tu cuota, acceder a datos sensibles o generar cargos económicos masivos a tu cuenta.

La forma moderna e impenetrable de proteger tus llaves en proyectos locales de Python es usar Variables de Entorno. Almacenas las llaves en un archivo `.env` (ignorado en git) y las lees en Python usando `os.getenv()` o librerías como `python-dotenv`. Esto asegura que tu código base sea puramente genérico y pueda publicarse en internet, mientras que los secretos vitales permanecen encerrados físicamente en tu disco duro.