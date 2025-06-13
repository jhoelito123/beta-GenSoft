import { useFetchData } from '../../../hooks/use-fetch-data';
import { API_URL } from '../../../config/api-config';
import { CardShowCourse } from '../components/card-show-course';
import { useParams } from 'react-router';

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

export default function ShowCoursePage() {
  const { id } = useParams();
  const {
    data: curso,
    loading,
    error,
  } = useFetchData<Curso>(`${API_URL}/education/curso/${id}`);

  if (loading) return <p className="p-4">Cargando curso...</p>;
  if (error || !curso)
    return <p className="p-4 text-red-500">Curso no encontrado</p>;

  return (
    <div className="p-10 min-h-screen">
      <CardShowCourse
        title={curso.nombre_curso}
        university="Universidad Andina"
        language="Español"
        level={mapDificultad(curso.dificultad_curso)}
        imageUrl={curso.portada_curso}
        description={curso.descripcion_curso}
        duration={curso.duracion_curso}
        practices={2} // Puedes ajustar esto si lo tienes en la API
        quizzes={3} // Puedes ajustar esto si lo tienes en la API
        syllabus={['Sección 1', 'Sección 2', 'Sección 3']}
        tabs={{
          general: curso.descripcion_curso,
          syllabus: '',
          requirements: 'Requiere conocimientos básicos de computación',
        }}
      />
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
