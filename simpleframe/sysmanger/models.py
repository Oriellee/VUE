from django.db import models


# Create your models here.

class Menus(models.Model):
    name = models.CharField(max_length=30)
    url = models.CharField(max_length=200)
    permissionname = models.CharField(max_length=30)
    permissionicon = models.CharField(max_length=30)
    flag = models.CharField(max_length=30)
    order = models.IntegerField(null=False)

    class Meta:
        db_table = 'system_menus'


class User(models.Model):
    FLAG_ENUM = (
        ('a', 'admin'),
        ('n', 'normal')
    )
    username = models.CharField(max_length=30, primary_key=True)
    nickname = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    flag = models.CharField(max_length=1, choices=FLAG_ENUM)
    startdate = models.DateTimeField()

    class Meta:
        db_table = 'system_users'
