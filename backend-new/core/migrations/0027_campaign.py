import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0026_alter_treeproject_cover_image_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Campaign",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("short_description", models.CharField(blank=True, max_length=500, null=True)),
                ("campaign_type", models.CharField(choices=[("disaster_relief", "Disaster Relief"), ("tree_planting", "Tree Planting"), ("renewable_energy", "Renewable Energy"), ("ocean_cleanup", "Ocean Cleanup"), ("wildlife_conservation", "Wildlife Conservation"), ("climate_education", "Climate Education"), ("carbon_offset", "Carbon Offset"), ("sustainable_agriculture", "Sustainable Agriculture"), ("waste_reduction", "Waste Reduction"), ("water_conservation", "Water Conservation"), ("air_quality", "Air Quality Improvement"), ("biodiversity", "Biodiversity Protection"), ("renewable_transport", "Renewable Transport"), ("green_building", "Green Building"), ("environmental_justice", "Environmental Justice"), ("other", "Other")], max_length=50)),
                ("status", models.CharField(choices=[("draft", "Draft"), ("pending_approval", "Pending Approval"), ("active", "Active"), ("paused", "Paused"), ("completed", "Completed"), ("cancelled", "Cancelled")], default="draft", max_length=20)),
                ("urgency_level", models.CharField(choices=[("low", "Low"), ("medium", "Medium"), ("high", "High"), ("critical", "Critical")], default="medium", max_length=20)),
                ("organization_name", models.CharField(blank=True, max_length=200, null=True)),
                ("organization_description", models.TextField(blank=True, null=True)),
                ("organization_website", models.URLField(blank=True, null=True)),
                ("organization_logo", models.CharField(blank=True, max_length=500, null=True)),
                ("country", models.CharField(max_length=100)),
                ("region", models.CharField(blank=True, max_length=100, null=True)),
                ("city", models.CharField(blank=True, max_length=100, null=True)),
                ("latitude", models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ("longitude", models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ("address", models.TextField(blank=True, null=True)),
                ("target_amount", models.DecimalField(decimal_places=2, help_text="Target amount in USD", max_digits=12)),
                ("amount_raised", models.DecimalField(decimal_places=2, default=0, help_text="Amount raised in USD", max_digits=12)),
                ("target_metric", models.CharField(blank=True, help_text="e.g., '1000 trees planted', '500 kg waste collected'", max_length=100, null=True)),
                ("current_metric", models.DecimalField(decimal_places=2, default=0, help_text="Current progress metric", max_digits=12)),
                ("metric_unit", models.CharField(blank=True, help_text="e.g., 'trees', 'kg', 'people helped'", max_length=50, null=True)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("cover_image", models.CharField(blank=True, max_length=500, null=True)),
                ("gallery", models.JSONField(blank=True, default=list)),
                ("video_url", models.URLField(blank=True, null=True)),
                ("is_ai_generated", models.BooleanField(default=False)),
                ("ai_source", models.CharField(blank=True, help_text="Source of AI generation (e.g., 'disaster_report', 'climate_data')", max_length=100, null=True)),
                ("ai_confidence_score", models.DecimalField(blank=True, decimal_places=2, help_text="AI confidence score 0-1", max_digits=3, null=True)),
                ("disaster_type", models.CharField(blank=True, max_length=100, null=True)),
                ("disaster_severity", models.CharField(blank=True, max_length=50, null=True)),
                ("affected_population", models.PositiveIntegerField(blank=True, null=True)),
                ("emergency_contact", models.CharField(blank=True, max_length=200, null=True)),
                ("emergency_phone", models.CharField(blank=True, max_length=20, null=True)),
                ("expected_co2_reduction", models.DecimalField(blank=True, decimal_places=2, help_text="Expected CO2 reduction in tons", max_digits=10, null=True)),
                ("environmental_benefits", models.TextField(blank=True, null=True)),
                ("sustainability_goals", models.JSONField(blank=True, default=list, help_text="List of UN SDGs addressed")),
                ("is_verified", models.BooleanField(default=False)),
                ("verification_status", models.CharField(choices=[("pending", "Pending Review"), ("under_review", "Under Review"), ("approved", "Approved"), ("rejected", "Rejected"), ("needs_more_info", "Needs More Information")], default="pending", max_length=20)),
                ("verification_documents", models.JSONField(blank=True, default=list)),
                ("verification_notes", models.TextField(blank=True, null=True)),
                ("verification_date", models.DateTimeField(blank=True, null=True)),
                ("rejection_reason", models.TextField(blank=True, null=True)),
                ("verification_score", models.DecimalField(blank=True, decimal_places=2, help_text="Verification confidence score 0-1", max_digits=3, null=True)),
                ("contact_person", models.CharField(max_length=200)),
                ("contact_email", models.EmailField(max_length=254)),
                ("contact_phone", models.CharField(blank=True, max_length=20, null=True)),
                ("facebook_url", models.URLField(blank=True, null=True)),
                ("twitter_url", models.URLField(blank=True, null=True)),
                ("instagram_url", models.URLField(blank=True, null=True)),
                ("linkedin_url", models.URLField(blank=True, null=True)),
                ("view_count", models.PositiveIntegerField(default=0)),
                ("share_count", models.PositiveIntegerField(default=0)),
                ("donation_count", models.PositiveIntegerField(default=0)),
                ("creator", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="created_campaigns", to=settings.AUTH_USER_MODEL)),
                ("verified_by", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="verified_campaigns", to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
        migrations.AddIndex(
            model_name="campaign",
            index=models.Index(fields=["campaign_type"], name="core_campai_campaig_idx"),
        ),
        migrations.AddIndex(
            model_name="campaign",
            index=models.Index(fields=["status"], name="core_campai_status_idx"),
        ),
        migrations.AddIndex(
            model_name="campaign",
            index=models.Index(fields=["country"], name="core_campai_country_idx"),
        ),
        migrations.AddIndex(
            model_name="campaign",
            index=models.Index(fields=["urgency_level"], name="core_campai_urgency_idx"),
        ),
        migrations.AddIndex(
            model_name="campaign",
            index=models.Index(fields=["is_verified"], name="core_campai_is_veri_idx"),
        ),
        migrations.AddIndex(
            model_name="campaign",
            index=models.Index(fields=["is_ai_generated"], name="core_campai_is_ai_g_idx"),
        ),
        migrations.CreateModel(
            name="CampaignUpdate",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("content", models.TextField()),
                ("images", models.JSONField(blank=True, default=list)),
                ("metric_progress", models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("campaign", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="updates", to="core.campaign")),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="CampaignDonation",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("amount", models.DecimalField(decimal_places=2, help_text="Amount in USD", max_digits=10)),
                ("payment_reference", models.CharField(max_length=100, unique=True)),
                ("payment_status", models.CharField(choices=[("pending", "Pending"), ("completed", "Completed"), ("failed", "Failed"), ("refunded", "Refunded")], default="pending", max_length=20)),
                ("is_anonymous", models.BooleanField(default=False)),
                ("message", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("campaign", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="donations", to="core.campaign")),
                ("donor", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="campaign_donations", to=settings.AUTH_USER_MODEL)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
