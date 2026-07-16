const fs = require('fs');
const path = require('path');
const targetDir = __dirname;

const contents = {
  4: `## Funciones de Agregación

Las funciones de agregación nos permiten resumir múltiples filas de datos y devolver un único valor calculado (por ejemplo, el total de dinero ganado en la tienda).

- **COUNT()**: Cuenta el número de filas.
- **SUM()**: Suma todos los valores numéricos de una columna.
- **AVG()**: (Average) Calcula el promedio o media.
- **MIN()**: Encuentra el valor más bajo.
- **MAX()**: Encuentra el valor más alto.

---

### Usando COUNT

Para saber cuántos empleados tienes en la empresa en total:
\`\`\`sql
SELECT COUNT(*) FROM empleados;
\`\`\`
*Nota: \`COUNT(*)\` cuenta las filas literales completas. Si haces \`COUNT(salario)\`, solo contará las filas donde el salario NO sea NULL.*

---

### SUM y AVG

Si quieres saber cuánto dinero necesitas para pagar nóminas y el salario promedio:
\`\`\`sql
SELECT SUM(salario) AS GastoTotal, AVG(salario) AS Promedio
FROM empleados;
\`\`\`

---

### MIN y MAX

Para encontrar el producto más barato y el más caro del inventario:
\`\`\`sql
SELECT MIN(precio) AS MasBarato, MAX(precio) AS MasCaro 
FROM productos;
\`\`\`

---

### Ejercicio Práctico 1

**¿Qué pasa si ejecutas \`SELECT nombre, MAX(salario) FROM empleados;\`?**

**[Solución]**
\`\`\`sql
-- **Genera un Error (o comportamiento impredecible).**
-- No puedes mezclar en el mismo SELECT una columna 'plana' e individual (nombre) junto con una función de agregación agrupada (MAX), a menos que uses la cláusula GROUP BY. La base de datos no sabe qué nombre asociar a ese único salario máximo resumido.
\`\`\``,
  5: `## Agrupación de Datos (GROUP BY)

Como vimos en el día anterior, no puedes mezclar agregaciones con columnas normales. Pero, ¿qué pasa si quieres saber "cuántos empleados hay EN CADA departamento"? 
Para eso usamos \`GROUP BY\`.

La cláusula \`GROUP BY\` agrupa las filas que tienen los mismos valores en filas de resumen únicas.

\`\`\`sql
SELECT departamento, COUNT(*) AS CantidadEmpleados
FROM empleados
GROUP BY departamento;
\`\`\`
Esta consulta generará una fila por cada departamento distinto, y contará cuántos trabajadores pertenecen a cada uno de esos grupos cerrados.

---

### Filtrando Grupos (HAVING)

Imagina que después de agrupar, solo quieres ver los departamentos que tengan **más de 10 empleados**.
No puedes usar \`WHERE\` porque el WHERE filtra **antes** de agrupar (filtra filas individuales crudas). 
Para filtrar resultados **después** de que los grupos ya fueron calculados matemáticamente, debes usar \`HAVING\`.

\`\`\`sql
SELECT departamento, SUM(salario) AS GastoTotal
FROM empleados
GROUP BY departamento
HAVING SUM(salario) > 50000;
\`\`\`
*Regla de Oro: WHERE se usa con columnas normales, HAVING se usa con Funciones de Agregación (SUM, COUNT, etc).*

---

### Ejercicio Práctico 1

**Ordena las cláusulas SQL según su estricto orden de ejecución lógica dentro del motor:** 
GROUP BY, WHERE, ORDER BY, SELECT, FROM, HAVING.

**[Solución]**
\`\`\`sql
-- 1. **FROM** (Busca la tabla cruda)
-- 2. **WHERE** (Elimina filas que no sirven)
-- 3. **GROUP BY** (Agrupa lo que quedó)
-- 4. **HAVING** (Filtra a los grupos que no sirven)
-- 5. **SELECT** (Proyecta o saca las columnas finales)
-- 6. **ORDER BY** (Ordena visualmente el resultado final)
\`\`\``,
  6: `## Funciones Nativas de Texto (Strings)

SQL viene con múltiples herramientas incorporadas (Built-in Functions) para alterar los datos al vuelo justo antes de mostrarlos.

- **UPPER() / LOWER()**: Convierte a mayúsculas o minúsculas.
- **LENGTH() o LEN()**: Devuelve la cantidad de caracteres de un texto.
- **CONCAT()**: Une o pega dos o más strings juntos.

\`\`\`sql
SELECT 
  UPPER(nombre) AS NombreMayuscula,
  LENGTH(nombre) AS CantidadLetras,
  CONCAT(nombre, ' ', apellido) AS NombreCompleto
FROM clientes;
\`\`\`

---

### Funciones Nativas de Fecha (Dates)

Las fechas son críticas en las bases de datos. Los motores SQL tienen funciones para extraer partes específicas.

- **EXTRACT(YEAR FROM fecha)** o **YEAR(fecha)**: Saca solo el año.
- **NOW() o CURRENT_DATE**: Obtiene la fecha/hora actual del sistema.
- **DATEDIFF()**: Calcula los días de diferencia entre dos fechas.

\`\`\`sql
-- Saber cuántos años pasaron desde su fecha de registro
SELECT nombre, 
       YEAR(CURRENT_DATE) - YEAR(fecha_registro) AS AntiguedadEnAnos
FROM clientes;
\`\`\`

---

### Funciones de Control de Flujo (CASE WHEN)

El \`CASE\` es el equivalente a la estructura \`if/else\` de otros lenguajes de programación. Permite crear columnas falsas (calculadas) en base a condiciones complejas de las filas.

\`\`\`sql
SELECT nombre, salario,
  CASE
    WHEN salario < 2000 THEN 'Junior'
    WHEN salario BETWEEN 2000 AND 5000 THEN 'Mid'
    ELSE 'Senior'
  END AS RangoSalarial
FROM empleados;
\`\`\`

---

### Ejercicio Práctico 1

**¿Qué devuelve el código si la columna \`telefono\` es NULL?**
\`\`\`sql
SELECT nombre, COALESCE(telefono, 'Sin registrar') AS Tel FROM usuarios;
\`\`\`

**[Solución]**
\`\`\`sql
-- La fantástica función \`COALESCE()\` evalúa si el primer parámetro es NULL. Si lo es, escupe el segundo parámetro (un valor de respaldo/default). Por lo tanto, en la UI se mostrará el texto 'Sin registrar' en vez de un espantoso NULL vacío.
\`\`\``,
  7: `## Relaciones y JOINs

Las bases de datos relacionales evitan la redundancia dividiendo los datos en muchas tablas pequeñas conectadas por claves (Llaves Primarias y Llaves Foráneas).

Para reconstruir un reporte legible, debemos volver a "pegar" o "unir" esas tablas utilizando la cláusula \`JOIN\`.

---

### INNER JOIN

El \`INNER JOIN\` es el tipo de unión por defecto. Compara la Tabla A con la Tabla B, y **solo devuelve las filas que tengan coincidencias en ambas tablas simultáneamente.**

Imagina que tienes una tabla \`clientes\` y una tabla \`pedidos\`:

\`\`\`sql
SELECT clientes.nombre, pedidos.fecha_compra
FROM clientes
INNER JOIN pedidos 
  ON clientes.id = pedidos.cliente_id;
\`\`\`
*La condición \`ON\` le enseña a SQL cómo se relacionan físicamente estas dos tablas.*

---

### Peligro del INNER JOIN

Si un cliente (ej. "Carlos") se registró en la app, pero **nunca ha hecho un pedido** (su ID no existe en la tabla pedidos), el \`INNER JOIN\` es implacable:
Carlos será **excluido y borrado totalmente** del resultado final, porque no encontró una pareja coincidente en la otra tabla.

Si necesitas ver a todos los clientes, hayan comprado o no, INNER JOIN no te servirá.

---

### Ejercicio Práctico 1

**En la consulta de arriba, ¿por qué escribimos \`clientes.nombre\` en vez de solo \`nombre\`?**

**[Solución]**
\`\`\`sql
-- **Por ambigüedad.** Si la tabla \`clientes\` tiene una columna \`fecha_compra\` y la tabla \`pedidos\` también la tiene, el motor SQL entrará en pánico (Error: Ambiguous column name). Al prefijar \`nombreTabla.nombreColumna\`, somos explícitos y seguros.
\`\`\``,
  8: `## OUTER JOINS

A diferencia del INNER JOIN estricto que requiere pareja exacta, los Outer Joins permiten que las filas de una tabla sobrevivan en el resultado, incluso si no encontraron coincidencias en la otra tabla.

---

### LEFT JOIN (o LEFT OUTER JOIN)

El \`LEFT JOIN\` retorna **TODAS** las filas de la tabla de la Izquierda (la primera que escribiste en el FROM), e intenta traer coincidencias de la tabla Derecha (la del JOIN).

Si no encuentra coincidencias, no elimina la fila izquierda, sino que rellena con \`NULL\` los huecos vacíos de la derecha.

\`\`\`sql
SELECT clientes.nombre, pedidos.total
FROM clientes
LEFT JOIN pedidos 
  ON clientes.id = pedidos.cliente_id;
\`\`\`
*Resultado: Verás a todos los clientes. Si un cliente no compró nada, verás su nombre y en la columna 'total' dirá NULL.*

---

### RIGHT JOIN

Es exactamente lo mismo que el LEFT, pero dándole privilegio de supervivencia a la tabla de la Derecha.
*(Nota: En la industria rara vez se usa el RIGHT JOIN, ya que los programadores prefieren reescribir la misma lógica volteando las tablas y usando un LEFT JOIN por costumbre visual).*

---

### FULL OUTER JOIN

Devuelve **absolutamente TODAS** las filas de ambas tablas, hayan emparejado o no. Si un cliente no compró, se muestra con NULLs. Si un pedido huérfano no tiene cliente, se muestra con NULLs en el cliente.

\`\`\`sql
SELECT c.nombre, p.total
FROM clientes c
FULL OUTER JOIN pedidos p 
  ON c.id = p.cliente_id;
\`\`\`
*(Nota de limpieza: Le pusimos alias 'c' y 'p' a las tablas para no tener que escribir las palabras completas).*

---

### Ejercicio Práctico 1

**¿Cómo usarías un LEFT JOIN para encontrar a los clientes falsos (que se registraron pero que JAMÁS hicieron una compra)?**

**[Solución]**
\`\`\`sql
SELECT c.nombre 
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;
-- Al hacer el LEFT JOIN sabemos que los que no compraron tendrán la columna de pedido rellena de NULLs por SQL. Filtrando explícitamente \`WHERE p.id IS NULL\` nos aislamos para ver únicamente a los rezagados. A esta técnica técnica se le llama "Anti-Join".
\`\`\``,
  9: `## Operaciones de Conjuntos (UNION)

En lugar de unir tablas horizontalmente añadiendo columnas con un JOIN, las operaciones de conjunto como \`UNION\` unen los resultados **verticalmente**, apilando filas encima de otras filas.

---

### UNION

Imagina que tienes una tabla \`empleados_norte\` y otra \`empleados_sur\`, con las mismas columnas. Para crear un listado nacional único:

\`\`\`sql
SELECT nombre, email FROM empleados_norte
UNION
SELECT nombre, email FROM empleados_sur;
\`\`\`
*Nota: \`UNION\` por defecto busca en toda la pila generada y elimina cualquier fila que esté 100% duplicada (gasta rendimiento).*

---

### UNION ALL

Si sabes que no hay duplicados, o no te importan, **siempre** debes usar \`UNION ALL\`. Es increíblemente más rápido que \`UNION\` porque SQL se ahorra el masivo trabajo de escaneo para purgar repetidos.

\`\`\`sql
SELECT nombre FROM lista_negra
UNION ALL
SELECT nombre FROM spam;
\`\`\`

---

### Reglas Estrictas del UNION

Para poder apilar dos SELECTs, SQL te obliga a cumplir dos reglas de oro inquebrantables:
1. Ambos SELECTs deben pedir **exactamente la misma cantidad de columnas**.
2. Las columnas deben tener **tipos de datos compatibles** en el mismo orden (no puedes apilar una columna de Edad con una de Nombre).

---

### Ejercicio Práctico 1

**¿Qué ocurre si el primer SELECT pide 2 columnas, y el segundo pide 3?**

**[Solución]**
\`\`\`sql
-- **Syntax Error.** El motor colapsará instantáneamente alegando: "Las consultas utilizadas en una instrucción UNION deben tener el mismo número de columnas".
\`\`\``,
  10: `## Subconsultas (Subqueries)

Una subconsulta es una consulta completa anidada o escondida adentro de otra consulta (Query dentro de un Query).

Es útil cuando no sabes un valor de antemano.

---

### Subconsultas en el WHERE

¿Cómo obtienes a todos los empleados que ganan más que el empleado llamado 'Pedro'? Como no sabes el salario de Pedro, primero debes consultarlo.

\`\`\`sql
SELECT nombre, salario 
FROM empleados
WHERE salario > (
    SELECT salario FROM empleados WHERE nombre = 'Pedro'
);
\`\`\`
SQL ejecutará primero el paréntesis interior (evalúa a un número, ej: 4000), y luego ejecuta la consulta externa (salario > 4000).

---

### Subconsultas de Múltiples Filas

Si la subconsulta interior devuelve más de una fila (un array de valores), no puedes usar \`=\` o \`>\`, debes usar operadores de lista como \`IN\` o \`NOT IN\`.

\`\`\`sql
-- Traer los clientes que hayan comprado un 'iPhone'
SELECT nombre 
FROM clientes
WHERE id IN (
    SELECT cliente_id FROM compras WHERE producto = 'iPhone'
);
\`\`\`

---

### Subconsultas Correlacionadas

Normalmente una subconsulta se evalúa una sola vez de forma aislada. Pero en una correlacionada, la subconsulta interior hace referencia (depende) de una variable de la tabla exterior.

\`\`\`sql
-- Empleados que ganen MÁS que el promedio DE SU PROPIO departamento
SELECT e1.nombre, e1.salario
FROM empleados e1
WHERE e1.salario > (
    SELECT AVG(salario) 
    FROM empleados e2 
    WHERE e2.departamento = e1.departamento
);
\`\`\`
*Este es un proceso pesadísimo: la subconsulta se tiene que volver a calcular por CADA UNA de las filas evaluadas en el query principal.*

---

### Ejercicio Práctico 1

**¿Por qué las Subconsultas Correlacionadas se consideran un Anti-patrón de rendimiento masivo frente a un JOIN?**

**[Solución]**
\`\`\`sql
-- Porque ejecutan su lógica en un bucle N veces (N siendo las filas exteriores). Si la tabla exterior tiene 1 millón de empleados, el servidor hará 1 millón de consultas independientes extra a la base de datos para promediar salarios, matando el CPU. Con JOINs, los datos se calculan en masa (Set-based) una sola vez.
\`\`\``,
  11: `## Common Table Expressions (CTEs)

Las CTEs (Cláusula \`WITH\`) son una evolución moderna, elegante y revolucionaria para reemplazar subconsultas ilegibles y anidadas (Código Espagueti). 

Una CTE te permite guardar el resultado de una consulta compleja temporalmente bajo un "nombre" limpio (como si fuera una variable) al principio de tu script, para poder referenciarla fácilmente más abajo.

---

### Sintaxis Básica de CTE

\`\`\`sql
WITH VentasAltas AS (
    SELECT empleado_id, SUM(total) as Facturado
    FROM ventas
    GROUP BY empleado_id
    HAVING SUM(total) > 100000
)

SELECT e.nombre, v.Facturado
FROM empleados e
INNER JOIN VentasAltas v ON e.id = v.empleado_id;
\`\`\`
En lugar de meter ese bodoque gigante dentro de la consulta final entorpeciendo la lectura, lo modularizamos arriba en bloque independiente \`VentasAltas\`.

---

### Múltiples CTEs

Puedes crear cadenas de variables CTE separadas por comas. El poder brutal de las CTEs es que la CTE número 3 puede consultar a la CTE 1 y 2, construyendo flujos lógicos clarísimos.

\`\`\`sql
WITH T1 AS (SELECT ...),
     T2 AS (SELECT ... FROM T1),
     T3 AS (SELECT ... FROM T2)
SELECT * FROM T3;
\`\`\`

---

### Ejercicio Práctico 1

**¿Se guarda la tabla CTE físicamente en el disco duro de la base de datos (como una View)?**

**[Solución]**
\`\`\`sql
-- **NO.** Las CTEs son 100% efímeras. Solo existen viva en memoria durante la minúscula fracción de segundo que demora en ejecutarse esa única declaración SQL. Al finalizar el punto y coma \`;\`, la CTE y sus datos se evaporan sin dejar rastro.
\`\`\``,
  12: `## Manipulando Estructuras (DDL)

Hasta ahora aprendimos DQL (Data Query Language, para consultar). Ahora entraremos a **DDL (Data Definition Language)**: Comandos para crear y destruir las estructuras, las bases y las columnas (Arquitectura).

---

### CREATE TABLE (Crear)

Se usa para crear una nueva tabla vacía en la base de datos.
Es obligatorio especificar las Columnas y los estrictos Tipos de Datos que aceptará (INT, VARCHAR, DATE, BOOLEAN).

\`\`\`sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    fecha_creacion DATE DEFAULT CURRENT_DATE
);
\`\`\`
*(Nota: Restricciones como NOT NULL evitan huecos vacíos, y UNIQUE previene que 2 usuarios se registren con el mismo email).*

---

### ALTER TABLE (Modificar)

Si olvidaste agregar la columna de "teléfono" hace meses, no hace falta borrar la tabla (y perder a los usuarios) para reconstruirla. El comando \`ALTER\` te salva.

\`\`\`sql
-- Agregar una columna nueva
ALTER TABLE usuarios ADD COLUMN telefono VARCHAR(20);

-- Borrar una columna
ALTER TABLE usuarios DROP COLUMN fecha_creacion;
\`\`\`

---

### DROP y TRUNCATE (Destruir)

- **DROP TABLE usuarios;** Aniquila por completo y sin retorno la estructura de la tabla y todos sus datos del sistema.
- **TRUNCATE TABLE usuarios;** Conserva la estructura y las columnas de la tabla intactas, pero borra absolutamente todas las filas de datos internas a una velocidad vertiginosa (Mucho más veloz y limpio que un DELETE).

---

### Ejercicio Práctico 1

**Lee el siguiente código y detecta el peligro arquitectónico:**
\`\`\`sql
CREATE TABLE post (
   titulo VARCHAR(50)
);
\`\`\`

**[Solución]**
\`\`\`sql
-- Falta absolutamente todo. La tabla no tiene llave primaria (\`id\`) por lo que las filas serán irreconocibles, y VARCHAR(50) es extremadamente corto para un título de un post (explotará). Además, al no forzar un NOT NULL, se pueden insertar posts vacíos.
\`\`\``,
  13: `## Manipulando Datos (DML)

Ahora entraremos a **DML (Data Manipulation Language)**: Los comandos operativos para Insertar, Actualizar y Eliminar registros (filas) dentro de nuestras estructuras previas.

---

### INSERT INTO (Crear)

Sirve para inyectar filas de información en las tablas.
Es vital detallar entre los primeros paréntesis exactamente QUÉ columnas vas a rellenar, para que los valores (VALUES) coincidan milimétricamente en el mismo orden.

\`\`\`sql
INSERT INTO usuarios (nombre, email, edad)
VALUES ('Dano', 'dano@mail.com', 30);
\`\`\`

Puedes insertar múltiples filas de golpe para ahorrar red (Bulk Insert):
\`\`\`sql
INSERT INTO usuarios (nombre, email, edad)
VALUES 
  ('Pedro', 'pedro@mail.com', 22),
  ('Ana', 'ana@mail.com', 27);
\`\`\`

---

### UPDATE (Actualizar)

El comando UPDATE modifica las filas que **ya existen** en la base de datos.
**¡Alerta Crítica!** Si usas UPDATE, es casi obligatorio usar la cláusula \`WHERE\`.

\`\`\`sql
UPDATE usuarios 
SET edad = 31, email = 'nuevo@mail.com'
WHERE id = 5;
\`\`\`

---

### DELETE (Borrar)

Elimina registros.
**¡Alerta Crítica 2!** Al igual que UPDATE, un DELETE sin WHERE es un despido asegurado en producción.

\`\`\`sql
DELETE FROM usuarios 
WHERE id = 5;
\`\`\`

---

### Ejercicio Práctico 1

**¿Qué catástrofe produce exactamente este código en la empresa?**
\`\`\`sql
UPDATE empleados SET salario = 5000;
\`\`\`

**[Solución]**
\`\`\`sql
-- Al omitir el \`WHERE\` (la condición de freno), la base de datos obedecerá ciegamente la instrucción global. Irá fila por fila mutando a TODA LA EMPRESA (desde el conserje hasta el CEO) asignándoles a todos el salario de 5000 en el acto, arruinando la contabilidad completa irreversiblemente. ¡Siempre usa WHERE en Updates/Deletes!
\`\`\``,
  14: `## Transacciones (ACID)

Una **Transacción** asegura que una secuencia de operaciones complejas en la base de datos (Ej: 1. Restar dinero de mi cuenta, 2. Sumarlo a tu cuenta) se ejecuten como una **única unidad de trabajo invisible e indisoluble**.

La regla principal de las bases de datos (ACID) dice: **"O todo sale perfecto, o no se guarda absolutamente nada."**

---

### COMMIT y ROLLBACK

Cuando un servidor de transacciones abre una ventana (BEGIN), tú empiezas a ejecutar tus UPDATE y DELETE. Todos esos cambios quedan guardados temporalmente en el Limbo (Memoria temporal).

- **COMMIT:** Si los 50 pasos de tu script salieron perfectos y sin ningún fallo, das la orden final de \`COMMIT\`. SQL graba los cambios en piedra en el disco duro permanentemente.
- **ROLLBACK:** Si en el paso 49 ocurre un error (falla de red o salto por falta de fondos), el sistema dispara el \`ROLLBACK\`. Esta instrucción aborta toda la operación y revierte el sistema al estado exacto e impoluto que tenía antes de empezar el paso 1, previniendo dinero desaparecido.

\`\`\`sql
BEGIN;

UPDATE cuentas SET saldo = saldo - 100 WHERE id = 'A';
UPDATE cuentas SET saldo = saldo + 100 WHERE id = 'B';

COMMIT;
\`\`\`

---

### Índices (Performance)

Las bases de datos buscan datos leyendo fila por fila desde el principio hasta el final (Full Table Scan). Si tu tabla tiene 100 millones de filas, un SELECT puede tardar minutos.

Un **Índice (INDEX)** es una pequeña estructura de árbol b-tree oculta (como el índice alfabético al final de un libro) que le permite a SQL saltar mágicamente directo a la fila correcta en milisegundos.

\`\`\`sql
CREATE INDEX idx_usuario_email ON usuarios(email);
\`\`\`
*Con este índice, las consultas \`WHERE email = '...'\` volarán instantáneamente.*

---

### Ejercicio Práctico 1

**Si los índices aceleran todas las lecturas de forma milagrosa a 1 milisegundo, ¿por qué no le ponemos un índice a absolutamente todas las columnas de todas las tablas y ya está?**

**[Solución]**
\`\`\`sql
-- Porque cada índice tiene un precio gravísimo: **Desaceleran salvajemente las Escrituras (INSERT, UPDATE, DELETE)**. Cada vez que inyectas una fila nueva, el motor debe pausar y reestructurar matemáticamente todos y cada uno de los árboles (índices) adjuntos. Si tienes 20 índices, cada registro que entra será lentísimo, colapsando tu capacidad de inserción masiva. Solo se indexan las llaves principales y las usadas masivamente en el WHERE.
\`\`\``,
  15: `## Window Functions (Funciones de Ventana)

Las Window Functions son la magia de análisis moderno (PostgreSQL, SQL Server).
A diferencia del \`GROUP BY\` que condensa y colapsa brutalmente múltiples filas de origen en una sola fila agrupada de resumen, las **Window Functions calculan agregaciones manteniendo todas y cada una de las filas originales separadas**.

Para invocar la ventana se usa la cláusula \`OVER()\`.

---

### Agregación sin Colapsar

Imagina que quieres imprimir a todos los empleados, su salario, y una columna extra que tenga el salario total de la empresa para compararlo visualmente al lado.

\`\`\`sql
SELECT nombre, salario,
       SUM(salario) OVER() AS GastoTotalEmpresa
FROM empleados;
\`\`\`
*(Te devolverá 50 filas intactas, pero con una columna maravillosa pegada al costado que mostrará el mismo gran total de la compañía, sin necesidad de usar Subconsultas).*

---

### Particionamiento (PARTITION BY)

Puedes dividir la ventana analítica en mini-grupos (como si fuera un Group By, pero respetando las filas independientes).

\`\`\`sql
SELECT nombre, departamento, salario,
       AVG(salario) OVER(PARTITION BY departamento) AS PromedioDeSuArea
FROM empleados;
\`\`\`
Esto calcula y adjunta el promedio específico por departamento a cada empleado, dejándolos ver instantáneamente si están cobrando por encima o por debajo de sus compañeros más próximos.

---

### ROW_NUMBER() y RANK()

Espectacular para rankings, top listas de streaming o tops de ventas.

- **ROW_NUMBER():** Numera cada fila (1,2,3) secuencialmente y a la fuerza.
- **RANK():** Numera, pero si dos empleados tienen el mismo puntaje, los empata en el mismo nivel y salta el siguiente número (Ej: 1, 2, 2, 4).

\`\`\`sql
SELECT nombre, salario,
       RANK() OVER(ORDER BY salario DESC) as PuestoRiqueza
FROM empleados;
\`\`\`

---

### Ejercicio Práctico 1 (Final)

**Lee este código que intenta obtener "Los top 3 empleados mejor pagados". Detecta por qué no funciona (falla de sintaxis).**
\`\`\`sql
SELECT nombre, RANK() OVER(ORDER BY salario DESC) as Top
FROM empleados
WHERE Top <= 3;
\`\`\`

**[Solución]**
\`\`\`sql
-- **Error de Orden Lógico.** Como aprendiste en el día 5, el \`WHERE\` ocurre primero (antes del SELECT). Por tanto, la base de datos dice: "No tengo la más remota idea de qué es la columna 'Top', porque las Window Functions se calculan justo al final (en la fase del Select)". Para filtrarlo debes envolverlo obligatoriamente en un CTE (\`WITH...\`) y filtrar la nueva variable limpia después. ¡Felicidades por finalizar tu currículo!
\`\`\``
};

for (const [day, content] of Object.entries(contents)) {
  fs.writeFileSync(path.join(targetDir, 'day' + day + '.md'), content, 'utf-8');
}

console.log('Days 4 to 15 generated successfully.');
