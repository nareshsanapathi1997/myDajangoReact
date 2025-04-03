from rest_framework import serializers
from users.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)  # MongoDB `_id` is a string
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Ensure passwords match before creating the user"""
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        """Manually create and save the MongoEngine User"""
        validated_data.pop('confirm_password')  # Remove confirm_password before saving
        user = User(
            name=validated_data['name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Hash password
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        """Validates user credentials and generates JWT token"""
        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid credentials")

        if not user.check_password(password):
            raise AuthenticationFailed("Invalid credentials")

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return {
            "status": "success",
            "access_token": str(refresh.access_token),
            "user": {
                "user_id": str(user.id),
                "name": user.name,
                "email": user.email,
            },
        }
