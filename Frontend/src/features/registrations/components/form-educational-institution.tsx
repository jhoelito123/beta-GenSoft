import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/ui/input';
import { Button } from '../../../components';
import { Dropdown } from '../../../components/ui/dropdown';

type SimpleFormData = {
  educationalInstitution: string;
  cod: string;
  departamento: string;
  provincia: string;
  dirección: string;
  nivel: string;
  correo: string;
};

const departamentos = [
  { id: '1', nombre: 'Cochabamba' },
  { id: '2', nombre: 'La Paz' },
  { id: '3', nombre: 'Sucre' },
];

const provincias = [
  { id: '1', nombre: 'Cercado' },
  { id: '2', nombre: 'Quillacollo' },
  { id: '3', nombre: 'Tiquipaya' },
];

const niveles = [
  { id: '1', nombre: 'Secundario' },
  { id: '2', nombre: 'Universitario' },
  { id: '3', nombre: 'Primario' },
];

export default function FormEducationalInstitution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimpleFormData>({
    mode: 'onChange',
    defaultValues: {},
  });

  const onSubmit = (data: SimpleFormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col w-10/12 max-w-screen h-full mt-10">
        <div className="w-full h-6 rounded-t-2xl bg-indigo-500" />
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-row justify-center shadow-lg rounded-2xl p-20 mx-auto"
        >
            <div className='flex flex-row w-full max-w-11/12 mx-auto gap-32'>
                <div className='flex flex-col gap-5 items-center justify-center w-full'>
                    <div className="w-full mb-10">
                    <h1 className="text-left text-slate-800 headline-lg">
                        Registro de Instituciones Educativas
                    </h1>
                    </div>
                    <div className='flex flex-row w-full gap-20'>
                        <InputText
                            label="Nombre de la Institución Educativa"
                            name="educationalInstitution"
                            className="w-full"
                            register={register}
                            validationRules={{
                                required: 'El nombre de la institución es obligatorio',
                                minLength: {
                                    value: 2,
                                    message: 'Debe tener al menos 2 caracteres',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'No puede tener más de 100 caracteres',
                                },
                            }}
                            errors={errors}
                        />
                        <InputText
                            label="Código"
                            name="cod"
                            className="w-full"
                            register={register}
                            validationRules={{
                                required: 'El código es obligatorio',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Solo se permiten números',
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Debe tener al menos 4 dígitos',
                                },
                                maxLength: {
                                    value: 8,
                                    message: 'No puede tener más de 8 dígitos',
                                },
                            }}
                            errors={errors}
                        />
                    </div>
                    <div className='flex flex-row w-full gap-20'>
                        <Dropdown
                            name="departamento"
                            label="Departamento"
                            options={departamentos}
                            placeholder="Seleccione un departamento"
                            displayKey="nombre"
                            valueKey="id"
                            register={register}
                            isRequired
                        />
                        <Dropdown
                            name="provincia"
                            label="Provincia"
                            options={provincias}
                            placeholder="Seleccione una provincia"
                            displayKey="nombre"
                            valueKey="id"
                            register={register}
                            isRequired
                        />
                    </div>
                    <div className='flex flex-row w-full gap-20'>
                        <InputText
                            label="Dirección"
                            name="dirección"
                            className="w-full"
                            register={register}
                            validationRules={{
                                required: 'La dirección es obligatoria',
                                minLength: {
                                    value: 2,
                                    message: 'Debe tener al menos 2 caracteres',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'No puede tener más de 50 caracteres',
                                },
                            }}
                            errors={errors}
                        />
                    </div>
                    <div className='flex flex-row w-full gap-20'>
                        <Dropdown
                            name="nivel"
                            label="Nivel educativo"
                            options={niveles}
                            placeholder="Seleccione un nivel"
                            displayKey="nombre"
                            valueKey="id"
                            register={register}
                            isRequired
                        />
                        <InputText
                            label="Correo electrónico"
                            name="correo"
                            className="w-full"
                            register={register}
                            validationRules={{
                                required: 'El correo electrónico es obligatorio',
                                minLength: {
                                    value: 2,
                                    message: 'Debe tener al menos 2 caracteres',
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'No puede tener más de 50 caracteres',
                                },
                            }}
                            errors={errors}
                        />
                    </div>
                    <div className='flex flex-row w-full justify-between'>
                        <Button
                            label='Cancelar'
                            variantColor='variant2'
                        />
                        <Button
                            label='Registrar'
                            variantColor='variant1'
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-7/12'>
                    <img src="/assets/images/educational-institution.png" alt="imageInstitution" className="w-3xl" />
                </div>
            </div>
        </form>
    </div>
  );
}
