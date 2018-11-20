from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'menus$', views.get_menus),
    url(r'login$', views.login),
    url(r'profile$', views.profile),
]
