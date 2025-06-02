from django.test import TestCase
from django.urls import reverse
from .models import Departamento, Provincia

class DepartamentoTests(TestCase):
    def test_detalle_departamento(self):
        depto = Departamento.objects.create(nombre_departamento="Santa Cruz", nombre_corto="SC")
        response = self.client.get(reverse('departamento-detail', args=[depto.id_departamento]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['nombre_departamento'], "Santa Cruz")

    def test_lista_departamentos(self):
        Departamento.objects.create(nombre_departamento="La Paz", nombre_corto="LP")
        Departamento.objects.create(nombre_departamento="Cochabamba", nombre_corto="CBBA")
        response = self.client.get(reverse('departamento-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_provincias_por_departamento(self):
        depto = Departamento.objects.create(nombre_departamento="Oruro", nombre_corto="OR")
        Provincia.objects.create(nombre_provincia="Cercado", departamento=depto)
        Provincia.objects.create(nombre_provincia="Sajama", departamento=depto)
        response = self.client.get(reverse('provincias-por-departamento', args=[depto.id_departamento]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
