# Día 17 - Manejo de excepciones

## Manejo de excepciones

Python utiliza _try_ y _except_ para manejar errores de forma elegante. Salir de forma controlada (o manejar errores con elegancia) es una buena práctica: el programa detecta una condición de error y la maneja adecuadamente, normalmente mostrando un mensaje descriptivo en la terminal o en un registro. Las excepciones suelen deberse a factores externos al programa (entrada errónea, nombre de archivo incorrecto, archivo no encontrado, fallos de I/O, etc.). El manejo adecuado de excepciones evita que las aplicaciones se bloqueen. Un código profesional nunca debe crashear mostrando texto rojo al usuario; el manejo de excepciones intercepta el problema antes de que el programa se cuelgue abruptamente.

En la sección anterior hemos cubierto los distintos tipos de errores en Python. Si usamos _try_ y _except_ correctamente, podemos impedir que esos errores hagan que el programa falle.

![Try and Except](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/try_except.png)

```py
try:
    # si todo va bien, se ejecuta el código en este bloque
except:
    # si ocurre un error, se ejecuta el código en este bloque
```

**Ejemplo:**

```py
try:
    print(10 + '5')
except:
    print('Ocurrió un error')
```

En el ejemplo anterior, el segundo operando es una cadena. Podemos convertirlo a int o float para sumarlo a un número; si no lo hacemos, se ejecutará el bloque _except_. El bloque `try` actúa como la zona donde colocamos el código "peligroso" que sospechamos que podría fallar. Si falla, el flujo salta instantáneamente al bloque de rescate `except`, el cual se ejecuta SI Y SOLO SI ocurrió una excepción.

Python fomenta una filosofía de diseño conocida como **EAFP** ("Easier to ask for Forgiveness than Permission" - Es más fácil pedir perdón que permiso). En lugar de hacer múltiples comprobaciones `if` preventivas validando tipos de datos (pedir permiso), se prefiere asumir que los datos están bien, intentar la operación directamente en un `try` y atrapar el error si falla (pedir perdón).

Sin embargo, hay que tener cuidado con el uso de un `except:` general (conocido como *bare except*), como se ve en el ejemplo de arriba. Atrapar errores sin especificar cuáles se esperan atrapará ABSOLUTAMENTE TODOS los errores (incluso interrupciones de teclado o salidas del sistema). Esto se considera una mala práctica (un antipatrón) porque oculta o "silencia" bugs reales (swallowing errors). Además, ten en cuenta que los errores de sintaxis (`SyntaxError`) ocurren antes del tiempo de ejecución (durante la fase de parseo), por lo que el programa ni siquiera inicia y NO PUEDEN ser atrapados por un bloque `try-except`.


---

**Ejemplo:**

```py
try:
    name = input('Introduce tu nombre:')
    year_born = input('¿En qué año naciste?:')
    age = 2019 - year_born
    print(f'Eres {name}. Tu edad es {age}.')
except:
    print('Ocurrió un error')
```

```sh
Ocurrió un error
```

En el ejemplo anterior, se ejecuta el bloque de excepción, pero no sabemos exactamente qué pasó. Para identificar el problema podemos capturar tipos de excepción concretos. El programador debe declarar la clase del error que espera interceptar (por ejemplo, `except ZeroDivisionError:` para atrapar específicamente un error de división por cero).

En el siguiente ejemplo capturamos y mostramos el tipo de error. Puedes encadenar múltiples bloques `except`, dándote el poder de responder de forma diferente dependiendo de QUÉ fue lo que falló:

```py
try:
    name = input('Introduce tu nombre:')
    year_born = input('¿En qué año naciste?:')
    age = 2019 - year_born
    print(f'Eres {name}. Tu edad es {age}.')
except TypeError:
    print('Se produjo un error de tipo (TypeError)')
except ValueError:
    print('Se produjo un ValueError')
except ZeroDivisionError:
    print('Se produjo una división por cero (ZeroDivisionError)')
```

```sh
Introduce tu nombre:Asabeneh
¿En qué año naciste?:1920
Se produjo un error de tipo (TypeError)
```

En el ejemplo anterior la salida será _TypeError_. 

Si deseas aplicar el mismo plan de rescate a varios errores específicos, puedes atraparlos en una misma línea pasándolos encapsulados dentro de una tupla: `except (TypeError, ValueError):`.

Es importante recordar que en Python los errores forman un "Árbol Genealógico" (Jerarquía de Clases). Si utilizas `except Exception:`, al atrapar la clase base Padre (`Exception`), estarás atrapando a TODOS sus hijos de manera automática (TypeError, ValueError, KeyError, etc.). Por ello, siempre debes colocar los bloques `except` más específicos (los hijos) arriba y los más generales (los padres) al final, o el general devorará a los específicos.

Ahora añadamos bloques adicionales:

```py
try:
    name = input('Introduce tu nombre:')
    year_born = input('¿En qué año naciste?:')
    age = 2019 - int(year_born)
    print(f'Eres {name}. Tu edad es {age}.')
except TypeError:
    print('Se produjo un error de tipo (TypeError)')
except ValueError:
    print('Se produjo un ValueError')
except ZeroDivisionError:
    print('Se produjo una división por cero (ZeroDivisionError)')
else:
    print('Este bloque se ejecuta normalmente después de try')
finally:
    print('Este bloque siempre se ejecuta.')
```

```sh
Introduce tu nombre:Asabeneh
¿En qué año naciste?:1920
Eres Asabeneh. Tu edad es 99.
Este bloque se ejecuta normalmente después de try
Este bloque siempre se ejecuta.
```

El bloque opcional `else` se ejecuta EXCLUSIVAMENTE si el bloque `try` finalizó exitosamente SIN lanzar absolutamente ninguna excepción. Es muy elegante para separar el código que puede fallar del código que depende de que no falle.
Por su parte, el bloque `finally` es código crítico de limpieza (Clean-up) que se ejecutará SIEMPRE e incondicionalmente sin importar si el `try` falló o si tuvo éxito (se usa el 100% de las veces para cerrar conexiones a Bases de Datos o archivos abiertos).

También podemos simplificar el manejo de excepción así:

```py
try:
    name = input('Introduce tu nombre:')
    year_born = input('¿En qué año naciste?:')
    age = 2019 - int(year_born)
    print(f'Eres {name}. Tu edad es {age}.')
except Exception as e:
    print(e)
```

En la sintaxis `except Exception as e:`, el alias `as e` significa que la variable `e` es una instancia (Objeto) del error propiamente dicho. Captura el mensaje descriptivo y los detalles internos del error lanzado por Python para poder imprimirlo en un Log y entender qué causó el error exacto.

### Conceptos Avanzados de Excepciones

**Lanzar excepciones (`raise`) y Excepciones Personalizadas**
Si como programador decides LANZAR FORZOSAMENTE (trigger) una excepción intencional (por ejemplo, para validar datos y abortar procesos malos tempranamente), utilizas la palabra clave `raise` (ej. `raise ValueError('Edad no puede ser negativa')`). 
También puedes crear tus Propias Excepciones (Custom Exceptions) creando una Clase nueva que herede directamente de la clase base nativa `Exception` (ej. `class SaldoInsuficienteError(Exception): pass`). Esto le da una claridad semántica increíble al manejo de errores del dominio de la aplicación.
Además, si dentro de un bloque `except` pones la palabra `raise` sola, esto detiene la ejecución del bloque actual y vuelve a propagar (re-raise) EL MISMO error original que acaba de ser atrapado, enviándolo al nivel superior.

**El comportamiento de `finally` y `return`**
Como el bloque `finally` se ejecuta ABSOLUTAMENTE SIEMPRE en la rampa de salida, si tienes un bloque `try` con un `return 1` y un bloque `finally` asociado con un `return 2`, la función retornará `2`. El `return` del `finally` tiene la última palabra y sobrescribe silenciosamente cualquier valor devuelto previamente en el `try`.

**Afirmaciones (`assert`)**
Otra herramienta útil es la instrucción `assert` (ej. `assert x > 0, 'La variable debe ser positiva'`). Es una prueba de cordura rápida (Sanity Check) que levanta un `AssertionError` de inmediato si la condición proporcionada evalúa a Falso. Se utiliza fuertemente en Testing interno para afirmar agresivamente un estado y prevenir daños colaterales.

**Buenas prácticas y Manejo Global (APIs)**
Las excepciones (como su nombre lo indica) son para lidiar con Casos Excepcionales, Anómalos o de Error (Failure path). Usar excepciones y bloques try-except en lugar de IFs para manejar lógica de control de flujo estándar de negocio ralentiza el código gravemente y es considerado un mal diseño arquitectónico.
Finalmente, si estás desarrollando una API y ocurre un error interno en la base de datos que tu código no supo atrapar localmente, este debe atraparse en un Global Exception Handling (por ejemplo, en un Middleware superior en el Framework como FastAPI o Django). Allí se debe registrar el error en el Log interno para los devs, y enviarle un mensaje JSON limpio al usuario con Código de Estado 500 (Internal Server Error). Jamás se debe dejar sin atrapar para que el cliente reciba el Stack Trace completo.


---

## Empacar y desempacar parámetros en Python

Usamos dos operadores:

- * para tuplas/listas
- ** para diccionarios

Veamos un ejemplo. Supongamos que una función acepta parámetros separados, pero nosotros tenemos una lista. Podemos desempaquetarla y convertirla en argumentos.

### Desempaquetado

#### Desempaquetar listas

```py
def sum_of_five_nums(a, b, c, d, e):
    return a + b + c + d + e

lst = [1, 2, 3, 4, 5]
print(sum_of_five_nums(lst)) # TypeError: sum_of_five_nums() missing 4 required positional arguments: 'b', 'c', 'd', and 'e'
```

Al ejecutar lo anterior ocurre un error porque la función espera números separados, no una lista. Desempaquetemos la lista:

```py
def sum_of_five_nums(a, b, c, d, e):
    return a + b + c + d + e

lst = [1, 2, 3, 4, 5]
print(sum_of_five_nums(*lst))  # 15
```

También podemos usar desempaquetado con range(), que acepta inicio y fin:

```py
numbers = range(2, 7)  # llamada normal con parámetros separados
print(list(numbers)) # [2, 3, 4, 5, 6]
args = [2, 7]
numbers = range(*args)  # llamada usando los parámetros desempaquetados desde la lista
print(list(numbers))      # [2, 3, 4, 5, 6]
```

También podemos usar desempaquetado en asignaciones:

```py
countries = ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']
fin, sw, nor, *rest = countries
print(fin, sw, nor, rest)   # Finland Sweden Norway ['Denmark', 'Iceland']
numbers = [1, 2, 3, 4, 5, 6, 7]
one, *middle, last = numbers
print(one, middle, last)      #  1 [2, 3, 4, 5, 6] 7
```

#### Desempaquetar diccionarios

```py
def unpacking_person_info(name, country, city, age):
    return f'{name} vive en {city}, {country}. Tiene {age} años.'
dct = {'name':'Asabeneh', 'country':'Finland', 'city':'Helsinki', 'age':250}
print(unpacking_person_info(**dct)) # Asabeneh vive en Helsinki, Finland. Tiene 250 años.
```


---

### Empaquetado

A veces no sabemos cuántos argumentos nos pasarán a una función. Podemos usar empaquetado para aceptar un número variable de argumentos.

### Empaquetar listas

```py
def sum_all(*args):
    s = 0
    for i in args:
        s += i
    return s
print(sum_all(1, 2, 3))             # 6
print(sum_all(1, 2, 3, 4, 5, 6, 7)) # 28
```

#### Empaquetar diccionarios

```py
def packing_person_info(**kwargs):
    # comprobar el tipo de kwargs: es un dict
    # print(type(kwargs))
    # imprimir los pares clave-valor
    for key in kwargs:
        print(f"{key} = {kwargs[key]}")
    return kwargs

print(packing_person_info(name="Asabeneh",
      country="Finland", city="Helsinki", age=250))
```

```sh
name = Asabeneh
country = Finland
city = Helsinki
age = 250
{'name': 'Asabeneh', 'country': 'Finland', 'city': 'Helsinki', 'age': 250}
```


---

## Expandir en Python

Al igual que en JavaScript, Python permite expandir listas usando el operador *. Veámoslo:

```py
lst_one = [1, 2, 3]
lst_two = [4, 5, 6, 7]
lst = [0, *lst_one, *lst_two]
print(lst)          # [0, 1, 2, 3, 4, 5, 6, 7]
```


---

## Enumerar (enumerate)

Si necesitamos los índices de una lista, usamos la función integrada enumerate.

```py
for index, item in enumerate([20, 30, 40]):
    print(index, item)
```

```py
for index, i in enumerate(countries):
    print('hola')
    if i == 'Finland':
        print(f'El país {i} está en el índice {index}')
```

```sh
0 20
1 30
2 40
```


---

## Zip

A veces necesitamos combinar listas. Observa el ejemplo:

```py
fruits = ['banana', 'orange', 'mango', 'lemon', 'lime']                    
vegetables = ['Tomato', 'Potato', 'Cabbage','Onion', 'Carrot']
fruits_and_veges = []
for f, v in zip(fruits, vegetables):
    fruits_and_veges.append({'fruit':f, 'veg':v})

print(fruits_and_veges)
```

```sh
[{'fruit': 'banana', 'veg': 'Tomato'}, {'fruit': 'orange', 'veg': 'Potato'}, {'fruit': 'mango', 'veg': 'Cabbage'}, {'fruit': 'lemon', 'veg': 'Onion'}, {'fruit': 'lime', 'veg': 'Carrot'}]
```