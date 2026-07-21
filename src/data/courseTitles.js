export const pythonTitles = [
  'Introducción', 'Variables y Funciones', 'Operadores', 'Cadenas (Strings)', 
  'Listas', 'Tuplas', 'Sets', 'Diccionarios', 'Condicionales', 
  'Bucles (Loops)', 'Funciones', 'Módulos', 'List Comprehension', 
  'Funciones de Orden Superior, Closures y Decoradores', 'Tipos de Errores', 'Módulo Datetime', 
  'Manejo de Excepciones', 'Expresiones Regulares', 'Manejo de Archivos', 
  'Gestor de Paquetes (PIP)', 'Clases y Objetos', 'Web Scraping', 
  'Entornos Virtuales', 'Estadísticas', 'Pandas', 'Web con Python', 
  'Python con MongoDB', 'API', 'Creando una API', 'Conclusiones'
];

export const javascriptTitles = [
  'Introducción', 'Tipos de Datos', 'Booleanos y Operadores', 'Condicionales', 
  'Arreglos (Arrays)', 'Bucles (Loops)', 'Funciones', 'Objetos', 'Funciones de Orden Superior', 
  'Sets y Maps', 'Desestructuración y Spread', 'Expresiones Regulares', 'Objeto Console', 
  'Manejo de Errores', 'Clases', 'JSON', 'Web Storage', 'Promesas', 
  'Closures', 'Código Limpio', 'DOM', 'Manipulación del DOM', 
  'Event Listeners'
];

export const sqlTitles = [
  'Introducción a SQL', 'Filtrado de Datos', 'Ordenamiento y Limites', 'Agrupamiento (Group By)', 
  'Subconsultas Simples', 'Funciones de Agregación', 'Joins (Parte 1)', 'Joins (Parte 2)', 
  'Manejo de Nulos', 'Operadores de Conjunto', 'Consultas Correlacionadas', 'CTEs (Common Table Expr)', 
  'DDL (Definición)', 'DML (Manipulación)', 'Funciones de Ventana'
];

export function getModuleTitle(courseId, moduleId) {
  const index = parseInt(moduleId, 10) - 1;
  if (courseId === 'python') return pythonTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'javascript') return javascriptTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'sql') return sqlTitles[index] || `Módulo ${moduleId}`;
  return `Módulo ${moduleId}`;
}
