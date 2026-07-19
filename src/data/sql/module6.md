## Funciones de Manipulación de Texto (Strings)

SQL incluye herramientas incorporadas (Built-in Functions) para transformar datos de texto al vuelo.

- **UPPER() / LOWER()**: Fuerzan la cadena a mayúsculas o minúsculas.
- **LENGTH() o LEN()**: Devuelve la cantidad de caracteres de un texto.
- **CONCAT()**: Pega dos o más strings juntos.
- **SUBSTRING() o SUBSTR()**: Extrae un fragmento de la cadena desde una posición inicial.
- **TRIM()**: Limpia los espacios en blanco basura tanto a la izquierda como a la derecha (a diferencia de `LTRIM()` y `RTRIM()`).
- **REPLACE()**: Reemplaza masivamente todas las apariciones de una subcadena por otra.

```sql
SELECT 
  UPPER(TRIM(nombre)) AS NombreLimpio,
  SUBSTRING(apellido, 1, 3) AS Abreviacion,
  REPLACE(correo, '.com', '.org') AS CorreoActualizado
FROM clientes;
```

---

## Funciones de Fecha, Numéricas y Conversiones

Las bases de datos gestionan rigurosamente el tiempo y la matemática, ofreciendo funciones puras para operar con ellos.

**Fechas:**
- **NOW() o CURRENT_TIMESTAMP**: Extrae la fecha y hora actual del sistema.
- **EXTRACT(parte FROM fecha)**: Saca una parte específica (ej. YEAR, MONTH).
- **DATEDIFF()**: Calcula los días de diferencia entre dos fechas.

**Numéricas y Conversión:**
- **ROUND(numero, decimales)**: Redondea con precisión decimal.
- **CEIL()**: Redondea siempre hacia arriba.
- **FLOOR()**: Redondea siempre hacia abajo.
- **CAST(valor AS tipo) o CONVERT()**: Obliga a un tipo de dato a transformarse en otro (ej. de cadena de texto a entero).

```sql
SELECT 
  CAST('2026-10-15' AS DATE) AS FechaFalsa,
  EXTRACT(YEAR FROM NOW()) AS AnioActual,
  ROUND(salario * 1.21, 2) AS SalarioConImpuestos
FROM empleados;
```

---

## Control de Flujo (Condicionales) y Nulos

SQL posee estructuras condicionales lógicas integradas. La más potente es el `CASE WHEN`, equivalente estricto de múltiples `if / else if / else` o un bloque `switch`.

**El Gotcha del ELSE**: Si omites la cláusula `ELSE` en un bloque `CASE` y ninguna condición `WHEN` se cumple, la expresión retornará `NULL` por defecto (lo cual puede inyectar nulos indeseados en la UI).

```sql
SELECT nombre, salario,
  CASE
    WHEN salario < 2000 THEN 'Junior'
    WHEN salario BETWEEN 2000 AND 5000 THEN 'Mid'
    ELSE 'Senior'
  END AS RangoSalarial
FROM empleados;
```

**Manejo de Nulos (COALESCE):**
`COALESCE(valor, 'respaldo')` evalúa si el primer parámetro es `NULL`. Si lo es, escupe el valor de respaldo. Es el estándar ANSI oficial (mejor que funciones específicas de motor como `IFNULL`).

```sql
SELECT nombre, COALESCE(telefono, 'Sin registrar') AS Tel FROM usuarios;
```

---

## Anidamiento y Agrupación Avanzada

**Anidamiento de funciones:** SQL evalúa las funciones anidadas siempre **de adentro hacia afuera**. En `UPPER(TRIM(nombre))`, primero elimina los espacios y luego sube a mayúsculas.

**Agrupación Dinámica:** Es completamente legal usar funciones de texto o numéricas dentro de la cláusula `GROUP BY`.

```sql
-- Agrupando por una función de extracción
SELECT EXTRACT(YEAR FROM fecha_registro) AS Anio, COUNT(*) 
FROM usuarios 
GROUP BY EXTRACT(YEAR FROM fecha_registro);
```

**Agregación Condicional:** Permite contar o pivotar datos dentro de un `SUM()` mezclado con un condicional lógico. Filtra dentro del grupo en una sola pasada.

```sql
SELECT 
  departamento,
  SUM(CASE WHEN genero = 'M' THEN 1 ELSE 0 END) AS Hombres,
  SUM(CASE WHEN genero = 'F' THEN 1 ELSE 0 END) AS Mujeres
FROM empleados
GROUP BY departamento;
```

---

## Gotchas Críticos y Funciones Especiales

**Orden Aleatorio:** 
Al ejecutar `ORDER BY RANDOM()` (o `RAND()` en MySQL), el motor asigna un valor temporal aleatorio a cada fila para luego ordenarlas, barajando el conjunto de resultados.

**Longitud de Disco:**
Mientras `LENGTH()` cuenta los caracteres legibles, **`OCTET_LENGTH()`** (o `LENGTHB()`) calcula el peso físico real en bytes que ocupa la cadena en el disco duro, crítico en textos multibyte (como caracteres acentuados o asiáticos en UTF-8).

**[PELIGRO DE RENDIMIENTO] Funciones en el WHERE:**
Aplicar funciones nativas sobre una columna en la cláusula `WHERE` destruye el rendimiento.

```sql
-- MAL: Rompe el uso de índices (No es SARGable). El motor hará un escaneo completo.
WHERE YEAR(fecha_registro) = 2026;

-- BIEN: Es SARGable y usará índices B-Tree.
WHERE fecha_registro >= '2026-01-01' AND fecha_registro < '2027-01-01';
```