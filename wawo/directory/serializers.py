from rest_framework import serializers

from wawo.account.serializers import BusinessUserSerializer

from .models import (
    Business,
    BusinessCategory,
    BusinessEvent,
    BusinessImage,
    BusinessPromotion,
    BusinessTestimonial,
    CarouselImage,
)


class BusinessCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessCategory
        fields = ["name", "description", "slug", "image", "color_hex"]


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
        fields = ["id", "image", "alt"]


class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage
        fields = ["id", "image", "alt", "position"]


class BusinessSerializer(serializers.ModelSerializer):
    founder = BusinessUserSerializer()
    business_type_display = serializers.SerializerMethodField()
    price_point_display = serializers.SerializerMethodField()
    carousel_images = CarouselImageSerializer(many=True)
    images = BusinessImageSerializer(many=True)
    events = BusinessEventSerializer(many=True)
    categories = BusinessCategorySerializer(many=True)
    testimonials = BusinessTestimonialSerializer(many=True)
    promotions = BusinessPromotionSerializer(many=True)
    location_type_display = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    has_other_businesses = serializers.SerializerMethodField()

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
            "business_type_display",
            "business_type",
            "price_point",
            "price_point_display",
            "main_image",
            "images",
            "carousel_images",
            "events",
            "testimonials",
            "promotions",
            "location_type_display",
            "location_type",
            "address1",
            "address2",
            "city",
            "state",
            "country",
            "store_hours",
            "location",
            "postal_code",
            "has_other_businesses",
        ]

    def get_location_type_display(self, obj):
        return obj.get_location_type_display()

    def get_location(self, obj):
        return obj.location

    def get_business_type_display(self, obj):
        return obj.get_business_type_display()

    def get_price_point_display(self, obj):
        return obj.get_price_point_display()

    def get_has_other_businesses(self, obj):
        """return related businesses"""
        return obj.founder.businesses.exclude(id=obj.id).exists()

    # def update(self, instance, validated_data):
    #     entered_by = validated_data.pop("entered_by")
    #     lab = validated_data.pop("lab")
    #     client = validated_data.pop("client")
    #     instance.entered_by = get_object_or_404(LabUser, id=entered_by.get("id"))
    #     instance.lab = get_object_or_404(Lab, id=lab.get("id"))
    #     instance.client = get_object_or_404(Client, id=client.get("id"))
    #     instance.save()
    #     return super().update(instance, validated_data)
