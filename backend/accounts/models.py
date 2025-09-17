from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("isp", "Internet Service Provider"),
        ("enduser", "End User"),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="enduser")

    def __str__(self):
        return f"{self.username} ({self.role})"
