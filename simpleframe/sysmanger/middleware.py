from django.conf import settings
from django.shortcuts import redirect
from django.core.cache import cache
from unit import unit as unit


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
        if url == '/api/login':
            unit.del_cache(sctoken)
        else:
            token_dic = cache.get(sctoken)
            if token_dic:
                unit.update_cache(sctoken)
            else:
                return unit.json_response_error("sctoken鉴权失败", 401)
        return None
