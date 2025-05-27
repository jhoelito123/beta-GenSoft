import IconCode from '../icons/code';
import IconFileText from '../icons/file-text';
import IconQuizz from '../icons/quizz';
import { StarRating } from './star-rating';

type CardCourseProps = {
  nivel: string;
  imagen: string;
  titulo: string;
  universidad: string;
  rating: number;
  votos: number;
  cursos: number;
  practicas: number;
  quizz: number;
};

export default function CardCourse({
  nivel,
  imagen,
  titulo,
  universidad,
  rating,
  votos,
  cursos,
  practicas,
  quizz,
}: CardCourseProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-[360px] h-80">
      <div className="relative">
        <img src={imagen} alt={titulo} className="h-40 w-full object-cover" />
        <span className="absolute top-2 right-2 bg-emerald-500 text-white subtitle-sm px-4 py-1 rounded-lg">
          {nivel}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="subtitle-lg text-slate-900">{titulo}</h3>
        <p className="text-sm text-blue-500 font-medium">{universidad}</p>
        <div className="flex items-center space-x-1">
          <StarRating rating={4} />

          <span className="subtitle-md text-slate-900 ml-1">
            {rating.toFixed(1)}
          </span>
          <span className="body-sm text-slate-800">({votos})</span>
        </div>
        <div className="flex justify-between text-sm text-emerald-500 mt-2">
          <div className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer">
            <IconFileText />
            <span>{cursos} cursos</span>
          </div>
          <div className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer">
            <IconCode />
            <span>{practicas} prácticas</span>
          </div>
          <div className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer">
            <IconQuizz />
            <span>{quizz} quizzez</span>
          </div>
        </div>
      </div>
    </div>
  );
}
