import json
from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse,JsonResponse
from .models import Config

def settings(request):
    return HttpResponse("settings Page")

def home(request):
    config = get_object_or_404(Config, pk = 1)
    return render(request,'index.html',{'config':config})

def update_config_value(request):
    config = get_object_or_404(Config, pk = 1)
    if request.method == 'POST':
        config_param = request.POST.get('config_param', '')
        value = request.POST.get('value', '')
        config.recording_length = 100
        if config_param == "recording_length":
            try :
                value = int(value)
            except:
                pass    
            if isinstance(value,(int,float)):
                setattr(config,config_param, value)
                config.save()
        if config_param == "filename_prefix":
            setattr(config,config_param, value)
            config.save()        
        # Update the configuration value here
        # For example, if the configuration values are stored in a database:
        # Configuration.objects.filter(param=config_param).update(value=value)

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
