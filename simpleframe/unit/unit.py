import json
from django.http import HttpResponse
from django.core.cache import cache
from django.core import signing
import time
from sysmanger import models

save_time = 60 * 30
day_frequency = 500


# 工具，转为json字符串。
def json_response(obj):
    str_output = ""
    if obj != None:
        str_output = json.dumps(obj)
    return HttpResponse(str_output, 200)


# 工具，获取post的参数。
def json_request_post(request):
    data = request.body
    bdata = data.decode("utf-8")
    return json.loads(bdata)


# 工具，返回错误的json信息。
def json_response_error(msg, status):
    resp = {"message": msg, "status": status}
    return HttpResponse(json.dumps(resp), status=status)


# 工具，设置response消息体的token。
def set_session(username, password, request, response):
    time_now = time.time()
    key = None
    token_dic = cache.get('token_dic')
    if token_dic:
        response["sctoken"] = token_dic["sctoken"]
    else:
        judge = username + str(time_now)
        value = signing.dumps({username: password})
        # 解码。
        # src = signing.loads(value)
        response["sctoken"] = value

    return response


def set_cache(username, sctoken):
    cache_value = {
        'sctoken': sctoken,
        'username': username,
        'time': str(time.time()),
        'frequency': 1
    }
    input_cache(sctoken, cache_value)
    return json.dumps("success")


def del_cache(sctoken):
    cache.delete(sctoken)
    return json.dumps("success")


def input_cache(key, value):
    cache.set(key, value, save_time)


def get_cache(request):
    sctoken = request.META.get("HTTP_SCTOKEN")
    token_dic = cache.get(sctoken)
    return token_dic["username"]
