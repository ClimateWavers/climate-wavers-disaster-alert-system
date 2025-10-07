from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import Disaster
import requests
import json
import re
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Monitor social media and news for disaster information'

    def add_arguments(self, parser):
        parser.add_argument(
            '--news-api-key',
            type=str,
            help='News API key for news monitoring'
        )
        parser.add_argument(
            '--twitter-bearer-token',
            type=str,
            help='Twitter Bearer Token for Twitter monitoring'
        )

    def handle(self, *args, **options):
        news_api_key = options.get('news_api_key')
        twitter_token = options.get('twitter_bearer_token')
        
        if news_api_key:
            self.monitor_news_api(news_api_key)
        
        if twitter_token:
            self.monitor_twitter(twitter_token)
        
        # Monitor other sources
        self.monitor_reddit()
        self.monitor_emergency_services()

    def monitor_news_api(self, api_key):
        """Monitor news for disaster-related articles"""
        try:
            # News API endpoint
            url = "https://newsapi.org/v2/everything"
            params = {
                'apiKey': api_key,
                'q': 'disaster OR emergency OR flood OR fire OR earthquake OR hurricane OR tornado',
                'language': 'en',
                'sortBy': 'publishedAt',
                'pageSize': 100,
                'from': (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
            }
            
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            self.stdout.write("Monitoring news for disasters...")
            
            for article in data.get('articles', []):
                if self.is_disaster_related(article):
                    disaster_data = self.extract_disaster_from_news(article)
                    if disaster_data:
                        disaster, created = Disaster.objects.get_or_create(
                            disaster_id=disaster_data['disaster_id'],
                            defaults=disaster_data
                        )
                        if created:
                            self.stdout.write(f"Created disaster from news: {disaster.title}")
                            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error monitoring news: {e}')
            )

    def monitor_twitter(self, bearer_token):
        """Monitor Twitter for disaster-related tweets"""
        try:
            # Twitter API v2 endpoint
            url = "https://api.twitter.com/2/tweets/search/recent"
            headers = {
                'Authorization': f'Bearer {bearer_token}'
            }
            params = {
                'query': 'disaster OR emergency OR flood OR fire OR earthquake OR hurricane OR tornado -is:retweet lang:en',
                'max_results': 100,
                'tweet.fields': 'created_at,public_metrics,context_annotations'
            }
            
            response = requests.get(url, headers=headers, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            self.stdout.write("Monitoring Twitter for disasters...")
            
            for tweet in data.get('data', []):
                if self.is_disaster_tweet(tweet):
                    disaster_data = self.extract_disaster_from_tweet(tweet)
                    if disaster_data:
                        disaster, created = Disaster.objects.get_or_create(
                            disaster_id=disaster_data['disaster_id'],
                            defaults=disaster_data
                        )
                        if created:
                            self.stdout.write(f"Created disaster from tweet: {disaster.title}")
                            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error monitoring Twitter: {e}')
            )

    def monitor_reddit(self):
        """Monitor Reddit for disaster discussions"""
        try:
            # Reddit API (public, no auth required for basic access)
            url = "https://www.reddit.com/r/worldnews/hot.json"
            headers = {
                'User-Agent': 'ClimateWavers/1.0'
            }
            
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            self.stdout.write("Monitoring Reddit for disasters...")
            
            for post in data.get('data', {}).get('children', []):
                post_data = post.get('data', {})
                if self.is_disaster_reddit_post(post_data):
                    disaster_data = self.extract_disaster_from_reddit(post_data)
                    if disaster_data:
                        disaster, created = Disaster.objects.get_or_create(
                            disaster_id=disaster_data['disaster_id'],
                            defaults=disaster_data
                        )
                        if created:
                            self.stdout.write(f"Created disaster from Reddit: {disaster.title}")
                            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error monitoring Reddit: {e}')
            )

    def monitor_emergency_services(self):
        """Monitor emergency services and first responder channels"""
        try:
            # This would integrate with emergency services APIs
            # For now, we'll create sample data based on common emergency patterns
            
            emergency_keywords = [
                'evacuation', 'emergency', 'disaster', 'flood', 'fire',
                'earthquake', 'hurricane', 'tornado', 'wildfire', 'storm'
            ]
            
            # In a real implementation, you would:
            # 1. Monitor emergency service radio frequencies
            # 2. Parse emergency service reports
            # 3. Monitor government emergency channels
            # 4. Track emergency service social media accounts
            
            self.stdout.write("Emergency services monitoring would require specialized APIs")
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error monitoring emergency services: {e}')
            )

    def is_disaster_related(self, article):
        """Check if news article is disaster-related"""
        title = article.get('title', '').lower()
        description = article.get('description', '').lower()
        content = article.get('content', '').lower()
        
        disaster_keywords = [
            'disaster', 'emergency', 'flood', 'fire', 'earthquake',
            'hurricane', 'tornado', 'wildfire', 'storm', 'evacuation',
            'casualties', 'injured', 'damage', 'destruction'
        ]
        
        text = f"{title} {description} {content}"
        return any(keyword in text for keyword in disaster_keywords)

    def is_disaster_tweet(self, tweet):
        """Check if tweet is disaster-related"""
        text = tweet.get('text', '').lower()
        
        disaster_keywords = [
            'disaster', 'emergency', 'flood', 'fire', 'earthquake',
            'hurricane', 'tornado', 'wildfire', 'storm', 'evacuation'
        ]
        
        return any(keyword in text for keyword in disaster_keywords)

    def is_disaster_reddit_post(self, post):
        """Check if Reddit post is disaster-related"""
        title = post.get('title', '').lower()
        selftext = post.get('selftext', '').lower()
        
        disaster_keywords = [
            'disaster', 'emergency', 'flood', 'fire', 'earthquake',
            'hurricane', 'tornado', 'wildfire', 'storm', 'evacuation'
        ]
        
        text = f"{title} {selftext}"
        return any(keyword in text for keyword in disaster_keywords)

    def extract_disaster_from_news(self, article):
        """Extract disaster information from news article"""
        try:
            title = article.get('title', '')
            description = article.get('description', '')
            published_at = article.get('publishedAt', '')
            
            # Extract location from title/description
            location = self.extract_location(f"{title} {description}")
            
            # Determine disaster type
            disaster_type = self.determine_disaster_type(f"{title} {description}")
            
            # Determine severity
            severity = self.determine_severity(f"{title} {description}")
            
            # Extract affected numbers from text
            affected_numbers = self.extract_affected_numbers(f"{title} {description}")
            
            disaster_data = {
                'title': title,
                'disaster_type': disaster_type,
                'severity': severity,
                'status': 'investigating',
                'country': location.get('country', 'Unknown'),
                'region': location.get('region', 'Unknown'),
                'city': location.get('city', ''),
                'start_date': self.parse_news_date(published_at),
                'description': description,
                'is_verified': False,  # News sources need verification
                'official_source': 'News Media',
                'disaster_id': f"NEWS_{hash(title)}",
                'casualties': affected_numbers.get('casualties'),
                'injured': affected_numbers.get('injured'),
                'displaced': affected_numbers.get('displaced'),
                'is_active': True,
                'is_urgent': severity in ['severe', 'extreme', 'catastrophic']
            }
            
            return disaster_data
            
        except Exception as e:
            self.stdout.write(f"Error extracting disaster from news: {e}")
            return None

    def extract_disaster_from_tweet(self, tweet):
        """Extract disaster information from tweet"""
        try:
            text = tweet.get('text', '')
            created_at = tweet.get('created_at', '')
            
            # Extract location from tweet text
            location = self.extract_location(text)
            
            # Determine disaster type
            disaster_type = self.determine_disaster_type(text)
            
            # Determine severity
            severity = self.determine_severity(text)
            
            # Extract affected numbers from text
            affected_numbers = self.extract_affected_numbers(text)
            
            disaster_data = {
                'title': f"Social Media Report: {text[:100]}...",
                'disaster_type': disaster_type,
                'severity': severity,
                'status': 'investigating',
                'country': location.get('country', 'Unknown'),
                'region': location.get('region', 'Unknown'),
                'city': location.get('city', ''),
                'start_date': self.parse_twitter_date(created_at),
                'description': text,
                'is_verified': False,  # Social media needs verification
                'official_source': 'Social Media',
                'disaster_id': f"TWITTER_{tweet.get('id')}",
                'casualties': affected_numbers.get('casualties'),
                'injured': affected_numbers.get('injured'),
                'displaced': affected_numbers.get('displaced'),
                'is_active': True,
                'is_urgent': severity in ['severe', 'extreme', 'catastrophic']
            }
            
            return disaster_data
            
        except Exception as e:
            self.stdout.write(f"Error extracting disaster from tweet: {e}")
            return None

    def extract_disaster_from_reddit(self, post):
        """Extract disaster information from Reddit post"""
        try:
            title = post.get('title', '')
            selftext = post.get('selftext', '')
            created_utc = post.get('created_utc', 0)
            
            # Extract location from title/selftext
            location = self.extract_location(f"{title} {selftext}")
            
            # Determine disaster type
            disaster_type = self.determine_disaster_type(f"{title} {selftext}")
            
            # Determine severity
            severity = self.determine_severity(f"{title} {selftext}")
            
            # Extract affected numbers from text
            affected_numbers = self.extract_affected_numbers(f"{title} {selftext}")
            
            disaster_data = {
                'title': title,
                'disaster_type': disaster_type,
                'severity': severity,
                'status': 'investigating',
                'country': location.get('country', 'Unknown'),
                'region': location.get('region', 'Unknown'),
                'city': location.get('city', ''),
                'start_date': datetime.fromtimestamp(created_utc, tz=timezone.get_current_timezone()),
                'description': selftext,
                'is_verified': False,  # Reddit posts need verification
                'official_source': 'Reddit',
                'disaster_id': f"REDDIT_{post.get('id')}",
                'casualties': affected_numbers.get('casualties'),
                'injured': affected_numbers.get('injured'),
                'displaced': affected_numbers.get('displaced'),
                'is_active': True,
                'is_urgent': severity in ['severe', 'extreme', 'catastrophic']
            }
            
            return disaster_data
            
        except Exception as e:
            self.stdout.write(f"Error extracting disaster from Reddit: {e}")
            return None

    def extract_location(self, text):
        """Extract location information from text"""
        # This is a simplified location extraction
        # In a real implementation, you'd use NLP libraries like spaCy or NLTK
        
        # Common country patterns
        countries = ['USA', 'United States', 'Canada', 'Mexico', 'UK', 'United Kingdom', 
                    'France', 'Germany', 'Japan', 'China', 'India', 'Australia', 'Brazil']
        
        # Common city patterns
        cities = ['New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Sydney', 
                 'Toronto', 'Mumbai', 'Beijing', 'Berlin', 'Rome', 'Madrid']
        
        location = {'country': 'Unknown', 'region': 'Unknown', 'city': ''}
        
        for country in countries:
            if country.lower() in text.lower():
                location['country'] = country
                break
        
        for city in cities:
            if city.lower() in text.lower():
                location['city'] = city
                break
        
        return location

    def determine_disaster_type(self, text):
        """Determine disaster type from text"""
        text_lower = text.lower()
        
        if any(word in text_lower for word in ['earthquake', 'quake', 'seismic']):
            return 'earthquake'
        elif any(word in text_lower for word in ['flood', 'flooding', 'inundation']):
            return 'flood'
        elif any(word in text_lower for word in ['fire', 'wildfire', 'blaze']):
            return 'wildfire'
        elif any(word in text_lower for word in ['hurricane', 'cyclone', 'typhoon']):
            return 'hurricane'
        elif any(word in text_lower for word in ['tornado', 'twister']):
            return 'tornado'
        elif any(word in text_lower for word in ['storm', 'thunderstorm']):
            return 'storm'
        elif any(word in text_lower for word in ['drought', 'dry', 'water shortage']):
            return 'drought'
        else:
            return 'other'

    def determine_severity(self, text):
        """Determine severity from text"""
        text_lower = text.lower()
        
        if any(word in text_lower for word in ['catastrophic', 'devastating', 'massive', 'extreme']):
            return 'catastrophic'
        elif any(word in text_lower for word in ['severe', 'major', 'significant', 'serious']):
            return 'severe'
        elif any(word in text_lower for word in ['moderate', 'medium', 'some']):
            return 'moderate'
        else:
            return 'high'

    def parse_news_date(self, date_string):
        """Parse news API date format"""
        if not date_string:
            return timezone.now()
        
        try:
            return datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        except:
            return timezone.now()

    def parse_twitter_date(self, date_string):
        """Parse Twitter date format"""
        if not date_string:
            return timezone.now()
        
        try:
            return datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        except:
            return timezone.now()

    def extract_affected_numbers(self, text):
        """Extract casualty, injury, and displacement numbers from text"""
        text_lower = text.lower()
        affected_numbers = {
            'casualties': None,
            'injured': None,
            'displaced': None
        }
        
        # Patterns for casualties/deaths
        casualty_patterns = [
            r'(\d+)\s*(?:killed|dead|deaths?|casualties?|fatalities?)',
            r'(?:killed|dead|deaths?|casualties?|fatalities?)\s*(?:of\s*)?(\d+)',
            r'(\d+)\s*(?:people\s*)?(?:were\s*)?(?:killed|dead|died)',
            r'(\d+)\s*(?:lives?\s*)?(?:lost|lost\s*lives?)'
        ]
        
        # Patterns for injured
        injured_patterns = [
            r'(\d+)\s*(?:injured|wounded|hurt)',
            r'(?:injured|wounded|hurt)\s*(?:of\s*)?(\d+)',
            r'(\d+)\s*(?:people\s*)?(?:were\s*)?(?:injured|wounded|hurt)'
        ]
        
        # Patterns for displaced/evacuated
        displaced_patterns = [
            r'(\d+)\s*(?:displaced|evacuated|homeless)',
            r'(?:displaced|evacuated|homeless)\s*(?:of\s*)?(\d+)',
            r'(\d+)\s*(?:people\s*)?(?:were\s*)?(?:displaced|evacuated|forced\s*to\s*flee)',
            r'(\d+)\s*(?:families?\s*)?(?:displaced|evacuated)'
        ]
        
        # Extract casualties
        for pattern in casualty_patterns:
            match = re.search(pattern, text_lower)
            if match:
                try:
                    affected_numbers['casualties'] = int(match.group(1))
                    break
                except (ValueError, IndexError):
                    continue
        
        # Extract injured
        for pattern in injured_patterns:
            match = re.search(pattern, text_lower)
            if match:
                try:
                    affected_numbers['injured'] = int(match.group(1))
                    break
                except (ValueError, IndexError):
                    continue
        
        # Extract displaced
        for pattern in displaced_patterns:
            match = re.search(pattern, text_lower)
            if match:
                try:
                    affected_numbers['displaced'] = int(match.group(1))
                    break
                except (ValueError, IndexError):
                    continue
        
        # Special patterns for specific disasters
        # Look for patterns like "50 Palestinians killed" or "36 units displaced"
        specific_patterns = [
            r'(\d+)\s*(?:Palestinians?|people|residents?|units?)\s*(?:killed|displaced)',
            r'(\d+)\s*(?:units?|families?|residents?)\s*(?:displaced|evacuated)',
            r'(\d+)\s*(?:people|residents?|civilians?)\s*(?:killed|dead|injured)'
        ]
        
        for pattern in specific_patterns:
            match = re.search(pattern, text_lower)
            if match:
                try:
                    number = int(match.group(1))
                    # Determine if it's casualties or displaced based on context
                    if 'killed' in match.group(0) or 'dead' in match.group(0):
                        affected_numbers['casualties'] = number
                    elif 'displaced' in match.group(0) or 'evacuated' in match.group(0):
                        affected_numbers['displaced'] = number
                    elif 'injured' in match.group(0) or 'hurt' in match.group(0):
                        affected_numbers['injured'] = number
                    break
                except (ValueError, IndexError):
                    continue
        
        return affected_numbers
