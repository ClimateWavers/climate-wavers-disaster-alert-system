# Climate Wavers Backend

The Climate Wavers backend is the core of the Climate Wavers platform, an AI-driven social network focused on climate-based disaster responses. This backend is built with Django and incorporates various tools and technologies to provide robust and scalable services. It handles user authentication, data management, AI-driven content creation, notifications, and more.

## Table of Contents

- [Introduction](#introduction)
- [Architecture Overview](#architecture-overview)
- [Tools and Technologies](#tools-and-technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Makefile Commands](#makefile-commands)
- [Duplicating the Project](#duplicating-the-project)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Climate Wavers is an innovative platform that integrates social networking with climate action. The backend serves as the foundation, enabling features like disaster response reporting, community engagement, reforestation initiatives, AI-driven insights, and real-time notifications. This backend is designed to be highly modular, supporting various services and microservices that work together to provide a seamless experience.

## Architecture Overview

The Climate Wavers backend is built on a microservices architecture, with different components handling specific tasks:

- **Django Web Application:** The core application handles user management, content management, and integration with AI models.
- **Queue Consumer (Part of Django Backend):** This component is responsible for receiving content for AI-generated posts from the response system via RabbitMQ and creating posts on behalf of the AI. It ensures that AI-driven content is seamlessly integrated into the platform.
- **Response System (Node.js Microservice):** Handles all real-time operations of the application, including AI chatbot interactions, real-time disaster reports, and other real-time features. This microservice operates independently but communicates with the Django backend via RabbitMQ for task processing.
- **Notification Service (Node.js Microservice):** This service is responsible for sending notifications such as emails based on events triggered by the backend. It uses RabbitMQ to listen for events and dispatch notifications in real time.
- **RabbitMQ:** Acts as a message broker, enabling communication between the Django backend and the Node.js microservices for asynchronous task processing.
- **PostgreSQL Database:** Manages all persistent data, including user information, posts, comments, and more.
- **Redis:** Used for caching, session management, and as a broker for Celery (if needed).
- **AI Models Integration:** Climate Wavers integrates AI models for tasks like disaster recognition and magnitude analysis, using tools like Stability AI models and AWS Bedrock.

## Tools and Technologies

### Django
Django is the main framework used for building the backend. It provides a powerful ORM, admin interface, and a solid foundation for building web applications.

### Queue Consumer (Django Backend)
The queue consumer is an integral part of the Django backend, responsible for receiving content for AI-generated posts from the response system via RabbitMQ. It creates posts for AI within the platform, ensuring that AI-generated content is seamlessly published and visible to users.

### Response System (Node.js Microservice)
The response system, built with Node.js, handles all real-time aspects of the application. This includes AI chatbot interactions, real-time disaster reports, and other real-time features essential for the Climate Wavers platform. It operates independently but communicates with the Django backend via RabbitMQ for task processing.

### Notification Service (Node.js Microservice)
The notification service is responsible for sending out notifications, such as emails, based on events triggered by the backend. For example, when a new post is created or a disaster report is generated, the notification service sends appropriate notifications to users. It listens for events via RabbitMQ and ensures that users are informed in real-time.

### RabbitMQ
RabbitMQ is used as a message broker to manage communication between different services. It facilitates asynchronous processing of tasks like creating AI-generated posts, handling real-time interactions via the Node.js microservice, and sending notifications.

### PostgreSQL
PostgreSQL is the database of choice for Climate Wavers. It provides robust and reliable data storage, ensuring that all user data, posts, and other critical information are securely stored and efficiently retrieved.

### Redis
Redis serves as both a caching layer and a message broker for tasks that require fast, in-memory data storage. It's crucial for managing sessions, caching frequently accessed data, and ensuring quick responses.

### Docker
Docker is used to containerize the entire application, making it easy to manage, scale, and deploy across different environments. Docker Compose simplifies the orchestration of multiple services.

### AI Models
Climate Wavers integrates AI models for disaster recognition and magnitude analysis. These models are crucial for providing insights into climate-related events and helping communities respond effectively.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Make (for using the Makefile commands)

### Clone the Repository

```bash
git clone https://github.com/yourusername/climatewavers-backend.git
cd climatewavers-backend
```

### Setup Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SECRET_KEY=your_secret_key
FERNET_KEY=fernet_key
DB_USER=waverx
DB_PASSWORD=waverx_pass
DB_NAME=climatewaver
DB_HOST=backend-new.db
DB_PORT=5432
DEBUG=True
ALLOWED_HOSTS='*'
SSLMODE=False
FRONTEND_URL=http://localhost:5173
AMQP_URL=amqp://host.docker.internal:5672/
ALLOWED_ORIGINS=http://localhost:5173, http://localhost:8000
ALLOW_ALL_ORIGINS=True
CSRF_TRUSTED_ORIGINS=http://localhost:8000
BASE_URL=http://localhost:8001
MALE_AVATAR=http://res.cloudinary.com/lahri/image/upload/v1725138494/disax/uljz6lf0hbazo9cfzfse.png
FEMALE_AVATAR=http://res.cloudinary.com/lahri/image/upload/v1725138532/disax/zmvmlvh2stjd3nzb94ao.png
REDIS=redis://redis:6379
REDIS_USE_SSL=false
```

### Build and Start the Containers

Build and start the Docker containers using the following Makefile command:

```bash
make up
```

This command will start the following services:

- **Django Web Application** (running on port 8000)
- **PostgreSQL Database** (running on port 5432)
- **Redis** (running on port 6379)
- **Queue Consumer** (running on port 8002)
- **RabbitMQ** (if integrated)
- **Notification Service** (running as a Node.js microservice)

## Project Structure

- `Dockerfile`: Defines the Docker image for the Django application.
- `Dockerfile.worker`: Defines the Docker image for the queue consumer service.
- `docker-compose.yml`: Defines the services required for the application.
- `entrypoint.sh`: Startup script for the Django container.
- `worker.sh`: Startup script for the queue consumer container.
- `Makefile`: Contains useful commands for managing the application.
- `backend-new/`: Contains the Django project and applications.

## Running the Application

### Access the Web Application

After running `make up`, the web application will be accessible at:

```bash
http://localhost:8000
```

### Access the Admin Panel

Admin users are automatically created during the initial setup. You can log in using:

- **Username:** `admin@climatewavers.dev`
- **Password:** `admin123`

Visit the admin panel at:

```bash
http://localhost:8000/admin
```

### Viewing Logs

To view logs for the web container:

```bash
make logs
```

### Stopping the Application

To stop the application:

```bash
make down
```

## Makefile Commands

- `make up`: Build and start all services in detached mode.
- `make down`: Stop and remove all services.
- `make stop`: Stop all services without removing containers.
- `make server`: Run the Django development server inside the container.
- `make collectstatic`: Collect static files for the Django application.
- `make build`: Build the Docker images.
- `make rebuild`: Rebuild the Docker images with forced recreation.
- `make logs`: Tail the logs of the Django container.
- `make test`: Run the test suite inside the container.
- `make ssh`: Open a shell in the Django container.
- `make shell`: Open a Django shell inside the container.
- `make superuser`: Create a Django superuser.
- `make requirements`: Install Python dependencies from `requirements.txt`.
- `make migrations`: Create new database migrations.
- `make migrate`: Apply database migrations.
- `make db-shell`: Access the database shell.
- `make db-ssh`: Open a shell in the PostgreSQL container.
- `make reset-db`: Reset the database.
- `make apply-fixtures`: Load initial data from fixtures.

## Duplicating the Project

To duplicate this project:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/olagold-hackxx/climate_wavers.git
   cd backend-new
   ```

2. **Set Up Environment Variables:**

   Copy the `.env` file from the original project or