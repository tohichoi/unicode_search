from code import interact
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions
from rest_framework import filters
from rest_framework.response import Response
from dataserver.models import Unicode
from dataserver.serializers import UserSerializer, GroupSerializer, UnicodeSerializer
# from django_filters import rest_framework as filters


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    

# How to add Search functionality to a Django REST Framework powered app
# https://medium.com/swlh/searching-in-django-rest-framework-45aad62e7782
# 리스트를 customizing 할 경우 정의해서 사용
class UnicodeListAPIView(generics.ListCreateAPIView):
    queryset = Unicode.objects.all()
    serializer_class = UnicodeSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name', 'text']


class UnicodeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Unicode to be viewed or edited.

    list, retrieve, ... 기능 변경은 method 를 overwriting 해서 사용한다.
    """
    queryset = Unicode.objects.all()
    serializer_class = UnicodeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name', 'text']
