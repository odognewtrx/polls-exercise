
# Prepare log files and start outputting logs to stdout
mkdir -p $WEB_DIR/logs
touch $WEB_DIR/logs/gunicorn.log
touch $WEB_DIR/logs/access.log
# tail -n 0 -f logs/*.log &

# Start Gunicorn processes
echo Starting Gunicorn.

exec gunicorn mysite.wsgi:application \
    --name mysite \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --log-level=info \
    --log-file=$WEB_DIR/logs/gunicorn.log \
    --access-logfile=$WEB_DIR/logs/access.log

