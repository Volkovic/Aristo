## OUTER JOINS

A diferencia del INNER JOIN estricto que requiere pareja exacta, los Outer Joins permiten que las filas de una tabla sobrevivan en el resultado, incluso si no encontraron coincidencias en la otra tabla.

---

### LEFT JOIN (o LEFT OUTER JOIN)

El `LEFT JOIN` retorna **TODAS** las filas de la tabla de la Izquierda (la primera que escribiste en el FROM), e intenta traer coincidencias de la tabla Derecha (la del JOIN).

Si no encuentra coincidencias, no elimina la fila izquierda, sino que rellena con `NULL` los huecos vacíos de la derecha.

```sql
SELECT clientes.nombre, pedidos.total
FROM clientes
LEFT JOIN pedidos 
  ON clientes.id = pedidos.cliente_id;
```
*Resultado: Verás a todos los clientes. Si un cliente no compró nada, verás su nombre y en la columna 'total' dirá NULL.*

---

### RIGHT JOIN

Es exactamente lo mismo que el LEFT, pero dándole privilegio de supervivencia a la tabla de la Derecha.
*(Nota: En la industria rara vez se usa el RIGHT JOIN, ya que los programadores prefieren reescribir la misma lógica volteando las tablas y usando un LEFT JOIN por costumbre visual).*

---

### FULL OUTER JOIN

Devuelve **absolutamente TODAS** las filas de ambas tablas, hayan emparejado o no. Si un cliente no compró, se muestra con NULLs. Si un pedido huérfano no tiene cliente, se muestra con NULLs en el cliente.

```sql
SELECT c.nombre, p.total
FROM clientes c
FULL OUTER JOIN pedidos p 
  ON c.id = p.cliente_id;
```
*(Nota de limpieza: Le pusimos alias 'c' y 'p' a las tablas para no tener que escribir las palabras completas).*

---

### Ejercicio Práctico 1

**¿Cómo usarías un LEFT JOIN para encontrar a los clientes falsos (que se registraron pero que JAMÁS hicieron una compra)?**

**[Solución]**
```sql
SELECT c.nombre 
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;
-- Al hacer el LEFT JOIN sabemos que los que no compraron tendrán la columna de pedido rellena de NULLs por SQL. Filtrando explícitamente `WHERE p.id IS NULL` nos aislamos para ver únicamente a los rezagados. A esta técnica técnica se le llama "Anti-Join".
```