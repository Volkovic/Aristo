# Día 14 - Funciones Avanzadas (El Restaurante de Python)

A partir de hoy, vamos a pensar en las funciones como **ingredientes o herramientas de cocina**. En Python, las funciones son "ciudadanos de primera clase", lo que significa que puedes tratarlas exactamente igual que a un número o una cadena de texto: puedes guardarlas en variables, pasarlas como argumentos o hacer que otra función las devuelva.

Para entender estos conceptos avanzados (Funciones de orden superior, Closures y Decoradores), usaremos el hilo conductor de **"El Restaurante de Python"**.

En esta sección dominaremos:
1. Funciones de orden superior (Pasar y devolver funciones)
2. Closures (Funciones con memoria)
3. Decoradores (Envoltorios mágicos)
4. Map, Filter y Reduce (Procesamiento de pedidos)

---

## 1. Funciones de Orden Superior: Pasando herramientas al Chef

Imagina que tienes un Chef (una función) que sabe preparar ingredientes, pero necesita que le digas **cómo** cocinarlos. Para esto, le pasamos "el método de cocción" (otra función) como parámetro.

Una función que recibe a otra función como parámetro se llama **Función de Orden Superior**.

```python
# Nuestras funciones "herramienta" (métodos de cocción)
def hornear(ingrediente):
    return f"{ingrediente} horneado a la perfección"

def freir(ingrediente):
    return f"{ingrediente} frito y muy crujiente"

# Nuestra Función de Orden Superior (El Chef)
def chef_prepara(metodo_de_coccion, ingrediente):
    print("Chef: Preparando el ingrediente...")
    # Aquí el chef USA la función que le pasamos
    resultado = metodo_de_coccion(ingrediente)
    print(f"Chef: ¡Listo! Tenemos un {resultado}")

# Usando el código
chef_prepara(hornear, "Pollo") 
# Output: Chef: ¡Listo! Tenemos un Pollo horneado a la perfección

chef_prepara(freir, "Pescado")
# Output: Chef: ¡Listo! Tenemos un Pescado frito y muy crujiente
```

Fíjate que pasamos `hornear` y `freir` **sin paréntesis**. No las estamos ejecutando nosotros, se las estamos entregando al Chef para que él las ejecute cuando sea el momento adecuado.

---

## 2. Funciones de Orden Superior: La fábrica de máquinas

Otra característica de las funciones de orden superior es que pueden **devolver (retornar) funciones**. 

Imagina una fábrica de máquinas de restaurante. Tú le dices qué tipo de comida quieres vender, y la fábrica construye y te entrega una máquina (función) especializada para eso.

```python
def fabrica_de_maquinas(tipo_comida):
    
    # La fábrica tiene planos para construir diferentes máquinas
    def maquina_pizzas(cantidad):
        return f"🍕 Saliendo {cantidad} pizzas calientes!"
        
    def maquina_helados(cantidad):
        return f"🍦 Sirviendo {cantidad} helados fríos!"
        
    # Dependiendo de lo que pidas, te devuelve la máquina correcta (SIN EJECUTARLA)
    if tipo_comida == "pizza":
        return maquina_pizzas
    elif tipo_comida == "helado":
        return maquina_helados

# 1. Compramos la máquina (guardamos la función retornada en una variable)
mi_pizzeria = fabrica_de_maquinas("pizza")
mi_heladeria = fabrica_de_maquinas("helado")

# 2. Ahora usamos nuestras máquinas
print(mi_pizzeria(5))   # 🍕 Saliendo 5 pizzas calientes!
print(mi_heladeria(3))  # 🍦 Sirviendo 3 helados fríos!
```

---

## 3. Closures: Funciones con Memoria (La tarjeta VIP)

Un **Closure** es simplemente una función interna que "recuerda" las variables de su entorno, incluso después de que la función externa haya terminado de ejecutarse. 

Piénsalo como una **Tarjeta VIP de cliente**. Cuando creas la tarjeta, le asignas un nombre de cliente y un descuento fijo. Cada vez que el cliente usa su tarjeta para comprar, la tarjeta *recuerda* quién es y qué descuento tiene.

```python
def crear_tarjeta_vip(nombre_cliente, porcentaje_descuento):
    # Estas variables son la "memoria" del closure
    
    def comprar(monto_factura):
        # Esta función interna RECUERDA a 'nombre_cliente' y 'porcentaje_descuento'
        descuento = monto_factura * (porcentaje_descuento / 100)
        total = monto_factura - descuento
        return f"Hola {nombre_cliente}, tu total con {porcentaje_descuento}% de descuento es ${total}"
        
    # Devolvemos la función interna (la tarjeta lista para usar)
    return comprar

# Creamos dos closures distintos (dos tarjetas VIP con memorias distintas)
tarjeta_dano = crear_tarjeta_vip("Dano", 20)
tarjeta_ana = crear_tarjeta_vip("Ana", 50)

# Al usarlas, mágicamente recuerdan de quién son
print(tarjeta_dano(100))  # Hola Dano, tu total con 20% de descuento es $80.0
print(tarjeta_ana(100))   # Hola Ana, tu total con 50% de descuento es $50.0
```

¡El closure encierra (encapsula) datos locales para que vivan dentro de la función!

---

## 4. Decoradores: Empaquetando para Regalo (Wrappers)

Un **Decorador** (`@decorador`) usa todo lo que aprendimos antes para **añadir funcionalidad a una función sin modificar su código original**. 

Imagina que tienes un cocinero que hace hamburguesas (tu función original). Quieres empezar a ofrecer "Empaquetado para Regalo". En lugar de enseñarle al cocinero a hacer cajas de regalo (modificar la función), contratas a un empaquetador (el decorador) que se pone al final de la línea. El cocinero hace la hamburguesa, se la pasa al empaquetador, y este le pone un lazo.

```python
# 1. Creamos al decorador (el Empaquetador)
def empaquetado_regalo(funcion_cocinero):
    
    def wrapper(): # Wrapper significa "Envoltorio"
        print("🎁 Preparando caja de regalo...")
        # El empaquetador llama al cocinero para que haga su trabajo
        comida = funcion_cocinero() 
        print("🎀 Poniendo un lazo rojo y tarjeta de felicidades!")
        return comida
        
    return wrapper

# 2. Aplicamos el decorador usando la sintaxis @
@empaquetado_regalo
def preparar_hamburguesa():
    print("🍔 Cocinando carne, poniendo queso y pan...")
    return "Hamburguesa lista"

# Cuando llamamos a la función, el envoltorio actúa automáticamente
resultado = preparar_hamburguesa()
```

**Output:**
```text
🎁 Preparando caja de regalo...
🍔 Cocinando carne, poniendo queso y pan...
🎀 Poniendo un lazo rojo y tarjeta de felicidades!
```

Como ves, ¡añadimos funcionalidad "alrededor" de la hamburguesa sin tocar la receta!

---

## 5. Decoradores que reciben parámetros (El Cajero)

¿Qué pasa si la función que queremos decorar recibe argumentos? (Por ejemplo, pedir una hamburguesa con ingredientes específicos). En ese caso, nuestro `wrapper` (envoltorio) también debe aceptar esos argumentos `(*args, **kwargs)`.

```python
# El decorador del cajero (Revisa si pagaste antes de cocinar)
def verificar_pago(funcion_cocinero):
    
    # El wrapper recibe *args (cualquier cantidad de argumentos posicionales)
    # y **kwargs (cualquier cantidad de argumentos nombrados)
    def wrapper(*args, **kwargs):
        print("💳 Cajero: Verificando pago...")
        print("✅ Pago aprobado. Enviando orden a la cocina.")
        
        # Le pasamos los argumentos intactos a la función original
        return funcion_cocinero(*args, **kwargs)
        
    return wrapper

@verificar_pago
def preparar_orden(plato, mesa, extra=None):
    if extra:
        return f"Cocinando {plato} con {extra} para la mesa {mesa}"
    return f"Cocinando {plato} para la mesa {mesa}"

# Usamos la función normalmente
print(preparar_orden("Ravioles", mesa=4, extra="Queso extra"))
```

Al usar `*args` y `**kwargs`, nos aseguramos de que el decorador funcione con **cualquier** función, sin importar cuántos parámetros tenga.

### Apilar Decoradores (Múltiples Envoltorios)
Puedes aplicar más de un decorador a una función simplemente poniéndolos uno debajo del otro. Se ejecutan "de abajo hacia arriba" (Bottom-up). El decorador más cercano a la función original la envuelve primero.

```python
@verificar_pago
@empaquetado_regalo
def preparar_postre():
    return "Torta de chocolate"
# 1° se empaqueta, 2° se verifica el pago.
```

### El problema de la identidad: @functools.wraps
Cuando envuelves una función, la función original "pierde" su nombre interno (pasa a llamarse genéricamente `wrapper`), lo cual dificulta encontrar errores (debugging). Para evitar esto, usamos un decorador especial de Python llamado `@wraps`.

```python
from functools import wraps

def mi_decorador(funcion_original):
    @wraps(funcion_original)  # <-- Esto copia la identidad original al wrapper
    def wrapper(*args, **kwargs):
        return funcion_original(*args, **kwargs)
    return wrapper
```

---

## 6. Funciones integradas (Procesando el inventario)

Python ya trae de fábrica algunas funciones de orden superior muy útiles que operan sobre listas. Son las famosas `map`, `filter` y `reduce`.

Imagina que estamos revisando el inventario y los pedidos de nuestro restaurante. Las funciones `map` y `filter` se usan casi siempre junto a **lambdas** (funciones anónimas). 
*Nota: Por diseño en Python, una función lambda está rígidamente limitada a **una ÚNICA expresión** (no puedes usar múltiples líneas, ifs complejos o asignaciones dentro de ella).*

### MAP (Transformar todo)
Aplica una función a **cada elemento** de una lista y devuelve un nuevo objeto transformado.
*Dato clave:* En Python 3, `map` (y `filter`) devuelven un "Iterador perezoso" (Lazy Object) para ahorrar memoria, no una lista. Si lo imprimes directo verás `<map object>`. Debes forzar su conversión usando `list()`.

*Ejemplo: Convertir precios en dólares a moneda local.*

```python
precios_usd = [10, 15, 20]

# Multiplicamos cada precio por 1000 usando map y lambda
precios_locales = map(lambda precio: precio * 1000, precios_usd)

print(list(precios_locales))  # [10000, 15000, 20000]
```

### FILTER (Filtrar lo que sirve)
Filtra una lista, manteniendo solo los elementos que devuelven `True` en la condición.
*Ejemplo: El mesero anota pedidos, pero el chef rechaza los que tienen "piña" (ananá).*

```python
pedidos = ["Pizza Pepperoni", "Pizza con Piña", "Hamburguesa", "Tacos con Piña"]

# Filtramos usando una función que revisa si 'Piña' NO está en el texto
pedidos_aceptados = filter(lambda p: "Piña" not in p, pedidos)

print(list(pedidos_aceptados))  # ['Pizza Pepperoni', 'Hamburguesa']
```

---

## 7. REDUCE (Acumular un resultado)

### REDUCE (El cajero haciendo el cierre)
A diferencia de `map` o `filter` que devuelven listas, `reduce` agarra la lista entera y la "reduce" a **un solo valor final** acumulando los resultados. Se debe importar del módulo `functools`.

*Ejemplo: Sumar toda la ganancia del día.*

```python
from functools import reduce

ganancias_por_mesa = [1500, 3200, 800, 4100]

# reduce toma los 2 primeros valores (1500, 3200), los suma.
# luego toma el resultado y lo suma con el siguiente (800)...
total_dia = reduce(lambda acumulador, valor_actual: acumulador + valor_actual, ganancias_por_mesa)

print(total_dia)  # 9600
```

Con estas herramientas, tienes el poder de crear código altamente reutilizable y elegante. Los decoradores en particular los verás muchísimo cuando empieces a usar frameworks web como Flask o Django (por ejemplo, `@login_required` para verificar si un usuario inició sesión antes de mostrarle una página).