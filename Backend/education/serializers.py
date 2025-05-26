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