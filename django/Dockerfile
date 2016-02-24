
FROM django:latest

RUN pip install --upgrade pip && pip install gunicorn && pip install djangorestframework

ENTRYPOINT ["/docker-entrypoint.sh"]

COPY . /

