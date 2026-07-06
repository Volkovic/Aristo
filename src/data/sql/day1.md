## ¿Qué es SQL?

**SQL (Structured Query Language)** es el lenguaje estándar utilizado para comunicarse con las bases de datos relacionales (RDBMS) como MySQL, PostgreSQL, SQL Server o SQLite. 

Las bases de datos relacionales almacenan información estructurada en **Tablas** (similares a hojas de cálculo de Excel), las cuales están compuestas por **Filas** (registros) y **Columnas** (atributos).

En este curso aprenderás a leer, manipular y extraer exactamente la información que necesitas de bases de datos inmensas.

---

### La Declaración SELECT

La declaración fundamental de SQL es `SELECT`. Es la orden que le damos a la base de datos para que busque y nos traiga (consulte) ciertos datos de una tabla.

La estructura básica (sintaxis) es:
```sql
SELECT columna1, columna2 FROM nombre_tabla;
```

Si queremos seleccionar **todas** las columnas de una tabla, utilizamos el comodín asterisco `*`:
```sql
SELECT * FROM usuarios;
```
*Esto traerá absolutamente toda la información de la tabla usuarios.*

---

### Seleccionando Columnas Específicas

Es una buena práctica (para mejorar la velocidad y ahorrar memoria) seleccionar únicamente las columnas que realmente necesitas.

```sql
SELECT nombre, correo FROM usuarios;
```
Esta consulta leerá la tabla `usuarios` y devolverá solo las columnas `nombre` y `correo` para todos los registros existentes.

---

### Alias de Columnas (AS)

A veces, los nombres de las columnas en la base de datos son técnicos o difíciles de leer (ej. `usr_first_nm`). Podemos renombrar temporalmente la columna en los resultados utilizando la palabra clave `AS` (Alias).

```sql
SELECT usr_first_nm AS Nombre, usr_age AS Edad 
FROM usuarios;
```
El resultado mostrará las cabeceras como "Nombre" y "Edad", haciendo el reporte mucho más amigable para el humano.

---

### Valores Únicos (DISTINCT)

Si tienes una tabla de compras y quieres saber de qué países provienen tus clientes, una simple consulta `SELECT pais FROM compras;` te devolverá miles de filas repetidas ("México", "México", "España", "México").

Para obtener solo los valores únicos (eliminar los duplicados visuales), usamos `DISTINCT`:

```sql
SELECT DISTINCT pais FROM compras;
```
Esto devolverá una lista limpia y sin repeticiones de los países registrados.

---

### Ejercicio Práctico 1

**Lee el siguiente código e identifica el error conceptual:**
```sql
SELECT nombre, apellido, DISTINCT edad FROM clientes;
```

<details>
<summary>Ver Respuesta</summary>

**Error:** La palabra clave `DISTINCT` aplica a la consulta entera y siempre debe ir inmediatamente después de la palabra `SELECT`, no en medio de las columnas.
**Correcto:** `SELECT DISTINCT edad, nombre, apellido FROM clientes;` (aunque evaluar la distinción de múltiples columnas a la vez tiene un comportamiento diferente).
</details>

---

### Ejercicio Práctico 2

**¿Qué salida produce el siguiente código asumiendo que la tabla tiene 10 productos?**
```sql
SELECT * AS TodosLosDatos FROM productos;
```

<details>
<summary>Ver Respuesta</summary>

**Error de Sintaxis:** No puedes asignarle un Alias (`AS`) al comodín asterisco `*`. El comodín es un expansor de todas las columnas, no una columna per se. 
Debes hacer `SELECT * FROM productos;` o darle alias a columnas individuales.
</details>
