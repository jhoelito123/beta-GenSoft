from rest_framework import serializers
from .models import Departamento, Provincia, NivelEducativo, Institucion
from ..users.models import Admin

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