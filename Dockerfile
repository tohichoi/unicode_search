# syntax=docker/dockerfile:1
FROM python:3.10
WORKDIR /app
COPY . .

# django restframework
WORKDIR /app/django
RUN pip3 install -r requirements.txt
RUN source venv/bin/activate
WORKDIR /app/django/server
RUN run-server.sh

# webapp
WORKDIR /app/webapp/www
CMD ["run-httpd.sh"]

EXPOSE 8002
