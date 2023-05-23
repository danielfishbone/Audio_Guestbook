from multiprocessing import context
from django.views.generic import ListView
from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from .models import Config, Photos,Audio
from django.core.files.storage import FileSystemStorage
from .forms import UploadImageForm
from .forms import ColorForm
from .forms import AudioForm
import os 
import json


def  photo_view(request):
    all_photos = Photos.objects.all()
    return render(request,'photo.html',{'photos':all_photos})


def video(request):
    image = get_object_or_404(Photos, pk = 1)
    config = get_object_or_404(Config, pk = 1)
    context = {'form':UploadImageForm(),'image':image,'color_form':ColorForm(),'config':config}
    if request.method == "POST":
        form  = UploadImageForm(request.POST, request.FILES)
        color_form = ColorForm(request.POST)
        

        if form.is_valid():
            form.save()
            context['form'] = form
            context['image']  = get_object_or_404(Photos, pk = 1)
                
        if color_form.is_valid():
            selected_color = color_form.cleaned_data['color']
            setattr(config,'animation_color', selected_color)
            config.save()
            context['color_form'] = color_form
            context['config'] = config
    return render(request,'video.html',context)


def messages(request):
    try:
        messages_list = os.listdir("./media/messages/")
        list_1 = []
        for message in messages_list:
            message ="/media/messages/" + message
            list_1.append(message)
    except:
        messages_list = []

    messages_list = list_1    
    return render(request,'messages.html',{'messages_list': messages_list})

def home(request):
    config = get_object_or_404(Config, pk = 1)
    try:
        with open('config.json', 'r') as file:
            json_data = json.load(file)
    except FileNotFoundError:
        json_data = {}

    ringtone_path = json_data["ringtone_path"]
    greeting_message_path = json_data["greeting_message_path"]
    beep_tone_path = json_data["beep_tone_path"]
    warning_message_path = json_data["warning_message_path"]
    external_tone_path = json_data["external_tone_path"]
    end_tone_path = json_data["end_tone_path"]

    context = {
        'config':config,
        'ringtone_path': ringtone_path,
        'greeting_message_path': greeting_message_path,
        'beep_tone_path': beep_tone_path,
        'warning_message_path': warning_message_path,
        'external_tone_path': external_tone_path,
        'end_tone_path': end_tone_path,
    }
    if request.method == "POST":
        form  = AudioForm(request.POST, request.FILES)
        if form.is_valid():
            name = request.POST.get('name', '')
            name = int(name)
            pkey = name 
            form.save()
            context['form'] = form
            context['audio']  = get_object_or_404(Audio, pk = pkey)



    return render(request,'index.html',context)


def upload_file(request):
    if request.method == 'POST' and request.FILES['audio_file']:
        audio_file = request.FILES['audio_file']
        fs = FileSystemStorage()
        filename = fs.save(audio_file.name, audio_file)
        file_url = fs.url(filename)
        return render(request, 'upload_file.html', {'file_url': file_url})
    return render(request, 'upload_file.html')


def update_config_value(request):
    config = get_object_or_404(Config, pk = 1)
    if request.method == 'POST':
        config_param = request.POST.get('config_param', '')
        value = request.POST.get('value', '')
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
