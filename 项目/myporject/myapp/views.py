from . import models
import json
from django.http import HttpResponse
from django.core.cache import cache
from django.core import signing
import time
from .tool import unit as unit


# 权限接口。
def profile(request):
    bbb = cache.get('sctoken')  # 获取key为v的缓存
    if bbb:
        response = HttpResponse()
        response["sctoken"] = bbb
        return response
    else:
        return unit.json_response_error("没权限", 401)


# 获取首页menu。
def get_menus(request):
    menus = []
    sctoken = request.META.get("HTTP_SCTOKEN", None)
    redis_sctoken = cache.get('sctoken')  # 获取key为v的缓存
    if redis_sctoken == sctoken and not redis_sctoken is None:
        menus = list(models.Menus.objects.all().values())
        return unit.json_response(menus)
    else:
        return unit.json_response_error("token已超时", 401)


# 登陆接口。
def login(request):
    obj = unit.json_request_post(request)
    username = obj.get("username")
    password = obj.get("password")
    if username == "" or password == "":
        return unit.json_response_error("请输入用户信息", 400)

    userobj = models.User.objects.filter(username=username, password=password)
    if len(userobj) <= 0:
        return unit.json_response_error("用户名或者密码错误", 402)
    response = HttpResponse()
    response = unit.set_session(username, password, request, response)
    cache.set('sctoken', response["sctoken"], 60*60)
    return response
