# syntax=docker/dockerfile:1
FROM ubuntu:22.04

RUN apt-get update && apt-get upgrade -y && apt install -y python3 python3-pip iproute2
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1

#WORKDIR /app/
#COPY . .

# WORKDIR /app/django/
WORKDIR /tmp
COPY ./django/requirements.txt /tmp
RUN pip3 install -r requirements.txt

# run multiple services
WORKDIR /app/
#CMD ./run.sh
CMD ["echo", "'Please mount source root and run "run.sh" in the container.'"]

EXPOSE 8000 8002
