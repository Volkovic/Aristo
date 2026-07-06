## Window Functions (Funciones de Ventana)

Las Window Functions son la magia de análisis moderno (PostgreSQL, SQL Server).
A diferencia del `GROUP BY` que condensa y colapsa brutalmente múltiples filas de origen en una sola fila agrupada de resumen, las **Window Functions calculan agregaciones manteniendo todas y cada una de las filas originales separadas**.

Para invocar la ventana se usa la cláusula `OVER()`.

---

### Agregación sin Colapsar

Imagina que quieres imprimir a todos los empleados, su salario, y una columna extra que tenga el salario total de la empresa para compararlo visualmente al lado.

```sql
SELECT nombre, salario,
       SUM(salario) OVER() AS GastoTotalEmpresa
FROM empleados;
```
*(Te devolverá 50 filas intactas, pero con una columna maravillosa pegada al costado que mostrará el mismo gran total de la compañía, sin necesidad de usar Subconsultas).*

---

### Particionamiento (PARTITION BY)

Puedes dividir la ventana analítica en mini-grupos (como si fuera un Group By, pero respetando las filas independientes).

```sql
SELECT nombre, departamento, salario,
       AVG(salario) OVER(PARTITION BY departamento) AS PromedioDeSuArea
FROM empleados;
```
Esto calcula y adjunta el promedio específico por departamento a cada empleado, dejándolos ver instantáneamente si están cobrando por encima o por debajo de sus compañeros más próximos.

---

### ROW_NUMBER() y RANK()

Espectacular para rankings, top listas de streaming o tops de ventas.

- **ROW_NUMBER():** Numera cada fila (1,2,3) secuencialmente y a la fuerza.
- **RANK():** Numera, pero si dos empleados tienen el mismo puntaje, los empata en el mismo nivel y salta el siguiente número (Ej: 1, 2, 2, 4).

```sql
SELECT nombre, salario,
       RANK() OVER(ORDER BY salario DESC) as PuestoRiqueza
FROM empleados;
```

---

### Ejercicio Práctico 1 (Final)

**Lee este código que intenta obtener "Los top 3 empleados mejor pagados". Detecta por qué no funciona (falla de sintaxis).**
```sql
SELECT nombre, RANK() OVER(ORDER BY salario DESC) as Top
FROM empleados
WHERE Top <= 3;
```

<details>
<summary>Ver Respuesta</summary>

**Error de Orden Lógico.** Como aprendiste en el día 5, el `WHERE` ocurre primero (antes del SELECT). Por tanto, la base de datos dice: "No tengo la más remota idea de qué es la columna 'Top', porque las Window Functions se calculan justo al final (en la fase del Select)". Para filtrarlo debes envolverlo obligatoriamente en un CTE (`WITH...`) y filtrar la nueva variable limpia después. ¡Felicidades por finalizar tu currículo!
</details>