# Climate Wavers Web Application

## Overview
Climate Wavers is a Social Network powered by AI focusing on environmental awareness and actions. This documentation outlines the user registration process, including account creation, email verification using a one-time passcode (OTP), login, password recovery functionalities, and more.

## Features
- User Registration
- Email Verification
- User Login
- Password Recovery (Forgot Password)
- Reset Password
- Profile Picture Upload / Default Avatar Selection
- OTP Generation and Verification
- User Logout

## Table of Contents
1. [Installation](#installation)
2. [Environment Setup](#environment-setup)
3. [Endpoints](#endpoints)
    - [User Registration](#user-registration)
    - [Email Verification](#email-verification)
    - [User Login](#user-login) 
    - [Forgot Password](#forgot-password)
    - [Reset Password](#reset-password)
    - [User Logout](#user-logout)
4. [Models](#models)
5. [Email Sending](#email-sending)
6. [OTP Generation](#otp-generation)
7. [Error Handling](#error-handling)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/climate-wavers-webapp.git
    cd climate-wavers-webapp/backend
    ```

2. Create a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Apply migrations:
    ```bash
    python manage.py migrate
    ```

5. Run the server:
    ```bash
    python manage.py runserver
    ```

## Environment Setup
Ensure you have the following environment variables set in your `.env` file:
```plaintext
SECRET_KEY=your_secret_key
EMAIL_HOST=smtp.your_email_provider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@example.com
EMAIL_HOST_PASSWORD=your_email_password
DEFAULT_FROM_EMAIL=your_email@example.com
```

## Endpoints

### User Registration

**Endpoint:** `POST /api/v1/auth/register/`

**Request Body:**
```json
{
    "email": "user@example.com",
    "username": "Username",
    "first_name": "First Name",
    "last_name": "Last Name",
    "country": "Country",
    "state": "State",
    "gender": "male/female",
    "password": "YourPassword123",
    "password2": "YourPassword123",
    "profile_pic": "optional_image_url",
    "default_avatar": "optional_avatar_filename"
}
```

**Response:**
```json
{
    "data": {
        "email": "user@example.com",
        "username": "Username",
        "first_name": "First Name",
        "last_name": "Last Name",
        "country": "Country",
        "state": "State",
        "profile_pic": "optional_image_url",
        "default_avatar": "avatar 1.png"
    },
    "message": "Hi First Name, thank you for signing up. A passcode has been sent to your email."
}
```

### Email Verification

**Endpoint:** `POST /api/v1/auth/verify-email/`

**Request Body:**
```json
{
    "email": "user@example.com",
    "otp": "123456"
}
```

**Response:**
```json
{
    "message": "Account email verified successfully."
}
```

### User Login

**Endpoint:** `POST /api/v1/auth/login/`

**Request Body:**
```json
{
    "email": "user@example.com",
    "password": "YourPassword123"
}
```

**Response:**
```json
{
    "email": "user@example.com",
    "full_name": "First Last",
    "access_token": "your_access_token",
    "refresh_token": "your_refresh_token"
}
```

### Refresh Token

**Endpoint:** `POST /api/v1/auth/token/refresh/`

**Request Body:**
```json
{
    "refresh": "your_refresh_token"
}
```

**Response:**
```json
{
    "access": "your_new_access_token"
}
```

### Forgot Password

**Endpoint:** `POST /api/v1/auth/password-reset/`

**Request Body:**
```json
{
    "email": "user@example.com"
}
```

**Response:**
```json
{
    "message": "A reset link has been sent to your email."
}
```

### Reset Password

**Endpoint:** `POST /api/v1/auth/set-new-password`

**Request Body:**
```json
{
    "password": "NewPassword123",
    "current_password": "NewPassword123",
    "uidb64": "NW",
    "token": "your_token"
}
```

**Response:**
```json
{
    "message": "Password reset successfully."
}
```

### User Logout

**Endpoint:** `POST /api/v1/auth/logout/`

**Request Body:**
```json
{
    "refresh_token": "your_refresh_token"
}
```

**Response:**
```json
{
    "message": "Logout successful."
}
```

## Models

### User Model
- `email`: User's email address (unique).
- `username`: Unique username.
- `first_name`: User's first name.
- `last_name`: User's last name.
- `country`: User's country.
- `state`: User's state.
- `gender`: User's gender.
- `password`: User's hashed password.
- `profile_pic`: URL for the user's profile picture (optional).
- `default_avatar`: Avatar filename if no profile picture is uploaded (optional).
- `is_verified`: Boolean indicating if the user's email is verified.

### OneTimePassword Model
- `user`: ForeignKey to the User model.
- `code`: Encrypted OTP code.
- `created_at`: Timestamp of OTP creation.

## Email Sending
Emails are sent using Django's email functionality configured with environment variables for the SMTP server.

## OTP Generation
OTPs are generated using a random 6-digit number and are encrypted before being saved in the database.

## Error Handling
Standard HTTP status codes are used for indicating errors:
- `400 Bad Request`: Invalid input or validation errors.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server-side errors.
