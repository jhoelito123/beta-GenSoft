from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usuario, Admin, Docente, Estudiante

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username_user', 'password_user', 'email_user']
        extra_kwargs = {
            'password_user': {'write_only': True, 'required': True}
        }

    def create(self, validated_data):
        validated_data['password_user'] = make_password(validated_data['password_user'])
        return super().create(validated_data)

class AdminCreateSerializer(serializers.ModelSerializer):
    # Aquí anidamos el UsuarioSerializer y le decimos que su fuente es el campo 'user_id' del modelo Admin
    # Cuando DRF intente leer/escribir el campo 'user_id' de Admin, lo hará a través de este serializer anidado 'user'
    user = UsuarioSerializer(source='user_id') # <--- IMPORTANTE: Usamos 'source'

    class Meta:
        model = Admin
        # Incluye el nombre del campo del serializer anidado ('user')
        # y los campos específicos del Admin, si los hubiera (además de admin_id que es la PK)
        fields = ['user'] # Aquí ponemos 'user', no 'user_id'

    def create(self, validated_data):
        # Extrae los datos del usuario anidado (vienen bajo la clave 'user' porque así lo nombramos en el serializer)
        user_data = validated_data.pop('user_id') # <--- Ahora es 'user_id' por el 'source'

        # Crea el usuario base
        user = Usuario.objects.create(**user_data)

        # Crea el Admin, enlazándolo al usuario creado.
        # validated_data ahora solo contiene los campos restantes de Admin si los hubiera.
        # Pasa el objeto 'user' creado al campo user_id del modelo Admin
        admin = Admin.objects.create(user_id=user, **validated_data)
        return admin

class DocenteCreateSerializer(serializers.ModelSerializer):
    user = UsuarioSerializer(source='user_id') # <--- IMPORTANTE: Usamos 'source'

    class Meta:
        model = Docente
        # Incluye el nombre del campo del serializer anidado ('user')
        # y los campos específicos del Docente
        fields = ['user', 'nombre_docente', 'apellidos_docente', 'ci_docente', 'telefono_docente']

    def create(self, validated_data):
        user_data = validated_data.pop('user_id') # <--- Ahora es 'user_id' por el 'source'

        user = Usuario.objects.create(**user_data)

        docente = Docente.objects.create(user_id=user, **validated_data)
        return docente

class DocenteDetailSerializer(serializers.ModelSerializer):
    # Para lectura, queremos ver los detalles del usuario asociado
    # Usamos 'source' para indicar que 'user' en el JSON viene del campo 'user_id' del modelo Docente
    user = UsuarioSerializer(read_only=True, source='user_id') # <--- IMPORTANTE: Usamos 'source'

    class Meta:
        model = Docente
        # Incluye el nombre del campo del serializer anidado ('user')
        # y los campos específicos del Docente
        fields = ['user', 'nombre_docente', 'apellidos_docente', 'ci_docente', 'telefono_docente']

class EstudianteCreateSerializer(serializers.ModelSerializer):
    user = UsuarioSerializer(source='user_id') # <--- IMPORTANTE: Usamos 'source'

    class Meta:
        model = Estudiante
        fields = ['user', 'nombre_estudiante', 'apellidos_estudiante', 'ci_estudiante']

    def create(self, validated_data):
        user_data = validated_data.pop('user_id') # <--- Ahora es 'user_id' por el 'source'
        user = Usuario.objects.create(**user_data)
        estudiante = Estudiante.objects.create(user_id=user, **validated_data)
        return estudiante