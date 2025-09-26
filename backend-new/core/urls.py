from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PostViewSet, PollViewSet, PollVoteViewSet, CommentViewSet,
    ReactionViewSet, RepostViewSet, ViewViewSet, FollowViewSet,
    BookmarkViewSet, UserViewSet, NotificationListView, MarkNotificationsAsReadView, 
    status_view, websocket_notifications, search_posts, search_users, 
    search_hashtags, search_trending, global_search
)
from .ai_views import generate_content, analyze_content, generate_hashtags


# Initialize the default router
router = DefaultRouter()

# Register viewsets with the router
router.register(r'post', PostViewSet)
router.register(r'polls', PollViewSet)
router.register(r'poll-votes', PollVoteViewSet)
router.register(r'users', UserViewSet, basename='user')
router.register(r'comments', CommentViewSet)
router.register(r'reactions', ReactionViewSet)
router.register(r'reposts', RepostViewSet)
router.register(r'views', ViewViewSet)
router.register(r'follows', FollowViewSet)
router.register(r'bookmark', BookmarkViewSet)

# Define urlpatterns with included router URLs and additional custom paths
urlpatterns = [
    # Include all the router URLs
    path('', include(router.urls)),
    path("status/", status_view, name='status'),
    path('notifications/', NotificationListView.as_view(),
         name='notification_list'),
    path('notifications/mark-read/', MarkNotificationsAsReadView.as_view(),
         name='mark_notifications_as_read'),

    # Additional custom actions for PostViewSet
    path('search-by-hashtag/',
         PostViewSet.as_view({'get': 'search_by_hashtag'})),
    path('trending/', PostViewSet.as_view({'get': 'trending'})),
    
    # AI endpoints
    path('ai/generate-content/', generate_content, name='generate_content'),
    path('ai/analyze-content/', analyze_content, name='analyze_content'),
    path('ai/generate-hashtags/', generate_hashtags, name='generate_hashtags'),
    
    # WebSocket-like endpoint for notifications
    path('ws/notifications/', websocket_notifications, name='websocket_notifications'),
    
    # Search endpoints
    path('search/posts/', search_posts, name='search_posts'),
    path('search/users/', search_users, name='search_users'),
    path('search/hashtags/', search_hashtags, name='search_hashtags'),
    path('search/trending/', search_trending, name='search_trending'),
    path('search/', global_search, name='global_search'),
]
