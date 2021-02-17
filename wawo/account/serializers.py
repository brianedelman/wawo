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


class UserSerializer(serializers.ModelSerializer):
    display_first_name = serializers.SerializerMethodField()
    display_last_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "profile_image",
            "is_business_user",
            "display_first_name",
            "display_last_name",
        ]

    def get_display_first_name(self, obj):
        return obj.display_first_name

    def get_display_last_name(self, obj):
        return obj.display_last_name


class BusinessUserSerializer(UserSerializer):
    businesses = serializers.SerializerMethodField()

    class Meta:
        model = BusinessUser
        fields = UserSerializer.Meta.fields + [
            "founder_title",
            "founder_first_name",
            "founder_last_name",
            "about",
            "display_founder_information",
            "businesses",
        ]

    def get_businesses(self, obj):
        return list(obj.businesses.order_by("created").values("slug", "name"))
