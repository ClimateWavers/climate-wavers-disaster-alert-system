import os
import yaml
from django.conf import settings
from django.core.management.base import BaseCommand

from api.models import User


class Command(BaseCommand):
    help = "Create users from YAML file"

    def handle(self, *args, **kwargs):
        file_path = os.path.join(settings.BASE_DIR, "fixtures", "admins.yaml")
        with open(file_path) as f:
            data = yaml.load(f, Loader=yaml.FullLoader)
            valid_data = []
            many_to_many_fields = ["groups", "user_permissions"]
            for index, item in enumerate(data):
                user_data = {}
                for field in item["fields"]:
                    if field in many_to_many_fields:
                        continue
                    user_data[field] = item["fields"][field]
                valid_data.append(user_data)
        users = User.objects.bulk_create(
            [User(**item) for item in valid_data], ignore_conflicts=True
        )

        self.stdout.write(
            self.style.SUCCESS(f"Successfully created {len(users)} admin users ")
        )
