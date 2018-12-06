from django.views import View
from django.http import HttpResponse
from unit import unit as unit

# Create your views here.
class Test(View):
    def get(self, request):
        print("aaaaaaaaaaaaa")
        return unit.json_response("aaaaaaa")
