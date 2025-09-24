# models.py
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils.html import strip_tags
import re


class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ("post", "Post"),
        ("comment", "Comment"),
        ("reaction", "Reaction"),
        ("repost", "Repost"),
        ("poll", "Poll"),
        ("follow", "Follow"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications"
    )
    notification_type = models.CharField(
        max_length=10, choices=NOTIFICATION_TYPES)
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, blank=True
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey("content_type", "object_id")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_content(self):
        """
        Retrieves the actual content related to the notification.
        """
        if self.content_object:
            return self.content_object
        return None

    def __str__(self):
        return f"Notification for {self.user.username}: {self.message}"


class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField()
    hashtags = models.CharField(max_length=255, blank=True, null=True)
    image = models.TextField(blank=True, null=True)
    audio = models.FileField(upload_to="posts/audio/", blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    emoji = models.CharField(max_length=255, blank=True)
    gif = models.URLField(blank=True)
    is_donation = models.BooleanField(default=False)
    donation_approved = models.BooleanField(default=False)
    visibility = models.CharField(
        max_length=10,
        choices=[("Everyone", "Everyone"), ("Friends", "Friends")],
        default="Everyone",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.content:
            self.hashtags = self.extract_hashtags(self.content)
        super().save(*args, **kwargs)

    def extract_hashtags(self, content):
        """
        Extract hashtags from content.
        """
        if not content:
            return ""
        content = strip_tags(content)
        hashtags = re.findall(r"#(\w+)", content)
        return " ".join(hashtags)

    def convert_hashtags_to_links(self, content):
        """
        Converts hashtags in the content to clickable links.
        """

        def replace_hashtag(match):
            hashtag = match.group(1)
            url = f"/search/?hashtag={hashtag}"
            return f'<a href="{url}">#{hashtag}</a>'

        return re.sub(r"#(\w+)", replace_hashtag, content)

    def get_content_with_links(self):
        """
        Returns the content with hashtags converted to clickable links.
        """
        return self.convert_hashtags_to_links(self.content)

    def clean(self):
        """
        Custom validation to ensure 'visibility' is a valid choice.
        """
        super().clean()
        if (
            self.visibility
            not in dict(self._meta.get_field("visibility").choices).keys()
        ):
            raise ValidationError(
                f"Invalid value for 'visibility': {self.visibility}")

    def image_url(self):
        """
        Returns the full URL for the image if it exists.
        """
        if self.image and hasattr(self.image, "url"):
            return self.image.url
        return None

    def audio_url(self):
        """
        Returns the full URL for the audio file if it exists.
        """
        if self.audio and hasattr(self.audio, "url"):
            return self.audio.url
        return None

    class Meta:
        ordering = ["-created_at"]


class Poll(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    options = models.JSONField()
    duration = models.DurationField()
    visibility = models.CharField(
        max_length=10,
        choices=[("Everyone", "Everyone"), ("Friends", "Friends")],
        default="Everyone",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question


class PollInteraction(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="poll_interactions",
        on_delete=models.CASCADE,
    )
    poll = models.ForeignKey(
        Poll, related_name="interactions", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)


class PollVote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    poll = models.ForeignKey(
        Poll, on_delete=models.CASCADE, related_name="votes")
    option = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} voted on {self.poll.question}"


class Comment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments"
    )
    post = models.ForeignKey(
        Post, related_name="comments", on_delete=models.CASCADE)
    parent_comment = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="subcomments",
        null=True,
        blank=True,
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.content[:20]

    @property
    def reaction_count(self):
        return self.reactions.count()

    def image_url(self):
        """
        Returns the full URL for the image if it exists.
        """
        if self.image and hasattr(self.image, "url"):
            return self.image.url
        return None

    def get_replies(self):
        """
        Returns replies to this comment.
        """
        return Comment.objects.filter(parent_comment=self)

    def get_all_comments(self):
        """
        Returns all comments, including replies.
        """
        comments = [self]
        stack = list(self.get_replies())
        while stack:
            comment = stack.pop()
            comments.append(comment)
            stack.extend(comment.get_replies())
        return comments

    class Meta:
        ordering = ["-created_at"]


class Reaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, related_name="reactions", on_delete=models.CASCADE, null=True,
        blank=True,)
    comment = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE,
        related_name="reactions",
        null=True,
        blank=True,
    )
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, blank=True
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey("content_type", "object_id")
    reaction_type = models.CharField(
        max_length=10,
        choices=[
            ("Like", "Like"),
            ("Love", "Love"),
            ("Haha", "Haha"),
            ("Wow", "Wow"),
            ("Sad", "Sad"),
            ("Angry", "Angry"),
        ],
        default="Like",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} reacted {self.reaction_type} on {self.post.title}"


class Repost(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="reposts", null=True, blank=True
    )
    comment = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE,
        related_name="reposts",
        null=True,
        blank=True,
    )
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, blank=True
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey("content_type", "object_id")
    poll = models.ForeignKey(
        Poll, on_delete=models.CASCADE, related_name="reposts", null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["user"]),
            models.Index(fields=["post"]),
            models.Index(fields=["poll"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.user.username} reposted"


class View(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="views", null=True, blank=True
    )
    poll = models.ForeignKey(
        Poll, on_delete=models.CASCADE, related_name="views", null=True, blank=True
    )
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, blank=True
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey("content_type", "object_id")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["user"]),
            models.Index(fields=["post"]),
            models.Index(fields=["poll"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.user.username} viewed"


class Follow(models.Model):
    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="following", on_delete=models.CASCADE
    )
    following = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="followers", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        """
        Ensures a user cannot follow themselves.
        """
        if self.follower == self.followed:
            raise ValidationError("User cannot follow themselves.")

    class Meta:
        unique_together = ('follower', 'following')

    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"


class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="bookmarks",  null=True,
                             blank=True, on_delete=models.CASCADE)
    comment = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE,
        related_name="bookmarks",
        null=True,
        blank=True,
    )
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, blank=True
    )
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey("content_type", "object_id")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "post")
        indexes = [
            models.Index(fields=["user"]),
            models.Index(fields=["post"]),
        ]

    def __str__(self):
        return f"{self.user.username} bookmarked {self.post.title}"
