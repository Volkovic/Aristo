## Manipulando Estructuras (DDL)

Hasta ahora aprendimos DQL (Data Query Language, para consultar). Ahora entraremos a **DDL (Data Definition Language)**: Comandos para crear y destruir las estructuras, las bases y las columnas (Arquitectura).

---

### CREATE TABLE (Crear)

Se usa para crear una nueva tabla vacía en la base de datos.
Es obligatorio especificar las Columnas y los estrictos Tipos de Datos que aceptará (INT, VARCHAR, DATE, BOOLEAN).

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE,
    fecha_creacion DATE DEFAULT CURRENT_DATE
);
```
*(Nota: Restricciones como NOT NULL evitan huecos vacíos, y UNIQUE previene que 2 usuarios se registren con el mismo email).*

---

### ALTER TABLE (Modificar)

Si olvidaste agregar la columna de "teléfono" hace meses, no hace falta borrar la tabla (y perder a los usuarios) para reconstruirla. El comando `ALTER` te salva.

```sql
-- Agregar una columna nueva
ALTER TABLE usuarios ADD COLUMN telefono VARCHAR(20);

-- Borrar una columna
ALTER TABLE usuarios DROP COLUMN fecha_creacion;
```

---

### DROP y TRUNCATE (Destruir)

- **DROP TABLE usuarios;** Aniquila por completo y sin retorno la estructura de la tabla y todos sus datos del sistema.
- **TRUNCATE TABLE usuarios;** Conserva la estructura y las columnas de la tabla intactas, pero borra absolutamente todas las filas de datos internas a una velocidad vertiginosa (Mucho más veloz y limpio que un DELETE).

---

### Ejercicio Práctico 1

**Lee el siguiente código y detecta el peligro arquitectónico:**
```sql
CREATE TABLE post (
   titulo VARCHAR(50)
);
```

**[Solución]**
```sql
-- Falta absolutamente todo. La tabla no tiene llave primaria (`id`) por lo que las filas serán irreconocibles, y VARCHAR(50) es extremadamente corto para un título de un post (explotará). Además, al no forzar un NOT NULL, se pueden insertar posts vacíos.
```