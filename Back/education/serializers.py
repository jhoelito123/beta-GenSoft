from rest_framework import serializers
from .models import Departamento, Provincia, NivelEducativo, Institucion, Modulo, Idioma, DificultadCurso

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