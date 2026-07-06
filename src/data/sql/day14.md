## Transacciones (ACID)

Una **Transacción** asegura que una secuencia de operaciones complejas en la base de datos (Ej: 1. Restar dinero de mi cuenta, 2. Sumarlo a tu cuenta) se ejecuten como una **única unidad de trabajo invisible e indisoluble**.

La regla principal de las bases de datos (ACID) dice: **"O todo sale perfecto, o no se guarda absolutamente nada."**

---

### COMMIT y ROLLBACK

Cuando un servidor de transacciones abre una ventana (BEGIN), tú empiezas a ejecutar tus UPDATE y DELETE. Todos esos cambios quedan guardados temporalmente en el Limbo (Memoria temporal).

- **COMMIT:** Si los 50 pasos de tu script salieron perfectos y sin ningún fallo, das la orden final de `COMMIT`. SQL graba los cambios en piedra en el disco duro permanentemente.
- **ROLLBACK:** Si en el paso 49 ocurre un error (falla de red o salto por falta de fondos), el sistema dispara el `ROLLBACK`. Esta instrucción aborta toda la operación y revierte el sistema al estado exacto e impoluto que tenía antes de empezar el paso 1, previniendo dinero desaparecido.

```sql
BEGIN;

UPDATE cuentas SET saldo = saldo - 100 WHERE id = 'A';
UPDATE cuentas SET saldo = saldo + 100 WHERE id = 'B';

COMMIT;
```

---

### Índices (Performance)

Las bases de datos buscan datos leyendo fila por fila desde el principio hasta el final (Full Table Scan). Si tu tabla tiene 100 millones de filas, un SELECT puede tardar minutos.

Un **Índice (INDEX)** es una pequeña estructura de árbol b-tree oculta (como el índice alfabético al final de un libro) que le permite a SQL saltar mágicamente directo a la fila correcta en milisegundos.

```sql
CREATE INDEX idx_usuario_email ON usuarios(email);
```
*Con este índice, las consultas `WHERE email = '...'` volarán instantáneamente.*

---

### Ejercicio Práctico 1

**Si los índices aceleran todas las lecturas de forma milagrosa a 1 milisegundo, ¿por qué no le ponemos un índice a absolutamente todas las columnas de todas las tablas y ya está?**

<details>
<summary>Ver Respuesta</summary>

Porque cada índice tiene un precio gravísimo: **Desaceleran salvajemente las Escrituras (INSERT, UPDATE, DELETE)**. Cada vez que inyectas una fila nueva, el motor debe pausar y reestructurar matemáticamente todos y cada uno de los árboles (índices) adjuntos. Si tienes 20 índices, cada registro que entra será lentísimo, colapsando tu capacidad de inserción masiva. Solo se indexan las llaves principales y las usadas masivamente en el WHERE.
</details>