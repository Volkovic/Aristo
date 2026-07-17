# Día 6 - Tuplas

Una tupla es una colección ordenada e inmutable que puede contener distintos tipos de datos. Una vez creada una tupla, no podemos cambiar sus valores. No podemos usar métodos como add, insert o remove en una tupla porque no es modificable (es inmutable). A diferencia de las listas, las tuplas tienen menos métodos. Los métodos asociados a tuplas son:

- tuple(): crea una tupla vacía
- count(): cuenta cuántas veces aparece un elemento en la tupla
- index(): busca el índice de la primera aparición de un elemento en la tupla
- Operador +: concatena dos o más tuplas creando una nueva tupla


---

### Cómo crear tuplas

- Crear una tupla vacía

  ```py
  # Sintaxis
  empty_tuple = ()
  # o usando el constructor de tuplas
  empty_tuple = tuple()
  ```

- Crear una tupla con valores iniciales

  ```py
  # Sintaxis
  tpl = ('item1', 'item2','item3')
  ```

  ```py
  fruits = ('banana', 'orange', 'mango', 'lemon')
  ```

**Nota sobre la sintaxis y eficiencia:** Aunque solemos usar paréntesis, en Python lo que realmente define a una tupla son las comas. Escribir `mi_tupla = 1, 2, 3` es perfectamente válido y se conoce como *tuple packing* (empaquetado de tuplas). Sin embargo, si deseas crear una tupla de un solo elemento, **debes** incluir una coma al final, por ejemplo `t = (5,)`; de lo contrario, Python interpretará `(5)` como un simple número entero (`<class 'int'>`). 
Además, ¿por qué usar una tupla en lugar de una lista? Al ser inmutables, las tuplas son más eficientes en memoria, más rápidas de iterar y previenen modificaciones accidentales, haciéndolas ideales para datos constantes.

---

### Longitud de la tupla

Usamos la función _len()_ para obtener la longitud de una tupla.

```py
# Sintaxis
tpl = ('item1', 'item2', 'item3')
len(tpl)
```


---

### Obtener elementos de la tupla

- Índices positivos
  Al igual que con las listas, usamos índices positivos o negativos para acceder a los elementos de una tupla.
  ![Accessing tuple items](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/tuples_index.png)

  ```py
  # Sintaxis
  tpl = ('item1', 'item2', 'item3')
  first_item = tpl[0]
  second_item = tpl[1]
  ```

  ```py
  fruits = ('banana', 'orange', 'mango', 'lemon')
  first_fruit = fruits[0]
  second_fruit = fruits[1]
  last_index =len(fruits) - 1
  last_fruit = fruits[las_index]
  ```

- Índices negativos
  Los índices negativos cuentan desde el final: -1 es el último elemento, -2 el penúltimo, y así sucesivamente.
  ![Tuple Negative indexing](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/tuple_negative_indexing.png)

  ```py
  # Sintaxis
  tpl = ('item1', 'item2', 'item3','item4')
  first_item = tpl[-4]
  second_item = tpl[-3]
  ```

  ```py
  fruits = ('banana', 'orange', 'mango', 'lemon')
  first_fruit = fruits[-4]
  second_fruit = fruits[-3]
  last_fruit = fruits[-1]
  ```


---

### Desempaquetado de tuplas (Tuple Unpacking)

Podemos extraer los valores de una tupla y asignarlos a variables individuales posicionales en una sola línea, lo que se conoce como *Tuple Unpacking*.

```py
fruits = ('manzana', 'banana', 'naranja')
f1, f2, f3 = fruits 
# f1 será 'manzana', f2 será 'banana' y f3 será 'naranja'
```

Si el número de variables es menor que el de elementos, podemos usar un asterisco (`*`) para que actúe como colector (gather). La variable con el asterisco atrapará los elementos sobrantes y se convertirá en una lista:

```py
numeros = (1, 2, 3, 4)
a, *b = numeros 
# a toma el valor 1, y b se convierte en la lista [2, 3, 4]
```

*Nota:* Cuando una función en Python necesita retornar múltiples valores simultáneos separados por comas (ej. `return a, b`), implícitamente está aplicando *tuple packing* y devolviendo una única tupla.

---

### Slicing de tuplas

Podemos extraer subtuplas especificando un rango de índices de inicio y fin; el resultado es una nueva tupla con los elementos seleccionados.

- Rango de índices positivos

  ```py
  # Sintaxis
  tpl = ('item1', 'item2', 'item3','item4')
  all_items = tpl[0:4]         # todos los elementos
  all_items = tpl[0:]         # todos los elementos
  middle_two_items = tpl[1:3]  # no incluye el índice 3
  ```

  ```py
  fruits = ('banana', 'orange', 'mango', 'lemon')
  all_fruits = fruits[0:4]    # todos los elementos
  all_fruits= fruits[0:]      # todos los elementos
  orange_mango = fruits[1:3]  # no incluye el índice 3
  orange_to_the_rest = fruits[1:]
  ```

- Rango de índices negativos

  ```py
  # Sintaxis
  tpl = ('item1', 'item2', 'item3','item4')
  all_items = tpl[-4:]         # todos los elementos
  middle_two_items = tpl[-3:-1]  # no incluye el índice 3
  ```

  ```py

  fruits = ('banana', 'orange', 'mango', 'lemon')
  all_fruits = fruits[-4:]    # todos los elementos
  orange_mango = fruits[-3:-1]  # no incluye el índice 3
  orange_to_the_rest = fruits[-3:]
  ```


---

### Convertir tupla a lista

Podemos convertir una tupla en una lista y viceversa. Si queremos modificar una tupla forzosamente, el único enfoque posible es convertirla primero en lista mediante casting, realizar la modificación y volver a convertirla a tupla.

```py
# Sintaxis
tpl = ('item1', 'item2', 'item3','item4')
lst = list(tpl)
```

```py
fruits = ('banana', 'orange', 'mango', 'lemon')
fruits = list(fruits)
fruits[0] = 'apple'
print(fruits)     # ['apple', 'orange', 'mango', 'lemon']
fruits = tuple(fruits)
print(fruits)     # ('apple', 'orange', 'mango', 'lemon')
```


---

### Comprobar si un elemento está en la tupla

Podemos usar el operador _in_ para comprobar si un elemento pertenece a la tupla; devuelve un valor booleano.

```py
# Sintaxis
tpl = ('item1', 'item2', 'item3','item4')
'item2' in tpl # True
```

```py
fruits = ('banana', 'orange', 'mango', 'lemon')
print('orange' in fruits) # True
print('apple' in fruits) # False
fruits[0] = 'apple' # TypeError: 'tuple' object does not support item assignment
```

De igual manera, podemos usar el operador negativo `not in` para verificar si un elemento NO está en la tupla.

```py
print('apple' not in fruits) # True
```

---

### Iteración, Comparación y Tuplas Anidadas

**Iteración:** Al igual que las listas, las tuplas son objetos iterables. Podemos recorrerlas fácilmente usando un bucle `for`:
```py
for fruit in fruits:
    print(fruit)
```

**Comparación:** Podemos comparar tuplas directamente con el operador `==`. Esto devolverá `True` si ambas tuplas tienen los mismos elementos en el mismo orden, ya que compara su contenido elemento a elemento.
```py
print((1, 2) == (1, 2)) # True
```

**Tuplas anidadas y mutabilidad:** Aunque las tuplas son inmutables, si contienen un objeto mutable (como una lista), la tupla solo almacena la referencia a ese objeto. Esto significa que puedes modificar los elementos internos de esa lista sin generar un error, ya que no estás cambiando a qué objeto apunta la tupla:
```py
t = (1, 2, [3, 4])
t[2][0] = 99
print(t) # (1, 2, [99, 4])
```

---

### Unir tuplas

Podemos concatenar dos o más tuplas usando el operador +. Esto es válido y no viola la inmutabilidad, ya que genera una nueva tupla en memoria con los elementos combinados.

```py
# Sintaxis
tpl1 = ('item1', 'item2', 'item3')
tpl2 = ('item4', 'item5','item6')
tpl3 = tpl1 + tpl2
```

```py
fruits = ('banana', 'orange', 'mango', 'lemon')
vegetables = ('Tomato', 'Potato', 'Cabbage','Onion', 'Carrot')
fruits_and_vegetables = fruits + vegetables
```


---

### Eliminar tupla

No se pueden eliminar elementos individuales de una tupla, pero sí se puede eliminar la tupla completa con la palabra clave _del_. Esto elimina la variable y su referencia completamente del espacio de nombres actual.

```py
# Sintaxis
tpl1 = ('item1', 'item2', 'item3')
del tpl1

```

```py
fruits = ('banana', 'orange', 'mango', 'lemon')
del fruits
```




---

---

## 💻 Ejercicios Prácticos (Tuplas)

**Consigna 1:** Crea una tupla vacía y luego otra tupla conteniendo los nombres de tus 3 hermanos o amigos.
**[Solución]**
```python
empty_tuple = ()
siblings = ('Juan', 'María', 'Pedro')
print(siblings)
```

**Consigna 2:** Intenta modificar el primer elemento de la tupla de tus hermanos (ej. `siblings[0] = 'Carlos'`). ¿Qué sucede? Observa el error para entender la inmutabilidad.
**[Solución]**
```python
# siblings[0] = 'Carlos' 
# Esto lanzará un TypeError: 'tuple' object does not support item assignment
print("Las tuplas son inmutables, no se pueden modificar una vez creadas.")
```

**Consigna 3:** Tienes la tupla `fruits = ('manzana', 'banana', 'naranja')`. Desempaqueta la tupla en 3 variables individuales e imprímelas.
**[Solución]**
```python
fruits = ('manzana', 'banana', 'naranja')
f1, f2, f3 = fruits
print("Fruta 1:", f1)
print("Fruta 2:", f2)
print("Fruta 3:", f3)
```