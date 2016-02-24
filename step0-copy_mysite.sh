
rsync -arv --exclude "*.pyc" --exclude ".git" --exclude "*.log" /home/pauldev/django_p27/mysite django/
rm django/mysite/polls/migrations/00*

