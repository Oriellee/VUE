from django.shortcuts import render
from . import models
import json
from django.http import HttpResponse
from rest_framework import status
import random
from . import redis
from django.core.cache import cache

# response = HttpResponse()
# response.header("Access-Control-Allow-Headers", "X-Requested-With, accept, content-type, xxxx");
# response.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
# response.header("Access-Control-Allow-Origin", "*");


# Create your views here.

def get_menus(request):
    menus = list(models.Menus.objects.all().values())
    print(menus)
    aaa = request.META.get("HTTP_SC_TOKEN")
    print("++++++++++++++++++++", aaa)
    return json_response(menus)


def json_response(obj=None, status=status.HTTP_200_OK):
    str_output = ""
    if obj != None:
        str_output = json.dumps(obj, ensure_ascii=False)
    return HttpResponse(str_output, status)


def login(request):
    a = {
        'id': '1',
        'sc_token': random.randint(0, 9)
    }
    print("----------------------------",request)

    aaa = request.META.get("HTTP_SC_TOKEN")
    print("++++++++++++++++++++",aaa)
    # cache.set('v', '555', 60 * 60)  # 写入key为v，值为555的缓存，有效期30分钟
    # cache.has_key('v')  # 判断key为v是否存在
    # aaa = cache.get('v')  # 获取key为v的缓存
    #
    # print(aaa)
    # print("9999999999999999999999", request)

    # response = HttpResponse()
    # response["content_type"] = 'text/html; charset=utf-8'
    # response["Authentication-Token"] = request.header["Authentication-Token"]
    return json_response(a)
