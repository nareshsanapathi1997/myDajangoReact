from mongoengine import Document, StringField, EmailField, DateTimeField
from datetime import datetime
from django.contrib.auth.hashers import make_password, check_password

class User(Document):
    name = StringField(max_length=100, required=True)
    email = EmailField(unique=True, required=True)
    password = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {'collection': 'users'}  # Specifies MongoDB collection name

    def set_password(self, raw_password):
        """Hashes the password before storing"""
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """Checks if the given password matches the stored hash"""
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.email
