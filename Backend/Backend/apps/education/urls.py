from django.urls import path
from . import views

urlpatterns = [
    path('departamentos/', views.DepartamentoList.as_view(), name='departamento-list'),
    path('departamentos/<int:pk>/', views.DepartamentoDetail.as_view(), name='departamento-detail'),
    path('provincias/', views.ProvinciaList.as_view(), name='provincia-list'),
    path('provincias/<int:pk>/', views.ProvinciaDetail.as_view(), name='provincia-detail'),
    path('departamentos/<int:departamento_id>/provincias/', views.ProvinciasPorDepartamento.as_view(), name='provincias-por-departamento'),
    path('nivel-educativo/', views.NivelAcademicoList.as_view(), name='nivel-academico-list'),
]