import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/ui/input';
import { Button } from '../../../components';

type SimpleFormData = {
  simpleInput: string;
};

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
    <div className="flex flex-col w-full h-full items-center bg-white">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-5 mt-10 w-full"
        >
            <div className='flex flex-row w-full justify-between'>
                <div className='bg-white flex flex-col items-center justify-center min-w-11/12'>
                    <h1 className="text-center text-slate-800 mb-8 md:mb-20 headline-lg">
                        Registro de Datos de Tutor
                    </h1>
                    <div className='flex flex-row w-full'>
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
                    <div className='flex flex-row w-full'>
                        <InputText
                            label="Departamento"
                            name="departamento"
                            className="w-full"
                            register={register}
                            validationRules={{
                                required: 'El departamento es obligatorio',
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
                        <InputText
                            label="Provincia"
                            name="provincia"
                            className="w-full"
                            register={register}
                            validationRules={{
                                required: 'La provincia es obligatoria',
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
                    <div className='flex flex-row w-full'>
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
                    <div className='flex flex-row w-full'>
                        <InputText
                            label="Nivel Educativo"
                            name="nivel"
                            className="w-full"
                            register={register}
                            validationRules={{
                                required: 'El nivel educativo es obligatorio',
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
                            variantColor='variant1'
                        />
                        <Button
                            label='Registrar'
                            variantColor='variant1'
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center min-w-5/12'>
                    <img src="/assets/images/educational-institution.png" alt="imageInstitution" className="w-96" />
                </div>
            </div>
        </form>
    </div>
  );
}
