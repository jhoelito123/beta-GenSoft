import os
import sys

from django.core.wsgi import get_wsgi_application

PROJECT_DJANGO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
if PROJECT_DJANGO_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_DJANGO_ROOT)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.config.settings.base')

application = get_wsgi_application()