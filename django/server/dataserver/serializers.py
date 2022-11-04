from django.contrib.auth.models import User, Group
from rest_framework import serializers
from dataserver.models import Unicode


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
        
        
class UnicodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Unicode
        # serialized 결과에 url 을 포함하려면 명시적으로 'url' 추가해야함
        fields = ['pk', 'url', 'name', 'text', 'code']
