## Funciones de Agregación

Las funciones de agregación nos permiten resumir múltiples filas de datos y devolver un único valor calculado (por ejemplo, el total de dinero ganado en la tienda).

- **COUNT()**: Cuenta el número de filas.
- **SUM()**: Suma todos los valores numéricos de una columna.
- **AVG()**: (Average) Calcula el promedio o media.
- **MIN()**: Encuentra el valor más bajo.
- **MAX()**: Encuentra el valor más alto.

---

### Usando COUNT

Para saber cuántos empleados tienes en la empresa en total:
```sql
SELECT COUNT(*) FROM empleados;
```
*Nota: `COUNT(*)` cuenta las filas literales completas. Si haces `COUNT(salario)`, solo contará las filas donde el salario NO sea NULL.*

---

### SUM y AVG

Si quieres saber cuánto dinero necesitas para pagar nóminas y el salario promedio:
```sql
SELECT SUM(salario) AS GastoTotal, AVG(salario) AS Promedio
FROM empleados;
```

---

### MIN y MAX

Para encontrar el producto más barato y el más caro del inventario:
```sql
SELECT MIN(precio) AS MasBarato, MAX(precio) AS MasCaro 
FROM productos;
```

---

### Ejercicio Práctico 1

**¿Qué pasa si ejecutas `SELECT nombre, MAX(salario) FROM empleados;`?**

**[Solución]**
```sql
-- **Genera un Error (o comportamiento impredecible).**
-- No puedes mezclar en el mismo SELECT una columna 'plana' e individual (nombre) junto con una función de agregación agrupada (MAX), a menos que uses la cláusula GROUP BY. La base de datos no sabe qué nombre asociar a ese único salario máximo resumido.
```