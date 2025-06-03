from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from datetime import timedelta
from django.utils import timezone

from models import Usuario, Admin, Estudiante, Docente

class UsuarioModelTest(TestCase):

    def setUp(self):
        self.user_data = {
            'username_user': 'testuser',
            'password_user': 'securepassword123',
            'email_user': 'correito@example.com',
            'is_active': True,
        }

    def test_create_usuario_successfully(self):
        #Test positivo
        user = Usuario.objects.create(**self.user_data)
        self.assertEqual(Usuario.objects.count(), 1)
        self.assertEqual(user.username_user, 'testuser')
        self.assertEqual(user.email_user, 'test@example.com')
        self.assertTrue(user.is_active)
        self.assertIsNotNone(user.date_joined)
        self.assertIsNone(user.last_login)

    def test_create_usuario_with_duplicate_email(self):
        #test negativo: correo duplicado
        Usuario.objects.create(**self.user_data)
        
        with self.assertRaises(IntegrityError):
            Usuario.objects.create(
                username_user='anotheruser',
                password_user='anotherpass',
                email_user='test@example.com',
                is_active=True
            )
        self.assertEqual(Usuario.objects.count(), 1) 

    def test_email_max_length_validation(self):
        #longitud máxima del correo electrónico
        invalid_email = 'a' * 25 + '@example.com'
        user_data = self.user_data.copy()
        user_data['email_user'] = invalid_email

        user_obj = Usuario(**user_data)
        with self.assertRaises(ValidationError):
            user_obj.full_clean()


    def test_last_login_update(self):
        #last login actualizado correctamente
        user = Usuario.objects.create(**self.user_data)
        now = timezone.now()
        user.last_login = now
        user.save()
        user.refresh_from_db() # Recargar el objeto desde la DB para asegurar
        self.assertAlmostEqual(user.last_login, now, delta=timedelta(seconds=1))


class AdminModelTest(TestCase):
    def setUp(self):
        # usuario para asociarlo al admin
        self.user = Usuario.objects.create(
            username_user='adminuser',
            password_user='adminpass',
            email_user='admin@example.com'
        )

    def test_create_admin_successfully(self):
        #test positivo: creación de admin
        admin = Admin.objects.create(user_id=self.user)
        self.assertEqual(Admin.objects.count(), 1)
        self.assertEqual(admin.user_id, self.user)
        self.assertIsNotNone(admin.admin_id)

    def test_delete_usuario_cascades_admin(self):
        #si se elimina el usuario, el admin también se elimina con cascada
        admin = Admin.objects.create(user_id=self.user)
        self.assertEqual(Admin.objects.count(), 1)
        self.user.delete()
        self.assertEqual(Admin.objects.count(), 0) # El admin debería haberse eliminado


    """
    Tests para el modelo Docente.
    """

    def setUp(self):
        self.user = Usuario.objects.create(
            username_user='teacheruser',
            password_user='teacherpass',
            email_user='teacher@example.com'
        )
        self.docente_data = {
            'user_id': self.user,
            'nombre_docente': 'Ana',
            'apellidos_docente': 'Lopez',
            'ci_docente': '7654321',
            'telefono_docente': 78901234
        }

    def test_create_docente_successfully(self):
        """
        Verifica que se puede crear un docente exitosamente.
        """
        docente = Docente.objects.create(**self.docente_data)
        self.assertEqual(Docente.objects.count(), 1)
        self.assertEqual(docente.nombre_docente, 'Ana')
        self.assertEqual(docente.ci_docente, '7654321')
        self.assertEqual(docente.telefono_docente, 78901234)

    def test_create_docente_with_duplicate_ci(self):
        """
        Verifica que no se puede crear un docente con CI duplicado (unique=True).
        """
        Docente.objects.create(**self.docente_data) # Primer docente
        
        with self.assertRaises(IntegrityError):
            Docente.objects.create(
                user_id=Usuario.objects.create(username_user='another_teacher', password_user='pass', email_user='another_t@example.com'),
                nombre_docente='Pedro',
                apellidos_docente='Ramirez',
                ci_docente='7654321', # CI duplicado
                telefono_docente=65432109
            )
        self.assertEqual(Docente.objects.count(), 1)

    def test_docente_str_representation(self):
        """
        Verifica el método __str__ del modelo Docente.
        """
        docente = Docente.objects.create(**self.docente_data)
        self.assertEqual(str(docente), 'Ana Lopez')

    def test_telefono_docente_is_integer(self):
        """
        Verifica que el campo telefono_docente acepte enteros.
        """
        docente = Docente.objects.create(**self.docente_data)
        self.assertIsInstance(docente.telefono_docente, int)
        self.assertEqual(docente.telefono_docente, 78901234)
    
    def test_ci_max_length_validation(self):
        """
        Verifica la validación de longitud máxima para ci_docente.
        """
        invalid_ci = '1' * 10 # 10 caracteres, max_length es 9
        docente_data = self.docente_data.copy()
        docente_data['ci_docente'] = invalid_ci

        docente_obj = Docente(**docente_data)
        with self.assertRaises(ValidationError):
            docente_obj.full_clean()