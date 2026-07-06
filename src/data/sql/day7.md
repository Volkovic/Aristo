## Relaciones y JOINs

Las bases de datos relacionales evitan la redundancia dividiendo los datos en muchas tablas pequeñas conectadas por claves (Llaves Primarias y Llaves Foráneas).

Para reconstruir un reporte legible, debemos volver a "pegar" o "unir" esas tablas utilizando la cláusula `JOIN`.

---

### INNER JOIN

El `INNER JOIN` es el tipo de unión por defecto. Compara la Tabla A con la Tabla B, y **solo devuelve las filas que tengan coincidencias en ambas tablas simultáneamente.**

Imagina que tienes una tabla `clientes` y una tabla `pedidos`:

```sql
SELECT clientes.nombre, pedidos.fecha_compra
FROM clientes
INNER JOIN pedidos 
  ON clientes.id = pedidos.cliente_id;
```
*La condición `ON` le enseña a SQL cómo se relacionan físicamente estas dos tablas.*

---

### Peligro del INNER JOIN

Si un cliente (ej. "Carlos") se registró en la app, pero **nunca ha hecho un pedido** (su ID no existe en la tabla pedidos), el `INNER JOIN` es implacable:
Carlos será **excluido y borrado totalmente** del resultado final, porque no encontró una pareja coincidente en la otra tabla.

Si necesitas ver a todos los clientes, hayan comprado o no, INNER JOIN no te servirá.

---

### Ejercicio Práctico 1

**En la consulta de arriba, ¿por qué escribimos `clientes.nombre` en vez de solo `nombre`?**

<details>
<summary>Ver Respuesta</summary>

**Por ambigüedad.** Si la tabla `clientes` tiene una columna `fecha_compra` y la tabla `pedidos` también la tiene, el motor SQL entrará en pánico (Error: Ambiguous column name). Al prefijar `nombreTabla.nombreColumna`, somos explícitos y seguros.
</details>