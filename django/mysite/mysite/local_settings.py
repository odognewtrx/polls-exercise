
from mysite.settings import *
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ['DJANGO_DB'],
        'USER': os.environ['MYSQL_USER'],
        'PASSWORD': os.environ['MYSQL_PASSWORD'],
        'HOST': os.environ['MYSQL_HOST'],
        'PORT': os.environ['MYSQL_PORT'],
    }
}

STATIC_ROOT = os.environ['DJANGO_STATIC_ROOT']
MEDIA_ROOT = os.environ['DJANGO_MEDIA_ROOT']

ALLOWED_HOSTS = ['*']

DEBUG = False

