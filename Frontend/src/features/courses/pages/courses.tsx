import { API_URL } from '../../../config/api-config';
import { useFetchData } from '../../../hooks/use-fetch-data';
import CardCourse from '../components/card-course';

type Curso = {
  id_curso: number;
  nombre_curso: string;
  calificacion_curso: number;
  duracion_curso: string;
  descripcion_curso: string;
  portada_curso: string;
  fecha_inicio_curso: string;
  fecha_cierre_curso: string;
  profesor_curso: number;
  modulo_curso: number;
  idioma_curso: number;
  dificultad_curso: number;
};

export default function CoursesPage() {
  const {
    data: cursos,
    loading,
    error,
  } = useFetchData<Curso[]>(`${API_URL}/education/curso/`);

  if (loading) return <p className="p-4">Cargando cursos...</p>;
  if (error) return <p className="p-4 text-red-500">Error al cargar cursos</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Cursos Disponibles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cursos?.map((curso) => (
          <CardCourse
            key={curso.id_curso}
            nivel={mapDificultad(curso.dificultad_curso)}
            imagen={curso.portada_curso}
            titulo={curso.nombre_curso}
            universidad="Universidad Andina"
            rating={curso.calificacion_curso}
            votos={0}
            cursos={1}
            practicas={2}
            quizz={3}
          />
        ))}
      </div>
    </div>
  );
}

function mapDificultad(dificultad: number): string {
  switch (dificultad) {
    case 1:
      return 'Básico';
    case 2:
      return 'Intermedio';
    case 3:
      return 'Avanzado';
    default:
      return 'Desconocido';
  }
}
