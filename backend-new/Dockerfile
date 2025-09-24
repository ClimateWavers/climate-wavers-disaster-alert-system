FROM python:3.10.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Acceptable environment variables
ARG ALLOWED_HOSTS
ENV ALLOWED_HOSTS=$ALLOWED_HOSTS

ARG MYSQL_HOST
ENV MYSQL_HOST=$MYSQL_HOST

# Set work directory
WORKDIR /backend

# Install dependencies required for MySQL and other essentials
RUN apt-get update -y && apt-get install -y python3-dev default-libmysqlclient-dev build-essential pkg-config && rm -rf /var/lib/apt/lists/*

# Upgrade pip to the latest version
RUN pip install --upgrade pip

# Copy project files to the working directory
COPY . /backend/

# Install Python dependencies from requirements.txt
RUN pip install -r requirements.txt

# Make sure the entrypoint script is executable
RUN chmod +x entrypoint.sh

# Define entrypoint script for container initialization
ENTRYPOINT ["sh", "entrypoint.sh"]

# Command to run Daphne (ASGI server)
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "auth.asgi:application"]
