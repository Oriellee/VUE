from . import models
from django.http import HttpResponse
from django.core.cache import cache
from unit import unit as unit
from django.views import View
from django.db.models import Q
import time
import json


# Create your views here.
class Menu(View):
    def get(self, request):
        menu_obj = models.Menus.objects.all().values()
        return unit.json_response(list(menu_obj))


class Login(View):
    def post(self, request):
        obj = unit.json_request_post(request)
        username = obj.get("username")
        password = obj.get("password")
        if username == "" or password == "":
            return unit.json_response_error("用户名或密码错误", 402)
        user_obj = models.User.objects.filter(Q(username=username), Q(password=password))
        if len(user_obj) <= 0:
            return unit.json_response_error("用户不存在", 403)
        response = HttpResponse()
        response = unit.set_session(username, password, request, response)
        unit.set_cache(username, response["sctoken"])
        return response
