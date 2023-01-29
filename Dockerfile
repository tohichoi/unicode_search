# syntax=docker/dockerfile:1
FROM ubuntu:22.04
WORKDIR /app
COPY . .

# django restframework
WORKDIR /app/django
RUN apt update
#RUN apt dist-upgrade 
RUN apt install -y python3 python3-pip iproute2
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1
RUN pip3 install -r requirements.txt
# RUN source venv/bin/activate
# WORKDIR /app/django/server
# RUN ./run-server.sh &

# webapp
# WORKDIR /app/webapp/www
# CMD ./run-httpd.sh

# run multiple services
WORKDIR /app/
CMD ./run.sh

EXPOSE 8000 8002
