#!/bin/bash
# run script in a container

cd /app/django/server
nohup sh -c ./run-server.sh &

cd /app/webapp/www/
nohup sh -c ./run-httpd.sh 
