from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'menus$', views.Menu.as_view()),
    url(r'login$', views.Login.as_view()),
    url(r'profile', views.Profile.as_view()),
    url(r'logout', views.Logout.as_view()),
]
