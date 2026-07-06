import CourseCard from '../components/CourseCard';
import { Terminal, Code2, Database } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Aprende a <span className="text-primary">razonar</span> sobre el código.
        </h1>
        <p className="text-xl text-text-muted">
          No solo escribas código. Aprende a leerlo, entender el "por qué" de cada decisión y domina la lógica detrás de la Inteligencia Artificial.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard 
          title="Python" 
          badge="30 Días"
          description="Aprende los fundamentos de Python, estructuras de datos y lógica de programación desde cero." 
          icon={Terminal} 
          to="/python" 
          progress={0}
        />
        <CourseCard 
          title="JavaScript"
          badge="23 Días" 
          description="Domina el lenguaje de la web, asincronía y el ecosistema de JS." 
          icon={Code2} 
          to="/javascript"
          progress={0}
        />
        <CourseCard 
          title="SQL" 
          badge="15 Días"
          description="Bases de datos relacionales, consultas complejas y modelado de datos." 
          icon={Database} 
          to="/sql"
          progress={0}
        />
      </section>
    </div>
  );
}
