## Proyecto-StartPy

Sistema construido en el Frontend con React+Vite (JS) y el Backend con Django (Python)

## Estructura

- /Frontend: Carpeta que contiene el frontend hecho en React+Vite
- /Backend: Carpeta que contiene el backend hecho en Django

## Pre requisitos (Backend - Django)

Antes de comenzar con el backend, asegúrate de tener instalado lo siguiente en tu sistema:

- Python 3.x
- pip: Puedes ver tu version con 'pip --version'.

## Pasos para Ejecutar el Backend (Django)

1.  **Navegar al Directorio del Backend:**
    cd Backend

2.  **Crear el Entorno Virtual:**
    python -m venv venv

3.  **Activar el Entorno Virtual:**

    # En Windows:

    venv/Scripts/activate

    # En macOS y Linux:

    source venv/bin/activate

4.  **Instalar las Dependencias:**
    Una vez activado el entorno virtual, instala las bibliotecas necesarias desde el archivo `requirements.txt`:
    pip install -r requirements.txt

5.  **Realizar las Migraciones:** (//aún no realizar migraciones)
    Aplica las migraciones de Django para crear las tablas de la base de datos:
    python manage.py migrate

6.  **Ejecutar el Servidor de Desarrollo:**
    Inicia el servidor de desarrollo de Django:
    python manage.py runserver

    Esto iniciará el servidor en la dirección `http://127.0.0.1:8000/`.

## Prerrequisitos (Frontend - React+Vite)

Antes de comenzar con el frontend, asegúrate de tener instalado lo siguiente en tu sistema:

- Node.js
- npm o yarn: Generalmente vienen con Node.js.

## Tecnologías Frontend

El proyecto utiliza las siguientes tecnologías y herramientas:

- **React + Vite**: Framework y bundler para el desarrollo frontend
- **TypeScript**: Para tipado estático y mejor desarrollo
- **Tailwind CSS**: Framework de utilidades CSS para estilos rápidos y responsivos
- **Prettier**: Formateador de código para mantener un estilo consistente
- **ESLint**: Linter para mantener la calidad del código y seguir buenas prácticas

## Configuración de Herramientas Frontend

### Prettier

Prettier se utiliza para formatear automáticamente el código. La configuración incluye:

- Uso de comillas simples
- Punto y coma al final de cada línea
- Indentación de 2 espacios

### ESLint

ESLint se configura para:

- Detectar errores y problemas potenciales
- Enforzar estilos de código consistentes
- Integrarse con Prettier para formateo

### Tailwind CSS

Tailwind CSS se utiliza para:

- Desarrollo rápido de interfaces
- Diseño responsivo
- Utilidades CSS reutilizables

## Pasos para Ejecutar el Frontend (React+Vite)

1.  **Navegar al Directorio del Frontend:**
    cd Frontend

2.  **Instalar las Dependencias:**
    npm install 

3.  **Ejecutar el Frontend:**
    npm run dev 

    Esto inicia el frontend en `http://localhost:5173/`

4.  **Formatear el Código:**
    Para formatear el código con Prettier:
    npm run format 

5.  **Verificar la Calidad del Código:**
    Para ejecutar ESLint:
    npm run lint 
