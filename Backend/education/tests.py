from django.test import TransactionTestCase, TestCase
from django.urls import reverse
from django.db import IntegrityError
from education.models import Departamento, Provincia, NivelEducativo, Modulo, Idioma, DificultadCurso, TipoRecurso, Institucion
class DepartamentoTests(TransactionTestCase):
    reset_sequences = True 

    def test_detalle_departamento(self):
        # Crear un Departamento sin especificar el ID, ya que es AutoField
        # Con reset_sequences=True, la secuencia de IDs de Departamento se reinicia
        # antes de este test, evitando el conflicto con IDs de data migrations.
        depto = Departamento.objects.create(nombre_departamento="Santa Cruz Test", nombre_corto="SC_T")
        
        # NADA QUE FUNCIONA, las migraciones joden el id otro revise xd
        
        response = self.client.get(reverse('departamento-detail', args=[depto.id_departamento]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['nombre_departamento'], "Santa Cruz Test")
        self.assertEqual(depto.nombre_departamento, "Santa Cruz Test") 

    def test_lista_departamentos(self):
        depto1 = Departamento.objects.create(nombre_departamento="La Paz Test", nombre_corto="LP_T")
        depto2 = Departamento.objects.create(nombre_departamento="Cochabamba Test", nombre_corto="CBBA_T")
        
        response = self.client.get(reverse('departamento-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_provincias_por_departamento(self):
        depto = Departamento.objects.create(nombre_departamento="Oruro Test", nombre_corto="OR_T")
        Provincia.objects.create(nombre_provincia="Cercado Test", departamento=depto)
        Provincia.objects.create(nombre_provincia="Sajama Test", departamento=depto)
        
        response = self.client.get(reverse('provincias-por-departamento', args=[depto.id_departamento]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

# - - - - -  - - - MODELS TESTS - - - - - - - -  - -- 

# Necesitamos importar los modelos de users para crear dependencias
from users.models import Usuario, Admin, Docente

class EducationModelsTest(TestCase):
    def setUp(self):
        # 1. Crear un Usuario base (necesario para Admin y Docente)
        self.user = Usuario.objects.create(
            username_user='testuser_edu',
            password_user='pass123',
            email_user='test_edu@example.com',
            is_active=True
        )
        self.user2 = Usuario.objects.create(
            username_user='anotheruser_edu',
            password_user='anotherpass123',
            email_user='another_edu@example.com',
            is_active=True
        )

        # 2. Crear un Admin
        self.admin = Admin.objects.create(user_id=self.user)

        # 3. Crear un Docente
        self.docente = Docente.objects.create(
            user_id=self.user2,
            nombre_docente='Profesor',
            apellidos_docente='Javier',
            ci_docente='11223344',
            telefono_docente=987654321
        )

        # 4. Crear instancias de modelos base para FKs
        self.departamento = Departamento.objects.create(nombre_departamento="La Paz", nombre_corto="LP")
        self.provincia = Provincia.objects.create(nombre_provincia="Cercado", departamento=self.departamento)
        self.nivel_educativo = NivelEducativo.objects.create(nivel_educativo="Superior")
        self.modulo = Modulo.objects.create(nombre_modulo="Matemáticas")
        self.idioma = Idioma.objects.create(idioma="Español")
        self.dificultad = DificultadCurso.objects.create(dificultad_curso="Intermedio")
        self.tipo_recurso = TipoRecurso.objects.create(tipo_recurso="Video")



### Tests para Modelos Simples
class DepartamentoModelTest(EducationModelsTest):
    def test_create_departamento_successfully(self):
        departamento = Departamento.objects.create(nombre_departamento="Cocha_Test", nombre_corto="CBAT")
        self.assertIsNotNone(departamento.id_departamento)
        self.assertEqual(departamento.nombre_departamento, "Cocha_Test")
        self.assertEqual(departamento.nombre_corto, "CBAT")
        self.assertEqual(str(departamento), "Cocha_Test")

class ProvinciaModelTest(EducationModelsTest):
    def test_create_provincia_successfully(self):
        provincia = Provincia.objects.create(nombre_provincia="Quillacollo", departamento=self.departamento)
        self.assertIsNotNone(provincia.id_provincia)
        self.assertEqual(provincia.nombre_provincia, "Quillacollo")
        self.assertEqual(provincia.departamento, self.departamento)
        self.assertEqual(str(provincia), "Quillacollo")

class NivelEducativoModelTest(EducationModelsTest):
    def test_create_nivel_educativo_successfully(self):
        nivel = NivelEducativo.objects.create(nivel_educativo="Primario")
        self.assertIsNotNone(nivel.id_nivel_educativo)
        self.assertEqual(nivel.nivel_educativo, "Primario")
        self.assertEqual(str(nivel), "Primario")

class ModuloModelTest(EducationModelsTest):
    def test_create_modulo_successfully(self):
        modulo = Modulo.objects.create(nombre_modulo="Programación")
        self.assertIsNotNone(modulo.id_modulo)
        self.assertEqual(modulo.nombre_modulo, "Programación")
        self.assertEqual(str(modulo), "Programación")

class IdiomaModelTest(EducationModelsTest):
    def test_create_idioma_successfully(self):
        idioma = Idioma.objects.create(idioma="Inglés")
        self.assertIsNotNone(idioma.id_idioma)
        self.assertEqual(idioma.idioma, "Inglés")
        self.assertEqual(str(idioma), "Inglés")

class DificultadCursoModelTest(EducationModelsTest):
    def test_create_dificultad_successfully(self):
        dificultad = DificultadCurso.objects.create(dificultad_curso="Avanzado")
        self.assertIsNotNone(dificultad.id_dificultad)
        self.assertEqual(dificultad.dificultad_curso, "Avanzado")
        self.assertEqual(str(dificultad), "Avanzado")

class TipoRecursoModelTest(EducationModelsTest):
    def test_create_tipo_recurso_successfully(self):
        tipo = TipoRecurso.objects.create(tipo_recurso="PeDF")
        self.assertIsNotNone(tipo.id_tipo_recurso)
        self.assertEqual(tipo.tipo_recurso, "PeDF")
        self.assertEqual(str(tipo), "PeDF")
class InstitucionModelTest(EducationModelsTest):
    def test_create_institucion_successfully(self):
        institucion = Institucion.objects.create(
            admin_id=self.admin,
            nombre_institucion="Universidad Ejemplo",
            codigo_institucion="UE-001",
            direccion="Calle Falsa 123",
            email_institucion="info@uejemplo.com",
            provincia=self.provincia,
            nivel_institucion=self.nivel_educativo
        )
        self.assertIsNotNone(institucion.id_institucion)
        self.assertEqual(institucion.nombre_institucion, "Universidad Ejemplo")
        self.assertEqual(institucion.codigo_institucion, "UE-001")
        self.assertEqual(institucion.admin_id, self.admin)
        self.assertEqual(str(institucion), "Universidad Ejemplo")

    def test_create_institucion_with_duplicate_codigo(self):
        Institucion.objects.create(
            admin_id=self.admin,
            nombre_institucion="Colegio Duplicado",
            codigo_institucion="CD-001",
            direccion="Av. Siempre Viva 456",
            email_institucion="colegio@duplicado.com",
            provincia=self.provincia,
            nivel_institucion=self.nivel_educativo
        )

        with self.assertRaises(IntegrityError):
            Institucion.objects.create(
                admin_id=self.admin,
                nombre_institucion="Colegio Duplicado 2",
                codigo_institucion="CD-001", # dato duplicado
                direccion="Otra direccion",
                email_institucion="colegio2@duplicado.com",
                provincia=self.provincia,
                nivel_institucion=self.nivel_educativo
            )
        self.assertEqual(Institucion.objects.count(), 1)