## Ordenando Datos (ORDER BY)

Por defecto, cuando haces un simple `SELECT * FROM tabla`, la base de datos te devolverá las filas en el orden exacto en el que fueron insertadas físicamente en el disco duro, o en un orden impredecible dependiente del motor. 

Si necesitas presentar los datos de forma estructurada (ej. Ranking de los mejores pagados, o listado alfabético), debes usar explícitamente la cláusula `ORDER BY`.

```sql
SELECT nombre, salario 
FROM empleados 
ORDER BY salario;
```
Por defecto, `ORDER BY` siempre ordena de manera **Ascendente** (de menor a mayor, o de la A a la Z).

---

### Orden Descendente (DESC)

Si queremos invertir el orden (de mayor a menor, o de Z a A), debemos adjuntar la palabra clave `DESC` (Descending) justo después de la columna.

```sql
-- Queremos ver primero a los más jóvenes (Edad menor a mayor)
SELECT nombre, edad FROM usuarios ORDER BY edad ASC;

-- Queremos ver a los más ricos primero (Salario mayor a menor)
SELECT nombre, salario FROM usuarios ORDER BY salario DESC;
```
*(Nota: Aunque `ASC` es el comportamiento por defecto y no hace falta escribirlo, muchos programadores lo ponen para hacer el código más explícito).*

---

### Ordenamiento Múltiple

Puedes ordenar por más de una columna a la vez. El motor ordenará por la primera columna y, **solo si hay empates** en la primera, utilizará la segunda columna para desempatar, y así sucesivamente.

```sql
SELECT nombre, apellido, edad 
FROM clientes 
ORDER BY apellido ASC, nombre ASC;
```
En este ejemplo, organizará a todos los clientes alfabéticamente por su apellido. Si resulta que hay 15 clientes de apellido "Pérez", a esos 15 los ordenará internamente por su nombre de pila.

---

### Limitando Resultados (LIMIT)

Si tienes un millón de productos, pero solo necesitas saber cuál es "El Producto Más Caro" de toda tu tienda, no tiene sentido descargar el millón de filas a tu servidor. 
En MySQL y PostgreSQL utilizamos la directiva `LIMIT` para truncar (recortar) la salida.

```sql
SELECT nombre, precio 
FROM productos 
ORDER BY precio DESC 
LIMIT 1;
```
Aquí la base de datos ordena todo del más caro al más barato, pero gracias a `LIMIT 1`, descarta el resto y te devuelve **únicamente** la fila campeona superior.

*(Nota: En Microsoft SQL Server, se usa `TOP` en lugar de `LIMIT` al inicio de la consulta: `SELECT TOP 1 nombre FROM productos`)*.

---

### Paginación de Datos (OFFSET)

Cuando entras a la página de Google y le das click al botón "Página 2", el navegador no te descarga toda la internet. 
SQL maneja las páginas con la directiva `OFFSET` (Desplazamiento). Le dice a la base de datos cuántas filas iniciales debe "saltarse" o "ignorar" antes de empezar a devolverte resultados.

```sql
-- Página 1: Trae los primeros 10 resultados
SELECT * FROM posts ORDER BY fecha DESC LIMIT 10 OFFSET 0;

-- Página 2: Sáltate los primeros 10, y tráeme los 10 que siguen
SELECT * FROM posts ORDER BY fecha DESC LIMIT 10 OFFSET 10;

-- Página 3: Sáltate los primeros 20, y tráeme los 10 que siguen
SELECT * FROM posts ORDER BY fecha DESC LIMIT 10 OFFSET 20;
```

---

### Ejercicio Práctico 1

**Analiza el siguiente requerimiento:** Necesitamos obtener el "Segundo empleado con el salario más alto de la empresa". ¿Cómo armas la consulta?

<details>
<summary>Ver Respuesta</summary>

```sql
SELECT nombre, salario 
FROM empleados 
ORDER BY salario DESC 
LIMIT 1 OFFSET 1;
```
**Justificación:** Al ordenar `DESC`, ponemos a los más ricos arriba. `LIMIT 1` asegura que nos traiga solo 1 fila. Y la clave maestra es `OFFSET 1`, que le dice al motor: "sáltate e ignora a la primera fila absoluta (el más rico real), y entrégame solo el que quedó en el segundo puesto".
</details>
