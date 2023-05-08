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
        if config_param == "recording_length" or config_param == "warning_message_length" or config_param == "speaker_ringtone_play_period":
            try :
                value = int(value)
            except:
                pass    
            if isinstance(value,(int,float)):
                setattr(config,config_param, value)
                config.save()
            else:
                 return HttpResponse("Entry is not a Number", status=400)
        elif config_param =="enable_external_speaker_flag":
            try :
                value = bool(value)
            except:
                pass    
            if isinstance(value,bool):
                setattr(config,config_param, value)
                config.save()
            else:
                 return HttpResponse("Error Bad input", status=400)       
        else:
                    
            setattr(config,config_param, value)
            config.save()        

        return HttpResponse("Update successful",status = 200)
    else:
        return HttpResponse("Bad request!!",status = 400)
