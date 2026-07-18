# Día 19 - Manejo de archivos

El manejo de archivos es una parte esencial de la programación. Nos permite persistir datos, es decir, guardarlos en el disco duro para que no se pierdan al cerrar el programa, y leerlos más tarde.

En Python usamos la función incorporada `open()` para abrir un archivo del disco duro y trabajar con él.

```py
archivo = open('nombre_archivo.txt', 'modo')
```

---

## Modos de Apertura (`mode`)

Al abrir un archivo, debes decirle a Python qué planeas hacer con él. Estos son los modos principales:

- `'r'` (Lectura / Read): Valor **por defecto**. Abre el archivo solo para leer. Falla si no existe. (Si omites el modo en `open('datos.txt')`, asume `'r'`).
- `'w'` (Escritura / Write): Abre para escribir. **Sobrescribe** todo el contenido si ya existe, o lo crea si no existe.
- `'a'` (Añadir / Append): Abre para agregar contenido **al final** sin borrar lo existente. Lo crea si no existe.
- `'b'` (Binario): Se añade para leer archivos no textuales como imágenes (PNG), audios (MP3) o ejecutables (ej. `'rb'`).

### Codificación (Encoding)
La codificación es el mapa que le indica al sistema cómo traducir los ceros y unos (binarios) del disco en caracteres legibles por humanos (letras, tildes, 'ñ'). Siempre es buena práctica especificar la codificación universal al abrir texto:
```py
f = open('datos.txt', 'r', encoding='utf-8')
```

---

## Leer y Escribir (Métodos principales)

Una vez abierto el archivo, utilizamos los métodos del Objeto Archivo:

- `.read()`: Extrae **todo** el contenido del archivo en un solo y gigantesco String.
- `.readlines()`: Lee el archivo y devuelve una **Lista de Strings**, donde cada elemento es una línea independiente.
- `.write("texto")`: Inserta texto en el archivo. **Ojo:** Este método es literal y NO añade un salto de línea automático al final del texto introducido; debes poner `\n` manualmente si quieres bajar de línea.

```py
# Escribir en un archivo (sobrescribiendo)
f = open('saludo.txt', 'w', encoding='utf-8')
f.write("Hola Mundo\n")
f.write("Segunda línea")

# CERRAR SIEMPRE EL ARCHIVO
f.close() 
```
**Acción CRÍTICA:** Siempre debes realizar manualmente el método `.close()` sobre el objeto archivo cuando terminas de usarlo para liberar la memoria y asegurar que los datos se guarden.

---

## La forma "Pytónica" y Eficiente

### Declaración de Contexto `with` (Cierre automático)
Cerrar archivos manualmente con `.close()` es fácil de olvidar. La sintaxis recomendada en Python moderno es usar un administrador de contexto (`with`). De esta forma el archivo se CIERRE AUTOMÁTICAMENTE sin depender del programador.

```py
with open('saludo.txt', 'r', encoding='utf-8') as f:
    contenido = f.read()
    print(contenido)
# Aquí el archivo ya está cerrado automáticamente
```

### Leer archivos inmensos
Si un archivo pesa 10 GB, usar `.read()` o `.readlines()` colapsaría tu memoria RAM. La forma más "Pytónica" y eficiente en consumo de memoria para leer un archivo inmenso es **iterar directamente sobre el objeto archivo** con un bucle `for`:

```py
with open('log_gigante.txt', 'r') as f:
    for linea in f:
        print(linea) # Lee y descarta de la RAM una línea a la vez
```

---

## El Cursor: `.tell()` y `.seek()`

Los archivos funcionan internamente como cintas magnéticas con un "cursor" o "cabezal" de lectura/escritura.

- `f.tell()`: Devuelve la posición exacta (en bytes) donde se encuentra el cursor actualmente.
- `f.seek(posicion)`: Mueve el cursor a un byte específico. (Ej: `f.seek(0)` rebobina el cursor al principio del archivo).

```py
with open('texto.txt', 'r') as f:
    print("Cursor inicial:", f.tell()) # 0
    f.read()
    print("Cursor final:", f.tell()) # Final del archivo
    f.seek(0) # Rebobinar
    print("De nuevo al inicio:", f.tell()) # 0
```

---

## Eliminar Archivos y Comprobar Existencia

Para eliminar físicamente un archivo del disco duro usando código, utilizamos el módulo del sistema operativo llamado `os`.

Para evitar un error, debes revisar si un archivo realmente existe en el disco duro antes de intentar abrirlo o eliminarlo, usando `os.path.exists()`.

```py
import os

ruta = './mi_archivo.txt'

if os.path.exists(ruta):
    os.remove(ruta)
    print("Archivo eliminado.")
else:
    print("El archivo no existe en el disco duro.")
```

---

## Manejo de Archivos JSON

JSON (*JavaScript Object Notation*) es el formato más popular para intercambiar datos. En Python, un JSON se comporta estructuralmente igual que un **Diccionario**. 

Para volcarlo (guardarlo) en disco como un archivo de formato `.json`, utilizamos el módulo de la Librería Estándar llamado `json`.

```py
import json

persona = {
    "nombre": "Ana",
    "habilidades": ["Python", "SQL"]
}

# json.dump(): Guarda en un ARCHIVO en el disco
with open('datos.json', 'w', encoding='utf-8') as f:
    json.dump(persona, f, indent=4)
```

**Diferencia técnica clave:**
- `json.dump(objeto, archivo)`: Vuelca los datos directamente a un **Objeto Archivo** (guardando en el disco).
- `json.dumps(objeto)`: (Con 's' de String). Convierte los datos a un **String** de texto plano en la memoria RAM, sin guardar nada en disco. 
- Lo mismo aplica para leer: `load()` (lee archivo) vs `loads()` (lee string).

---

## Otros formatos (CSV, Excel y XML)

Brevemente, Python puede manejar cualquier tipo de archivo de datos usando librerías:

- **CSV (Valores Separados por Comas):** Ideal para tablas de datos. Se utiliza el módulo estándar `csv`. Para iterar se usa `csv.reader(archivo)`.
- **Excel (.xlsx, .xls):** Archivos complejos de hojas de cálculo. Se requieren librerías externas (no integradas en Python por defecto) como `xlrd` o `openpyxl`.
- **XML:** Formato de etiquetas parecido al HTML `<etiqueta>dato</etiqueta>`. Se lee usando el módulo estándar `xml.etree.ElementTree`.