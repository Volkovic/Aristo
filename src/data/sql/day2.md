## Filtrando Datos (La Cláusula WHERE)

De poco sirve tener una base de datos de 1 millón de clientes si solo podemos pedirlos todos a la vez. Para extraer **solamente** las filas que cumplen con ciertas condiciones específicas, utilizamos la cláusula `WHERE`.

La cláusula `WHERE` se coloca inmediatamente después de `FROM`.

```sql
SELECT nombre, pais 
FROM clientes 
WHERE pais = 'España';
```
Esta consulta filtrará y devolverá exclusivamente a los clientes cuyo país sea textualmente 'España'. 
*(Nota: En SQL estándar, los strings o textos siempre deben ir encerrados entre comillas simples `' '`)*.

---

### Operadores de Comparación

Puedes usar los clásicos operadores matemáticos dentro de tu cláusula `WHERE`:
- `=` : Igual a
- `>` : Mayor que
- `<` : Menor que
- `>=` : Mayor o igual
- `<=` : Menor o igual
- `<>` o `!=` : Diferente a (No igual)

```sql
SELECT nombre, salario 
FROM empleados 
WHERE salario >= 3000;
```
Esto obtiene a todos los empleados que ganen 3000 o más.

---

### Condiciones Múltiples (AND, OR, NOT)

Podemos encadenar múltiples filtros lógicos.

**AND:** Exige que **ambas** condiciones sean verdaderas simultáneamente.
```sql
SELECT nombre FROM empleados 
WHERE departamento = 'Ventas' AND salario > 4000;
```

**OR:** Exige que **al menos una** de las condiciones sea verdadera.
```sql
SELECT nombre FROM clientes 
WHERE ciudad = 'Madrid' OR ciudad = 'Barcelona';
```

**NOT:** Invierte la condición (Lo contrario a).
```sql
SELECT nombre FROM clientes 
WHERE NOT pais = 'USA';
```

---

### Filtrando en una Lista (IN)

Si quisieras buscar clientes en 5 ciudades diferentes usando `OR`, tu código quedaría enorme y verboso (`ciudad = 'A' OR ciudad = 'B' OR...`). 
El operador `IN` permite definir un conjunto o lista permitida de forma elegante.

```sql
SELECT nombre, ciudad 
FROM clientes 
WHERE ciudad IN ('Madrid', 'Barcelona', 'Valencia', 'Sevilla');
```
Esto funciona exactamente igual que múltiples OR encadenados, pero es infinitamente más limpio.

---

### Filtrando Rangos (BETWEEN)

Cuando necesitas filtrar valores que caen dentro de un rango continuo (ya sean números, textos alfabéticos o fechas), el operador `BETWEEN` es tu mejor amigo.

```sql
SELECT nombre, edad 
FROM usuarios 
WHERE edad BETWEEN 18 AND 25;
```
*(Nota importante: `BETWEEN` es INCLUSIVO en SQL estándar, es decir, atrapará a los que tienen exactamente 18 y a los que tienen exactamente 25).*

---

### Buscando Patrones de Texto (LIKE)

A veces no sabes la palabra exacta, pero conoces una parte del texto. El operador `LIKE` te permite buscar patrones usando **Comodines** (Wildcards):
- `%` : Representa CERO, UNO, o MÚLTIPLES caracteres cualquiera.
- `_` : Representa EXACTAMENTE UN caracter cualquiera.

**Ejemplos:**
```sql
-- Nombres que comiencen con la letra 'A'
WHERE nombre LIKE 'A%'

-- Nombres que terminen con 'ez'
WHERE nombre LIKE '%ez'

-- Nombres que contengan la palabra 'mar' en cualquier lugar
WHERE nombre LIKE '%mar%'

-- Nombres de exactamente 4 letras que empiecen con 'L' (L + 3 espacios vacíos)
WHERE nombre LIKE 'L___'
```

---

### Ejercicio Práctico 1

**¿Qué salida produce este código?**
```sql
SELECT * FROM productos WHERE precio = 50 AND precio = 100;
```

<details>
<summary>Ver Respuesta</summary>

**Devolverá 0 filas (Tabla Vacía).**
Es lógicamente imposible que una única fila tenga un precio que sea exactamente 50 y, al mismo tiempo exacto, sea 100. Probablemente el programador quería usar el operador `OR`.
</details>

---

### Ejercicio Práctico 2

**Reescribe el siguiente código feo usando un solo operador moderno:**
```sql
SELECT id FROM facturas WHERE fecha >= '2023-01-01' AND fecha <= '2023-12-31';
```

<details>
<summary>Ver Respuesta</summary>

```sql
SELECT id FROM facturas WHERE fecha BETWEEN '2023-01-01' AND '2023-12-31';
```
El operador `BETWEEN` hace exactamente lo mismo (mayor o igual, y menor o igual), logrando que el código sea semánticamente hermoso y fácil de leer.
</details>
