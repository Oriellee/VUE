from django.core.cache import cache
from unit import unit as unit
import time


class MiddlewareMixin(object):
    # 这是一个基类，为了更好的解耦，我们直接本地化这个类，而不继承django中定义的
    def __init__(self, get_response=None):
        self.get_response = get_response
        super(MiddlewareMixin, self).__init__()

    def __call__(self, request):
        response = None
        if hasattr(self, 'process_request'):
            response = self.process_request(request)
        if not response:
            response = self.get_response(request)
        if hasattr(self, 'process_response'):
            response = self.process_response(request, response)
        return response


class AuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        sctoken = request.META.get("HTTP_SCTOKEN")
        url = request.path
        if url == '/api/sysmanger/login':
            unit.del_cache(sctoken)
        else:
            token_dic = cache.get(sctoken)
            if token_dic:
                token_dic["frequency"] = token_dic["frequency"] + 1
                if int(token_dic["frequency"]) > unit.day_frequency:
                    unit.del_cache(sctoken)
                    return unit.json_response_error("调用次数太多", 405)
                d_value = time.time() - float(token_dic["time"])
                if d_value > unit.save_time:
                    unit.del_cache(sctoken)
                    return unit.json_response_error("登录超过规定时长，请重新登录", 406)
                unit.input_cache(sctoken, token_dic)
            else:
                return unit.json_response_error("sctoken不存在", 401)
        return None
