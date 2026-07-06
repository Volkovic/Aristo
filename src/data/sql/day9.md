## Operaciones de Conjuntos (UNION)

En lugar de unir tablas horizontalmente añadiendo columnas con un JOIN, las operaciones de conjunto como `UNION` unen los resultados **verticalmente**, apilando filas encima de otras filas.

---

### UNION

Imagina que tienes una tabla `empleados_norte` y otra `empleados_sur`, con las mismas columnas. Para crear un listado nacional único:

```sql
SELECT nombre, email FROM empleados_norte
UNION
SELECT nombre, email FROM empleados_sur;
```
*Nota: `UNION` por defecto busca en toda la pila generada y elimina cualquier fila que esté 100% duplicada (gasta rendimiento).*

---

### UNION ALL

Si sabes que no hay duplicados, o no te importan, **siempre** debes usar `UNION ALL`. Es increíblemente más rápido que `UNION` porque SQL se ahorra el masivo trabajo de escaneo para purgar repetidos.

```sql
SELECT nombre FROM lista_negra
UNION ALL
SELECT nombre FROM spam;
```

---

### Reglas Estrictas del UNION

Para poder apilar dos SELECTs, SQL te obliga a cumplir dos reglas de oro inquebrantables:
1. Ambos SELECTs deben pedir **exactamente la misma cantidad de columnas**.
2. Las columnas deben tener **tipos de datos compatibles** en el mismo orden (no puedes apilar una columna de Edad con una de Nombre).

---

### Ejercicio Práctico 1

**¿Qué ocurre si el primer SELECT pide 2 columnas, y el segundo pide 3?**

<details>
<summary>Ver Respuesta</summary>

**Syntax Error.** El motor colapsará instantáneamente alegando: "Las consultas utilizadas en una instrucción UNION deben tener el mismo número de columnas".
</details>