from django.shortcuts import render
from . import models
import json
from django.http import HttpResponse
from rest_framework import status
import random
from . import redis
from django.core.cache import cache
from django.core import signing
import time
# from rest_framework import status

# response = HttpResponse()
# response.header("Access-Control-Allow-Headers", "X-Requested-With, accept, content-type, xxxx");
# response.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
# response.header("Access-Control-Allow-Origin", "*");


# Create your views here.

def get_menus(request):
    menus = []
    aaa = request.META.get("HTTP_SCTOKEN", None)
    print("aaaaaaaaaa", aaa)
    # cache.set('sctoken', aaa, 60 * 60)
    bbb = cache.get('sctoken')  # 获取key为v的缓存
    if bbb == aaa:
        menus = list(models.Menus.objects.all().values())
        print("success", bbb)
    else:
        return json_response_error("bad message request", 401)
    return json_response(menus)


def json_response(obj=None, status=status.HTTP_200_OK):
    str_output = ""
    if obj != None:
        str_output = json.dumps(obj, ensure_ascii=False)
    return HttpResponse(str_output, status)


def json_request_post(request):
    data = request.body
    bdata = data.decode("utf-8")
    return json.loads(bdata)


def json_response_error(msg, status):
    # print("==========================",status,status.HTTP_400_BAD_REQUEST)
    resp = {"message": msg, "status": status}
    return HttpResponse(json.dumps(resp),status)


def set_session(username,password, request, response):
    time_now = time.time()
    key = None
    bbb = cache.get('sctoken')
    if bbb:
        response["sctoken"] = bbb
    else:
        judge = username + str(time_now)
        value = signing.dumps({username:password})
        src = signing.loads(value)
        # print("3333333333333333333333333333",value)
        # print(src)
        # print(response)
        # key = core.misc.md5(judge)
        response["sctoken"] = value
        # print(response)

    return response


def login(request):
    obj = json_request_post(request)
    username = obj.get("username")
    password = obj.get("password")
    if username == "" or password == "":
        return json_response_error("bad message request", 400)

    userobj = models.User.objects.filter(username=username, password=password)
    if len(userobj) <= 0:
        return json_response_error("authentication failed", 401)
    response = HttpResponse()
    response = set_session(username,password, request, response)
    cache.set('sctoken', response["sctoken"], 60)
    bbb = cache.get('sctoken')  # 获取key为v的缓存
    print("sctoken", bbb)
    return response
    # cache.has_key('v')  # 判断key为v是否存在
    # aaa = cache.get('v')  # 获取key为v的缓存
    # aaa = cache.get('v')  # 获取key为v的缓存
    # print(aaa)
    # print("9999999999999999999999", request)

    # response = HttpResponse()
    # response["content_type"] = 'text/html; charset=utf-8'
    # response["Authentication-Token"] = request.header["Authentication-Token"]
    # return json_response(username)
