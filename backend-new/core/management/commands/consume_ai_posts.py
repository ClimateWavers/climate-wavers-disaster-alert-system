# myapp/management/commands/consume_queue.py
import json
import pika
from django.core.management.base import BaseCommand
from api.models import User
from core.models import Post
from django.conf import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = "Consume messages from RabbitMQ and create AI posts"

    def handle(self, *args, **kwargs):
        # Define the RabbitMQ connection
        parameters = pika.URLParameters(settings.AMQP_URL)
        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()

        # Declare the queue
        channel.queue_declare(queue="ai_posts", durable=False)

        def callback(ch, method, properties, body):
            try:
                # Process the incoming message
                logger.info("Received message")
                data = json.loads(body)
                logger.info("Received new content from AI")
                
                print(data)
                
                user = User.objects.get(username=data["username"])
                if not Post.objects.filter(user=user, content=data["content"]).exists():
                    Post.objects.create(
                        user=user, content=data["content"], image=data.get("image", "")
                    )
                    logger.info("Created post for AI")
                else:
                    logger.info("Duplicate post detected, skipping creation")

                # Acknowledge the message after processing
                ch.basic_ack(delivery_tag=method.delivery_tag)

            except json.JSONDecodeError:
                ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
            except Exception as e:
                logger.error(f"Error processing message: {e}")
                ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

        # Set up message consumption
        channel.basic_consume(queue="ai_posts", on_message_callback=callback)

        # Start consuming messages
        logger.info("Waiting for messages. To exit press CTRL+C")
        try:
            channel.start_consuming()
        except KeyboardInterrupt:
            channel.stop_consuming()

        # Close connection on exit
        connection.close()
