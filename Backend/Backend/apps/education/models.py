from django.db import models

class Departamento(models.Model):
    id_departamento = models.AutoField(primary_key=True)
    nombre_departamento = models.CharField(max_length=100)
    nombre_corto = models.CharField(max_length=10)

    def __str__(self):
        return self.nombre_departamento

class Municipio(models.Model):
    id_municipio = models.AutoField(primary_key=True)
    nombre_municipio = models.CharField(max_length=150)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_municipio
    
class NivelEducativo(models.Model):
    id_nivel_educativo = models.AutoField(primary_key=True)
    nivel_educativo = models.CharField(max_length=20)
    
    def __str__(self):
        return self.nivel_educativo
    
class Institucion(models.Model):
    id_institucion = models.AutoField(primary_key=True)
    admin_id = 1 #static, cambiar cuando se implemente
    nombre_institucion = models.CharField(max_length=30)
    codigo_institucion = models.CharField(max_length=10, unique=True)
    direccion = models.CharField(max_length=50)
    telefono = models.BigIntegerField()
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Institución"
        verbose_name_plural = "Instituciones"
        ordering = ['nombre_institucion']

    def __str__(self):
        return self.nombre_institucion