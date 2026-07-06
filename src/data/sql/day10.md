## Subconsultas (Subqueries)

Una subconsulta es una consulta completa anidada o escondida adentro de otra consulta (Query dentro de un Query).

Es útil cuando no sabes un valor de antemano.

---

### Subconsultas en el WHERE

¿Cómo obtienes a todos los empleados que ganan más que el empleado llamado 'Pedro'? Como no sabes el salario de Pedro, primero debes consultarlo.

```sql
SELECT nombre, salario 
FROM empleados
WHERE salario > (
    SELECT salario FROM empleados WHERE nombre = 'Pedro'
);
```
SQL ejecutará primero el paréntesis interior (evalúa a un número, ej: 4000), y luego ejecuta la consulta externa (salario > 4000).

---

### Subconsultas de Múltiples Filas

Si la subconsulta interior devuelve más de una fila (un array de valores), no puedes usar `=` o `>`, debes usar operadores de lista como `IN` o `NOT IN`.

```sql
-- Traer los clientes que hayan comprado un 'iPhone'
SELECT nombre 
FROM clientes
WHERE id IN (
    SELECT cliente_id FROM compras WHERE producto = 'iPhone'
);
```

---

### Subconsultas Correlacionadas

Normalmente una subconsulta se evalúa una sola vez de forma aislada. Pero en una correlacionada, la subconsulta interior hace referencia (depende) de una variable de la tabla exterior.

```sql
-- Empleados que ganen MÁS que el promedio DE SU PROPIO departamento
SELECT e1.nombre, e1.salario
FROM empleados e1
WHERE e1.salario > (
    SELECT AVG(salario) 
    FROM empleados e2 
    WHERE e2.departamento = e1.departamento
);
```
*Este es un proceso pesadísimo: la subconsulta se tiene que volver a calcular por CADA UNA de las filas evaluadas en el query principal.*

---

### Ejercicio Práctico 1

**¿Por qué las Subconsultas Correlacionadas se consideran un Anti-patrón de rendimiento masivo frente a un JOIN?**

<details>
<summary>Ver Respuesta</summary>

Porque ejecutan su lógica en un bucle N veces (N siendo las filas exteriores). Si la tabla exterior tiene 1 millón de empleados, el servidor hará 1 millón de consultas independientes extra a la base de datos para promediar salarios, matando el CPU. Con JOINs, los datos se calculan en masa (Set-based) una sola vez.
</details>