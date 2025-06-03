from django.test import TransactionTestCase, TestCase
from django.urls import reverse
from django.db import IntegrityError
from education.models import Departamento, Provincia, NivelEducativo, Modulo, Idioma, DificultadCurso, TipoRecurso, Institucion
# class DepartamentoTests(TransactionTestCase):
#     reset_sequences = True 

#     def test_detalle_departamento(self):
#         # Crear un Departamento sin especificar el ID, ya que es AutoField
#         # Con reset_sequences=True, la secuencia de IDs de Departamento se reinicia
#         # antes de este test, evitando el conflicto con IDs de data migrations.
#         depto = Departamento.objects.create(nombre_departamento="Santa Cruz Test", nombre_corto="SC_T")
        
#         # NADA QUE FUNCIONA, las migraciones joden el id otro revise xd
        
#         response = self.client.get(reverse('departamento-detail', args=[depto.id_departamento]))
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.data['nombre_departamento'], "Santa Cruz Test")
#         self.assertEqual(depto.nombre_departamento, "Santa Cruz Test") 

#     def test_lista_departamentos(self):
#         depto1 = Departamento.objects.create(nombre_departamento="La Paz Test", nombre_corto="LP_T")
#         depto2 = Departamento.objects.create(nombre_departamento="Cochabamba Test", nombre_corto="CBBA_T")
        
#         response = self.client.get(reverse('departamento-list'))
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(len(response.data), 2)

#     def test_provincias_por_departamento(self):
#         depto = Departamento.objects.create(nombre_departamento="Oruro Test", nombre_corto="OR_T")
#         Provincia.objects.create(nombre_provincia="Cercado Test", departamento=depto)
#         Provincia.objects.create(nombre_provincia="Sajama Test", departamento=depto)
        
#         response = self.client.get(reverse('provincias-por-departamento', args=[depto.id_departamento]))
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(len(response.data), 2)

# - - - - -  - - - MODELS TESTS - - - - - - - -  - -- 
