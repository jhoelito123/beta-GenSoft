from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Admin, Docente
from .serializers import AdminSerializer, DocenteSerializer, DocenteDetailSerializer

class AdminCreateView(generics.CreateAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [AllowAny]

class DocenteCreateView(generics.CreateAPIView):
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer
    permission_classes = [AllowAny]  # Crear sin auth

class DocenteDetailView(generics.RetrieveAPIView):
    queryset = Docente.objects.all()
    serializer_class = DocenteDetailSerializer
    lookup_field = 'id_docente'
