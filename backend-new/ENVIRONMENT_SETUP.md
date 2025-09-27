# Backend Environment Variables Setup

## Django Backend Environment Variables

Create a `.env` file in the `climate-wavers-disaster-alert-system/backend-new/` directory with the following variables:

```env
# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_db7c47322e55b058e66171d4a938e502cb2aff3a

# Database Configuration (if needed)
DATABASE_URL=sqlite:///db.sqlite3

# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
```

## How to Set Up:

1. **Create the .env file:**
   ```bash
   cd climate-wavers-disaster-alert-system/backend-new
   touch .env
   ```

2. **Add the environment variables:**
   Copy the content above into your `.env` file

3. **Install python-dotenv (if not already installed):**
   ```bash
   pip install python-dotenv
   ```

4. **Update your Django settings to load environment variables:**
   Add this to your `settings.py`:
   ```python
   import os
   from dotenv import load_dotenv
   
   load_dotenv()
   
   # Use environment variables
   PAYSTACK_SECRET_KEY = os.getenv('PAYSTACK_SECRET_KEY', 'sk_test_db7c47322e55b058e66171d4a938e502cb2aff3a')
   ```

5. **Restart your Django server:**
   ```bash
   python manage.py runserver
   ```

## Environment Variables Explained:

### Paystack:
- `PAYSTACK_SECRET_KEY`: Your Paystack secret key for payment verification

### Database:
- `DATABASE_URL`: Database connection string (if using external database)

### Django:
- `DEBUG`: Django debug mode (True for development)
- `SECRET_KEY`: Django secret key for security

## Important Notes:

1. **Security**: Never commit your `.env` file to version control
2. **Secret Key**: Use the same secret key as your frontend public key
3. **Test vs Live**: Use test keys for development, live keys for production
4. **Restart Required**: Restart Django server after adding environment variables

## Testing:

After setting up the environment variables, you can test if they're working by:

1. Starting your Django server
2. Looking for the Paystack verification logs
3. Testing a payment to see if verification works
4. Checking the Django logs for any errors

## Production Setup:

For production deployment, set these environment variables in your hosting platform:

- **Railway**: Add them in the Railway dashboard under Variables
- **Heroku**: Use `heroku config:set` command
- **DigitalOcean**: Add them in the App Platform settings
- **AWS**: Use AWS Systems Manager Parameter Store or Secrets Manager
