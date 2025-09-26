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
    video = models.TextField(blank=True, null=True)
    audio = models.FileField(upload_to="posts/audio/", blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
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


class TreeProject(models.Model):
    """
    Model for tree planting projects across Africa
    """
    PROJECT_STATUS = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
        ('pending_approval', 'Pending Approval'),
    ]
    
    PROJECT_TYPES = [
        ('reforestation', 'Reforestation'),
        ('urban_greening', 'Urban Greening'),
        ('agroforestry', 'Agroforestry'),
        ('mangrove_restoration', 'Mangrove Restoration'),
        ('community_garden', 'Community Garden'),
        ('school_garden', 'School Garden'),
        ('carbon_offset', 'Carbon Offset'),
    ]
    
    # Basic Information
    name = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True, null=True)
    
    # Organization Details
    organization = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='tree_projects'
    )
    organization_name = models.CharField(max_length=200)
    organization_description = models.TextField(blank=True, null=True)
    organization_website = models.URLField(blank=True, null=True)
    organization_logo = models.CharField(max_length=500, blank=True, null=True, help_text="Organization logo URL or path")
    
    # Location Details
    country = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    address = models.TextField(blank=True, null=True)
    
    # Project Details
    project_type = models.CharField(max_length=50, choices=PROJECT_TYPES)
    status = models.CharField(max_length=20, choices=PROJECT_STATUS, default='pending_approval')
    
    # Tree Information
    target_trees = models.PositiveIntegerField()
    trees_planted = models.PositiveIntegerField(default=0)
    tree_species = models.JSONField(default=list, blank=True)  # List of tree species
    tree_price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price in USD")
    
    # Environmental Impact
    co2_absorption_per_tree = models.DecimalField(max_digits=8, decimal_places=2, default=22.0)
    biodiversity_impact = models.TextField(blank=True, null=True)
    soil_improvement = models.TextField(blank=True, null=True)
    water_conservation = models.TextField(blank=True, null=True)
    
    # Media
    cover_image = models.CharField(max_length=500, blank=True, null=True, help_text="Project cover image URL or path")
    gallery = models.JSONField(default=list, blank=True, help_text="List of image URLs")
    
    # Project Timeline
    start_date = models.DateField()
    expected_completion = models.DateField()
    actual_completion = models.DateField(null=True, blank=True)
    
    # Funding
    total_budget = models.DecimalField(max_digits=12, decimal_places=2, help_text="Budget in USD")
    funds_raised = models.DecimalField(max_digits=12, decimal_places=2, default=0, help_text="Funds raised in USD")
    funding_goal = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, help_text="Funding goal in USD")
    
    # Verification
    is_verified = models.BooleanField(default=False)
    verification_documents = models.JSONField(default=list, blank=True)
    verification_date = models.DateTimeField(null=True, blank=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='verified_projects'
    )
    
    # Contact Information
    contact_person = models.CharField(max_length=200)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    
    # Social Media
    facebook_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['country']),
            models.Index(fields=['project_type']),
            models.Index(fields=['status']),
            models.Index(fields=['is_verified']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.country}"
    
    @property
    def progress_percentage(self):
        """Calculate project progress percentage"""
        if self.target_trees == 0:
            return 0
        return min((self.trees_planted / self.target_trees) * 100, 100)
    
    @property
    def funding_percentage(self):
        """Calculate funding progress percentage"""
        if not self.funding_goal or self.funding_goal == 0:
            return 0
        return min((self.funds_raised / self.funding_goal) * 100, 100)
    
    @property
    def total_co2_offset(self):
        """Calculate total CO2 offset from planted trees"""
        return self.trees_planted * self.co2_absorption_per_tree
    
    def get_absolute_url(self):
        return f"/projects/{self.id}/"


class TreeProjectUpdate(models.Model):
    """
    Model for project updates and progress reports
    """
    project = models.ForeignKey(
        TreeProject, 
        on_delete=models.CASCADE, 
        related_name='updates'
    )
    title = models.CharField(max_length=200)
    content = models.TextField()
    images = models.JSONField(default=list, blank=True)  # List of image file paths
    trees_planted_this_update = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Update for {self.project.name}: {self.title}"


class TreeProjectDonation(models.Model):
    """
    Model for tracking donations to tree projects
    """
    project = models.ForeignKey(
        TreeProject, 
        on_delete=models.CASCADE, 
        related_name='donations'
    )
    donor = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='tree_donations'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="Amount in USD")
    trees_purchased = models.PositiveIntegerField()
    payment_reference = models.CharField(max_length=100, unique=True)
    payment_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('completed', 'Completed'),
            ('failed', 'Failed'),
            ('refunded', 'Refunded'),
        ],
        default='pending'
    )
    dedication_message = models.TextField(blank=True, null=True)
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Donation to {self.project.name} by {self.donor.username}"
