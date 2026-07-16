## Manipulando Datos (DML)

Ahora entraremos a **DML (Data Manipulation Language)**: Los comandos operativos para Insertar, Actualizar y Eliminar registros (filas) dentro de nuestras estructuras previas.

---

### INSERT INTO (Crear)

Sirve para inyectar filas de información en las tablas.
Es vital detallar entre los primeros paréntesis exactamente QUÉ columnas vas a rellenar, para que los valores (VALUES) coincidan milimétricamente en el mismo orden.

```sql
INSERT INTO usuarios (nombre, email, edad)
VALUES ('Dano', 'dano@mail.com', 30);
```

Puedes insertar múltiples filas de golpe para ahorrar red (Bulk Insert):
```sql
INSERT INTO usuarios (nombre, email, edad)
VALUES 
  ('Pedro', 'pedro@mail.com', 22),
  ('Ana', 'ana@mail.com', 27);
```

---

### UPDATE (Actualizar)

El comando UPDATE modifica las filas que **ya existen** en la base de datos.
**¡Alerta Crítica!** Si usas UPDATE, es casi obligatorio usar la cláusula `WHERE`.

```sql
UPDATE usuarios 
SET edad = 31, email = 'nuevo@mail.com'
WHERE id = 5;
```

---

### DELETE (Borrar)

Elimina registros.
**¡Alerta Crítica 2!** Al igual que UPDATE, un DELETE sin WHERE es un despido asegurado en producción.

```sql
DELETE FROM usuarios 
WHERE id = 5;
```

---

### Ejercicio Práctico 1

**¿Qué catástrofe produce exactamente este código en la empresa?**
```sql
UPDATE empleados SET salario = 5000;
```

**[Solución]**
```sql
-- Al omitir el `WHERE` (la condición de freno), la base de datos obedecerá ciegamente la instrucción global. Irá fila por fila mutando a TODA LA EMPRESA (desde el conserje hasta el CEO) asignándoles a todos el salario de 5000 en el acto, arruinando la contabilidad completa irreversiblemente. ¡Siempre usa WHERE en Updates/Deletes!
```