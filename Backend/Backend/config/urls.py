from django.contrib import admin
from django.urls import path
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/education/', include('apps.education.urls')), #urls de education
    path('api/users/', include('apps.users.urls')),
]
