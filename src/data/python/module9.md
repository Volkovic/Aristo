# Día 9 - Sentencias condicionales

## Sentencias condicionales

Por defecto, las sentencias en un script de Python se ejecutan secuencialmente de arriba hacia abajo. Si la lógica lo requiere, podemos cambiar el orden de dos maneras:

- Ejecución condicional: si una expresión es verdadera, se ejecutan uno o más bloques de código
- Ejecución repetitiva: mientras una expresión sea verdadera, se repiten uno o más bloques de código. En esta sección discutiremos las sentencias *if*, *else* y *elif*. Los operadores de comparación y lógicos vistos antes serán útiles aquí.


---

### Condición If

En Python y otros lenguajes, la palabra clave *if* se usa para comprobar si una condición es verdadera y ejecutar un bloque de código. Recuerda la indentación después de los dos puntos. En Python, la indentación no es solo estética, es semántica: la cantidad de espacios determina qué líneas pertenecen al bloque `if`, y una indentación incorrecta generará un error. Además, los comentarios (líneas que inician con `#`) son ignorados completamente por el intérprete y no afectan la estructura ni la indentación del bloque.

Es importante recordar que un bloque `if` puede existir en solitario sin necesidad de un `else`. Si necesitas declarar un bloque `if` pero aún no has escrito su lógica, puedes usar la palabra clave `pass` como relleno (placeholder) para evitar un error de sintaxis por bloque vacío. Por otro lado, un error muy común es usar el operador de asignación `=` en lugar del operador de comparación `==` (por ejemplo, `if a = 10:`), lo cual lanzará un `SyntaxError`.

**Valores Truthy, Falsy y el operador `is`**
Python realiza coerción de tipos en las condiciones. Cualquier colección con contenido (como el string `'Hola'`) o número distinto de cero se evalúa como `True` (Truthy). Por el contrario, los valores conocidos como "Falsy" siempre evaluarán a `False`: `0`, `0.0`, `''`, `[]`, `{}`, `None` y `False`. 
Adicionalmente, si deseas comprobar si dos variables apuntan exacta y físicamente al mismo objeto en memoria (identidad), puedes usar el operador `is` (por ejemplo, `if a is b:` o `if resultado is None:`).

```py
# Sintaxis
if condition:
    # Si la condición es verdadera, ejecutar este bloque de código
```

**Ejemplo 1**

```py
a = 3
if a > 0:
    print('A es un número positivo')
# A es un número positivo
```

Como se muestra arriba, 3 es mayor que 0. La condición es verdadera y se ejecuta el bloque de código. Si la condición fuera falsa, no veríamos resultado; para manejar condiciones falsas usamos el bloque *else*.


---

### If Else

Si la condición es verdadera se ejecuta el primer bloque, de lo contrario se ejecuta el bloque *else*.

```py
# Sintaxis
if condition:
    # Si la condición es verdadera, ejecutar este bloque
else:
    # Si la condición es falsa, ejecutar este bloque
```

**Ejemplo:**

```py
a = 3
if a < 0:
    print('A es un número negativo')
else:
    print('A es un número positivo')
```

La condición anterior es falsa, por eso se ejecuta el bloque *else*. ¿Y si tenemos más de dos condiciones? Podemos usar *elif*.


---

### If Elif Else

En la vida tomamos decisiones cada día que implican más de una condición. En programación, cuando tenemos múltiples condiciones, usamos *elif* (abreviatura de "else if").

En una cadena `if - elif - else`, el bloque `else` no lleva condición y actúa como el recogedor universal (fallback) para todo lo que no se cumplió antes. Solo puede usarse una vez y debe ser siempre el eslabón final. Usar `elif` es muy eficiente porque asegura exclusividad mutua: si una condición se cumple, las demás se ignoran. Si en su lugar usáramos múltiples `if` independientes de forma consecutiva, Python evaluaría absolutamente todas las condiciones una por una, perdiendo tiempo y potencialmente ejecutando múltiples bloques si varias son verdaderas.

```py
# Sintaxis
if condition:
    # código
elif condition:
    # código
else:
    # código
```

**Ejemplo:**

```py
a = 0
if a > 0:
    print('A es un número positivo')
elif a < 0:
    print('A es un número negativo')
else:
    print('A es cero')
```


---

### Abreviación (Operador Ternario)

Las expresiones condicionales de una sola línea, también conocidas como operador ternario (shorthand if), simplifican enormemente el código al definir un valor o ejecutar una acción rápida en base a una condición. En esta sintaxis, la evaluación lógica ocurre desde el centro hacia los extremos: primero se evalúa la condición central, y en base a ello ejecuta la expresión de su izquierda (si es verdadera) o la del `else` a su derecha (si es falsa).

```py
# Sintaxis
<expr> if condición else <expr>
```

**Ejemplo:**

```py
a = 3
print('A es positivo') if a > 0 else print('A es negativo') # Se cumple la primera condición, imprimirá 'A es positivo'
```


---

### Condicionales anidados

Los condicionales pueden anidarse.

```py
# Sintaxis
if condición:
    # código
    if condición:
        # código
```

**Ejemplo:**

```py
a = 0
if a > 0:
    if a % 2 == 0:
        print('A es un número positivo y par')
    else:
        print('A es un número positivo')
elif a == 0:
    print('A es cero')
else:
    print('A es un número negativo')
```

Podemos usar el operador lógico *and* para evitar escribir condicionales anidados.


---

### If y operadores lógicos

Los operadores lógicos (`and`, `or`, `not`) permiten combinar o invertir múltiples condiciones en una sola evaluación. Además, Python permite encadenar operadores de comparación de forma fluida y muy legible al estilo matemático, por ejemplo: `if 0 < x < 10:`, lo cual es una forma más compacta y "pytónica" de escribir `if x > 0 and x < 10:`.

El operador `not` es especialmente útil para invertir condiciones. Una práctica muy idiomática en Python es usar `if not mi_lista:` para comprobar si una colección está vacía (ya que las listas vacías evalúan a `False`, y `not False` lo vuelve `True`).

```py
# Sintaxis
if condición and condición:
    # código
```

**Ejemplo:**

```py
a = 0
if a > 0 and a % 2 == 0:
    print('A es un número positivo y par')
elif a > 0 and a % 2 != 0:
    print('A es un número positivo')
elif a == 0:
    print('A es cero')
else:
    print('A es un número negativo')
```


---

### If y operador lógico Or

```py
# Sintaxis
if condición or condición:
    # código
```

**Ejemplo:**

```py
user = 'James'
access_level = 3
if user == 'admin' or access_level >= 4:
    print('Acceso concedido!')
else:
    print('Acceso denegado!')
```