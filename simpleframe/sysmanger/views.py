from django.shortcuts import render
from . import models
from unit import unit
from django.views import View


# Create your views here.
class Menu(View):
    def get(self,request):
        menu_obj = models.Menus.objects.all().values()
        return unit.json_response(list(menu_obj))
