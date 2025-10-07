from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import Disaster
import requests
import json
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Import weather-related disaster data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--api-key',
            type=str,
            help='OpenWeatherMap API key'
        )

    def handle(self, *args, **options):
        api_key = options.get('api_key')
        
        if not api_key:
            self.stdout.write(
                self.style.WARNING('OpenWeatherMap API key required. Get one at: https://openweathermap.org/api')
            )
            return
        
        # Import from various weather sources
        self.import_openweathermap_data(api_key)
        self.import_noaa_data()
        self.import_weather_underground_data()

    def import_openweathermap_data(self, api_key):
        """Import weather alerts from OpenWeatherMap"""
        try:
            # Get weather alerts for major cities
            cities = [
                {'name': 'New York', 'lat': 40.7128, 'lon': -74.0060},
                {'name': 'Los Angeles', 'lat': 34.0522, 'lon': -118.2437},
                {'name': 'London', 'lat': 51.5074, 'lon': -0.1278},
                {'name': 'Tokyo', 'lat': 35.6762, 'lon': 139.6503},
                {'name': 'Sydney', 'lat': -33.8688, 'lon': 151.2093}
            ]
            
            for city in cities:
                url = f"https://api.openweathermap.org/data/2.5/weather"
                params = {
                    'lat': city['lat'],
                    'lon': city['lon'],
                    'appid': api_key,
                    'units': 'metric'
                }
                
                response = requests.get(url, params=params, timeout=30)
                response.raise_for_status()
                
                data = response.json()
                
                # Check for extreme weather conditions
                if self.is_extreme_weather(data):
                    disaster_data = {
                        'title': f"Extreme Weather Alert - {city['name']}",
                        'disaster_type': self.get_weather_disaster_type(data),
                        'severity': self.get_weather_severity(data),
                        'status': 'alert',
                        'country': self.get_country_from_city(city['name']),
                        'region': city['name'],
                        'city': city['name'],
                        'latitude': city['lat'],
                        'longitude': city['lon'],
                        'start_date': timezone.now(),
                        'description': f"Extreme weather conditions detected: {data.get('weather', [{}])[0].get('description', 'Unknown')}",
                        'temperature': data.get('main', {}).get('temp'),
                        'wind_speed': data.get('wind', {}).get('speed'),
                        'humidity': data.get('main', {}).get('humidity'),
                        'weather_conditions': data.get('weather', [{}])[0].get('description', 'Unknown'),
                        'is_verified': True,
                        'official_source': 'OpenWeatherMap',
                        'disaster_id': f"OWM_{city['name'].replace(' ', '_')}_{int(timezone.now().timestamp())}"
                    }
                    
                    disaster, created = Disaster.objects.get_or_create(
                        disaster_id=disaster_data['disaster_id'],
                        defaults=disaster_data
                    )
                    if created:
                        self.stdout.write(f"Created weather alert: {disaster.title}")
                        
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error importing OpenWeatherMap data: {e}')
            )

    def import_noaa_data(self):
        """Import data from NOAA (National Oceanic and Atmospheric Administration)"""
        try:
            # NOAA Severe Weather API
            url = "https://api.weather.gov/alerts"
            headers = {
                'User-Agent': 'ClimateWavers/1.0 (contact@climatewavers.com)'
            }
            
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            self.stdout.write("Importing from NOAA...")
            
            for alert in data.get('features', []):
                properties = alert.get('properties', {})
                geometry = alert.get('geometry', {})
                
                if properties.get('severity') in ['Severe', 'Extreme']:
                    disaster_data = {
                        'title': properties.get('headline', 'Weather Alert'),
                        'disaster_type': self.map_noaa_event(properties.get('event', 'storm')),
                        'severity': self.map_noaa_severity(properties.get('severity', 'moderate')),
                        'status': 'alert',
                        'country': 'USA',
                        'region': properties.get('areaDesc', 'Unknown'),
                        'start_date': self.parse_noaa_date(properties.get('onset')),
                        'description': properties.get('description', ''),
                        'weather_conditions': properties.get('event', 'Unknown'),
                        'is_verified': True,
                        'official_source': 'NOAA',
                        'disaster_id': f"NOAA_{alert.get('id')}"
                    }
                    
                    # Add default values for required fields
                    disaster_data['is_active'] = True
                    disaster_data['is_urgent'] = properties.get('severity') in ['Severe', 'Extreme']
                    
                    disaster, created = Disaster.objects.get_or_create(
                        disaster_id=disaster_data['disaster_id'],
                        defaults=disaster_data
                    )
                    if created:
                        self.stdout.write(f"Created NOAA alert: {disaster.title}")
                        
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error importing NOAA data: {e}')
            )

    def import_weather_underground_data(self):
        """Import data from Weather Underground (if available)"""
        try:
            # This would require Weather Underground API key
            # For now, we'll create sample data
            self.stdout.write("Weather Underground integration would require API key")
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error importing Weather Underground data: {e}')
            )

    def is_extreme_weather(self, data):
        """Check if weather conditions are extreme"""
        main = data.get('main', {})
        wind = data.get('wind', {})
        
        # Check for extreme conditions
        temp = main.get('temp', 0)
        wind_speed = wind.get('speed', 0)
        humidity = main.get('humidity', 0)
        
        # Extreme temperature (below -20°C or above 40°C)
        if temp < -20 or temp > 40:
            return True
        
        # High wind speed (> 25 m/s)
        if wind_speed > 25:
            return True
        
        # Extreme humidity (> 90% or < 10%)
        if humidity > 90 or humidity < 10:
            return True
        
        return False

    def get_weather_disaster_type(self, data):
        """Determine disaster type from weather data"""
        weather = data.get('weather', [{}])[0]
        description = weather.get('description', '').lower()
        
        if 'storm' in description or 'thunder' in description:
            return 'storm'
        elif 'snow' in description or 'blizzard' in description:
            return 'blizzard'
        elif 'rain' in description or 'drizzle' in description:
            return 'flood'
        elif 'heat' in description or 'hot' in description:
            return 'heatwave'
        elif 'cold' in description or 'freeze' in description:
            return 'coldwave'
        else:
            return 'storm'

    def get_weather_severity(self, data):
        """Determine severity from weather data"""
        main = data.get('main', {})
        wind = data.get('wind', {})
        
        temp = main.get('temp', 0)
        wind_speed = wind.get('speed', 0)
        
        if temp < -30 or temp > 45 or wind_speed > 30:
            return 'catastrophic'
        elif temp < -20 or temp > 40 or wind_speed > 25:
            return 'extreme'
        elif temp < -10 or temp > 35 or wind_speed > 20:
            return 'severe'
        else:
            return 'high'

    def get_country_from_city(self, city_name):
        """Get country from city name (simplified)"""
        city_country_map = {
            'New York': 'USA',
            'Los Angeles': 'USA',
            'London': 'UK',
            'Tokyo': 'Japan',
            'Sydney': 'Australia'
        }
        return city_country_map.get(city_name, 'Unknown')

    def map_noaa_event(self, event):
        """Map NOAA event types to our system"""
        mapping = {
            'Tornado Warning': 'tornado',
            'Severe Thunderstorm Warning': 'storm',
            'Flash Flood Warning': 'flood',
            'Winter Storm Warning': 'blizzard',
            'Heat Advisory': 'heatwave',
            'Cold Weather Advisory': 'coldwave',
            'Hurricane Warning': 'hurricane',
            'Tornado Watch': 'tornado'
        }
        return mapping.get(event, 'storm')

    def map_noaa_severity(self, severity):
        """Map NOAA severity to our system"""
        mapping = {
            'Minor': 'low',
            'Moderate': 'moderate',
            'Severe': 'high',
            'Extreme': 'severe'
        }
        return mapping.get(severity, 'moderate')

    def parse_noaa_date(self, date_string):
        """Parse NOAA date format"""
        if not date_string:
            return timezone.now()
        
        try:
            # NOAA uses ISO format
            return datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        except:
            return timezone.now()
