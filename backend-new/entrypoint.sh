#!/bin/sh
set -e

python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py create_admins

exec daphne -b 0.0.0.0 -p 8000 auth.asgi:application
