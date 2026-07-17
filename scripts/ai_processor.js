import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../src/data');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY no encontrada en el archivo .env o variables de entorno.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT = `
Eres un educador técnico experto de élite. Tu objetivo es reescribir módulos educativos (teoría en Markdown) y sus evaluaciones (Quizzes en JSON) siguiendo REGLAS ESTRICTAS de calidad.
Recibirás la teoría actual y los quizzes actuales de un módulo específico.

REGLAS OBLIGATORIAS:
1. **Respetar temario:** No elimines ningún concepto que ya esté presente.
2. **Estructura Slide (Diapositivas):** Cada slide se separa exactamente por \`---\`. Nunca dejes un slide que contenga SOLO un ejemplo aislado. Un slide siempre debe contener el concepto teórico + su respectivo ejemplo. Puedes agregar o quitar slides según convenga.
3. **Agrupación lógica:** Agrupa conceptos fuertemente relacionados en el mismo slide o de manera contigua (ej. agrupar map, filter, reduce).
4. **Analogías mundanas:** Usa ejemplos de la vida real (ej. un restaurante, una biblioteca, un estacionamiento) para explicar conceptos abstractos. Sé consistente con el hilo conductor dentro del módulo.
5. **Profundidad:** Expande las explicaciones vagas. El alumno NUNCA debería tener que buscar en Google para entender algo básico que se mencionó por encima.
6. **Cobertura Total:** La teoría resultante DEBE contener toda la información técnica necesaria para responder exitosamente el 100% de las preguntas del quiz. Si una pregunta del quiz trata un tema que no estaba en la teoría, ¡agrégalo a la teoría!
7. **Quizzes Balanceados (CRÍTICO):** Las opciones incorrectas (distractores) DEBEN tener una longitud de texto similar a la respuesta correcta y estar redactadas con lenguaje técnico verosímil. No hagas que la correcta sea un párrafo obvio y las falsas frases cortas. Que todas requieran razonamiento real.

FORMATO DE SALIDA:
Debes responder ÚNICA Y EXCLUSIVAMENTE con un objeto JSON válido (sin formato markdown de bloques de código \`\`\`json) que coincida con esta estructura:
{
  "updatedMarkdown": "String completo del Markdown reescrito, usando --- para separar slides.",
  "updatedQuizzes": [
    {
      "id": 123,
      "question": "Pregunta...",
      "options": ["Distractor largo y técnico", "Respuesta correcta larga y técnica", "Distractor largo y técnico", "Distractor largo y técnico"],
      "correctAnswer": 1,
      "justification": "Por qué es correcto..."
    }
  ]
}
`;

async function processModule(lang, moduleId) {
  console.log(`\n======================================`);
  console.log(`Procesando ${lang} - Módulo ${moduleId}...`);
  
  const langDir = path.join(dataDir, lang);
  const mdPath = path.join(langDir, `module${moduleId}.md`);
  const quizPath = path.join(langDir, 'quizzes.json');

  let markdownContent = '';
  try {
    markdownContent = await fs.readFile(mdPath, 'utf8');
  } catch (e) {
    console.log(`No se encontró ${mdPath}. Saltando.`);
    return;
  }

  let allQuizzes = {};
  let moduleQuizzes = [];
  try {
    const quizData = await fs.readFile(quizPath, 'utf8');
    allQuizzes = JSON.parse(quizData);
    moduleQuizzes = allQuizzes[`module${moduleId}`] || [];
  } catch (e) {
    console.log(`Error leyendo quizzes.json de ${lang}.`);
  }

  const prompt = `
=== TEORÍA ACTUAL ===
${markdownContent}

=== QUIZZES ACTUALES ===
${JSON.stringify(moduleQuizzes, null, 2)}
  `;

  console.log(`Enviando a Gemini 3.1 Pro...`);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });

    const resultText = response.text;
    const resultJson = JSON.parse(resultText);

    // Guardar Markdown
    await fs.writeFile(mdPath, resultJson.updatedMarkdown, 'utf8');
    console.log(`✅ Markdown actualizado guardado.`);

    // Guardar Quizzes
    if (resultJson.updatedQuizzes && Array.isArray(resultJson.updatedQuizzes)) {
      allQuizzes[`module${moduleId}`] = resultJson.updatedQuizzes;
      await fs.writeFile(quizPath, JSON.stringify(allQuizzes, null, 2), 'utf8');
      console.log(`✅ Quizzes actualizados guardados.`);
    }

  } catch (error) {
    console.error(`❌ Error procesando el módulo ${moduleId} de ${lang}:`, error.message);
  }
}

async function main() {
  const targetLang = process.argv[2];
  const targetModule = process.argv[3];

  if (!targetLang) {
    console.log("Uso: node scripts/ai_processor.js <lenguaje> [id_modulo]");
    console.log("Ejemplo: node scripts/ai_processor.js python 15");
    console.log("Si omites el módulo, se intentarán procesar TODOS los módulos del lenguaje (puede tomar tiempo y consumir muchos tokens).");
    process.exit(1);
  }

  if (targetModule) {
    await processModule(targetLang, targetModule);
  } else {
    // Buscar todos los modulos
    const langDir = path.join(dataDir, targetLang);
    const files = await fs.readdir(langDir);
    const moduleFiles = files.filter(f => f.startsWith('module') && f.endsWith('.md'));
    
    // Sort numerically
    moduleFiles.sort((a, b) => {
      const numA = parseInt(a.match(/module(\d+)\.md/)[1]);
      const numB = parseInt(b.match(/module(\d+)\.md/)[1]);
      return numA - numB;
    });

    for (const file of moduleFiles) {
      const moduleId = file.match(/module(\d+)\.md/)[1];
      await processModule(targetLang, moduleId);
      // Pequeña pausa para no saturar la API
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log("\nProceso finalizado.");
}

main();
