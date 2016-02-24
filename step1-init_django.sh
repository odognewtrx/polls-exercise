

docker-compose build
docker-compose up -d mysql_4

echo
echo Waiting for mysql initialization.
echo
echo When next step asks: enter site admin login info.
echo Then exit when returned to container shell.
echo
echo You could run manage.py shell to initialize here to
echo add database elements. Or restore polls tables from
echo sql backup.
echo
sleep 30
docker-compose run --rm django_4 init

