## Agrupación de Datos (GROUP BY)

Como vimos en el día anterior, no puedes mezclar agregaciones con columnas normales. Pero, ¿qué pasa si quieres saber "cuántos empleados hay EN CADA departamento"? 
Para eso usamos `GROUP BY`.

La cláusula `GROUP BY` agrupa las filas que tienen los mismos valores en filas de resumen únicas.

```sql
SELECT departamento, COUNT(*) AS CantidadEmpleados
FROM empleados
GROUP BY departamento;
```
Esta consulta generará una fila por cada departamento distinto, y contará cuántos trabajadores pertenecen a cada uno de esos grupos cerrados.

---

### Filtrando Grupos (HAVING)

Imagina que después de agrupar, solo quieres ver los departamentos que tengan **más de 10 empleados**.
No puedes usar `WHERE` porque el WHERE filtra **antes** de agrupar (filtra filas individuales crudas). 
Para filtrar resultados **después** de que los grupos ya fueron calculados matemáticamente, debes usar `HAVING`.

```sql
SELECT departamento, SUM(salario) AS GastoTotal
FROM empleados
GROUP BY departamento
HAVING SUM(salario) > 50000;
```
*Regla de Oro: WHERE se usa con columnas normales, HAVING se usa con Funciones de Agregación (SUM, COUNT, etc).*

---

### Ejercicio Práctico 1

**Ordena las cláusulas SQL según su estricto orden de ejecución lógica dentro del motor:** 
GROUP BY, WHERE, ORDER BY, SELECT, FROM, HAVING.

<details>
<summary>Ver Respuesta</summary>

1. **FROM** (Busca la tabla cruda)
2. **WHERE** (Elimina filas que no sirven)
3. **GROUP BY** (Agrupa lo que quedó)
4. **HAVING** (Filtra a los grupos que no sirven)
5. **SELECT** (Proyecta o saca las columnas finales)
6. **ORDER BY** (Ordena visualmente el resultado final)
</details>