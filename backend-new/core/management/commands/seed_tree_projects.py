from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from core.models import TreeProject
from decimal import Decimal
from datetime import date, timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed the database with sample tree projects'

    def handle(self, *args, **options):
        # Create a sample admin user if it doesn't exist
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@climatewavers.com',
                'first_name': 'Admin',
                'last_name': 'User',
                'is_staff': True,
                'is_superuser': True
            }
        )
        
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('Created admin user'))

        # Sample tree projects data
        sample_projects = [
            {
                'name': 'Lagos Urban Greening Initiative',
                'description': 'A comprehensive urban greening project aimed at planting 10,000 trees across Lagos to combat air pollution and create green spaces for communities.',
                'short_description': 'Urban greening project in Lagos with 10,000 trees',
                'organization_name': 'Green Lagos Foundation',
                'organization_description': 'A non-profit organization dedicated to environmental conservation in Lagos State.',
                'organization_website': 'https://greenlagos.org',
                'country': 'Nigeria',
                'region': 'Lagos State',
                'city': 'Lagos',
                'latitude': Decimal('6.5244'),
                'longitude': Decimal('3.3792'),
                'address': 'Victoria Island, Lagos',
                'project_type': 'urban_greening',
                'target_trees': 10000,
                'trees_planted': 3500,
                'tree_species': ['Mango', 'Palm', 'Neem', 'Mahogany'],
                'tree_price': Decimal('5.00'),  # $5 USD per tree
                'co2_absorption_per_tree': Decimal('25.0'),
                'biodiversity_impact': 'Supports local bird species and provides habitat for urban wildlife',
                'soil_improvement': 'Helps prevent soil erosion and improves soil quality',
                'water_conservation': 'Trees help with water retention and reduce runoff',
                'start_date': date.today() - timedelta(days=90),
                'expected_completion': date.today() + timedelta(days=180),
                'total_budget': Decimal('50000.00'),  # $50,000 USD total budget
                'funds_raised': Decimal('17500.00'),  # $17,500 USD raised
                'funding_goal': Decimal('50000.00'),  # $50,000 USD goal
                'contact_person': 'Dr. Adebayo Johnson',
                'contact_email': 'adebayo@greenlagos.org',
                'contact_phone': '+234-801-234-5678',
                'facebook_url': 'https://facebook.com/greenlagos',
                'twitter_url': 'https://twitter.com/greenlagos',
                'status': 'active',
                'is_verified': True
            },
            {
                'name': 'Nairobi Reforestation Project',
                'description': 'Large-scale reforestation initiative in Nairobi to restore degraded forest areas and create sustainable livelihoods for local communities.',
                'short_description': 'Reforestation project in Nairobi with 15,000 trees',
                'organization_name': 'Kenya Forest Conservation Society',
                'organization_description': 'Leading environmental organization in Kenya focused on forest conservation and community development.',
                'organization_website': 'https://kenyaforests.org',
                'country': 'Kenya',
                'region': 'Nairobi County',
                'city': 'Nairobi',
                'latitude': Decimal('-1.2921'),
                'longitude': Decimal('36.8219'),
                'address': 'Karura Forest, Nairobi',
                'project_type': 'reforestation',
                'target_trees': 15000,
                'trees_planted': 8500,
                'tree_species': ['Acacia', 'Eucalyptus', 'Cedar', 'Bamboo'],
                'tree_price': Decimal('3.00'),  # $3 USD per tree
                'co2_absorption_per_tree': Decimal('30.0'),
                'biodiversity_impact': 'Restores native forest ecosystem and supports endangered species',
                'soil_improvement': 'Prevents soil erosion and improves water retention',
                'water_conservation': 'Protects watersheds and improves water quality',
                'start_date': date.today() - timedelta(days=120),
                'expected_completion': date.today() + timedelta(days=60),
                'total_budget': Decimal('45000.00'),  # $45,000 USD total budget
                'funds_raised': Decimal('25500.00'),  # $25,500 USD raised
                'funding_goal': Decimal('45000.00'),  # $45,000 USD goal
                'contact_person': 'Mary Wanjiku',
                'contact_email': 'mary@kenyaforests.org',
                'contact_phone': '+254-700-123-456',
                'facebook_url': 'https://facebook.com/kenyaforests',
                'twitter_url': 'https://twitter.com/kenyaforests',
                'status': 'active',
                'is_verified': True
            },
            {
                'name': 'Cape Town Community Garden',
                'description': 'Community-driven urban agriculture project that combines food security with environmental benefits through agroforestry practices.',
                'short_description': 'Community garden project in Cape Town with fruit trees',
                'organization_name': 'Cape Town Green Communities',
                'organization_description': 'Community organization promoting sustainable urban agriculture and food security.',
                'organization_website': 'https://capetowngreen.org',
                'country': 'South Africa',
                'region': 'Western Cape',
                'city': 'Cape Town',
                'latitude': Decimal('-33.9249'),
                'longitude': Decimal('18.4241'),
                'address': 'Khayelitsha, Cape Town',
                'project_type': 'community_garden',
                'target_trees': 5000,
                'trees_planted': 2000,
                'tree_species': ['Apple', 'Pear', 'Plum', 'Citrus'],
                'tree_price': Decimal('2.00'),  # $2 USD per tree
                'co2_absorption_per_tree': Decimal('15.0'),
                'biodiversity_impact': 'Supports pollinators and creates food sources for wildlife',
                'soil_improvement': 'Improves soil fertility through organic matter',
                'water_conservation': 'Reduces water runoff and improves soil moisture',
                'start_date': date.today() - timedelta(days=60),
                'expected_completion': date.today() + timedelta(days=120),
                'total_budget': Decimal('10000.00'),  # $10,000 USD total budget
                'funds_raised': Decimal('4000.00'),  # $4,000 USD raised
                'funding_goal': Decimal('10000.00'),  # $10,000 USD goal
                'contact_person': 'Thabo Mthembu',
                'contact_email': 'thabo@capetowngreen.org',
                'contact_phone': '+27-21-123-4567',
                'facebook_url': 'https://facebook.com/capetowngreen',
                'twitter_url': 'https://twitter.com/capetowngreen',
                'status': 'active',
                'is_verified': True
            }
        ]

        # Create sample projects
        for project_data in sample_projects:
            project, created = TreeProject.objects.get_or_create(
                name=project_data['name'],
                defaults={
                    **project_data,
                    'organization': admin_user
                }
            )
            
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created project: {project.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Project already exists: {project.name}')
                )

        self.stdout.write(
            self.style.SUCCESS('Successfully seeded tree projects!')
        )
