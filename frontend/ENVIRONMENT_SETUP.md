# Environment Variables Setup

## Frontend Environment Variables

Create a `.env` file in the `climate-wavers-disaster-alert-system/frontend/` directory with the following variables:

```env
# Exchange Rate API Configuration
VITE_EXCHANGE_RATE_API_KEY=ee458d7d826fdfbd0b1ec343
VITE_EXCHANGE_RATE_API_URL=https://v6.exchangerate-api.com/v6/ee458d7d826fdfbd0b1ec343/latest/USD

# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_test_db7c47322e55b058e66171d4a938e502cb2aff3a

# Backend Configuration
VITE_APP_BACKEND_URL=http://127.0.0.1:8000
VITE_APP_BACKEND_STATUS=true
```

## How to Set Up:

1. **Create the .env file:**
   ```bash
   cd climate-wavers-disaster-alert-system/frontend
   touch .env
   ```

2. **Add the environment variables:**
   Copy the content above into your `.env` file

3. **Restart your development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Environment Variables Explained:

### Exchange Rate API:
- `VITE_EXCHANGE_RATE_API_KEY`: Your API key for the exchange rate service
- `VITE_EXCHANGE_RATE_API_URL`: The full URL for fetching USD to KES exchange rates

### Paystack:
- `VITE_PAYSTACK_PUBLIC_KEY`: Your Paystack public key for payment processing

### Backend:
- `VITE_APP_BACKEND_URL`: The URL of your Django backend server
- `VITE_APP_BACKEND_STATUS`: Whether the backend is enabled (true/false)

## Important Notes:

1. **Vite Environment Variables**: All environment variables in Vite must start with `VITE_` to be accessible in the frontend
2. **Security**: Never commit your `.env` file to version control
3. **Fallbacks**: The code includes fallback values if environment variables are not set
4. **Development vs Production**: Use different keys for development and production

## Production Setup:

For production deployment, set these environment variables in your hosting platform:

- **Vercel**: Add them in the Vercel dashboard under Settings > Environment Variables
- **Netlify**: Add them in the Netlify dashboard under Site Settings > Environment Variables
- **Railway**: Add them in the Railway dashboard under Variables
- **Heroku**: Use `heroku config:set` command

## Testing:

After setting up the environment variables, you can test if they're working by:

1. Opening the browser console
2. Looking for the exchange rate logs
3. Checking if the Paystack configuration shows your key
