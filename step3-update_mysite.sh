
docker-compose pause django_4
docker-compose run --rm django_4 update
docker-compose unpause django_4
docker exec buildmydjango_django_4_1 kill -HUP 1

