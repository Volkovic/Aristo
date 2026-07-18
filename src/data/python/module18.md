# Día 18 - Expresiones Regulares (RegEx)

Las expresiones regulares (RegEx) son secuencias de caracteres que forman un patrón de búsqueda. 

## ¿Por qué son tan útiles?
En lugar de buscar palabras exactas, RegEx te permite buscar formatos. Son la herramienta ideal para:
- Validar correos electrónicos (algo con `@` y que termine en `.com`).
- Encontrar y extraer fechas (como `DD/MM/AAAA`).
- Verificar contraseñas (que contengan mayúsculas, números, etc.).
- Limpiar textos desordenados.

Para usar RegEx en Python, simplemente importamos la herramienta incorporada llamada `re`. Además, al escribir patrones, utilizamos **cadenas crudas (raw strings)** anteponiendo una `r` (ej. `r'patrón'`) para que Python ignore los caracteres de escape normales.

```py
import re
```

---

## Métodos principales: Búsqueda

Python nos ofrece diferentes funciones dependiendo de lo que queramos lograr con nuestro patrón.

### `re.search()`: Buscar un patrón
Busca el patrón en todo el texto y devuelve la **primera coincidencia** encontrada.

```py
import re

txt = "El número de soporte es 555-1234. Llama pronto."
# Buscamos la palabra 'soporte'
match = re.search(r'soporte', txt)

if match:
    print("¡Encontrado en la posición:", match.span(), "!")
```

### `re.match()`: Buscar solo al inicio
A diferencia de `search`, `match` solo busca al **principio exacto** de la cadena de texto.

```py
txt = "Hola mundo"
print(re.match(r'Hola', txt))  # Encuentra coincidencia
print(re.match(r'mundo', txt)) # Devuelve None (no está al inicio)
```

---

## Métodos principales: Extracción y Edición

### `re.findall()`: Extraer todas las coincidencias
Devuelve una lista con **todas** las partes del texto que cumplen con el patrón.

```py
txt = "Python 3.9 es genial. Python 3.10 es mejor."
# La bandera re.I indica que se ignore mayúsculas y minúsculas
matches = re.findall(r'python', txt, re.I)
print(matches) # ['Python', 'Python']
```

### `re.sub()`: Buscar y reemplazar
Encuentra todas las coincidencias del patrón y las reemplaza por un nuevo texto.

```py
txt = "Tengo 2 manzanas y 5 peras"
# Reemplazamos todos los números (\d) por '#'
limpio = re.sub(r'\d', '#', txt)
print(limpio) # Tengo # manzanas y # peras
```

### `re.split()`: Dividir texto
Divide la cadena de texto cada vez que encuentra el patrón.

```py
txt = "manzana,pera;uva banana"
# Divide por coma, punto y coma, o espacio
frutas = re.split(r'[,;\s]', txt)
print(frutas) # ['manzana', 'pera', 'uva', 'banana']
```

---

## Construyendo Patrones: Tipos de Datos

El verdadero poder de RegEx está en usar **metacaracteres** para definir reglas de búsqueda.

### Clases de Caracteres comunes
- `\d`: Cualquier dígito (0-9).
- `\w`: Cualquier carácter alfanumérico (letras, números y guion bajo `_`). Útil para nombres de usuario.
- `.`: Cualquier carácter (excepto saltos de línea).
- `\`: Carácter de escape. Sirve para buscar símbolos que normalmente son código RegEx (ej. `\.` busca un punto literal).

### Alternancia (Operador OR `|`)
El símbolo `|` actúa como un "O lógico". Permite buscar una palabra u otra completa.
- `gato|perro`: Coincide con "gato" O con "perro".

### Corchetes `[]` (Conjuntos)
Permiten definir un grupo de opciones válidas para una sola posición.
- `[aeiou]`: Cualquier vocal.
- `[a-z]`: Cualquier letra minúscula.
- `[A-Z0-9]`: Mayúsculas o números.
- `[^a-z]`: El circunflejo `^` **dentro** de corchetes significa **negación** (cualquier cosa que NO sea letra minúscula).

---

## Construyendo Patrones: Cuantificadores

Los cuantificadores indican cuántas veces debe repetirse el carácter o grupo anterior:

- `+`: Una o más veces. (Ej. `\d+` busca números continuos de cualquier longitud).
- `*`: Cero o más veces.
- `?`: Cero o una vez (indica que el carácter es opcional).
- `{n,m}`: Entre *n* y *m* veces exactas.

```py
import re

txt = "Año 2023, mes 08."
# Busca números que tengan exactamente 4 dígitos
print(re.findall(r'\d{4}', txt)) # ['2023']

# Busca números de 1 o más dígitos
print(re.findall(r'\d+', txt)) # ['2023', '08']

# El signo ? hace que el guion sea opcional
print(re.findall(r'e-?mail', "email o e-mail")) # ['email', 'e-mail']
```

---

## Anclas y Grupos

### Anclas (`^` y `$`)
Obligan al patrón a coincidir solo en los extremos del texto.
- `^`: Obliga a coincidir al **inicio** de la línea. (No confundir con el `^` dentro de `[]`).
- `$`: Obliga a coincidir al **final** de la línea.

```py
email = "usuario@correo.com"
# Valida que TODO el texto sea un email, sin basura antes o después
es_valido = re.search(r'^\w+@\w+\.com$', email)
```

### Grupos `()`
Los paréntesis agrupan partes del patrón. Tienen dos funciones principales:
1. **Aplicar cuantificadores a un bloque entero**: Por ejemplo, `(ab)+` repetirá la secuencia exacta 'ab', coincidiendo con 'ababab'.
2. **Extraer datos**: Aislan un pedazo específico de información dentro de una coincidencia mayor para extraerlo fácilmente.