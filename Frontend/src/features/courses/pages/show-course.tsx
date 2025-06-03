import { CardShowCourse } from '../components/card-show-course';

const ShowCoursePage = () => {
  return (
    <div className="p-10  min-h-screen">
      <CardShowCourse
        title="Introducción a Python"
        university="Universidad Mayor de San Simón"
        language="Español"
        level="Intermedio"
        imageUrl="/img/python-course.png"
        description="Bienvenido al curso 'Introducción a Python'..."
        duration="70"
        practices={5}
        quizzes={2}
        syllabus={[
          'Variables',
          'Estructura de datos',
          'Funciones',
          'Condicionales',
        ]}
        tabs={{
          general: `Bienvenido al curso 'Introducción a Python', un espacio diseñado para que te inicies en el mundo de la programación de manera clara, práctica y accesible. Python es uno de los lenguajes de programación más populares y versátiles en la actualidad. Su sintaxis sencilla y su gran comunidad lo convierten en una excelente elección para quienes están comenzando a programar...`,
          syllabus: '',
          requirements:
            'Conocimientos básicos de computación. Acceso a una computadora e internet.',
        }}
      />
    </div>
  );
};

export default ShowCoursePage;
