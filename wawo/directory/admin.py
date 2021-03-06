from django.contrib import admin
from import_export.admin import ImportExportMixin

from .models import (
    Business,
    BusinessCategory,
    BusinessEvent,
    BusinessImage,
    BusinessPromotion,
    BusinessTestimonial,
    CarouselImage,
)


class EventInline(admin.TabularInline):
    model = BusinessEvent


class PromotionInline(admin.TabularInline):
    model = BusinessPromotion


class TestimonialInline(admin.TabularInline):
    model = BusinessTestimonial


class ImageInline(admin.TabularInline):
    model = BusinessImage


class CarouselImageInline(admin.TabularInline):
    model = CarouselImage


class BusinessAdmin(ImportExportMixin, admin.ModelAdmin):

    fields = (
        "name",
        "founder",
        "description",
        "short_description",
        "main_image",
        "business_url",
        "categories",
        "business_type",
        "price_point",
        "facebook",
        "instagram",
        "twitter",
        "youtube",
        "location_type",
        "address1",
        "address2",
        "city",
        "state",
        "postal_code",
        "country",
        "store_hours",
    )

    autocomplete_fields = ("categories", "founder")
    search_fields = ("founder", "name", "price_point", "business_type")
    readonly_fields = ("created",)
    list_display = ("id", "name", "founder", "business_type", "price_point")
    inlines = (
        EventInline,
        PromotionInline,
        TestimonialInline,
        ImageInline,
        CarouselImageInline,
    )


class BusinessCategoryAdmin(ImportExportMixin, admin.ModelAdmin):
    fields = ("name", "description", "image", "slug", "color_hex")
    readonly_fields = ("slug",)
    search_fields = (
        "name",
        "slug",
    )


class BusinessEventAdmin(ImportExportMixin, admin.ModelAdmin):
    fields = ("business", "name", "description", "image", "link", "when", "location")
    autocomplete_fields = ("business",)
    list_display = ("id", "name", "business", "link")


class BusinessImageAdmin(admin.ModelAdmin):
    fields = (
        "business",
        "image",
        "alt",
    )
    autocomplete_fields = ("business",)
    list_display = ("id", "business", "image", "alt")


class CarouselImageAdmin(admin.ModelAdmin):
    fields = (
        "business",
        "image",
        "position",
        "alt",
    )
    autocomplete_fields = ("business",)
    list_display = ("id", "business", "image", "alt", "position")


class BusinessPromotionAdmin(admin.ModelAdmin):
    fields = (
        "business",
        "title",
        "text",
    )
    autocomplete_fields = ("business",)
    list_display = (
        "id",
        "title",
        "text",
        "business",
    )


class BusinessTestimonialAdmin(admin.ModelAdmin):
    fields = (
        "business",
        "person_name",
        "person_title",
        "quote",
    )
    autocomplete_fields = ("business",)
    list_display = (
        "id",
        "person_name",
        "person_title",
        "business",
    )


admin.site.register(Business, BusinessAdmin)
admin.site.register(BusinessEvent, BusinessEventAdmin)
admin.site.register(BusinessCategory, BusinessCategoryAdmin)
admin.site.register(BusinessImage, BusinessImageAdmin)
admin.site.register(CarouselImage, CarouselImageAdmin)
admin.site.register(BusinessPromotion, BusinessPromotionAdmin)
admin.site.register(BusinessTestimonial, BusinessTestimonialAdmin)
