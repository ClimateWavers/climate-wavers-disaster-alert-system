#auth/asgi.py

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from core.middleware import JwtAuthMiddleware
import core.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auth.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": JwtAuthMiddleware(
        URLRouter(
            core.routing.websocket_urlpatterns
        )
    ),
})
