from django.shortcuts import render
from . import models
import json
from django.http import HttpResponse
from rest_framework import status


# Create your views here.

def get_menus(request):
    menus = list(models.Menus.objects.all().values())
    print(menus)
    return json_response(menus)


def json_response(obj=None, status=status.HTTP_200_OK):
    str_output = ""
    if obj != None:
        str_output = json.dumps(obj, ensure_ascii=False)
    return HttpResponse(str_output, status)


def login(request):
    a = {
        'id': '1',
        'thoken_key': 'abcde'
    }
    return json_response(a)
