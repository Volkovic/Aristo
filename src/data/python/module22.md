# Día 22 - Web scraping

## Web scraping con Python

### ¿Qué es el web scraping?

Internet está lleno de datos que pueden utilizarse para distintos fines. Para recopilar esos datos necesitamos saber cómo extraerlos de sitios web.

El web scraping es el proceso de extraer y recopilar datos de sitios web y almacenarlos en una máquina local o en una base de datos.

En esta sección usaremos los paquetes requests y BeautifulSoup (versión 4).

Para empezar necesitas _requests_,_beautifulsoup4_ y un _sitio web_:

```sh
pip install requests
pip install beautifulsoup4
```

Para hacer scraping necesitas conocimientos básicos de etiquetas HTML y selectores CSS. Usamos etiquetas HTML,clases y/o IDs para localizar contenido en la página.
Importemos requests y BeautifulSoup:

```py
import requests
from bs4 import BeautifulSoup
```

Declaremos una variable url con el sitio que queremos scrapear:

```py
import requests
from bs4 import BeautifulSoup
url = 'https://archive.ics.uci.edu/ml/datasets.php'

# Usamos requests.get para obtener datos de la URL
response = requests.get(url)
# Comprobar el estado
status = response.status_code
print(status) # 200 indica éxito
```

```sh
200
```

El código `200` (OK) significa éxito rotundo en la web. Otros códigos comunes son `404` (No Encontrado) o `500` (Error Interno del Servidor). Siempre es buena práctica validar `if response.status_code == 200:` antes de continuar.
Además, para evitar ser bloqueados por servidores que rechazan peticiones si detectan que eres un script de Python (bot), es muy importante configurar el encabezado `User-Agent` en nuestra petición, simulando ser un navegador real (por ejemplo, Chrome o Firefox).

Parsear el contenido con BeautifulSoup:

```py
import requests
from bs4 import BeautifulSoup
url = 'https://archive.ics.uci.edu/ml/datasets.php'

response = requests.get(url)
content = response.content # obtenemos todo el contenido del sitio
soup = BeautifulSoup(content, 'html.parser') # BeautifulSoup nos permite parsear el HTML
print(soup.title) # <title>UCI Machine Learning Repository: Data Sets</title>
print(soup.title.get_text()) # UCI Machine Learning Repository: Data Sets
print(soup.body) # muestra el cuerpo completo de la página
print(response.status_code)
```

Además de `response.content`, puedes usar el atributo `response.text` para acceder al documento HTML entero devuelto por el servidor como un inmenso String decodificado. El parser `'html.parser'` le indica a la librería bs4 bajo qué reglas gramaticales debe interpretar ese String crudo, transformándolo en un árbol de objetos navegable. 

Para extraer el texto puro de una etiqueta (quitándole las marcas HTML), puedes usar `.text` o `.get_text()`.

```py
tables = soup.find_all('table', {'cellpadding':'3'})
# Localizamos tablas cuyo atributo cellpadding tenga el valor 3
# Podemos usar id, class o etiquetas HTML para seleccionar elementos; consulta la documentación de BeautifulSoup para más información
table = tables[0] # el resultado es una lista; tomamos el primer elemento
for td in table.find('tr').find_all('td'):
    print(td.text)
```

Para buscar elementos, el método `.find('etiqueta')` recorre el árbol de arriba hacia abajo y se detiene devolviendo el **primer** elemento que coincida, mientras que `.find_all('etiqueta')` devuelve una lista completa con todas las coincidencias (ideal para iterar con un bucle for y contar elementos, como todos los párrafos `<p>` de una página).

Si queremos filtrar por el atributo ID (que es único en la página), usamos `soup.find('div', id='main')`. Para filtrar por clases CSS, dado que `class` es una palabra reservada en Python, debemos usar `class_` (con guion bajo): `soup.find('span', class_='price')`. También puedes usar selectores CSS (la misma sintaxis de CSS y JS) mediante el método `.select('.clase #id')`.

Una vez localizado un elemento, como un enlace `<a>`, puedes extraer la URL exacta hacia donde apunta obteniendo el valor de su atributo `href`. Para ello, tratas la etiqueta como un diccionario usando `.get('href')`. Si el elemento que buscas está muy oculto, puedes usar la navegación del árbol (Tree Navigation) con métodos como `.parent` o `.find_next_sibling()` para moverte hacia los elementos HTML que lo rodean gráficamente (sus "padres" o "hermanos").

Si ejecutas este código verás que la extracción está incompleta.Puedes continuar para completarla,ya que forma parte del ejercicio 1.

### Consideraciones avanzadas y Ética del Web Scraping

Antes de extraer datos de un sitio agresivamente, debes revisar su archivo `robots.txt` (ej. `sitio.com/robots.txt`). Este archivo funciona como un contrato legal que define qué rutas públicas están permitidas para ser raspadas (Crawl) por los bots y cuáles están estrictamente prohibidas. Además, al raspar miles de páginas iterando en un bucle, **debes** forzosamente usar `time.sleep()` entre cada petición. Esta pausa simula el comportamiento humano y evita un ataque DDoS; si bombardeas el servidor con cientos de peticiones por segundo, podrías tumbar la web o hacer que te baneen permanentemente la IP.

Finalmente, ten en cuenta que `requests` y `BeautifulSoup` son herramientas para scraping estático. Si intentas raspar un sitio web moderno (SPA) construido con React, Angular o Vue, el HTML devuelto estará casi vacío porque Requests no ejecuta JavaScript. En estos casos, BeautifulSoup fracasará y necesitarás usar herramientas modernas de automatización de navegadores como **Selenium**, **Puppeteer** o **Playwright**, que abren un navegador real, ejecutan el JS (permitiendo hacer clics o scrollear) y toman los datos.

Consulta la documentación de BeautifulSoup para más detalles: https://www.crummy.com/software/BeautifulSoup/bs4/doc/#quick-start