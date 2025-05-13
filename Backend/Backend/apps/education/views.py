from django.shortcuts import render
from rest_framework import generics
from .models import Departamento, Provincia
from .serializers import DepartamentoSerializer, ProvinciaSerializer

class DepartamentoList(generics.ListAPIView):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer

class DepartamentoDetail(generics.RetrieveAPIView):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer

class ProvinciaList(generics.ListAPIView):
    queryset = Provincia.objects.all()
    serializer_class = ProvinciaSerializer

class ProvinciaDetail(generics.RetrieveAPIView):
    queryset = Provincia.objects.all()
    serializer_class = ProvinciaSerializer

class ProvinciasPorDepartamento(generics.ListAPIView):
    serializer_class = ProvinciaSerializer

    def get_queryset(self):
        departamento_id = self.kwargs['departamento_id']
        return Provincia.objects.filter(departamento_id=departamento_id)