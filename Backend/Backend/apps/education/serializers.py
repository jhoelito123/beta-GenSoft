from rest_framework import serializers
from .models import Departamento, Provincia

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'  # todos los atributos del modelo

class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincia
        fields = '__all__'