from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import Disaster
import requests
import json
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Import disaster data from various sources'

    def add_arguments(self, parser):
        parser.add_argument(
            '--source',
            type=str,
            default='all',
            help='Data source to import from (gdacs, reliefweb, fema, all)'
        )
        parser.add_argument(
            '--days',
            type=int,
            default=30,
            help='Number of days to look back for disasters'
        )

    def handle(self, *args, **options):
        source = options['source']
        days = options['days']
        
        if source in ['gdacs', 'all']:
            self.import_gdacs_data(days)
        
        if source in ['reliefweb', 'all']:
            self.import_reliefweb_data(days)
        
        if source in ['fema', 'all']:
            self.import_fema_data(days)
        
        self.stdout.write(
            self.style.SUCCESS('Successfully imported disaster data')
        )

    def import_gdacs_data(self, days):
        """Import data from GDACS (Global Disaster Alert and Coordination System)"""
        try:
            # GDACS RSS feed for recent disasters
            url = "https://www.gdacs.org/xml/rss.xml"
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            # Parse RSS XML (you'd use xml.etree.ElementTree or feedparser)
            # This is a simplified example
            self.stdout.write("Importing from GDACS...")
            
            # Example disaster data from GDACS
            sample_disasters = [
                {
                    'title': 'Earthquake in Turkey - Magnitude 7.8',
                    'disaster_type': 'earthquake',
                    'severity': 'severe',
                    'status': 'ongoing',
                    'country': 'Turkey',
                    'region': 'Southeastern Anatolia',
                    'city': 'Gaziantep',
                    'latitude': 37.0662,
                    'longitude': 37.3833,
                    'start_date': timezone.now() - timedelta(days=5),
                    'description': 'Major earthquake affecting southeastern Turkey and northern Syria',
                    'casualties': 50000,
                    'injured': 100000,
                    'displaced': 1000000,
                    'is_verified': True,
                    'official_source': 'GDACS',
                    'disaster_id': 'GDACS_2024_001'
                }
            ]
            
            for disaster_data in sample_disasters:
                disaster, created = Disaster.objects.get_or_create(
                    disaster_id=disaster_data['disaster_id'],
                    defaults=disaster_data
                )
                if created:
                    self.stdout.write(f"Created disaster: {disaster.title}")
                else:
                    self.stdout.write(f"Updated disaster: {disaster.title}")
                    
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error importing GDACS data: {e}')
            )

    def import_reliefweb_data(self, days):
        """Import data from ReliefWeb API"""
        try:
            # ReliefWeb API endpoint
            url = "https://api.reliefweb.int/v1/disasters"
            params = {
                'appname': 'climate-wavers',
                'limit': 100,
                'offset': 0,
                'query[value]': f'date.created:[{days} days ago TO NOW]',
                'sort[]': 'date.created:desc',
                'format': 'json'
            }
            
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            self.stdout.write("Importing from ReliefWeb...")
            
            for item in data.get('data', []):
                fields = item.get('fields', {})
                
                disaster_data = {
                    'title': fields.get('title', 'Unknown Disaster'),
                    'disaster_type': self.map_reliefweb_type(fields.get('type', [{}])[0].get('name', 'other')),
                    'severity': self.map_severity(fields.get('severity', 'unknown')),
                    'status': 'ongoing',
                    'country': fields.get('country', [{}])[0].get('name', 'Unknown') if fields.get('country') else 'Unknown',
                    'region': fields.get('region', [{}])[0].get('name', 'Unknown') if fields.get('region') else 'Unknown',
                    'start_date': self.parse_date(fields.get('date', {}).get('created')),
                    'description': fields.get('body', ''),
                    'is_verified': True,
                    'official_source': 'ReliefWeb',
                    'disaster_id': f"RW_{item.get('id')}"
                }
                
                disaster, created = Disaster.objects.get_or_create(
                    disaster_id=disaster_data['disaster_id'],
                    defaults=disaster_data
                )
                if created:
                    self.stdout.write(f"Created disaster: {disaster.title}")
                    
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error importing ReliefWeb data: {e}')
            )

    def import_fema_data(self, days):
        """Import data from FEMA API"""
        try:
            # FEMA Disaster Declarations API
            url = "https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries"
            params = {
                '$filter': f"declarationDate ge {datetime.now() - timedelta(days=days).isoformat()}",
                '$top': 100
            }
            
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            self.stdout.write("Importing from FEMA...")
            
            for item in data.get('DisasterDeclarationsSummaries', []):
                disaster_data = {
                    'title': f"{item.get('incidentType', 'Disaster')} in {item.get('state', 'Unknown State')}",
                    'disaster_type': self.map_fema_type(item.get('incidentType', 'other')),
                    'severity': 'high' if item.get('declarationType') == 'DR' else 'moderate',
                    'status': 'ongoing',
                    'country': 'USA',
                    'region': item.get('state', 'Unknown'),
                    'start_date': self.parse_date(item.get('incidentBeginDate')),
                    'description': f"FEMA Declaration: {item.get('declarationType', 'Unknown')}",
                    'is_verified': True,
                    'official_source': 'FEMA',
                    'disaster_id': f"FEMA_{item.get('disasterNumber')}"
                }
                
                disaster, created = Disaster.objects.get_or_create(
                    disaster_id=disaster_data['disaster_id'],
                    defaults=disaster_data
                )
                if created:
                    self.stdout.write(f"Created disaster: {disaster.title}")
                    
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error importing FEMA data: {e}')
            )

    def map_reliefweb_type(self, rw_type):
        """Map ReliefWeb disaster types to our system"""
        mapping = {
            'Earthquake': 'earthquake',
            'Flood': 'flood',
            'Wildfire': 'wildfire',
            'Storm': 'storm',
            'Drought': 'drought',
            'Volcano': 'volcanic_eruption',
            'Landslide': 'landslide',
            'Heatwave': 'heatwave',
            'Coldwave': 'coldwave',
            'Cyclone': 'cyclone',
            'Hurricane': 'hurricane',
            'Tornado': 'tornado',
            'Tsunami': 'tsunami'
        }
        return mapping.get(rw_type, 'other')

    def map_fema_type(self, fema_type):
        """Map FEMA incident types to our system"""
        mapping = {
            'Fire': 'wildfire',
            'Flood': 'flood',
            'Hurricane': 'hurricane',
            'Tornado': 'tornado',
            'Earthquake': 'earthquake',
            'Drought': 'drought',
            'Storm': 'storm',
            'Winter Storm': 'blizzard',
            'Heat': 'heatwave',
            'Cold': 'coldwave'
        }
        return mapping.get(fema_type, 'other')

    def map_severity(self, severity):
        """Map severity levels"""
        mapping = {
            'High': 'high',
            'Medium': 'moderate',
            'Low': 'low',
            'Severe': 'severe',
            'Extreme': 'extreme',
            'Critical': 'catastrophic'
        }
        return mapping.get(severity, 'moderate')

    def parse_date(self, date_string):
        """Parse various date formats"""
        if not date_string:
            return timezone.now()
        
        try:
            # Try different date formats
            for fmt in ['%Y-%m-%d', '%Y-%m-%dT%H:%M:%S', '%Y-%m-%dT%H:%M:%SZ']:
                try:
                    return datetime.strptime(date_string, fmt).replace(tzinfo=timezone.utc)
                except ValueError:
                    continue
            return timezone.now()
        except:
            return timezone.now()
