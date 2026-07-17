import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../src/data');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY no encontrada en el archivo .env.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const QUIZ_IMPROVER_PROMPT = `Eres un experto creador de exámenes de programación.
Tu objetivo es tomar un conjunto de quizzes en JSON y MEJORAR EXCLUSIVAMENTE los "distractores" (las opciones incorrectas) para que dejen de ser obvios o tontos.
Las respuestas incorrectas deben ser extremadamente plausibles, errores comunes de sintaxis, o confusiones lógicas típicas del lenguaje.
NO cambies el sentido conceptual de la opción correcta, aunque puedes refinar su redacción.
Mantén la llave 'correctAnswer' apuntando al índice correcto original.

FORMATO DE SALIDA:
Devuelve ÚNICA Y EXCLUSIVAMENTE un Array JSON válido.`;

const THEORY_SURGEON_PROMPT = `Eres un cirujano de contenido técnico. 
Tu tarea es leer un módulo teórico en formato Markdown y un conjunto de Quizzes (en JSON) y verificar que el Markdown contenga la información necesaria para poder responder al 100% de los quizzes.

REGLAS OBLIGATORIAS:
1. NO BORRES ni modifiques de forma destructiva el texto original.
2. Si detectas que un Quiz pregunta por una sintaxis, concepto o librería que NO se menciona en el Markdown original, INYECTA sutilmente uno o dos párrafos explicando ese concepto donde tenga más sentido (preferiblemente cerca de temas relacionados).
3. Si la teoría actual ya es suficiente para responder todos los quizzes, devuelve exactamente el mismo Markdown original sin alterar.
4. Conserva intactos todos los encabezados (##) y la estructura general.

FORMATO DE SALIDA:
Devuelve ÚNICA Y EXCLUSIVAMENTE el string completo del Markdown (ya sea igual o con las inserciones). No uses bloques de código envolventes como \`\`\`markdown.`;

function shuffleQuizOptions(quiz) {
  const options = [...quiz.options];
  const correctText = options[quiz.correctAnswer];
  
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const newCorrectAnswer = options.findIndex(opt => opt === correctText);

  return {
    ...quiz,
    options: options,
    correctAnswer: newCorrectAnswer
  };
}

async function processModule(lang, moduleId) {
  const mdPath = path.join(dataDir, lang, `module${moduleId}.md`);
  const quizPath = path.join(dataDir, lang, 'quizzes.json');

  let originalMarkdown = '';
  try {
    originalMarkdown = await fs.readFile(mdPath, 'utf8');
  } catch(e) {
    console.log(`[Saltando] No se encontró ${mdPath}.`);
    return;
  }
  
  let allQuizzes = {};
  if (fsSync.existsSync(quizPath)) {
    const rawData = await fs.readFile(quizPath, 'utf8');
    allQuizzes = JSON.parse(rawData);
  } else {
    console.log(`[Saltando] No hay quizzes.json en ${lang}`);
    return;
  }

  const originalQuizzes = allQuizzes[`module${moduleId}`];
  if (!originalQuizzes || originalQuizzes.length === 0) {
    return;
  }

  // 1. Mejorar distractores de los Quizzes (AI Pass 1)
  console.log(`🧠 (Pase 1/2) Mejorando distractores de los quizzes con Gemini...`);
  let improvedQuizzes = originalQuizzes;
  try {
    const quizResponse = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: JSON.stringify(originalQuizzes),
      config: { 
        systemInstruction: QUIZ_IMPROVER_PROMPT, 
        temperature: 0.2, 
        maxOutputTokens: 8192,
        responseMimeType: 'application/json' 
      }
    });
    
    improvedQuizzes = JSON.parse(quizResponse.text.trim());
  } catch (err) {
    console.error(`⚠️ Error al mejorar quizzes, usando los originales. Error:`, err.message);
  }

  // 2. Shuffling Quizzes (Node.js only)
  console.log(`🎲 Barajando posiciones de los quizzes mejorados...`);
  const shuffledQuizzes = improvedQuizzes.map(shuffleQuizOptions);
  allQuizzes[`module${moduleId}`] = shuffledQuizzes;
  await fs.writeFile(quizPath, JSON.stringify(allQuizzes, null, 2), 'utf8');

  // 3. Rellenado de Teoría Faltante (AI Pass 2)
  console.log(`🔍 (Pase 2/2) Inyectando puntos ciegos teóricos en el Markdown...`);
  const prompt = `TEORÍA ORIGINAL:\n\n${originalMarkdown}\n\nQUIZZES A EVALUAR:\n\n${JSON.stringify(shuffledQuizzes, null, 2)}\n\nRevisa si falta teoría e inyéctala sutilmente si es necesario.`;

  try {
    const mdResponse = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: prompt,
      config: { systemInstruction: THEORY_SURGEON_PROMPT, temperature: 0.1, maxOutputTokens: 8192 }
    });
    
    let updatedMarkdown = mdResponse.text.trim();
    if (updatedMarkdown.startsWith('```markdown')) updatedMarkdown = updatedMarkdown.replace(/^```markdown/, '').replace(/```$/, '').trim();
    else if (updatedMarkdown.startsWith('```')) updatedMarkdown = updatedMarkdown.replace(/^```/, '').replace(/```$/, '').trim();

    if (updatedMarkdown !== originalMarkdown) {
      await fs.writeFile(mdPath, updatedMarkdown, 'utf8');
      console.log(`✅ Teoría actualizada (se inyectaron datos faltantes).`);
    } else {
      console.log(`✅ Teoría intacta (ya cubría todos los temas).`);
    }

  } catch (error) {
    console.error(`❌ Error al inyectar teoría en módulo ${moduleId}:`, error.message);
  }
}

async function main() {
  const languages = ['python', 'javascript', 'react'];
  
  // Recolectar todos los módulos a procesar para calcular porcentaje
  const tasks = [];
  
  for (const lang of languages) {
    const langDir = path.join(dataDir, lang);
    if (!fsSync.existsSync(langDir)) continue;

    const files = await fs.readdir(langDir);
    const moduleFiles = files.filter(f => f.startsWith('module') && f.endsWith('.md'));
    
    moduleFiles.sort((a, b) => {
      const numA = parseInt(a.match(/module(\d+)\.md/)[1]);
      const numB = parseInt(b.match(/module(\d+)\.md/)[1]);
      return numA - numB;
    });

    for (const file of moduleFiles) {
      const moduleId = file.match(/module(\d+)\.md/)[1];
      tasks.push({ lang, moduleId });
    }
  }

  const totalTasks = tasks.length;
  let completed = 0;

  for (const task of tasks) {
    const { lang, moduleId } = task;
    completed++;
    const percentage = Math.round((completed / totalTasks) * 100);
    console.log(`\n=================================================`);
    console.log(`🚀 PROGRESO GLOBAL: ${percentage}% (${completed}/${totalTasks})`);
    console.log(`=================================================`);
    console.log(`--- Procesando ${lang} / Módulo ${moduleId} ---`);

    if (lang === 'python' && (moduleId === '14' || moduleId === '15')) {
      console.log(`⏩ Saltando inyección de teoría en Markdown (módulo ya estructurado).`);
      
      const quizPath = path.join(dataDir, lang, 'quizzes.json');
      if (fsSync.existsSync(quizPath)) {
        const rawData = await fs.readFile(quizPath, 'utf8');
        const allQuizzes = JSON.parse(rawData);
        const originalQuizzes = allQuizzes[`module${moduleId}`];
        
        if (originalQuizzes) {
          console.log(`🧠 (Pase 1/1) Mejorando distractores de los quizzes con Gemini...`);
          let improvedQuizzes = originalQuizzes;
          try {
            const quizResponse = await ai.models.generateContent({
              model: 'gemini-3.1-pro-preview',
              contents: JSON.stringify(originalQuizzes),
              config: { 
                systemInstruction: QUIZ_IMPROVER_PROMPT, 
                temperature: 0.2, 
                maxOutputTokens: 8192,
                responseMimeType: 'application/json'
              }
            });
            improvedQuizzes = JSON.parse(quizResponse.text.trim());
          } catch (err) {
            console.error(`⚠️ Error al mejorar quizzes:`, err.message);
          }

          console.log(`🎲 Barajando posiciones de los quizzes...`);
          allQuizzes[`module${moduleId}`] = improvedQuizzes.map(shuffleQuizOptions);
          await fs.writeFile(quizPath, JSON.stringify(allQuizzes, null, 2), 'utf8');
          console.log(`✅ Quizzes actualizados.`);
        }
      }
      continue;
    }

    await processModule(lang, moduleId);
    
    // Delay to avoid hitting API rate limits
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\n🎉 ¡Proceso finalizado con éxito para todos los lenguajes!");
}

main();
