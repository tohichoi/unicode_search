#!/usr/bin/env python
# coding: utf-8

# In[2]:


import json
import os.path
import requests
from bs4 import BeautifulSoup
import re
import sys
from tqdm import tqdm


# # Download names

# ## using unicode.org

# In[7]:


# def download(url, file_name):
#     with open(file_name, "wb") as file:  # open in binary mode
#         response = requests.get(url)  # get request
#         file.write(response.content)  # write to file


# In[9]:


# url = 'https://unicode.org/charts/charindex.html'

# download(url, 'index.html')


# In[10]:


# with open('index.html') as fd:
#     soup = BeautifulSoup(fd.read())


# In[11]:


# soup.find('table')


# ## using native python lib.

# In[18]:


# os.getcwd()


# In[3]:


# sys.path


# In[3]:


import unicodedata
import django
import pathlib

#proj_dir = pathlib.Path(os.getcwd()).joinpath('../../').resolve().joinpath('server')
#sys.path.append(str(proj_dir.absolute()))

proj_dir = '/home/x/Workspace/unicode_search/django/server/'
sys.path.append(proj_dir)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()


# In[4]:


from dataserver.models import Unicode

qs = Unicode.objects.all()


# In[5]:

max_code = 0xf0000
with tqdm(total=max_code, desc='Creating Unicode') as pbar:
    for i in range(0, max_code):
        try:
            Unicode.objects.create(name=unicodedata.name(chr(i)),
                                code=i,
                                text=chr(i))
        except ValueError:
            continue
        finally:
            pbar.update(1)

# In[14]:


# unicodedata.name(chr(0xfffff))


# In[ ]:




