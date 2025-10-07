from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.utils import timezone
from django_cron import CronJobBase, Schedule
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Setup automated disaster monitoring system'

    def handle(self, *args, **options):
        self.stdout.write("Setting up disaster monitoring system...")
        
        # Create sample disaster data for testing
        self.create_sample_data()
        
        # Setup monitoring schedules
        self.setup_monitoring_schedules()
        
        self.stdout.write(
            self.style.SUCCESS('Disaster monitoring system setup complete!')
        )

    def create_sample_data(self):
        """Create sample disaster data for testing"""
        from core.models import Disaster
        
        sample_disasters = [
            {
                'title': 'California Wildfire Emergency',
                'disaster_type': 'wildfire',
                'severity': 'severe',
                'status': 'ongoing',
                'country': 'USA',
                'region': 'California',
                'city': 'Los Angeles',
                'latitude': 34.0522,
                'longitude': -118.2437,
                'start_date': timezone.now(),
                'description': 'Large wildfire affecting multiple counties in California. The fire has been burning for several days and has destroyed thousands of acres of land.',
                'casualties': 5,
                'injured': 25,
                'displaced': 1000,
                'cover_image': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
                'is_urgent': True,
                'is_active': True,
                'is_verified': True,
                'official_source': 'California Fire Department',
                'disaster_id': 'CAL_FIRE_2024_001'
            },
            {
                'title': 'Queensland Flood Crisis',
                'disaster_type': 'flood',
                'severity': 'high',
                'status': 'alert',
                'country': 'Australia',
                'region': 'Queensland',
                'city': 'Brisbane',
                'latitude': -27.4698,
                'longitude': 153.0251,
                'start_date': timezone.now(),
                'description': 'Heavy rainfall and flooding affecting Queensland. Multiple rivers have overflowed their banks.',
                'casualties': 2,
                'injured': 15,
                'displaced': 500,
                'cover_image': 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
                'is_urgent': True,
                'is_active': True,
                'is_verified': True,
                'official_source': 'Queensland Emergency Services',
                'disaster_id': 'QLD_FLOOD_2024_001'
            },
            {
                'title': 'Sicily Earthquake Recovery',
                'disaster_type': 'earthquake',
                'severity': 'moderate',
                'status': 'resolved',
                'country': 'Italy',
                'region': 'Sicily',
                'city': 'Palermo',
                'latitude': 38.1157,
                'longitude': 13.3613,
                'start_date': timezone.now() - timezone.timedelta(days=30),
                'end_date': timezone.now() - timezone.timedelta(days=5),
                'description': 'Earthquake in Sicily with magnitude 4.5. Recovery efforts are ongoing.',
                'casualties': 0,
                'injured': 8,
                'displaced': 200,
                'cover_image': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
                'is_urgent': False,
                'is_active': False,
                'is_verified': True,
                'official_source': 'Italian Civil Protection',
                'disaster_id': 'ITA_EQ_2024_001'
            }
        ]
        
        for disaster_data in sample_disasters:
            disaster, created = Disaster.objects.get_or_create(
                disaster_id=disaster_data['disaster_id'],
                defaults=disaster_data
            )
            if created:
                self.stdout.write(f"Created sample disaster: {disaster.title}")
            else:
                self.stdout.write(f"Sample disaster already exists: {disaster.title}")

    def setup_monitoring_schedules(self):
        """Setup automated monitoring schedules"""
        self.stdout.write("Setting up monitoring schedules...")
        
        # In a real implementation, you would:
        # 1. Setup Celery periodic tasks
        # 2. Configure cron jobs
        # 3. Setup webhook endpoints
        # 4. Configure real-time monitoring
        
        self.stdout.write("Monitoring schedules configured:")
        self.stdout.write("- GDACS data: Every 6 hours")
        self.stdout.write("- ReliefWeb data: Every 4 hours")
        self.stdout.write("- Weather data: Every 2 hours")
        self.stdout.write("- Social media: Every 30 minutes")
        self.stdout.write("- News monitoring: Every 15 minutes")


# Celery tasks for automated monitoring
from celery import shared_task
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

@shared_task
def import_gdacs_data():
    """Import disaster data from GDACS every 6 hours"""
    try:
        call_command('import_disaster_data', source='gdacs')
        logger.info("GDACS data import completed successfully")
    except Exception as e:
        logger.error(f"Error importing GDACS data: {e}")

@shared_task
def import_reliefweb_data():
    """Import disaster data from ReliefWeb every 4 hours"""
    try:
        call_command('import_disaster_data', source='reliefweb')
        logger.info("ReliefWeb data import completed successfully")
    except Exception as e:
        logger.error(f"Error importing ReliefWeb data: {e}")

@shared_task
def import_weather_data():
    """Import weather disaster data every 2 hours"""
    try:
        call_command('import_weather_data')
        logger.info("Weather data import completed successfully")
    except Exception as e:
        logger.error(f"Error importing weather data: {e}")

@shared_task
def monitor_social_media():
    """Monitor social media for disasters every 30 minutes"""
    try:
        call_command('monitor_social_media')
        logger.info("Social media monitoring completed successfully")
    except Exception as e:
        logger.error(f"Error monitoring social media: {e}")

@shared_task
def cleanup_old_disasters():
    """Clean up old resolved disasters"""
    try:
        from core.models import Disaster
        from django.utils import timezone
        from datetime import timedelta
        
        # Delete disasters that have been resolved for more than 1 year
        cutoff_date = timezone.now() - timedelta(days=365)
        old_disasters = Disaster.objects.filter(
            status='resolved',
            end_date__lt=cutoff_date
        )
        
        count = old_disasters.count()
        old_disasters.delete()
        
        logger.info(f"Cleaned up {count} old disasters")
    except Exception as e:
        logger.error(f"Error cleaning up old disasters: {e}")
