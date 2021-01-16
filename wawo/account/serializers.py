from rest_framework import serializers

from djoser.serializers import (
    TokenCreateSerializer as DjoserTokenCreateSerializer,
    UserCreatePasswordRetypeSerializer as DjoserUserCreateSerializer,
)

from .models import BusinessUser, User


class TokenCreateSerializer(DjoserTokenCreateSerializer):
    remember_me = serializers.BooleanField(default=False)


class UserCreateSerializer(DjoserUserCreateSerializer):
    def validate_email(self, email):
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(
                "A user is already registered with that email"
            )
        return email


class BusinessUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessUser
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "about",
            "founder_first_name",
            "founder_last_name",
            "founder_title",
            "display_founder_information",
            "birthday",
            "profile_image",
        ]
