
if [ `echo "use $DJANGO_DB; show tables;" | $MYSQL_LOGIN | grep -c polls_question` -ne 1 ]
then
    echo performing migrations  | tee -a /tmp/startup.log
    python manage.py makemigrations
    python manage.py migrate
    $MYSQL_LOGIN $DJANGO_DB < polls_json_config.sql
fi

