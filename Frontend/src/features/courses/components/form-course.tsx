import { useForm, useWatch } from 'react-hook-form';
import { InputText } from '../../../components/ui/input';
import { Button } from '../../../components';
import { Dropdown } from '../../../components/ui/dropdown';
import { TextArea } from '../../../components/ui/textarea';
import { UploadCover } from '../../../components/ui/upload-cover';
import { useEffect, useState } from 'react';
import { useFetchData } from '../../../hooks/use-fetch-data';
import { API_URL } from '../../../config/api-config';
import { useNavigate } from 'react-router';
import axios from 'axios';
interface FormData {
  module: string;
  level: string;
  language: string;
}

export default function FormCourse() {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      module: '',
      level: '',
      language: '',
    },
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: modules } = useFetchData<
    { id_modulo: number; nombre_modulo: string }[]
  >(`${API_URL}/education/modulos`);

  const { data: levels } = useFetchData<
    { id_dificultad: number; dificultad_curso: string }[]
  >(`${API_URL}/education/dificultad`);

  const { data: languages } = useFetchData<
    { id_idioma: number; idioma: string }[]
  >(`${API_URL}/education/idiomas`);

  const dateIni = useWatch({ control, name: 'course.dateini' });
  const dateEnd = useWatch({ control, name: 'course.dateend' });

  useEffect(() => {
    if (dateEnd) {
      trigger('course.dateend');
    }
  }, [dateIni]);

  const onSubmit = async (data: any) => {
    const payload = {
      nombre_curso: data.course?.name || '',
      profesor_curso: 1,
      descripcion_curso: data.course?.desc || '',
      portada_curso: data.image || '',
      fecha_inicio_curso: data.course?.dateini || '',
      fecha_cierre_curso: data.course?.dateend || '',
      modulo_curso: parseInt(data.module),
      idioma_curso: parseInt(data.language),
      dificultad_curso: parseInt(data.level),
    };
    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/education/curso/create`, payload);
      alert('Curso creado exitosamente');
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar :', error);
      alert('Error al registrar el curso');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-10/12 max-w-screen h-full mt-10">
      <div className="w-full h-6 rounded-t-2xl bg-indigo-500">
        <form
          className="mx-5 mt-10 mb-32 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-slate-900 headline-lg sm:text-xl md:text-2xl font-semibold mb-6">
            Registro de Curso
          </h1>
          <div className="flex space-x-9">
            <div className="w-9/12">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 mb-6">
                <Dropdown
                  name="module"
                  label="Módulo"
                  options={
                    modules?.map((item) => ({
                      id: item.id_modulo,
                      nombre: item.nombre_modulo,
                    })) || []
                  }
                  displayKey="nombre"
                  valueKey="id"
                  placeholder="Selecciona un módulo"
                  register={register}
                />
                <InputText
                  label="Nombre del curso"
                  name="course.name"
                  className="w-full"
                  register={register}
                  validationRules={{
                    required: 'El nombre del curso es obligatorio',
                    pattern: {
                      value:
                        /^[A-Za-zÑñÁÉÍÓÚáéíóú0-9]+(?: [A-Za-zÑñÁÉÍÓÚáéíóú0-9]+)*$/,
                      message:
                        'Solo se permiten letras, números y un espacio entre palabras',
                    },
                  }}
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 mb-6">
                <Dropdown
                  name="level"
                  label="Nivel"
                  options={
                    levels?.map((item) => ({
                      id: item.id_dificultad,
                      nombre: item.dificultad_curso,
                    })) || []
                  }
                  displayKey="nombre"
                  valueKey="id"
                  placeholder="Selecciona un nivel"
                  register={register}
                />
                <Dropdown
                  name="language"
                  label="Idioma"
                  options={
                    languages?.map((item) => ({
                      id: item.id_idioma,
                      nombre: item.idioma,
                    })) || []
                  }
                  displayKey="nombre"
                  valueKey="id"
                  placeholder="Selecciona un idioma"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 mb-6">
                <InputText
                  label="Fecha de inicio"
                  name="course.dateini"
                  type="date"
                  className="w-full"
                  register={register}
                  validationRules={{
                    required: 'La fecha de inicio es obligatoria',
                    validate: (value: string) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return (
                        selectedDate > today ||
                        'La fecha de inicio debe ser mayor a hoy'
                      );
                    },
                  }}
                  errors={errors}
                />
                <InputText
                  label="Fecha de cierre"
                  name="course.dateend"
                  type="date"
                  className="w-full"
                  register={register}
                  validationRules={{
                    required: 'La fecha de cierre es obligatoria',
                    validate: (value: string) => {
                      if (!dateIni) return true;
                      const end = new Date(value);
                      const start = new Date(dateIni);
                      return (
                        end > start ||
                        'La fecha de cierre debe ser mayor a la fecha de inicio'
                      );
                    },
                  }}
                  errors={errors}
                />
              </div>

              <TextArea
                label="Descripción"
                name="course.desc"
                className="w-full"
                register={register}
                validationRules={{
                  required: 'La descripción del curso es obligatoria',
                  minLength: {
                    value: 20,
                    message: 'La descripción debe tener al menos 20 caracteres',
                  },
                  maxLength: {
                    value: 500,
                    message:
                      'La descripción no puede exceder los 500 caracteres',
                  },
                  validate: (value) =>
                    value.trim().length > 0 ||
                    'La descripción no puede estar vacía',
                }}
                errors={errors}
              />
            </div>
            <UploadCover name="image" register={register} />
          </div>

          <div className="flex flex-col-reverse md:flex-row md:justify-between md:space-x-5">
            <Button
              label="Cancelar"
              variantColor="variant2"
              className="mt-5 md:mt-0"
            />
            <Button
              type="submit"
              label="Registrar"
              disabled={!isValid || isSubmitting}
              variantColor={
                !isValid || isSubmitting ? 'variantDesactivate' : 'variant1'
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
