# Disaster Management Automation Setup

## 🚀 Complete Automation System

This guide will help you set up automated data collection, real-time monitoring, and analytics for your disaster management system.

## 📋 Prerequisites

1. **Redis Server** (for Celery message broker)
2. **Celery** (for task queue)
3. **Channels** (for WebSocket support)
4. **Additional Python packages**

## 🔧 Installation Steps

### 1. Install Required Packages

```bash
# Install Redis (Ubuntu/Debian)
sudo apt-get install redis-server

# Install Redis (macOS)
brew install redis

# Install Redis (Windows)
# Download from: https://github.com/microsoftarchive/redis/releases

# Install Python packages
pip install celery redis channels channels-redis
```

### 2. Update Django Settings

Add to your `auth/settings.py`:

```python
# Celery Configuration
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

# Channels Configuration
ASGI_APPLICATION = 'core.routing.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

# Add to INSTALLED_APPS
INSTALLED_APPS = [
    # ... existing apps
    'channels',
    'core',
]

# API Keys (set these in environment variables)
OPENWEATHER_API_KEY = 'your_openweather_api_key'
NEWS_API_KEY = 'your_news_api_key'
TWITTER_BEARER_TOKEN = 'your_twitter_bearer_token'
```

### 3. Update URLs

Add to your main `urls.py`:

```python
from django.urls import path, include
from channels.routing import ProtocolTypeRouter, URLRouter
from core.routing import websocket_urlpatterns

urlpatterns = [
    # ... existing patterns
    path('api/v1/analytics/', include('core.urls')),
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(websocket_urlpatterns),
})
```

### 4. Create Analytics API Endpoint

Create `core/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('analytics/', views.analytics_view, name='analytics'),
]
```

Add to `core/views.py`:

```python
from django.http import JsonResponse
from .analytics import DisasterAnalytics

def analytics_view(request):
    days = request.GET.get('days', 30)
    analytics = DisasterAnalytics.generate_comprehensive_report()
    return JsonResponse(analytics)
```

## 🚀 Running the Automation System

### 1. Start Redis Server

```bash
# Ubuntu/Debian
sudo systemctl start redis-server

# macOS
brew services start redis

# Windows
redis-server
```

### 2. Start Celery Worker

```bash
cd climate-wavers-disaster-alert-system/backend-new
celery -A celery_config worker --loglevel=info
```

### 3. Start Celery Beat (Scheduler)

```bash
cd climate-wavers-disaster-alert-system/backend-new
celery -A celery_config beat --loglevel=info
```

### 4. Start Django with Channels

```bash
cd climate-wavers-disaster-alert-system/backend-new
python manage.py runserver
```

### 5. Start Frontend

```bash
cd climate-wavers-disaster-alert-system/frontend
npm run dev
```

## 📊 Automation Features

### ✅ Scheduled Data Collection
- **GDACS**: Every 5 minutes
- **ReliefWeb**: Every 10 minutes  
- **Weather Data**: Every 30 minutes
- **Social Media**: Every 15 minutes
- **News Sources**: Every 20 minutes

### ✅ Real-Time Monitoring
- WebSocket connections for live updates
- Automatic reconnection
- Real-time disaster alerts
- Live statistics updates

### ✅ Analytics & Trends
- Disaster trend analysis
- Geographic hotspot detection
- Severity distribution
- Impact analysis
- Time series data

### ✅ Additional Data Sources
- **USGS Earthquakes**: Real-time earthquake data
- **NOAA Weather**: Weather alerts and warnings
- **FEMA Declarations**: Disaster declarations
- **WHO Health**: Health emergency alerts
- **OCHA Situations**: Humanitarian situations

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your backend directory:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
NEWS_API_KEY=your_news_api_key
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
REDIS_URL=redis://localhost:6379/0
```

### API Keys Setup

1. **OpenWeatherMap**: Get free API key from https://openweathermap.org/api
2. **News API**: Get free API key from https://newsapi.org/
3. **Twitter API**: Get Bearer Token from https://developer.twitter.com/

## 📈 Monitoring & Maintenance

### Check System Status

```bash
# Check Celery workers
celery -A celery_config inspect active

# Check scheduled tasks
celery -A celery_config inspect scheduled

# Check Redis
redis-cli ping
```

### Log Files

Monitor logs for debugging:

```bash
# Celery worker logs
tail -f celery_worker.log

# Django logs
tail -f django.log

# Redis logs
tail -f /var/log/redis/redis-server.log
```

## 🚨 Troubleshooting

### Common Issues

1. **Redis Connection Error**
   ```bash
   sudo systemctl restart redis-server
   ```

2. **Celery Worker Not Starting**
   ```bash
   pip install celery[redis]
   ```

3. **WebSocket Connection Failed**
   - Check if Channels is properly configured
   - Verify Redis is running
   - Check firewall settings

4. **API Rate Limits**
   - Adjust scheduling intervals
   - Implement rate limiting
   - Use multiple API keys

## 📊 Dashboard Integration

Add the new components to your frontend:

```jsx
// In your main dashboard
import RealTimeMonitor from './components/RealTimeMonitor';
import AnalyticsDashboard from './components/AnalyticsDashboard';

// Add to your dashboard
<RealTimeMonitor />
<AnalyticsDashboard />
```

## 🎯 Next Steps

1. **Set up monitoring alerts** for system health
2. **Configure email notifications** for urgent disasters
3. **Implement machine learning** for disaster prediction
4. **Add mobile app** for field workers
5. **Integrate with emergency services** APIs

Your disaster management system is now fully automated! 🎉




