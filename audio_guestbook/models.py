from django.db import models

class Config(models.Model):
    recording_length = models.IntegerField(default=90)
    filename_prefix = models.CharField(max_length=200)
    ringtone_path = models.CharField(max_length=200)
    greeting_message_path = models.CharField(max_length=200)
    beep_tone_path = models.CharField(max_length=200)
    warning_message_path = models.CharField(max_length=200)
    enable_external_speaker_flag = models.BooleanField()
    external_tone_path = models.CharField(max_length=200)
    end_tone_path = models.CharField(max_length=200)
    
    def save(self, *args, **kwargs):
        self.pk =1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass
    @classmethod
    def load(cls):
        return cls.objects.get(pk = 1)   