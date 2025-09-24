# Notification System Microservice

This microservice handles sending email notifications based on events received through RabbitMQ. It manages different types of notifications such as custom mails, disaster alerts, password resets, onboarding, and verification emails. The microservice also supports notification subscription management.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Queue Definitions](#queue-definitions)
- [Controller Functions](#controller-functions)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Olagold-hackxx/climate_wavers.git
    cd notification_service
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add your RabbitMQ connection details and other necessary configurations.
    ```env
   AMQP_URL=your_rabbitmq_server_address


   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_STORAGE_BUCKET=your_firebase_app_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messenger_id
   FIREBASE_APP_ID=your_firebase_app_id
   FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id


   MAIL_USER=yourmailuser
   MAIL_HOST=yourmailhost
   MAIL_PASS=yourmailpassword
   MAIL_PORT=yourmailport
   MAIL_SERVICE=yourmailservice

    ```

## Configuration

Ensure your RabbitMQ server is running and accessible using the URL provided in the `.env` file.

## Usage

To start the microservice, run the following command:
```bash
npm run start:dev
```

## Queue Definitions

Below are the available rabbitmq channels and their functions:

   ### custom_mail

   Accepts custom mail content and target email address

   payload

   ```json
   {
      "email": "string",
      "emails": ["string"],
      "data": {
         "content": "string"
      }
   }

   ```

   ### forget_password

   Sends password reset link to user email

   payload

   ```json
      {
         "email": "string",
         "data": {
            "url": "string"
         }
      }
   ```

   ### verification

   verify newly created account

   payload 

   ```json
   {
      "email": "string",
      "data": {
         "link": "string",
         "city": "string"
      }
   }

   ```

   ### onboarding

   onboarding email to user

   payload

   ```json
   {
      "email": "string"
   }
   ```

   ### disaster_alert

   send disaster alert notification

   payload

   ```json
   {
      "data": {
         "city": "string",
         "disasterType": "string"
      }
   }
