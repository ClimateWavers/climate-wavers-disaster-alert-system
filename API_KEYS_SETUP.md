# 🔑 API Keys Setup Guide

## Free APIs (No Key Required)
- ✅ **GDACS** - Global Disaster Alert and Coordination System
- ✅ **NOAA** - National Oceanic and Atmospheric Administration
- ✅ **Reddit** - Public API access

## Free APIs (Key Required)

### 1. **OpenWeatherMap** (Weather Data)
- **Website**: https://openweathermap.org/api
- **Free Tier**: 1,000 calls/day
- **Setup**:
  1. Sign up at https://openweathermap.org/api
  2. Get your API key
  3. Run: `python3 manage.py import_weather_data --api-key=YOUR_API_KEY`

### 2. **News API** (News Monitoring)
- **Website**: https://newsapi.org/
- **Free Tier**: 1,000 requests/day
- **Setup**:
  1. Sign up at https://newsapi.org/
  2. Get your API key
  3. Run: `python3 manage.py monitor_social_media --news-api-key=YOUR_API_KEY`

### 3. **Twitter API** (Social Media Monitoring)
- **Website**: https://developer.twitter.com/
- **Free Tier**: 2,000 tweets/month
- **Setup**:
  1. Apply for Twitter Developer account
  2. Create an app and get Bearer Token
  3. Run: `python3 manage.py monitor_social_media --twitter-bearer-token=YOUR_TOKEN`

### 4. **ReliefWeb API** (UN Disaster Data)
- **Website**: https://reliefweb.int/api
- **Free Tier**: Unlimited
- **Setup**: No key required, but we need to fix the API call format

## Premium APIs (Paid)

### 1. **AccuWeather** (Advanced Weather)
- **Website**: https://developer.accuweather.com/
- **Cost**: $25/month for 500 calls/day

### 2. **Weather Underground** (Local Weather)
- **Website**: https://www.wunderground.com/weather/api/
- **Cost**: $20/month for 1,000 calls/day

### 3. **Google News API** (News Aggregation)
- **Website**: https://newsapi.org/google-news-api
- **Cost**: $449/month for 1M requests

## 🔧 Quick Setup Commands

```bash
# Test with free APIs (no keys needed)
python3 manage.py import_disaster_data --source=gdacs
python3 manage.py import_disaster_data --source=reliefweb

# Test weather data (get free OpenWeatherMap key)
python3 manage.py import_weather_data --api-key=YOUR_OPENWEATHERMAP_KEY

# Test social media monitoring (get free keys)
python3 manage.py monitor_social_media --news-api-key=YOUR_NEWS_API_KEY --twitter-bearer-token=YOUR_TWITTER_TOKEN
```

## 📊 Current Status

✅ **Working**: GDACS, NOAA, Reddit
❌ **Needs API Key**: OpenWeatherMap, News API, Twitter
🔧 **Needs Fix**: ReliefWeb API format

## 🚀 Next Steps

1. **Get free API keys** from the services above
2. **Test the imports** with real keys
3. **Set up automated monitoring** with Celery
4. **Configure webhooks** for real-time updates
