from .models import Config
from .models import Photos
from .models import Audio
from django.contrib import admin

admin.site.register(Config)
admin.site.register(Photos)
admin.site.register(Audio)