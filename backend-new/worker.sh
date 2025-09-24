#!/bin/sh
python manage.py runserver 0.0.0.0:8000 &
python manage.py consume_ai_posts
tail -f /dev/null
