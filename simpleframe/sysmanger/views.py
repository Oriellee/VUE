from . import models
from django.http import HttpResponse
from django.core.cache import cache
from unit import unit as unit
from django.views import View
from django.db.models import Q
import time
import json


# Create your views here.
# class CsfrCookie(View):
#     response = HttpResponse()
#     response = HttpResponse('test')

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


class Logout(View):
    def get(self, request):
        sctoken = request.META.get("HTTP_SCTOKEN")
        unit.del_cache(sctoken)
        return unit.json_response({'data': "登出成功"})


class Profile(View):
    def get(self, request):
        result = {}
        user_obj = models.User.objects.get(Q(username=unit.get_cache(request)))
        result = {
            "username": user_obj.username
        }
        return unit.json_response(result)


class Menu(View):
    def get(self, request):
        menu_obj = list(models.Menus.objects.all().order_by('order').values())
        menu_dic = {}
        backdata = []
        for item in menu_obj:
            if item['permissionname'] in menu_dic.keys():
                menu_dic[item['permissionname']]['child'].append(item)
            else:
                menu_dic[item['permissionname']] = {}
                menu_dic[item['permissionname']]['name'] = item['permissionname']
                menu_dic[item['permissionname']]['icon'] = item['permissionicon']
                menu_dic[item['permissionname']]['index'] = str(item['order'])
                menu_dic[item['permissionname']]['child'] = [item]
        for j in menu_dic:
            backdata.append(menu_dic[j])
        return unit.json_response(backdata)
