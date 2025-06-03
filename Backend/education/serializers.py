from rest_framework import serializers
from .models import Departamento, Provincia, NivelEducativo, Institucion, Modulo, Idioma, DificultadCurso, Curso

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'  # todos los atributos del modelo

class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincia
        fields = '__all__'
    
class NivelEducativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelEducativo
        fields = '__all__'


class InstitucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institucion
        fields = [
            'id_institucion',
            'admin_id', # DRF manejará la búsqueda del Admin por este ID
            'nombre_institucion',
            'codigo_institucion',
            'direccion',
            'email_institucion',
            'provincia',
            'nivel_institucion',
        ]
        read_only_fields = ['id_institucion']

class ModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modulo
        fields = '__all__'

class IdiomaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idioma
        fields = '__all__'
    
class DificultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = DificultadCurso
        fields = '__all__'

class CursoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = [
            'id_curso',
            'nombre_curso',
            'profesor_curso', # Docente por este ID
            'duracion_curso',
            'descripcion_curso',
            'portada_curso',
            'fecha_inicio_curso',
            'fecha_cierre_curso',
            'calificacion_curso',
            'duracion_curso',
            'modulo_curso',
            'idioma_curso',
            'dificultad_curso'
        ]
        read_only_fields = ['id_curso', 'calificacion_curso', 'duracion_curso']

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
    
class CodeExecutionInputSerializer(serializers.Serializer):
    code = serializers.CharField(
        style={'base_template': 'textarea.html'},
        help_text="El código Python a ejecutar."
    )
    language = serializers.CharField(
        max_length=50,
        help_text="El lenguaje de programación es python."
    )

# Serializer para la salida de datos del ejecutor de código
class CodeExecutionOutputSerializer(serializers.Serializer):
    output = serializers.CharField(
        help_text="La salida estándar (stdout) y/o errores (stderr) de la ejecución del código."
    )
    status = serializers.CharField(
        max_length=20,
        help_text="El estado de la ejecución (e.g., 'success', 'error', 'timeout')."
    )
    error_message = serializers.CharField(
        required=False,
        allow_null=True,
        help_text="Mensaje de error detallado si la ejecución falló."
    )
    error_type = serializers.CharField(
        required=False,
        allow_null=True,
        max_length=50,
        help_text="Tipo de error (e.g., 'SyntaxError', 'TimeoutError')."
    )