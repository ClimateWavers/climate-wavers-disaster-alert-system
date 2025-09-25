from rest_framework import serializers
from .models import (
    Post,
    Poll,
    PollVote,
    Comment,
    Reaction,
    Repost,
    View,
    Follow,
    Bookmark,
    Notification,
)
from api.models import User
import requests
import json


def reverse_geocode(latitude, longitude):
    """
    Convert latitude and longitude to a human-readable address using OpenStreetMap Nominatim API
    """
    try:
        url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={latitude}&lon={longitude}&zoom=18&addressdetails=1"
        headers = {
            'User-Agent': 'ClimateWavers/1.0'
        }
        
        response = requests.get(url, headers=headers, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if 'display_name' in data:
                return data['display_name']
            elif 'address' in data:
                address = data['address']
                parts = []
                if 'city' in address:
                    parts.append(address['city'])
                elif 'town' in address:
                    parts.append(address['town'])
                elif 'village' in address:
                    parts.append(address['village'])
                
                if 'state' in address:
                    parts.append(address['state'])
                if 'country' in address:
                    parts.append(address['country'])
                
                return ', '.join(parts) if parts else f"{latitude}, {longitude}"
        
        return f"{latitude}, {longitude}"
    except Exception as e:
        print(f"Reverse geocoding error: {e}")
        return f"{latitude}, {longitude}"


class UserSerializer(serializers.ModelSerializer):
    is_following = serializers.SerializerMethodField()
    profile_picture = serializers.ReadOnlyField()

    def get_is_following(self, obj):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            return obj.followers.filter(follower=user).exists()
        return False
    
    def get_user_from_context(self):
        request = self.context.get("request", None)
        if request and hasattr(request, "user") and request.user.is_authenticated:
            return request.user
        return None

    class Meta:
        model = User
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    total_comments = serializers.IntegerField(read_only=True)
    total_reactions = serializers.IntegerField(read_only=True)
    total_views = serializers.IntegerField(read_only=True)
    total_reposts = serializers.IntegerField(read_only=True)
    total_bookmarks = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    is_reacted = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    is_reposted = serializers.SerializerMethodField()
    
    # Custom field handling for image, video and audio
    image = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    video = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    audio = serializers.FileField(required=False, allow_null=True)
    location = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def get_is_reacted(self, obj):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            return obj.reactions.filter(user=user).exists()
        return False

    def get_is_bookmarked(self, obj):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            return obj.bookmarks.filter(user=user).exists()
        return False

    def get_is_reposted(self, obj):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            return obj.reposts.filter(user=user).exists()
        return False

    def get_user_from_context(self):
        request = self.context.get("request", None)
        if request and hasattr(request, "user") and request.user.is_authenticated:
            return request.user
        return None

    class Meta:
        model = Post
        fields = "__all__"

    def validate_image(self, value):
        """Validate image field - should be a string (URL) or None"""
        if value is None or value == '':
            return None
        if isinstance(value, str):
            return value
        # If it's a file object, we'll handle it in the create method
        return value
    
    def validate_video(self, value):
        """Validate video field - should be a string (URL) or None"""
        if value is None or value == '':
            return None
        if isinstance(value, str):
            return value
        # If it's a file object, we'll handle it in the create method
        return value
    
    def validate_audio(self, value):
        """Validate audio field - should be a file or None"""
        if value is None or value == '':
            return None
        return value
    
    def validate_location(self, value):
        """Validate location field - convert coordinates to address if needed"""
        if value is None or value == '':
            return None
        
        # Check if it's coordinates (lat, lon format)
        if ',' in value and len(value.split(',')) == 2:
            try:
                lat, lon = value.split(',')
                lat = float(lat.strip())
                lon = float(lon.strip())
                
                # Convert coordinates to address
                address = reverse_geocode(lat, lon)
                return address
            except (ValueError, IndexError):
                # If parsing fails, return original value
                return value
        
        return value

    def create(self, validated_data):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            validated_data["user"] = user
        
        # Handle image field - if it's a file, we need to process it
        image_data = validated_data.get('image')
        if image_data and hasattr(image_data, 'read'):
            # If it's a file object, we need to handle it differently
            # For now, we'll skip it or handle it as needed
            validated_data['image'] = None
        
        return super().create(validated_data)


class CommentSerializer(serializers.ModelSerializer):
    total_comments = serializers.IntegerField(read_only=True)
    total_reactions = serializers.IntegerField(read_only=True)
    total_views = serializers.IntegerField(read_only=True)
    total_reposts = serializers.IntegerField(read_only=True)
    total_bookmarks = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    is_reposted = serializers.SerializerMethodField()
    is_reacted = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()

    def get_is_reacted(self, obj):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            return obj.reactions.filter(user=user).exists()
        return False

    def get_is_reposted(self, obj):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            return obj.reposts.filter(user=user).exists()
        return False

    def get_is_bookmarked(self, obj):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            return obj.bookmarks.filter(user=user).exists()
        return False

    def get_user_from_context(self):
        request = self.context.get("request", None)
        if request and hasattr(request, "user") and request.user.is_authenticated:
            return request.user
        return None

    class Meta:
        model = Comment
        fields = "__all__"
    
    def create(self, validated_data):
        user = self.get_user_from_context()
        if user and user.is_authenticated:
            validated_data["user"] = user
        return super().create(validated_data)


class ReactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = Reaction
        fields = "__all__"

    def get_content_type(self, obj):
        return 'post' if obj.content_type.model == 'post' else 'comments'


class ViewSerializer(serializers.ModelSerializer):
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = View
        fields = "__all__"

    def get_content_type(self, obj):
        return 'post' if obj.content_type.model == 'post' else 'comments'


class FollowSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = "__all__"

    def create(self, validated_data):
        # Add the user from the request context to the validated data
        follower = self.context["request"].user
        following = validated_data.get("following")
        
        # Check if the follow relationship already exists
        if Follow.objects.filter(follower=follower, following=following).exists():
            raise serializers.ValidationError("You are already following this user.")
        
        # Check if user is trying to follow themselves
        if follower == following:
            raise serializers.ValidationError("You cannot follow yourself.")
        
        validated_data["follower"] = follower
        return super().create(validated_data)


class BookmarkSerializer(serializers.ModelSerializer):
    post = PostSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = Bookmark
        fields = "__all__"

    def get_content_type(self, obj):
        return 'post' if obj.content_type.model == 'post' else 'comments'


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = "__all__"


class PollVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollVote
        fields = "__all__"


class RepostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)
    content_type = serializers.SerializerMethodField()
    poll = PollSerializer(read_only=True)

    class Meta:
        model = Repost
        fields = "__all__"

    def get_content_type(self, obj):
        return 'post' if obj.content_type.model == 'post' else 'comments'


class UserActivitySerializer(serializers.Serializer):
    posts = PostSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    repost = RepostSerializer(many=True, read_only=True)
    reactions = ReactionSerializer(many=True, read_only=True)
    followers = FollowSerializer(many=True, read_only=True)
    followings = FollowSerializer(many=True, read_only=True)
    bookmarks = BookmarkSerializer(many=True, read_only=True)
    polls = PollSerializer(many=True, read_only=True)
    user_id = serializers.CharField()
    user = UserSerializer(read_only=True)


class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    content = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = "__all__"
        extra_kwargs = {
            'post': {'write_only': True},
            'comment': {'write_only': True},
        }

    def get_content(self, obj):
        request = self.context.get("request")
        if obj.content_type.model == 'post':
            return PostSerializer(Post.objects.get(id=obj.object_id), context={'request': request}).data
        elif obj.content_type.model == 'comment':
            return CommentSerializer(Comment.objects.get(id=obj.object_id), context={'request': request}).data
        elif obj.content_type.model == 'follow':
            return FollowSerializer(Follow.objects.get(id=obj.object_id), context={'request': request}).data

        return None
