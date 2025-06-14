import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { InputText } from '../../../components/ui/input';
import { Button } from '../../../components';
import { Dropdown } from '../../../components/ui/dropdown';
import axios from 'axios';
import { useFetchData } from '../../../hooks/use-fetch-data';
import { API_URL } from '../../../config/api-config';

type SimpleFormData = {
  educationalInstitution: string;
  cod: string;
  departamento: string;
  provincia: string;
  dirección: string;
  nivel: string;
  correo: string;
};

export default function FormEducationalInstitution() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SimpleFormData>({
    mode: 'onChange',
    defaultValues: {
      departamento: '',
      provincia: '',
      nivel: '',
    },
  });

  const departamentoSeleccionado = useWatch({
    control,
    name: 'departamento',
  });

  const [provincias, setProvincias] = useState<{ id: string; nombre: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: rawDepartamentosData } = useFetchData<any[]>(`${API_URL}/education/departamentos`);

  const departamentos =
    rawDepartamentosData?.map((d) => ({
      id: d.id_departamento.toString(),
      nombre: d.nombre_departamento,
    })) ?? [];

  useEffect(() => {
    const fetchProvincias = async () => {
      if (departamentoSeleccionado) {
        try {
          const response = await axios.get(
            `${API_URL}/education/departamentos/${departamentoSeleccionado}/provincias/`
          );
          const provinciasData = response.data.map((p: any) => ({
            id: p.id_provincia.toString(),
            nombre: p.nombre_provincia,
          }));
          setProvincias(provinciasData);
        } catch (error) {
          console.error('Error al cargar provincias', error);
          setProvincias([]);
        }
      } else {
        setProvincias([]);
      }
    };

    fetchProvincias();
  }, [departamentoSeleccionado]);

  useEffect(() => {
    setValue('provincia', '');
  }, [departamentoSeleccionado, setValue]);

  const { data: rawNivelesData } = useFetchData<any[]>(`${API_URL}/education/nivel-educativo/`);

  const niveles =
    rawNivelesData?.map((n) => ({
      id: n.id_nivel_educativo.toString(),
      nombre: n.nivel_educativo,
    })) ?? [];

  const onSubmit = async (data: SimpleFormData) => {
    console.log('Formulario enviado con datos:', data);
    const payload = {
      admin_id: 1, // Ajusta según corresponda
      nombre_institucion: data.educationalInstitution,
      codigo_institucion: data.cod,
      direccion: data.dirección,
      email_institucion: data.correo,
      provincia: Number(data.provincia),
      nivel_institucion: Number(data.nivel),
    };

    setLoading(true);
    try {
      await axios.post(`${API_URL}/education/instituciones/create`, payload);
      alert('Institución registrada con éxito');
      reset();
    } catch (error: any) {
      console.error('Error al registrar la institución', error);
      alert('Error al registrar la institución: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-10/12 max-w-screen h-full mt-10">
      <div className="w-full h-6 rounded-t-2xl bg-indigo-500" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-row justify-center shadow-lg rounded-2xl p-10 mx-auto"
      >
        <div className="flex flex-row w-full max-w-11/12 mx-auto gap-32">
          <div className="flex flex-col gap-5 items-center justify-center w-full">
            <div className="w-full mb-5">
              <h1 className="text-left text-slate-800 headline-lg">
                Registro de Instituciones Educativas
              </h1>
            </div>
            <div className="flex flex-row w-full gap-20">
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
                    value: /^[a-zA-Z0-9]+$/,
                    message: 'Solo se permiten letras y números',
                  },
                  minLength: {
                    value: 2,
                    message: 'Debe tener al menos 2 caracteres',
                  },
                  maxLength: {
                    value: 8,
                    message: 'No puede tener más de 8 caracteres',
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="flex flex-row w-full gap-20">
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
                placeholder={
                  departamentoSeleccionado
                    ? 'Seleccione una provincia'
                    : 'Seleccione primero un departamento'
                }
                displayKey="nombre"
                valueKey="id"
                register={register}
                isRequired
              />
            </div>
            <div className="flex flex-row w-full gap-20">
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
            <div className="flex flex-row w-full gap-20 mb-5">
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
            <div className="flex flex-row w-full justify-between">
              <Button
                label="Cancelar"
                variantColor="variant2"
                onClick={() => reset()}
              />
              <Button
                type="submit"
                label='Registrar'
                variantColor="variant1"
                disabled={loading}
                loading={loading}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-7/12">
            <img
              src="/assets/images/educational-institution.png"
              alt="imageInstitution"
              className="w-3xl"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
