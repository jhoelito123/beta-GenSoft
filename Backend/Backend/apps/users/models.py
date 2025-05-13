from django.db import models

class Admin(models.Model):
    #Modelo para representar a los administradores del sistema. 
    admin_id = models.AutoField(primary_key=True, help_text="Identificador único del administrador.")
    username_admin = models.CharField(max_length=30, unique=True, help_text="Nombre de usuario único del administrador.")
    email_admin = models.EmailField(max_length=15, unique=True, help_text="Correo electrónico único del administrador.")
    password_admin = models.CharField(max_length=255, help_text="Contraseña del administrador (hasheada).")

    class Meta:
        verbose_name = "Administrador"
        verbose_name_plural = "Administradores"

    def __str__(self):
        return self.username_admin


class Estudiante(models.Model):
    #Modelo para representar a los estudiantes del sistema.
    id_estudiante = models.AutoField(primary_key=True, help_text="Identificador único del estudiante.")
    nombre_estudiante = models.CharField(max_length=30, help_text="Nombre del estudiante.")
    apellidos_estudiante = models.CharField(max_length=30, help_text="Apellidos del estudiante.")
    email_estudiante = models.EmailField(max_length=15, help_text="Correo electrónico del estudiante.")
    password_estudiante = models.CharField(max_length=255, help_text="Contraseña del estudiante (hasheada).")
    ci_estudiante = models.CharField(max_length=9, unique=True, help_text="Número de cédula de identidad único del estudiante.")

    class Meta:
        verbose_name = "Estudiante"
        verbose_name_plural = "Estudiantes"

    def __str__(self):
        return f"{self.nombre_estudiante} {self.apellidos_estudiante}"

class Docente(models.Model):
    #Modelo para representar a los estudiantes del sistema.
    id_docente = models.AutoField(primary_key=True, help_text="Identificador único del docente.")
    nombre_docente = models.CharField(max_length=30, help_text="Nombre del docente.")
    apellidos_docente = models.CharField(max_length=30, help_text="Apellidos del docente.")
    email_docente = models.EmailField(max_length=15, help_text="Correo electrónico del docente.")
    password_docente = models.CharField(max_length=255, help_text="Contraseña del docente (hasheada).")
    ci_docente = models.CharField(max_length=9, unique=True, help_text="Número de cédula de identidad único del docente.")
    telefono_docente = models.IntegerField(help_text="Número de elular del docente")

    class Meta:
        verbose_name = "Docente"
        verbose_name_plural = "Docentes"

    def __str__(self):
        return f"{self.nombre_docente} {self.apellidos_docente}"