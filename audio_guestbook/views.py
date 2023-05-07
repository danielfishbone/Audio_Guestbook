import re
from django.shortcuts import render
from django.http import HttpResponse


def settings(request):
    return HttpResponse("settings Page")

def home(request):
    return render(request,'index.html',{'title':'AUDIO GUESTBOOK'})