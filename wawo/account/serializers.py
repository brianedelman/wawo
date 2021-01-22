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
    display_first_name = serializers.SerializerMethodField()
    display_last_name = serializers.SerializerMethodField()

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
            "display_first_name",
            "display_last_name",
            "founder_title",
            "display_founder_information",
            "birthday",
            "profile_image",
        ]

    def get_display_first_name(self, obj):
        return obj.display_first_name

    def get_display_last_name(self, obj):
        return obj.display_last_name
