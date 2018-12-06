import os
from django.conf.urls import url, include


def settings(setting_file):
    # settings app
    from simpleframe import settings
    main_app = os.path.basename(os.path.dirname(setting_file))
    web_root = os.path.dirname(os.path.dirname(setting_file))
    apps = settings_apps(main_app, web_root)
    settings.INSTALLED_APPS.extend(apps)


def settings_apps(main_app, web_root):
    apps = []
    app_dirs = os.listdir(web_root)
    for dname in app_dirs:
        if not os.path.isfile(dname + "/urls.py"):
            continue

        if dname == main_app:
            continue

        apps.append(dname)

    return apps


def get_apps_urlpatterns(urls_file):
    urls = []

    main_app = os.path.basename(os.path.dirname(urls_file))
    web_root = os.path.dirname(os.path.dirname(urls_file))

    app_dirs = os.listdir(web_root)
    for dname in app_dirs:
        if not os.path.isfile(dname + "/urls.py"):
            continue

        if dname == main_app:
            continue
        urls.append(url(r'^api/' + dname + "/", include(dname + '.urls')))
    return urls
