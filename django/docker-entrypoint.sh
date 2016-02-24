#!/bin/bash
set -e
set -x

echo "Running entrypoint script"

export SCRIPT_DIR=/docker-entry-scripts

if [ ! -d $WEB_DIR ]; then
    echo "Build ERROR: WEB_DIR ($WEB_DIR) is not accessible." 
    exit 1
fi

export MYSQL_LOGIN="mysql -h$MYSQL_HOST -P$MYSQL_PORT -u$MYSQL_USER -p$MYSQL_PASSWORD"
export SITE_DIR=$WEB_DIR/$SITE_NAME

echo "Parsing argument: \"$1\""

if [ "$1" == "" ]; then

    if [ ! -d $SITE_DIR ]; then
        echo "Config ERROR: $SITE_DIR must be installed with init command."
        exit 1
    fi

    cd $SITE_DIR

    echo "Starting server"
    # should loop in check for properly initialized database
    . $SCRIPT_DIR/003-run_server.sh
    echo "ERROR: Server stopped running or did not start."
    exit
fi

case $1 in
    runserver)
        echo "Starting server"
        ;;

    devserver)
        echo "Starting development server"
        ;;

    update)
        if [ ! -d /$SITE_NAME ]; then
            echo "Run ERROR: SITE_NAME ($SITE_NAME) must mounted at /."
            exit 1
        fi

        if [ ! -d $SITE_DIR ]; then
            echo "Config ERROR: $SITE_DIR must be installed with init command before any update."
            exit 1
        fi

        echo "Replacing website code."
        rm -rf $WEB_DIR/${SITE_NAME}_prev
        mv $WEB_DIR/$SITE_NAME $WEB_DIR/${SITE_NAME}_prev
        cp -rp /$SITE_NAME $WEB_DIR
        cd $SITE_DIR
        . $SCRIPT_DIR/002-do_migrations.sh
        python manage.py collectstatic --noinput
        ;;
        
    init)
        echo "Initializing django"
        if [ ! -d /$SITE_NAME ]; then
            echo "Run ERROR: SITE_NAME ($SITE_NAME) must mounted at /."
            exit 1
        fi

        mkdir -p $DJANGO_STATIC_ROOT
        mkdir -p $DJANGO_MEDIA_ROOT

        rm -rf $WEB_DIR/${SITE_NAME}_prev
        rm -rf $WEB_DIR/${SITE_NAME}

        cp -rp /$SITE_NAME $WEB_DIR
        cd $SITE_DIR

        . $SCRIPT_DIR/000-create_db.sh
        . $SCRIPT_DIR/002-do_migrations.sh
        python manage.py collectstatic --noinput
        python manage.py createsuperuser
        exec bash
        ;;
      
    *)
        exec "$@"
        ;;
esac

exec bash

