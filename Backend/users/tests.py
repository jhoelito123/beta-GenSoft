from django.test import TestCase
from users.models import Usuario

class UsuarioModelTest(TestCase):
    def test_creacion_usuario(self):
        
        usuario = Usuario.objects.create(
            username_user="lucas",
            password_user="12345678",
            email_user="lucas@gmail.com"
        )

        self.assertEqual(usuario.username_user, "lucas")
        self.assertEqual(usuario.email_user, "lucas@gmail.com")
        self.assertTrue(usuario.is_active)
