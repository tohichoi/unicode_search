from statistics import mode
from django.db import models
from django.contrib.auth.models import User


class Unicode(models.Model):
    name = models.CharField('이름', max_length=256, blank=True, null=True)
    code = models.IntegerField('코드포인트', blank=True, null=True)
    text = models.CharField('유니코드', max_length=256, blank=True, null=True)


class Statistics(models.Model):
    # user =
    unicode = models.ForeignKey('Unicode', on_delete=models.DO_NOTHING, verbose_name='유니코드', blank=True, null=True)


class UserEx(models.Model):
    user = models.OneToOneField(User, verbose_name='사용자', blank=True, null=True, on_delete=models.SET_NULL)
    statistics = models.ForeignKey('Statistics', on_delete=models.DO_NOTHING, verbose_name='유니코드', blank=True, null=True)
