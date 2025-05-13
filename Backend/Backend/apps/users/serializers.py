from rest_framework import serializers
from .models import Admin, Docente

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
        extra_kwargs = {'password_admin': {'write_only': True}}  # No mostrar la contraseña al obtener

class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = '__all__'
        extra_kwargs = {'password_docente': {'write_only': True}}

class DocenteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = '__all__'