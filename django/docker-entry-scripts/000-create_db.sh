

if [ `echo "show databases;" | $MYSQL_LOGIN | grep -c 'mysql'` -ne 1 ]
then
    echo "ERROR: Database connection not working." | tee -a /tmp/startup.log
    exit 1
fi

if [ `echo "show databases;" | $MYSQL_LOGIN | grep -c $DJANGO_DB` -ne 1 ]
then
    echo Creating database  | tee -a /tmp/startup.log
    echo "create database $DJANGO_DB;" | $MYSQL_LOGIN

    if [ `echo "show databases;" | $MYSQL_LOGIN | grep -c $DJANGO_DB` -ne 1 ]
    then
        echo "ERROR: Database not created." | tee -a /tmp/startup.log
        exit 1
    fi
fi

