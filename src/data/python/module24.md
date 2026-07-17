# Día 24 - Estadística

## Análisis estadístico con Python

## Estadística

La estadística es la disciplina que estudia la recolección, organización, presentación, análisis, interpretación y comunicación de datos.
La estadística es una rama de las matemáticas y es un conocimiento previo recomendable para ciencia de datos y machine learning. Es un campo muy amplio; en esta sección nos centraremos solo en las partes más relevantes.
Al completar este reto puedes avanzar hacia desarrollo web, análisis de datos, machine learning o ciencia de datos. En algún punto de tu carrera profesional te enfrentarás a datos que necesitan ser procesados. Tener nociones de estadística te ayudará a tomar decisiones basadas en datos: como dice el dicho, "los datos nos hablan".

Dentro de este campo, destaca la **Estadística Descriptiva**, que es la rama enfocada en recolectar, organizar, resumir y presentar grandes volúmenes de datos pasados o actuales de forma comprensible (mediante números clave y gráficos). Para realizar estos estudios, es fundamental entender la diferencia entre **Población** y **Muestra**. La población es el conjunto completo y total de sujetos que nos interesan estudiar, mientras que la muestra es un sub-grupo representativo extraído cuidadosamente de esa población para hacerlo analizable.

Para describir estos datos, utilizamos las **Medidas de Tendencia Central** más importantes: la Media (Mean), la Mediana (Median) y la Moda (Mode). 
- La **Media (Promedio)** es el punto de equilibrio aritmético absoluto. Se calcula sumando absolutamente todos los valores del dataset y dividiendo el resultado por la cantidad total de datos. Su principal debilidad es que es muy vulnerable a valores atípicos extremos (Outliers).
- La **Mediana** es el valor numérico que separa la mitad superior de los datos de la mitad inferior, estando ubicado exactamente en el centro geográfico cuando el dataset está ordenado. A diferencia de la media, la mediana ignora los extremos absurdos.
- La **Moda** es simplemente el valor que ocurre con mayor frecuencia (el que más se repite) en el conjunto de datos, y es la única de estas medidas que se puede usar en datos categóricos (texto).

Por otro lado, las **Medidas de Dispersión (Variabilidad)** cuantifican qué tan juntos (consistentes) o qué tan desparramados y alejados (volátiles) están los datos con respecto al promedio central. Aquí encontramos la **Varianza**, que es el promedio de las diferencias cuadradas entre cada punto de los datos y la media grupal (esencialmente mide cuán ancha es la campana probabilística). Sin embargo, los científicos prefieren utilizar la **Desviación Estándar**, ya que es la raíz cuadrada matemática de la Varianza, lo que devuelve la métrica a las mismas unidades originales de los datos (haciéndola intuitivamente comprensible).

Al analizar cómo se distribuyen los datos, a menudo encontramos la **Distribución Normal Estándar** (la famosa 'Campana de Gauss' perfecta). En ella, el grueso de los datos se aglomera simétricamente alrededor del centro, y la Media, la Mediana y la Moda caen matemáticamente en el mismo valor exacto. En esta distribución se cumple la regla del **68-95-99.7**, la cual dicta que aproximadamente el 68% de todos tus datos caerá dentro de +1 o -1 Desviaciones Estándar alejadas del promedio central. Cuando los datos no son simétricos, hablamos de **Asimetría (Skewness)**, que mide la falta de simetría de la distribución. Si la 'cola' más larga del gráfico apunta brutalmente hacia la derecha (por valores altos anormales), decimos que tiene Asimetría Positiva.

Para un análisis más profundo de la posición, usamos los **Cuartiles (Percentiles)**, que son valores estáticos (marcadores en el suelo) que cortan tus datos ordenados en partes iguales de 25%. El Cuartil 2 (Q2 / Percentil 50) es exactamente la Mediana. A partir de esto se calcula el **Rango Intercuartílico (IQR)**, cuya famosa fórmula es IQR = Cuartil 3 (Q3) menos Cuartil 1 (Q1). Representa la caja central del 50% de todos tus datos y se usa habitualmente para detectar y aniquilar Outliers lógicamente.

Visualmente, el IQR se representa mediante un **Boxplot (Diagrama de Caja y Bigotes)**, una representación visual densa que muestra simultáneamente en pantalla la Mediana, el IQR (la caja), los bigotes (límites normales superior e inferior) y los puntos aislados (Outliers). Otra herramienta visual clave es el **Gráfico de Dispersión (Scatter Plot)**, que consiste en puntos trazados en el eje cartesiano (X e Y) que comparan directamente 2 variables cuantitativas independientes para ver visualmente si existe algún patrón de correlación entre ellas.

Hablando de relaciones, el **Coeficiente de Correlación** mide la fuerza y dirección de una relación lineal entre dos columnas de datos. Si es +1, suben juntas en perfecta sincronía; si es -1, si una sube la otra colapsa; si es 0, no tienen nada que ver. Sin embargo, nunca olvides la famosa máxima de la ciencia de datos: **"Correlación NO implica Causalidad"**.


---

## Datos

¿Qué son los datos? Los datos son cualquier conjunto de caracteres recogidos y transformados con algún propósito, usualmente para análisis. Pueden ser texto, números, imágenes, audio o vídeo. Si los datos carecen de contexto son poco útiles para humanos o máquinas. Para extraer significado necesitamos herramientas que los procesen.

El flujo de trabajo en análisis de datos, ciencia de datos o machine learning comienza siempre por los datos. Pueden provenir de fuentes externas o ser generados. Existen datos estructurados y no estructurados.

Los datos pueden ser pequeños o masivos. Muchos de los formatos de datos que encontrarás ya se han presentado en la sección de manejo de archivos.

## Módulo statistics

El módulo _statistics_ de Python ofrece funciones para cálculos estadísticos sobre datos numéricos. No compite con bibliotecas avanzadas de terceros (NumPy, SciPy) ni con paquetes profesionales de estadística, sino que provee funcionalidades a un nivel similar al de calculadoras científicas o gráficas. Este módulo integrado provee Python para realizar estos cálculos básicos sin usar librerías de terceros complejas, exponiendo funciones como `statistics.mean()`, `statistics.median()` y `statistics.mode()` nativamente.

# NumPy

Como lenguaje general, Python se potencia con librerías como numpy, scipy, matplotlib y pandas, transformándose en un entorno potente para computación científica.

NumPy es la librería central para computación científica en Python; ofrece arrays multidimensionales de alto rendimiento y herramientas para operar con ellos. La gran ventaja de un array de NumPy (por ejemplo, al ejecutar `np.array([1,2,3,4,5]).mean()`) sobre las listas puras de Python es que es un Array vectorial compilado en C. Consume ínfimas fracciones de memoria RAM y ejecuta operaciones estadísticas masivas miles de veces más rápido que los bucles for de Python.

Para trabajar con notebooks es recomendable usar Jupyter. Puedes instalar Anaconda para disponer de Jupyter y muchas librerías preinstaladas.

```sh
pip install numpy
```


---

## Importar NumPy

Si usas Jupyter (recomendado), puedes seguir este notebook de ejemplo.

```py
# cómo importar numpy
import numpy as np
# cómo comprobar la versión de numpy
print('numpy:', np.__version__)
# ver métodos disponibles
print(dir(np))
```


---

## Crear arrays con NumPy

### Crear arrays enteros con NumPy

```py
# crear una lista de Python
python_list = [1,2,3,4,5]

# comprobar tipo
print('Type:', type(python_list)) # <class 'list'>
print(python_list) # [1, 2, 3, 4, 5]

two_dimensional_list = [[0,1,2], [3,4,5], [6,7,8]]
print(two_dimensional_list)  # [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

# crear un array NumPy desde la lista de Python
numpy_array_from_list = np.array(python_list)
print(type(numpy_array_from_list))   # <class 'numpy.ndarray'>
print(numpy_array_from_list) # array([1, 2, 3, 4, 5])
```


---

### Crear arrays float con NumPy

```py
# lista de Python
python_list = [1,2,3,4,5]

numpy_array_from_list2 = np.array(python_list, dtype=float)
print(numpy_array_from_list2) # array([1., 2., 3., 4., 5.])
```


---

### Crear arrays booleanos con NumPy

```py
numpy_bool_array = np.array([0, 1, -1, 0, 0], dtype=bool)
print(numpy_bool_array) # array([False,  True,  True, False, False])
```

### Crear arrays multidimensionales con NumPy

Un array de NumPy puede tener múltiples filas y columnas:

```py
two_dimensional_list = [[0,1,2], [3,4,5], [6,7,8]]
numpy_two_dimensional_list = np.array(two_dimensional_list)
print(type(numpy_two_dimensional_list))
print(numpy_two_dimensional_list)
```

```sh
<class 'numpy.ndarray'>
[[0 1 2]
 [3 4 5]
 [6 7 8]]
```


---

### Convertir arrays de NumPy a listas

```py
# podemos usar tolist() para convertir un array a lista de Python
np_to_list = numpy_array_from_list.tolist()
print(type(np_to_list))
print('Array 1D:', np_to_list)
print('Array 2D: ', numpy_two_dimensional_list.tolist())
```

```sh
<class 'list'>
Array 1D: [1, 2, 3, 4, 5]
Array 2D:  [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
```


---

### Crear arrays desde tuplas

```py
# crear una tupla en Python
python_tuple = (1,2,3,4,5)
print(type(python_tuple)) # <class 'tuple'>
print('python_tuple: ', python_tuple) # python_tuple:  (1, 2, 3, 4, 5)

numpy_array_from_tuple = np.array(python_tuple)
print(type(numpy_array_from_tuple)) # <class 'numpy.ndarray'>
print('numpy_array_from_tuple: ', numpy_array_from_tuple) # numpy_array_from_tuple:  [1 2 3 4 5]
```


---

### Forma (shape) de arrays de NumPy

El método shape devuelve una tupla con la forma del array: filas y columnas. Si el array es 1D devuelve su longitud.

```py
nums = np.array([1, 2, 3, 4, 5])
print(nums)
print('Forma de nums: ', nums.shape)
print(numpy_two_dimensional_list)
print('Forma de numpy_two_dimensional_list: ', numpy_two_dimensional_list.shape)
three_by_four_array = np.array([[0, 1, 2, 3],
    [4,5,6,7],
    [8,9,10, 11]])
print(three_by_four_array.shape)
```

```sh
[1 2 3 4 5]
Forma de nums:  (5,)
[[0 1 2]
 [3 4 5]
 [6 7 8]]
Forma de numpy_two_dimensional_list:  (3, 3)
(3, 4)
```


---

### Tipo de datos de arrays de NumPy

Tipos de datos: str, int, float, complex, bool, list, None

```py
int_lists = [-3, -2, -1, 0, 1, 2,3]
int_array = np.array(int_lists)
float_array = np.array(int_lists, dtype=float)

print(int_array)
print(int_array.dtype)
print(float_array)
print(float_array.dtype)
```

```sh
[-3 -2 -1  0  1  2  3]
int64
[-3. -2. -1.  0.  1.  2.  3.]
float64
```


---

### Tamaño (size) de arrays de NumPy

Para conocer el número de elementos de un array utilizamos size:

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
two_dimensional_list = np.array([[0, 1, 2],
                              [3, 4, 5],
                              [6, 7, 8]])

print('Tamaño:', numpy_array_from_list.size) # 5
print('Tamaño:', two_dimensional_list.size)  # 9
```

```sh
Tamaño: 5
Tamaño: 9
```


---

## Operaciones matemáticas con NumPy

Los arrays de NumPy permiten operaciones vectorizadas sin necesidad de bucles.

Operaciones disponibles:

- Suma (+)
- Resta (-)
- Multiplicación (*)
- División (/)
- Módulo (%)
- División entera (//)
- Potencia (**)


---

### Suma

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Suma: ', numpy_array_from_list + 2)
print('Suma: ', np.add(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
Suma:  [3 4 5 6 7]
Suma:  [3 4 5 6 7]
```


---

### Resta

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Resta: ', numpy_array_from_list - 2)
print('Resta: ', np.subtract(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
Resta:  [-1  0  1  2  3]
Resta:  [-1  0  1  2  3]
```


---

### Multiplicación

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Multiplicación: ', numpy_array_from_list * 2)
print('Multiplicación: ', np.multiply(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
Multiplicación:  [ 2  4  6  8 10]
Multiplicación:  [ 2  4  6  8 10]
```


---

### División

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('División: ', numpy_array_from_list / 2)
print('División: ', np.divide(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
División:  [0.5 1.  1.5 2.  2.5]
División:  [0.5 1.  1.5 2.  2.5]
```


---

### Módulo

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Módulo: ', numpy_array_from_list % 2)
print('Módulo: ', np.mod(numpy_array_from_