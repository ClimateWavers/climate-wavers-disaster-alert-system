# 🔧 Environment Configuration Guide

## 📁 **API Keys Storage Locations:**

### **1. Environment Variables (.env file)**
Create a `.env` file in the `backend-new` directory with:

```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
BASE_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:5173

# Redis Configuration
REDIS=redis://localhost:6379/0
REDIS_USE_SSL=False

# API Keys for External Services
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
NEWS_API_KEY=your_news_api_key_here
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here

# Security
FERNET_KEY=your-fernet-key-here
CSRF_TRUSTED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### **2. Current API Key Usage:**

#### **A. Management Commands:**
- `import_weather_data.py` - Uses `--api-key` parameter
- `monitor_social_media.py` - Uses `--news-api-key` and `--twitter-bearer-token` parameters

#### **B. Celery Tasks:**
- `tasks.py` - Reads from Django settings:
  - `OPENWEATHER_API_KEY`
  - `NEWS_API_KEY` 
  - `TWITTER_BEARER_TOKEN`

### **3. How to Set API Keys:**

#### **Option 1: Environment Variables (Recommended)**
```bash
# Add to your .env file
OPENWEATHER_API_KEY=your_actual_key_here
NEWS_API_KEY=your_actual_key_here
TWITTER_BEARER_TOKEN=your_actual_token_here
```

#### **Option 2: Command Line Parameters**
```bash
# For manual testing
python3 manage.py import_weather_data --api-key=YOUR_KEY
python3 manage.py monitor_social_media --news-api-key=YOUR_KEY --twitter-bearer-token=YOUR_TOKEN
```

#### **Option 3: Django Settings (Not Recommended)**
Add directly to `settings.py`:
```python
OPENWEATHER_API_KEY = 'your_key_here'
NEWS_API_KEY = 'your_key_here'
TWITTER_BEARER_TOKEN = 'your_token_here'
```

### **4. API Key Sources:**

| Service | Free Tier | Get Key At |
|---------|-----------|------------|
| **OpenWeatherMap** | 1,000 calls/day | https://openweathermap.org/api |
| **News API** | 1,000 requests/day | https://newsapi.org/ |
| **Twitter API** | 2,000 tweets/month | https://developer.twitter.com/ |

### **5. Testing Your API Keys:**

```bash
# Test weather data
python3 manage.py import_weather_data --api-key=YOUR_OPENWEATHER_KEY

# Test social media monitoring
python3 manage.py monitor_social_media --news-api-key=YOUR_NEWS_KEY --twitter-bearer-token=YOUR_TWITTER_TOKEN

# Test disaster data (no keys needed)
python3 manage.py import_disaster_data --source=gdacs
```

### **6. Security Best Practices:**

1. **Never commit API keys** to version control
2. **Use environment variables** for production
3. **Rotate keys regularly** for security
4. **Monitor API usage** to avoid rate limits
5. **Use different keys** for development/production

## 🚀 **Quick Setup:**

1. **Create `.env` file** in `backend-new/` directory
2. **Copy the template** above and fill in your keys
3. **Restart the Django server** to load new environment variables
4. **Test the APIs** with the commands above




