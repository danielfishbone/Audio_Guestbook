from unicodedata import name
from django.db import models
import json
import os


class Config(models.Model):
    recording_length = models.IntegerField(default=90)
    warning_message_length = models.IntegerField(default=90)
    speaker_ringtone_play_period = models.IntegerField(default=90)
    filename_prefix = models.CharField(max_length=200)
    ringtone_path = models.CharField(max_length=200)
    greeting_message_path = models.CharField(max_length=200)
    beep_tone_path = models.CharField(max_length=200)
    warning_message_path = models.CharField(max_length=200)
    enable_external_speaker_flag = models.BooleanField()
    external_tone_path = models.CharField(max_length=200)
    end_tone_path = models.CharField(max_length=200)
    animation_color = models.CharField(max_length=7)
    
    def save(self, *args, **kwargs):
        self.pk =1
        super().save(*args, **kwargs)
        try:
            with open('config.json', 'r') as file:
                json_data = json.load(file)
        except FileNotFoundError:
            json_data = {}
        json_data['recording_length']= self.recording_length
        json_data['filename_prefix']= self.filename_prefix
        json_data['warning_message_time']= self.warning_message_length
        json_data['external_tone_time'] = self.speaker_ringtone_play_period
        json_data['external_tone_flag']= self.enable_external_speaker_flag
        json_data[ 'waveform_color']=self.animation_color

        with open('config.json', 'w') as file:
            json.dump(json_data, file, indent=4)

    def delete(self, *args, **kwargs):
        pass
    @classmethod
    def load(cls):
        return cls.objects.get(pk = 1)   

class Photos(models.Model):
    image = models.ImageField(upload_to = 'images/')

    def save(self, *args, **kwargs):
        self.pk =1
        super().save(*args, **kwargs)
        try:
            with open('config.json', 'r') as file:
                json_data = json.load(file)
        except FileNotFoundError:
            json_data = {}
        os.remove("."+json_data['image_path'])
        json_data['image_path']=self.image.url


        with open('config.json', 'w') as file:
            json.dump(json_data, file, indent=4)

    def delete(self, *args, **kwargs):
        pass
    @classmethod
    def load(cls):
        return cls.objects.get(pk = 1)

    def __str_(self):
        return self.name
class Audio (models.Model):
    audio = models.FileField(upload_to='audio/')
    name = models.CharField(max_length=20)
    def save(self,pri_key=1, *args, **kwargs):

        keys = (None,"ringtone_path", "greeting_message_path", "beep_tone_path", "warning_message_path", "external_tone_path", "end_tone_path")
        pri_key = int(self.name) 
        self.pk = pri_key
        super().save(*args, **kwargs)
        with open('config.json', 'r') as file:
            json_data = json.load(file)
        # try:
        #     with open('config.json', 'r') as file:
        #         json_data = json.load(file)
        # except FileNotFoundError:
        #     json_data = {}
        try:    
            os.remove("."+json_data[keys[pri_key]])
        except FileNotFoundError:
            pass    
        json_data[keys[pri_key]]=self.audio.url


        with open('config.json', 'w') as file:
            json.dump(json_data, file, indent=4)
