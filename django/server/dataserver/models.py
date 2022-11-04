from statistics import mode
from django.db import models


class Unicode(models.Model):
    name = models.CharField('이름', max_length=256, blank=True, null=True)
    code = models.IntegerField('코드포인트', blank=True, null=True)
    text = models.CharField('유니코드', max_length=256, blank=True, null=True)
    