## Proyecto-StartPy

Sistema construido en el Frontend con React+Vite (JS) y el Backend con Django (Python)

## Estructura
- /Frontend: Carpeta que contiene el frontend hecho en React+Vite
- /Backend: Carpeta que contiene el backend hecho en Django

## Prerrequisitos (Backend - Django)
Antes de comenzar con el backend, asegúrate de tener instalado lo siguiente en tu sistema:

- Python 3.x
- pip: Puedes ver tu version con 'pip --version'.
- virtualenv: Puedes instalarlo con 'pip install virtualenv' si no lo tienes.

## Pasos para Ejecutar el Backend (Django)

1.  **Navegar al Directorio del Backend:**
    cd Backend

2.  **Crear el Entorno Virtual:**
    virtualenv venv

3.  **Activar el Entorno Virtual:**
    # En Windows:
    venv/Scripts/activate
    # En macOS y Linux:
    source venv/bin/activate

4.  **Instalar las Dependencias:**
    Una vez activado el entorno virtual, instala las bibliotecas necesarias desde el archivo `requirements.txt`:
        pip install -r requirements.txt

5.  **Realizar las Migraciones:**
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

## Pasos para Ejecutar el Frontend (React+Vite)

1.  **Navegar al Directorio del Frontend:**
    cd Frontend

2.  **Instalar las Dependencias:**
    npm install  // o yarn install

3.  **Ejecutar el Frontend:**
    npm run dev  // o yarn dev

    Esto inicia el frontend en `http://localhost:5173/`
