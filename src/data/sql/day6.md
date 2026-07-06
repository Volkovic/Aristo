## Funciones Nativas de Texto (Strings)

SQL viene con múltiples herramientas incorporadas (Built-in Functions) para alterar los datos al vuelo justo antes de mostrarlos.

- **UPPER() / LOWER()**: Convierte a mayúsculas o minúsculas.
- **LENGTH() o LEN()**: Devuelve la cantidad de caracteres de un texto.
- **CONCAT()**: Une o pega dos o más strings juntos.

```sql
SELECT 
  UPPER(nombre) AS NombreMayuscula,
  LENGTH(nombre) AS CantidadLetras,
  CONCAT(nombre, ' ', apellido) AS NombreCompleto
FROM clientes;
```

---

### Funciones Nativas de Fecha (Dates)

Las fechas son críticas en las bases de datos. Los motores SQL tienen funciones para extraer partes específicas.

- **EXTRACT(YEAR FROM fecha)** o **YEAR(fecha)**: Saca solo el año.
- **NOW() o CURRENT_DATE**: Obtiene la fecha/hora actual del sistema.
- **DATEDIFF()**: Calcula los días de diferencia entre dos fechas.

```sql
-- Saber cuántos años pasaron desde su fecha de registro
SELECT nombre, 
       YEAR(CURRENT_DATE) - YEAR(fecha_registro) AS AntiguedadEnAnos
FROM clientes;
```

---

### Funciones de Control de Flujo (CASE WHEN)

El `CASE` es el equivalente a la estructura `if/else` de otros lenguajes de programación. Permite crear columnas falsas (calculadas) en base a condiciones complejas de las filas.

```sql
SELECT nombre, salario,
  CASE
    WHEN salario < 2000 THEN 'Junior'
    WHEN salario BETWEEN 2000 AND 5000 THEN 'Mid'
    ELSE 'Senior'
  END AS RangoSalarial
FROM empleados;
```

---

### Ejercicio Práctico 1

**¿Qué devuelve el código si la columna `telefono` es NULL?**
```sql
SELECT nombre, COALESCE(telefono, 'Sin registrar') AS Tel FROM usuarios;
```

<details>
<summary>Ver Respuesta</summary>

La fantástica función `COALESCE()` evalúa si el primer parámetro es NULL. Si lo es, escupe el segundo parámetro (un valor de respaldo/default). Por lo tanto, en la UI se mostrará el texto 'Sin registrar' en vez de un espantoso NULL vacío.
</details>