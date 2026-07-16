## Common Table Expressions (CTEs)

Las CTEs (Cláusula `WITH`) son una evolución moderna, elegante y revolucionaria para reemplazar subconsultas ilegibles y anidadas (Código Espagueti). 

Una CTE te permite guardar el resultado de una consulta compleja temporalmente bajo un "nombre" limpio (como si fuera una variable) al principio de tu script, para poder referenciarla fácilmente más abajo.

---

### Sintaxis Básica de CTE

```sql
WITH VentasAltas AS (
    SELECT empleado_id, SUM(total) as Facturado
    FROM ventas
    GROUP BY empleado_id
    HAVING SUM(total) > 100000
)

SELECT e.nombre, v.Facturado
FROM empleados e
INNER JOIN VentasAltas v ON e.id = v.empleado_id;
```
En lugar de meter ese bodoque gigante dentro de la consulta final entorpeciendo la lectura, lo modularizamos arriba en bloque independiente `VentasAltas`.

---

### Múltiples CTEs

Puedes crear cadenas de variables CTE separadas por comas. El poder brutal de las CTEs es que la CTE número 3 puede consultar a la CTE 1 y 2, construyendo flujos lógicos clarísimos.

```sql
WITH T1 AS (SELECT ...),
     T2 AS (SELECT ... FROM T1),
     T3 AS (SELECT ... FROM T2)
SELECT * FROM T3;
```

---

### Ejercicio Práctico 1

**¿Se guarda la tabla CTE físicamente en el disco duro de la base de datos (como una View)?**

**[Solución]**
```sql
-- **NO.** Las CTEs son 100% efímeras. Solo existen viva en memoria durante la minúscula fracción de segundo que demora en ejecutarse esa única declaración SQL. Al finalizar el punto y coma `;`, la CTE y sus datos se evaporan sin dejar rastro.
```