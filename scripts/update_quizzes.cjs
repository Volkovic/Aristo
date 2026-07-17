const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/python/quizzes.json', 'utf8'));
const day14 = data.day14;

// Manually mapping balanced options for Day 14
const updates = {
  1401: [
    "Una función que se ejecuta en la pila principal del procesador sin usar hilos secundarios.",
    "Una función que toma una o más funciones como parámetros, o devuelve una función como su resultado.",
    "Una función importada exclusivamente desde un módulo de sistema externo de bajo nivel.",
    "Una función matemática avanzada para resolver integrales y derivadas de forma iterativa."
  ],
  1402: [
    "Para iterar sobre diccionarios y fusionar sus claves en un nuevo conjunto de datos.",
    "Para transformar iterables. Toma una función y una lista, y aplica esa función individualmente a CADA elemento.",
    "Para recorrer un árbol binario estructurado y retornar los nodos en un orden específico.",
    "Para encontrar direcciones de memoria estáticas de las variables locales en tiempo de ejecución."
  ],
  1403: [
    "['HOLA', 'MUNDO']",
    "['hola', 'mundo']",
    "Genera un ValueError por faltar los paréntesis en la llamada a str.upper.",
    "Devuelve un String concatenado: 'HOLAMUNDO'"
  ],
  1404: [
    "Borrar todos los elementos de una colección vaciando su espacio de memoria RAM reservado.",
    "Detener la ejecución del programa si se detectan anomalías de sintaxis en el código.",
    "Tomar una función (que devuelva True/False) y un iterable, devolviendo solo los elementos que cumplen la condición.",
    "Organizar alfabéticamente cualquier secuencia de caracteres ignorando mayúsculas y minúsculas."
  ],
  1405: [
    "map(lambda x: x % 2 == 0, numeros)",
    "filter(lambda x: x % 2 == 0, numeros)",
    "reduce(lambda x: x % 2 == 0, numeros)",
    "select(lambda x: x % 2 == 0, numeros)"
  ],
  1406: [
    "Comprime el tamaño físico de las listas reduciendo la cantidad de bytes que ocupan en el sistema.",
    "Itera sobre una secuencia aplicando una función de dos argumentos de manera acumulativa para reducirla a un solo valor final.",
    "Resta de manera consecutiva todos los elementos de un array hasta llegar al valor cero absoluto.",
    "Elimina automáticamente todos los valores duplicados de un conjunto devolviendo elementos únicos."
  ],
  1407: [
    "No se requiere importación, es una función integrada de forma nativa (built-in).",
    "Debe importarse desde el módulo de matemáticas avanzadas 'math'.",
    "Debe importarse específicamente usando la instrucción 'from functools import reduce'.",
    "Se encuentra dentro de la librería estándar de iteraciones múltiples 'itertools'."
  ],
  1408: [
    "Librerías de terceros diseñadas exclusivamente para añadir colores y estilos a las salidas de consola.",
    "Comentarios estructurados que el intérprete ignora pero sirven para documentar parámetros.",
    "Funciones de orden superior que envuelven otra función para alterar o extender su comportamiento sin cambiar el original.",
    "Variables de estado global inmutables que no pueden ser modificadas durante la ejecución del programa."
  ],
  1409: [
    "El símbolo numeral (#)",
    "El símbolo de dólar ($)",
    "El símbolo arroba (@)",
    "El asterisco doble (**)"
  ],
  1410: [
    "El resultado directo y evaluado de la función original envuelta.",
    "Un valor booleano (True o False) indicando el éxito del proceso.",
    "La referencia en memoria a la función interna `wrapper` (sin paréntesis).",
    "Un objeto vacío de tipo NoneClass."
  ],
  1411: [
    "Para acelerar el tiempo de compilación del intérprete de Python al evaluar la función interna.",
    "Para asegurar que el decorador pueda envolver y reenviar argumentos a CUALQUIER función original sin importar sus parámetros.",
    "Es un requerimiento estético forzado por las normativas de estilo PEP 8 de Python.",
    "Para evitar la inyección de dependencias cíclicas durante la ejecución de los módulos."
  ],
  1412: [
    "No, aplicar más de uno generará un error de tipo RecursionError en la pila.",
    "Sí, y se evalúan de abajo hacia arriba (Bottom-up), donde el decorador más cercano a la función envuelve primero.",
    "Sí, pero deben pertenecer a la misma clase o módulo padre para no generar conflictos de nombres.",
    "Solo se permite en métodos de clases abstractas, pero no en funciones sueltas de un módulo."
  ],
  1413: [
    "Un comando específico utilizado para forzar el cierre de procesos asíncronos en bucles.",
    "Una técnica donde una función interna 'recuerda' el estado de las variables de su función contenedora incluso tras finalizar.",
    "Una función que no admite parámetros de entrada y solo opera con constantes globales.",
    "Un módulo matemático enfocado en realizar cálculos de área y volumen cerrados."
  ],
  1414: [
    "Arroja un error de sintaxis por retorno múltiple",
    "Retorna el valor numérico 5",
    "Retorna el valor numérico 10",
    "Retorna el valor numérico 2"
  ],
  1415: [
    "Para empaquetar grandes cantidades de código en módulos comprimidos de tipo zip.",
    "Para copiar los metadatos de la función original a la función wrapper, evitando perder su identidad durante el debugging.",
    "Para acelerar la ejecución delegando el procesamiento a librerías compiladas en lenguaje C.",
    "Para crear funciones automáticamente basándose en un diccionario de configuración."
  ],
  1416: [
    "Se imprime la lista normalmente con todos los valores ya transformados y listos para usar.",
    "Se imprime un error de tipo TypeError informando que el objeto no es directamente iterable por consola.",
    "Se imprime la representación del objeto perezoso en memoria, por ejemplo: `<map object at 0x...>`.",
    "Se imprime el código fuente desensamblado de la función lambda utilizada en la operación."
  ],
  1417: [
    "Para calcular raíces cuadradas de matrices multidimensionales de forma paralela.",
    "Para generar plantillas HTML y diseños CSS dinámicos directamente desde el servidor backend.",
    "Para verificar si el usuario tiene un Token de Autenticación válido antes de permitir que acceda a datos sensibles.",
    "Para borrar tablas enteras de la base de datos de manera segura y transaccional."
  ],
  1418: [
    "Calcula la suma total acumulada de todos los números del array ingresado.",
    "Calcula la media aritmética (promedio) de los valores iterados.",
    "Calcula la multiplicación acumulativa, lo que equivale matemáticamente al Factorial de 5 (120).",
    "Calcula una división continua entre los elementos para encontrar el máximo común divisor."
  ],
  1419: [
    "Sí, siempre que las expresiones múltiples estén separadas estrictamente por punto y coma.",
    "Sí, utilizando la indentación estándar de bloques en Python dentro de la declaración lambda.",
    "No. Por diseño, las funciones lambda están rígidamente limitadas a una ÚNICA expresión que se evalúa y retorna.",
    "Sí, pero es considerado una mala práctica según los lineamientos oficiales de estilo de código."
  ],
  1420: [
    "Sí, por supuesto. Las lambdas son objetos de primera clase. Ej: `return lambda x: x + 1`",
    "No, intentar devolver una lambda generará un TypeError inmediato.",
    "Solo si la función lambda es previamente instanciada y asignada a una variable global.",
    "No, porque las funciones lambda carecen del atributo especial __call__ necesario para el retorno."
  ]
};

day14.forEach(q => {
  if (updates[q.id]) {
    q.options = updates[q.id];
  }
});

fs.writeFileSync('src/data/python/quizzes.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Quizzes updated successfully!');
