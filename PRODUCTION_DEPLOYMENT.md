# Production Deployment Guide

## Backend Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
# Backend Configuration
BACKEND_HOST=https://your-domain.com
DEBUG=False
SECRET_KEY=your-secret-key-here

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Media Storage (if using cloud storage)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1

# CORS Settings
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
CORS_ALLOW_ALL_ORIGINS=False

# CSRF Settings
CSRF_TRUSTED_ORIGINS=https://your-domain.com,https://your-frontend-domain.com
```

### Django Settings for Production

The backend is already configured to handle production URLs through the `BACKEND_HOST` environment variable.

### Media Files in Production

#### Option 1: Local Storage (Simple)
- Media files are served directly by Django
- Set `BACKEND_HOST=https://your-domain.com`
- Ensure your web server (nginx/Apache) serves media files

#### Option 2: Cloud Storage (Recommended)
For better performance and scalability, use cloud storage:

1. Install required packages:
```bash
pip install boto3 django-storages
```

2. Update `settings.py`:
```python
# Add to INSTALLED_APPS
INSTALLED_APPS = [
    # ... existing apps
    'storages',
]

# Cloud storage configuration
if not DEBUG:
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME', 'us-east-1')
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'
```

3. Update the `FileUploadViewSet` to handle cloud storage:
```python
# In core/views.py, update the URL generation
if hasattr(default_storage, 'url'):
    file_url = default_storage.url(saved_path)
    # For cloud storage, the URL is already complete
    if not file_url.startswith('http'):
        # Only construct full URL for local storage
        backend_host = settings.BACKEND_HOST
        file_url = f"{backend_host}{file_url}"
else:
    # Fallback for development
    file_url = f"/media/{saved_path}"
    backend_host = settings.BACKEND_HOST
    file_url = f"{backend_host}{file_url}"
```

## Frontend Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```bash
# Backend URL
VITE_APP_BACKEND_URL=https://your-backend-domain.com
VITE_APP_BACKEND_STATUS=true

# Domain (for cookies)
VITE_DOMAIN=your-frontend-domain.com
```

### Build and Deploy

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## Web Server Configuration

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Media files (if using local storage)
    location /media/ {
        alias /path/to/your/project/media/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Static files
    location /static/ {
        alias /path/to/your/project/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Frontend (if serving from same domain)
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    
    # Backend API
    ProxyPreserveHost On
    ProxyPass /api/ http://127.0.0.1:8000/api/
    ProxyPassReverse /api/ http://127.0.0.1:8000/api/
    
    # Media files
    Alias /media/ /path/to/your/project/media/
    <Directory /path/to/your/project/media/>
        Require all granted
    </Directory>
    
    # Frontend
    DocumentRoot /path/to/frontend/dist
    <Directory /path/to/frontend/dist>
        Require all granted
        FallbackResource /index.html
    </Directory>
</VirtualHost>
```

## Docker Deployment

### Backend Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "auth.wsgi:application"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
```

### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend-new
    ports:
      - "8000:8000"
    environment:
      - BACKEND_HOST=https://your-domain.com
      - DEBUG=False
    volumes:
      - ./media:/app/media

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **CORS**: Configure CORS properly for your domains
3. **CSRF**: Set up CSRF protection
4. **Media Security**: Consider using signed URLs for sensitive media
5. **Rate Limiting**: Implement rate limiting for API endpoints
6. **Authentication**: Use secure JWT tokens with proper expiration

## Monitoring and Logging

1. Set up logging for the Django application
2. Monitor file uploads and storage usage
3. Set up error tracking (Sentry, etc.)
4. Monitor API performance

## Testing Production Setup

1. Test file uploads with different file types and sizes
2. Verify media URLs are accessible
3. Test CORS configuration
4. Verify HTTPS redirects
5. Test API endpoints with proper authentication

## Troubleshooting

### Common Issues

1. **Media files not loading**: Check `BACKEND_HOST` environment variable
2. **CORS errors**: Verify `ALLOWED_ORIGINS` configuration
3. **File upload failures**: Check file size limits and storage permissions
4. **HTTPS issues**: Ensure SSL certificates are properly configured

### Debug Commands

```bash
# Check environment variables
python manage.py shell -c "from django.conf import settings; print(settings.BACKEND_HOST)"

# Test media URL generation
python manage.py shell -c "from django.core.files.storage import default_storage; print(default_storage.url('test.jpg'))"
```

