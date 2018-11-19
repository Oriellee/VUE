from django.db import models


# Create your models here.

class Menus(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'menus'


class User(models.Model):
    id = models.BigIntegerField(primary_key=True)
    username = models.CharField(max_length=100, null=True)
    password = models.CharField(max_length=100, null=True)

    class Meta:
        db_table = 'user'
