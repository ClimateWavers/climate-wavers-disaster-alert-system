from rest_framework import viewsets
from django.db.models import Count, Q
from django.contrib.contenttypes.models import ContentType
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import (
    Notification,
    Post,
    Poll,
    PollVote,
    Comment,
    Reaction,
    Repost,
    View,
    Follow,
    Bookmark,
)
from .serializers import (
    NotificationSerializer,
    UserSerializer,
    PostSerializer,
    PollSerializer,
    PollVoteSerializer,
    CommentSerializer,
    ReactionSerializer,
    RepostSerializer,
    ViewSerializer,
    FollowSerializer,
    BookmarkSerializer,
    UserActivitySerializer,
)
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.http import JsonResponse, Http404

# Get the custom user model
User = get_user_model()


# Pagination for Posts
class PostPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by(
            "-created_at"
        )

    def get_serializer_context(self):
        return {'request': self.request}


class MarkNotificationsAsReadView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        notifications = Notification.objects.filter(
            user=request.user, is_read=False)
        notifications.update(is_read=True)
        return Response(
            {"status": "Notifications marked as read"}, status=status.HTTP_200_OK
        )


# ViewSet for Post model
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Override perform_create to save the post and extract hashtags from the content.
        """
        post = serializer.save(user=self.request.user)
        post.hashtags = post.extract_hashtags(post.content)
        post.save()

    def perform_update(self, serializer):
        """
        Override perform_update to update the post and extract hashtags from the content.
        """
        post = serializer.save()
        post.hashtags = post.extract_hashtags(post.content)
        post.save()

    def get_queryset(self):
        """
        Override get_queryset to add annotations for comment, reaction, view, and repost counts.
        """
        # Get the ContentType for Post
        # post_content_type = ContentType.objects.get_for_model(Post)

        queryset = super().get_queryset()

        # Annotate the queryset with counts
        queryset = queryset.annotate(
            total_comments=Count("comments", distinct=True),
            total_reactions=Count("reactions", distinct=True),
            total_views=Count("views",  distinct=True),
            total_reposts=Count("reposts",  distinct=True),
            total_bookmarks=Count("bookmarks",  distinct=True),
        )
        return queryset

    @action(detail=False, methods=["get"])
    def search_by_hashtag(self, request):
        """
        Custom action to search posts by hashtag with additional filters for user type and location.
        """
        hashtag = request.query_params.get("hashtag", None)
        filter_by = request.query_params.get("filter_by", "anyone")
        location = request.query_params.get("location", "anywhere")

        if not hashtag:
            return Response(
                {"detail": "Hashtag not provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Filter posts by hashtag
        posts = Post.objects.filter(hashtags__icontains=hashtag)

        # Filter by user type (e.g., following)
        if filter_by == "following":
            posts = posts.filter(
                user__in=request.user.following.values("following"))

        # Filter by location (e.g., near_me)
        if location == "near_me":
            usersry = request.user.country  # Assuming user has a country field
            user_state = request.user.state  # Assuming user has a state field
            posts = posts.filter(user_sry=usersry, user__state=user_state)

        # Annotate the queryset with reactions, comments, etc.
        posts = posts.annotate(
            total_reactions=Count("reactions"),
            total_comments=Count("comments"),
            total_views=Count("views"),
            total_reposts=Count("reposts")
        )

        # Get top posts (based on reactions)
        top_posts = posts.order_by("-reactions")[:10]

        # Get latest posts
        latest_posts = posts.order_by("-created_at")[:10]

        # Get media posts (posts with images or audio)
        media_posts = posts.filter(
            Q(image__isnull=False) | Q(audio__isnull=False))

        # Get people associated with the hashtag
        associated_people = User.objects.filter(post__in=posts).distinct()

        return Response(
            {
                "top_posts": PostSerializer(top_posts, many=True).data,
                "latest_posts": PostSerializer(latest_posts, many=True).data,
                "media_posts": PostSerializer(media_posts, many=True).data,
                "associated_people": UserSerializer(associated_people, many=True).data,
            }
        )

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def react(self, request, pk=None):
        """
        Custom action to react to a post.
        """
        post = self.get_object()
        user = request.user

        existing_reaction = Reaction.objects.filter(user=user, post=post).first()

        if existing_reaction:
            return Response(
                {"status": "You have already reacted to this post."},
                status=status.HTTP_400_BAD_REQUEST
            )
        Reaction.objects.create(
            user=user,
            post=post,
            content_object=post
        )

        return Response({"status": "Reaction added successfully."}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unreact(self, request, pk=None):
        """
        Custom action to remove a reaction from a post.
        """
        post = self.get_object()
        Reaction.objects.filter(
            user=request.user, post=post).delete()
        return Response({"status": "reaction removed"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def repost(self, request, pk=None):
        """
        Custom action to repost a post.
        """
        post = self.get_object()
        Repost.objects.create(
            user=request.user, post=post, content_object=post)
        return Response({"status": "a reaction to post"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unrepost(self, request, pk=None):
        """
        Custom action to remove a repost of a post.
        """
        post = self.get_object()
        Repost.objects.filter(user=request.user, post=post).delete()
        return Response({"status": "reaction removed"})

    @action(detail=False, methods=["get"])
    def trending(self, request):
        """
        Custom action to get trending hashtags.
        """
        trending_hashtags = (
            Post.objects.values("hashtags")
            .annotate(count=Count("id"))
            .order_by("-count")[:10]
        )
        return Response(trending_hashtags)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def bookmark(self, request, pk=None):
        """
        Custom action to bookmark a post.
        """
        post = self.get_object()
        Bookmark.objects.create(
            user=request.user, post=post, content_object=post)
        return Response({"status": "post bookmarked"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unbookmark(self, request, pk=None):
        """
        Custom action to remove a bookmark from a post.
        """
        post = self.get_object()
        Bookmark.objects.filter(user=request.user, post=post).delete()
        return Response({"status": "bookmark removed"})


# ViewSet for User model
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserActivitySerializer

    def get_object(self):
        return User.objects.get(pk=self.kwargs["pk"])

    @action(detail=False, methods=["post"])
    def activity(self, request):
        """
        Custom action to get user activity statistics.
        """
        try:
            user_id = request.data["user_id"]
            user = User.objects.get(id=user_id)
            posts = Post.objects.filter(user=user).annotate(
                total_comments=Count('comments', distinct=True),
                total_reactions=Count('reactions', distinct=True),
                total_views=Count('views', distinct=True),
                total_reposts=Count('reposts', distinct=True),
                total_bookmarks=Count('bookmarks', distinct=True)
            )
            comments = Comment.objects.filter(user=user).annotate(
                total_comments=Count('subcomments', distinct=True),
                total_reactions=Count('reactions', distinct=True),
                total_reposts=Count('reposts', distinct=True),
                total_bookmarks=Count('bookmarks', distinct=True)
            )
            reactions = Reaction.objects.filter(user=user)
            reposts = Repost.objects.filter(user=user)
            followers = Follow.objects.filter(following=user)
            followings = Follow.objects.filter(follower=user)
            bookmarks = Bookmark.objects.filter(user=user)
            polls = Poll.objects.filter(user=user)

            data = {
                "posts": posts,
                "comments": comments,
                "reactions": reactions,
                "repost": reposts,
                "followers": followers,
                "followings": followings,
                "bookmarks": bookmarks,
                "polls": polls,
                "user_id": user_id,
                "user": user
            }
            serializer = self.get_serializer(
                data, context={'request': request})
            return Response(serializer.data)
        except Exception:
            raise Http404("User Activities not found")

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def follow(self, request, pk=None):
        """
        Custom action to follow a user.
        """
        user_to_follow = self.get_object()
        Follow.objects.create(
            follower=request.user, following=user_to_follow)
        return Response({"status": f"following {user_to_follow.username}"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unfollow(self, request, pk=None):
        """
        Custom action to unfollow a user.
        """
        user_to_unfollow = self.get_object()
        Follow.objects.filter(
            follower=request.user, following=user_to_unfollow
        ).delete()
        return Response({"status": f"unfollowed {user_to_unfollow.username}"})


# ViewSet for Comment model
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override get_queryset to add annotations for subcomment, reaction, view, and repost counts.
        """
        # Get the ContentType for Post
        post_content_type = ContentType.objects.get_for_model(Post)

        queryset = super().get_queryset()

        # Annotate the queryset with counts
        queryset = queryset.annotate(
            total_comments=Count("subcomments"),
            total_reactions=Count("reactions"),
            total_reposts=Count("reposts"),
            total_bookmarks=Count("bookmarks"),
        )
        return queryset

    def list(self, request):
        post = request.query_params.get("post", None)
        parent_comment = request.query_params.get("parent", None)
        queryset = self.get_queryset()  # Use your existing queryset logic

        if post:
            queryset = queryset.filter(post=post)  # Filter by category slug
        if parent_comment:
            queryset = queryset.filter(parent_comment=parent_comment)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def react(self, request, pk=None):
        """
        Custom action to react to a post.
        """
        comment = self.get_object()
        user = request.user

       
        existing_reaction = Reaction.objects.filter(user=user, comment=comment).first()

        if existing_reaction:
            return Response(
                {"status": "You have already reacted to this comment."},
                status=status.HTTP_400_BAD_REQUEST
            )

        Reaction.objects.create(
            user=user,
            content_object=comment,
            comment=comment
        )


    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unreact(self, request, pk=None):
        """
        Custom action to remove a reaction from a post.
        """
        comment = self.get_object()
        Reaction.objects.filter(
            user=request.user, comment=comment
        ).delete()
        return Response({"status": "reaction removed"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def repost(self, request, pk=None):
        """
        Custom action to repost a post.
        """
        comment = self.get_object()
        Repost.objects.create(
            user=request.user, content_object=comment, comment=comment)
        return Response({"status": "a reaction to post"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unrepost(self, request, pk=None):
        """
        Custom action to remove a repost of a post.
        """
        comment = self.get_object()
        Repost.objects.filter(
            user=request.user, comment=comment
        ).delete()
        return Response({"status": "reaction removed"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def bookmark(self, request, pk=None):
        """
        Custom action to bookmark a post.
        """
        comment = self.get_object()
        Bookmark.objects.create(
            user=request.user, content_object=comment, comment=comment)
        return Response({"status": "post bookmarked"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unbookmark(self, request, pk=None):
        """
        Custom action to remove a bookmark from a post.
        """
        comment = self.get_object()
        Bookmark.objects.filter(
            user=request.user, comment=comment
        ).delete()
        return Response({"status": "bookmark removed"})


# ViewSet for Reaction model
class ReactionViewSet(viewsets.ModelViewSet):
    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Repost model
class RepostViewSet(viewsets.ModelViewSet):
    queryset = Repost.objects.all()
    serializer_class = RepostSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Follow model
class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        following_id = kwargs.get('pk')

        if not following_id:
            raise Http404("Following ID is required.")

        try:
            follow = Follow.objects.get(
                follower=request.user, following_id=following_id)
            follow.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Follow.DoesNotExist:
            raise Http404("Follow not found.")


# ViewSet for View model
class ViewViewSet(viewsets.ModelViewSet):
    queryset = View.objects.all()
    serializer_class = ViewSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Bookmark model
class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]


# ViewSet for Poll model
class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def vote(self, request, pk=None):
        """
        Custom action to vote in a poll.
        """
        poll = self.get_object()
        option = request.data.get("option")
        PollVote.objects.create(user=request.user, poll=poll, option=option)
        return Response({"status": "vote casted"})


# ViewSet for PollVote model
class PollVoteViewSet(viewsets.ModelViewSet):
    queryset = PollVote.objects.all()
    serializer_class = PollVoteSerializer
    permission_classes = [IsAuthenticated]


def status_view(request):
    return JsonResponse({"status": "up"})
