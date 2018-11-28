import json
from django.http import HttpResponse
from django.core.cache import cache
from django.core import signing
import time


# 工具，转为json字符串。
def json_response(obj):
    str_output = ""
    if obj != None:
        str_output = json.dumps(obj, ensure_ascii=False)
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
    redis_sctoken = cache.get('sctoken')
    if redis_sctoken:
        response["sctoken"] = redis_sctoken
    else:
        judge = username + str(time_now)
        value = signing.dumps({username: password})
        # 解码。
        # src = signing.loads(value)
        response["sctoken"] = value

    return response
