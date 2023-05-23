from django import forms
from .models import Photos
from .models import Audio

class UploadImageForm(forms.ModelForm):
    class Meta:
        model = Photos
        fields = ['image']
        
class ColorForm(forms.Form):
    color = forms.CharField(widget=forms.TextInput(attrs={'type': 'color'}))

class AudioForm(forms.ModelForm):
    class Meta:
        model = Audio
        fields = ('audio','name')    

