# syntax=docker/dockerfile:1
FROM ubuntu:22.04

RUN apt update
#RUN apt dist-upgrade 
RUN apt-get update && apt-get upgrade -y && apt install -y python3 python3-pip iproute2
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1

WORKDIR /app/
COPY . .

WORKDIR /app/django/
RUN pip3 install -r requirements.txt

# run multiple services
WORKDIR /app/
CMD ./run.sh

EXPOSE 8000 8002
