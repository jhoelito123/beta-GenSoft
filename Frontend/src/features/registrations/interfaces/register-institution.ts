export type Departamento = {
  id_departamento: number;
  nombre_departamento: string;
};

export type Provincia = {
  id_provincia: number;
  nombre_provincia: string;
  id_departamento: number;
};