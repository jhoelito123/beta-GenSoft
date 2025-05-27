import { useForm, useWatch } from 'react-hook-form';
import { InputText } from '../../../components/ui/input';
import { Button } from '../../../components';
import { Dropdown } from '../../../components/ui/dropdown';
import { TextArea } from '../../../components/ui/textarea';
import { UploadCover } from '../../../components/ui/upload-cover';
import { useEffect } from 'react';
export default function FormCourse() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });
  const levels = [
    { id: 1, nombre: 'Básico' },
    { id: 2, nombre: 'Intermedio' },
    { id: 3, nombre: 'Avanzado' },
  ];

  const languages = [
    { id: 1, nombre: 'Español' },
    { id: 2, nombre: 'Ingles' },
    { id: 3, nombre: 'Quechua' },
    { id: 4, nombre: 'Aymara' },
  ];
  const statusc = [
    { id: 1, nombre: 'Abierto' },
    { id: 2, nombre: 'Cerrado' },
  ];

  const dateIni = useWatch({ control, name: 'course.dateini' });
  const dateEnd = useWatch({ control, name: 'course.dateend' });

  useEffect(() => {
    if (dateEnd) {
      trigger('course.dateend');
    }
  }, [dateIni]);

  const onSubmit = (data: any) => {
    console.log(data);
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
                <Dropdown
                  name="course.level"
                  label="Nivel"
                  options={levels}
                  displayKey="nombre"
                  valueKey="id"
                  placeholder="Selecciona un nivel"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 mb-6">
                <Dropdown
                  name="course.language"
                  label="Idioma"
                  options={languages}
                  displayKey="nombre"
                  valueKey="id"
                  placeholder="Selecciona un idioma"
                  register={register}
                />
                <Dropdown
                  name="course.status"
                  label="Estado"
                  options={statusc}
                  displayKey="nombre"
                  valueKey="id"
                  placeholder="Selecciona un estado"
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
                      today.setHours(0, 0, 0, 0); // Ignorar la hora
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
                      if (!dateIni) return true; // aún no hay fecha de inicio
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
              disabled={!isValid || Object.keys(errors).length > 0}
              variantColor={
                !isValid || Object.keys(errors).length > 0
                  ? 'variantDesactivate'
                  : 'variant1'
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
