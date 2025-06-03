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
