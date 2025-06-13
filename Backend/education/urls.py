from django.urls import path
from . import views

urlpatterns = [
    path('departamentos/', views.DepartamentoList.as_view(), name='departamento-list'),
    path('departamentos/<int:pk>/', views.DepartamentoDetail.as_view(), name='departamento-detail'),
    path('provincias/', views.ProvinciaList.as_view(), name='provincia-list'),
    path('provincias/<int:pk>/', views.ProvinciaDetail.as_view(), name='provincia-detail'),
    path('departamentos/<int:departamento_id>/provincias/', views.ProvinciasPorDepartamento.as_view(), name='provincias-por-departamento'),
    path('nivel-educativo/', views.NivelAcademicoList.as_view(), name='nivel-academico-list'),
    path('instituciones/', views.InstitucionCreateView.as_view(), name='institucion-list-create'),
    path('modulos/', views.ModuloDetail.as_view(), name='modulos-list'),
    path('idiomas/', views.IdiomaDetail.as_view(), name="languages-list"),
    path('dificultad/', views.DificultadDetail.as_view(), name='dificults-list'),
    path('curso/', views.CursoDetail.as_view(), name='courses-list'),
    path('curso/create/', views.CursoCreateView.as_view(), name='course-create'),
    path('execute-code/', views.CodeExecutorAPIView.as_view(), name='execute-code'),
    path('instituciones/<int:institucion_id>/cursos/', views.CursosPorInstitucionView.as_view(), name='cursos-por-institucion'),0

]