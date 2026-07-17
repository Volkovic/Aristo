# Día 13 - Comprensiones de listas

## Comprensiones de listas

En Python, las comprensiones de listas son una forma concisa de crear listas a partir de secuencias. Es una manera corta de crear nuevas listas a partir de secuencias. Las comprensiones de listas son más rápidas que iterar sobre listas con un bucle for. 

Este concepto matemático fue traído a Python inspirándose en lenguajes de paradigma funcional como **Haskell**. Su principal ventaja es que sustituye los largos bucles `for` tradicionales que incluyen condiciones y el uso repetitivo del método `.append()`. Al estar fuertemente optimizadas e implementadas internamente en C, evitan la sobrecarga (overhead) de buscar y llamar a `.append()` en cada ciclo, haciéndolas mucho más rápidas y eficientes.

```py
# sintaxis
[i for i in iterable if expresión]
```

**Ejemplo 1**

Por ejemplo, si quieres convertir una cadena en una lista de caracteres, puedes hacerlo de varias formas. Veamos algunas:

```py
# un método
language = 'Python'
lst = list(language)  # convertir la cadena en lista
print(type(lst))      # list
print(lst)            # ['P', 'y', 't', 'h', 'o', 'n']

# segunda forma: comprensión de listas
lst = [i for i in language]
print(type(lst))      # list
print(lst)            # ['P', 'y', 't', 'h', 'o', 'n']
```

**Ejemplo 2**

Por ejemplo, si quieres generar una lista de números:

```py
# generar números
numbers = [i for i in range(11)]  # genera números de 0 a 10
print(numbers)                    # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# también puedes hacer operaciones matemáticas durante la iteración
squares = [i * i for i in range(11)]
print(squares)                    # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# también se pueden generar listas de tuplas
numbers = [(i, i * i) for i in range(11)]
print(numbers)                    # [(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]
```

La expresión inicial (a la izquierda del `for`) puede ser cualquier operación u objeto válido en Python, incluyendo llamadas a funciones personalizadas (por ejemplo, `[validar(nombre) for nombre in nombres]`). Además, si estás iterando pero no te importa el valor del ítem actual, la convención en Python es usar un guion bajo (`_`). Por ejemplo, `[0 for _ in range(5)]` forzará al bucle a inyectar el valor `0` cinco veces, resultando en `[0, 0, 0, 0, 0]`.

También es posible usar un condicional `if-else` (operador ternario) en la expresión inicial. A diferencia del `if` al final que actúa como filtro (eliminando elementos), un `if-else` al inicio actúa como mutador para bifurcar valores: `['Par' if x % 2 == 0 else 'Impar' for x in range(5)]`.

**Ejemplo 3**

Las comprensiones de listas pueden combinarse con expresiones if:

```py
# generar números pares
even_numbers = [i for i in range(21) if i % 2 == 0]  # genera pares de 0 a 20
print(even_numbers)                    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# generar números impares
odd_numbers = [i for i in range(21) if i % 2 != 0]  # genera impares de 0 a 20
print(odd_numbers)                      # [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

# filtrar números: obtengamos los pares positivos
numbers = [-8, -7, -3, -1, 0, 1, 3, 4, 5, 7, 6, 8, 10]
positive_even_numbers = [i for i in range(21) if i % 2 == 0 and i > 0]
print(positive_even_numbers)           # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# aplanar una lista 2D
list_of_lists = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened_list = [number for row in list_of_lists for number in row]
print(flattened_list)                  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Es totalmente legal encadenar dos o más sentencias `if` seguidas al final de la comprensión. Python las procesará como una conjunción lógica (un `and` implícito). Por ejemplo: `[x for x in range(10) if x > 5 if x % 2 == 0]` devolverá los números que sean mayores a 5 Y pares.

Las comprensiones también son excelentes para iterar diccionarios. Puedes desempaquetar los pares clave-valor usando `.items()`. Por ejemplo, si tienes `dicc = {'a': 1, 'b': 2}`, la expresión `[k for k, v in dicc.items() if v > 1]` devolverá `['b']`.

Cuando usas múltiples bucles `for` en una comprensión, la lógica se lee de izquierda a derecha. Si iteras colecciones independientes, se genera un producto cartesiano. Por ejemplo, `[(x, y) for x in [1, 2] for y in ['a', 'b']]` generará 4 elementos combinados. 
Por otro lado, puedes anidar comprensiones (una dentro de otra) para inicializar matrices. Si deseas crear un tablero de ajedrez (8x8) lleno de ceros, la forma correcta es `[[0 for _ in range(8)] for _ in range(8)]`. Este es el método de oro para evitar el peligroso fallo de referenciación (shallow list copy) que ocurre si intentas hacer `[[0] * 8] * 8`.

### Otras Comprensiones y Generadores

Python también soporta comprensiones para otras estructuras de datos. Si usas llaves `{}` y pares clave-valor, crearás una **Dict Comprehension** (ej. `{x: x**2 for x in range(3)}`).

Si en lugar de corchetes usas paréntesis `(...)`, como en `(x for x in range(10))`, no crearás una tupla, sino un **Objeto Generador** (Generator Object). Las comprensiones de listas son ansiosas (eager) y materializan todos los elementos en la memoria RAM simultáneamente. Si intentas generar una lista de un millón de elementos, podrías colapsar el sistema (Out of Memory). Los generadores, en cambio, evalúan los datos perezosamente bajo demanda, ahorrando muchísima memoria.

**Buenas prácticas:** Aunque las comprensiones son muy elegantes, el Zen de Python dicta que "La legibilidad cuenta". No se aconseja usarlas para reemplazar absolutamente todos los bucles `for`. Si la lógica del bucle es compleja, tiene múltiples condiciones o muchos anidamientos, la comprensión se vuelve ilegible y un `for` clásico con `.append()` es mucho más fácil de mantener.

---

## Funciones lambda

Las funciones lambda son pequeñas funciones anónimas sin nombre. Pueden aceptar cualquier número de argumentos, pero solo una expresión. Las funciones lambda son similares a las funciones anónimas en JavaScript. Son útiles cuando necesitamos una función anónima dentro de otra función.

### Crear una función lambda

Para crear una función lambda usamos la palabra clave lambda, seguido de uno o más parámetros y luego una expresión. La función lambda no usa return explícito; devuelve la expresión implícitamente.

```py
# sintaxis
x = lambda param1, param2, param3: param1 + param2 + param3
print(x(arg1, arg2, arg3))
```

**Ejemplo:**

```py
# función nombrada
def add_two_nums(a, b):
    return a + b

print(add_two_nums(2, 3))  # 5

# con lambda
add_two_nums = lambda a, b: a + b
print(add_two_nums(2, 3))  # 5

# lambda autoejecutable
print((lambda a, b: a + b)(2, 3))  # 5

square = lambda x: x ** 2
print(square(3))    # 9
cube = lambda x: x ** 3
print(cube(3))      # 27

# múltiples variables
multiple_variable = lambda a, b, c: a ** 2 - 3 * b + 4 * c
print(multiple_variable(5, 5, 3))  # 22
```


---

### Funciones lambda dentro de otra función

Uso de lambda dentro de otra función:

```py
def power(x):
    return lambda n: x ** n

cube = power(2)(3)   # la función power ahora se usa con dos pares de paréntesis
print(cube)          # 8
two_power_of_five = power(2)(5)
print(two_power_of_five)  # 32
```



---

---

## 💻 Ejercicios Prácticos (List Comprehension)

**Consigna 1:** Tienes la lista `numbers = [1, 2, 3, 4, 5]`. Utiliza List Comprehension para crear una nueva lista con todos los números elevados al cuadrado.
**[Solución]**
```python
numbers = [1, 2, 3, 4, 5]
squares = [num ** 2 for num in numbers]
print(squares) # [1, 4, 9, 16, 25]
```

**Consigna 2:** Tienes la lista de tuplas `list_of_tuples = [(1, 1, 1), (2, 4, 8), (3, 9, 27)]`. Utiliza List Comprehension para aplanarla en una lista 1D.
**[Solución]**
```python
list_of_tuples = [(1, 1, 1), (2, 4, 8), (3, 9, 27)]
flattened = [num for row in list_of_tuples for num in row]
print(flattened) # [1, 1, 1, 2, 4, 8, 3, 9, 27]
```

**Consigna 3:** Crea una lista de números pares del 0 al 10 utilizando List Comprehension con una condición `if`.
**[Solución]**
```python
pares = [i for i in range(11) if i % 2 == 0]
print(pares) # [0, 2, 4, 6, 8, 10]
```