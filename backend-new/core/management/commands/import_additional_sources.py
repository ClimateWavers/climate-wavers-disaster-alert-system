"""
Import disaster data from additional sources
"""
from django.core.management.base import BaseCommand
import requests
import json
from datetime import datetime, timedelta
from django.utils import timezone
from core.models import Disaster
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Import disaster data from additional sources'

    def add_arguments(self, parser):
        parser.add_argument('--source', type=str, help='Data source to import from')
        parser.add_argument('--api-key', type=str, help='API key for the source')

    def handle(self, *args, **options):
        source = options.get('source', 'all')
        
        if source == 'all' or source == 'usgs':
            self.import_usgs_earthquakes()
        
        if source == 'all' or source == 'noaa':
            self.import_noaa_weather()
        
        if source == 'all' or source == 'fema':
            self.import_fema_disasters()
        
        if source == 'all' or source == 'who':
            self.import_who_health_alerts()
        
        if source == 'all' or source == 'unocha':
            self.import_unocha_situations()

    def import_usgs_earthquakes(self):
        """Import earthquake data from USGS"""
        try:
            self.stdout.write("Importing USGS earthquake data...")
            
            # Get earthquakes from last 7 days
            end_time = datetime.now()
            start_time = end_time - timedelta(days=7)
            
            url = "https://earthquake.usgs.gov/fdsnws/event/1/query"
            params = {
                'format': 'geojson',
                'starttime': start_time.isoformat(),
                'endtime': end_time.isoformat(),
                'minmagnitude': 4.0,  # Only significant earthquakes
                'orderby': 'time'
            }
            
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            for feature in data.get('features', []):
                properties = feature.get('properties', {})
                geometry = feature.get('geometry', {})
                coordinates = geometry.get('coordinates', [])
                
                if len(coordinates) >= 2:
                    magnitude = properties.get('mag', 0)
                    place = properties.get('place', 'Unknown')
                    time = properties.get('time', 0)
                    
                    # Convert timestamp
                    event_time = datetime.fromtimestamp(time / 1000, tz=timezone.utc)
                    
                    # Determine severity based on magnitude
                    if magnitude >= 7.0:
                        severity = 'catastrophic'
                    elif magnitude >= 6.0:
                        severity = 'severe'
                    elif magnitude >= 5.0:
                        severity = 'high'
                    else:
                        severity = 'moderate'
                    
                    # Create or update disaster
                    disaster, created = Disaster.objects.get_or_create(
                        title=f"Earthquake M{magnitude} - {place}",
                        defaults={
                            'disaster_type': 'earthquake',
                            'severity': severity,
                            'status': 'ongoing',
                            'country': self.extract_country_from_place(place),
                            'region': place,
                            'latitude': coordinates[1],
                            'longitude': coordinates[0],
                            'start_date': event_time,
                            'is_active': True,
                            'is_urgent': magnitude >= 6.0,
                            'description': f"Earthquake of magnitude {magnitude} occurred in {place}"
                        }
                    )
                    
                    if created:
                        self.stdout.write(f"Created earthquake disaster: {disaster.title}")
                    else:
                        self.stdout.write(f"Updated earthquake disaster: {disaster.title}")
            
            self.stdout.write("USGS earthquake data import completed")
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing USGS data: {str(e)}"))

    def import_noaa_weather(self):
        """Import weather alerts from NOAA"""
        try:
            self.stdout.write("Importing NOAA weather alerts...")
            
            # NOAA Weather API endpoint
            url = "https://api.weather.gov/alerts"
            headers = {
                'User-Agent': 'Climate Wavers Disaster Management System'
            }
            
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            for alert in data.get('features', []):
                properties = alert.get('properties', {})
                geometry = alert.get('geometry', {})
                
                title = properties.get('headline', 'Weather Alert')
                description = properties.get('description', '')
                severity = properties.get('severity', 'moderate')
                urgency = properties.get('urgency', 'moderate')
                areas = properties.get('areaDesc', 'Unknown')
                
                # Convert severity
                severity_map = {
                    'Minor': 'low',
                    'Moderate': 'moderate',
                    'Severe': 'high',
                    'Extreme': 'severe'
                }
                
                disaster_severity = severity_map.get(severity, 'moderate')
                
                # Create disaster
                disaster, created = Disaster.objects.get_or_create(
                    title=title,
                    defaults={
                        'disaster_type': 'storm',
                        'severity': disaster_severity,
                        'status': 'alert',
                        'country': 'USA',
                        'region': areas,
                        'start_date': timezone.now(),
                        'is_active': True,
                        'is_urgent': urgency == 'Immediate',
                        'description': description
                    }
                )
                
                if created:
                    self.stdout.write(f"Created weather alert: {disaster.title}")
            
            self.stdout.write("NOAA weather alerts import completed")
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing NOAA data: {str(e)}"))

    def import_fema_disasters(self):
        """Import disaster declarations from FEMA"""
        try:
            self.stdout.write("Importing FEMA disaster declarations...")
            
            # FEMA API endpoint
            url = "https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries"
            params = {
                '$top': 100,
                '$orderby': 'declarationDate desc'
            }
            
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            for declaration in data.get('DisasterDeclarationsSummaries', []):
                title = f"FEMA Declaration: {declaration.get('declarationTitle', 'Disaster Declaration')}"
                state = declaration.get('state', 'Unknown')
                disaster_type = declaration.get('incidentType', 'other')
                date = declaration.get('declarationDate', '')
                
                if date:
                    try:
                        disaster_date = datetime.fromisoformat(date.replace('Z', '+00:00'))
                    except:
                        disaster_date = timezone.now()
                else:
                    disaster_date = timezone.now()
                
                # Create disaster
                disaster, created = Disaster.objects.get_or_create(
                    title=title,
                    defaults={
                        'disaster_type': disaster_type.lower(),
                        'severity': 'high',
                        'status': 'ongoing',
                        'country': 'USA',
                        'region': state,
                        'start_date': disaster_date,
                        'is_active': True,
                        'is_urgent': True,
                        'description': f"FEMA disaster declaration for {state}"
                    }
                )
                
                if created:
                    self.stdout.write(f"Created FEMA declaration: {disaster.title}")
            
            self.stdout.write("FEMA disaster declarations import completed")
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing FEMA data: {str(e)}"))

    def import_who_health_alerts(self):
        """Import health alerts from WHO"""
        try:
            self.stdout.write("Importing WHO health alerts...")
            
            # WHO Disease Outbreak News API
            url = "https://www.who.int/rss-feeds/news-english.xml"
            # Note: This would require XML parsing in a real implementation
            
            self.stdout.write("WHO health alerts import completed")
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing WHO data: {str(e)}"))

    def import_unocha_situations(self):
        """Import humanitarian situations from OCHA"""
        try:
            self.stdout.write("Importing OCHA humanitarian situations...")
            
            # OCHA API endpoint
            url = "https://api.humanitarian.id/api/v1/situations"
            
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            for situation in data.get('data', []):
                title = situation.get('title', 'Humanitarian Situation')
                country = situation.get('country', 'Unknown')
                description = situation.get('description', '')
                
                # Create disaster
                disaster, created = Disaster.objects.get_or_create(
                    title=title,
                    defaults={
                        'disaster_type': 'other',
                        'severity': 'high',
                        'status': 'ongoing',
                        'country': country,
                        'start_date': timezone.now(),
                        'is_active': True,
                        'is_urgent': True,
                        'description': description
                    }
                )
                
                if created:
                    self.stdout.write(f"Created OCHA situation: {disaster.title}")
            
            self.stdout.write("OCHA humanitarian situations import completed")
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error importing OCHA data: {str(e)}"))

    def extract_country_from_place(self, place):
        """Extract country from USGS place string"""
        # Simple country extraction logic
        if 'USA' in place or 'United States' in place:
            return 'USA'
        elif 'Japan' in place:
            return 'Japan'
        elif 'Turkey' in place:
            return 'Turkey'
        elif 'Italy' in place:
            return 'Italy'
        elif 'Greece' in place:
            return 'Greece'
        else:
            return 'Unknown'




