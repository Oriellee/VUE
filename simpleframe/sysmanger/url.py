from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^menus$', views.Menu.as_view()),
]
