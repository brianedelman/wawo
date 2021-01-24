from rest_framework import serializers

from wawo.account.serializers import BusinessUserSerializer

from .models import (
    Business,
    BusinessCategory,
    BusinessEvent,
    BusinessImage,
    BusinessPromotion,
    BusinessTestimonial,
)


class BusinessCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessCategory
        fields = [
            "name",
            "description",
            "slug",
            "image",
        ]


class BusinessEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessEvent
        fields = [
            "id",
            "name",
            "description",
            "link",
            "when",
            "location",
            "image",
        ]


class BusinessTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessTestimonial
        fields = [
            "id",
            "person_name",
            "person_title",
            "quote",
        ]


class BusinessPromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessPromotion
        fields = [
            "id",
            "title",
            "text",
        ]


class BusinessImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessImage
        fields = [
            "id",
            "image",
        ]


class BusinessSerializer(serializers.ModelSerializer):
    founder = BusinessUserSerializer()
    business_type = serializers.SerializerMethodField()
    price_point = serializers.SerializerMethodField()
    images = BusinessImageSerializer(many=True)
    events = BusinessEventSerializer(many=True)
    categories = BusinessCategorySerializer(many=True)
    testimonials = BusinessTestimonialSerializer(many=True)
    promotions = BusinessPromotionSerializer(many=True)
    location_type = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Business
        lookup_field = "slug"

        fields = [
            "id",
            "name",
            "slug",
            "founder",
            "description",
            "short_description",
            "facebook",
            "instagram",
            "youtube",
            "twitter",
            "business_url",
            "categories",
            "business_type",
            "price_point",
            "main_image",
            "hero_image",
            "images",
            "events",
            "testimonials",
            "promotions",
            "location_type",
            "address1",
            "address2",
            "city",
            "state",
            "country",
            "location",
            "postal_code",
        ]

    def get_location_type(self, obj):
        return obj.get_location_type_display()

    def get_location(self, obj):
        return obj.location

    def get_business_type(self, obj):
        return obj.get_business_type_display()

    def get_price_point(self, obj):
        return obj.get_price_point_display()

    # def update(self, instance, validated_data):
    #     entered_by = validated_data.pop("entered_by")
    #     lab = validated_data.pop("lab")
    #     client = validated_data.pop("client")
    #     instance.entered_by = get_object_or_404(LabUser, id=entered_by.get("id"))
    #     instance.lab = get_object_or_404(Lab, id=lab.get("id"))
    #     instance.client = get_object_or_404(Client, id=client.get("id"))
    #     instance.save()
    #     return super().update(instance, validated_data)


class BusinessSlugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business

        fields = [
            "slug",
        ]
