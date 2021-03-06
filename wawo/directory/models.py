from django.db import models

from autoslug import AutoSlugField
from django.contrib.postgres.search import SearchVector
from django.utils.functional import cached_property
from model_utils.models import TimeStampedModel

from wawo.account.models import BusinessUser
from wawo.util.util import file_url

from .constants import BusinessType, LocationType, PricePoint


class BusinessCategory(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True)
    slug = AutoSlugField(unique=True, populate_from="name",)
    image = models.ImageField(upload_to=file_url("categories"))
    color_hex = models.CharField(
        max_length=7,
        help_text="Enter the hex code for the color of the category. Ex. #333333",
        null=True,
    )

    class Meta:
        verbose_name_plural = "business categories"

    def __str__(self):
        return self.name


class LocationQueryset(models.QuerySet):
    def with_location(self):
        return self.annotate(
            location=SearchVector(
                "address1", "address2", "city", "state", "postal_code",
            )
        )


class LocationBase(models.Model):
    # TODO can i make certain fields nullable if location_type is a certain thing?
    location_type = models.CharField(
        max_length=4, choices=LocationType.choices, default=LocationType.ONLINE,
    )
    address1 = models.CharField(max_length=150, null=True, blank=True)
    address2 = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=165, null=True, blank=True)
    state = models.CharField(max_length=3, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=10, null=True, blank=True)
    store_hours = models.CharField(max_length=150, null=True, blank=True)

    objects = LocationQueryset.as_manager()

    @cached_property
    def location(self):
        # TODO: this will fail if they are brick and mortar but have no city state, need to require?
        if self.location_type == LocationType.PHYSICAL.value:
            return f"{self.city}, {self.state}"
        return None

    class Meta:
        abstract = True


class Business(LocationBase, TimeStampedModel):
    name = models.CharField(max_length=100)
    slug = AutoSlugField(unique=True, populate_from="name",)
    founder = models.ForeignKey(
        BusinessUser, on_delete=models.CASCADE, related_name="businesses"
    )
    description = models.TextField()
    short_description = models.CharField(max_length=255)

    facebook = models.URLField(max_length=200, null=True, blank=True)
    instagram = models.URLField(max_length=200, null=True, blank=True)
    youtube = models.URLField(max_length=200, null=True, blank=True)
    twitter = models.URLField(max_length=200, null=True, blank=True)
    business_url = models.URLField(max_length=200, null=True, blank=True)

    categories = models.ManyToManyField(BusinessCategory, blank=True)
    business_type = models.CharField(
        max_length=4, choices=BusinessType.choices, default=BusinessType.PRODUCT,
    )

    price_point = models.IntegerField(choices=PricePoint.choices, null=True, blank=True)

    main_image = models.ImageField(upload_to=file_url("businesses"))

    class Meta:
        verbose_name_plural = "Businesses"
        ordering = ["created"]

    def __str__(self):
        return self.name


# TODO limit the amount either in backend or on frontend?
class CarouselImage(TimeStampedModel):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="carousel_images"
    )
    image = models.ImageField(upload_to=file_url("businesses"))
    alt = models.CharField(max_length=100)
    position = models.PositiveIntegerField(
        default=1, help_text="Order of the image, smaller being displayed first",
    )

    def __str__(self):
        return f"{self.business} Carousel Image {self.alt}"


class BusinessImage(TimeStampedModel):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to=file_url("businesses"))
    alt = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"{self.business} Image"


class BusinessEvent(TimeStampedModel):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="events"
    )
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    link = models.URLField(max_length=200, null=True, blank=True)
    when = models.CharField(max_length=100)
    location = models.CharField(max_length=60)

    image = models.ImageField(upload_to=file_url("events"), null=True, blank=True)

    def __str__(self):
        return self.name


class BusinessTestimonial(TimeStampedModel):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="testimonials"
    )
    person_name = models.CharField(max_length=100)
    person_title = models.CharField(max_length=50)
    quote = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.person_name} - {self.person_title}"


class BusinessPromotion(TimeStampedModel):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="promotions"
    )
    title = models.CharField(max_length=100)
    text = models.CharField(max_length=200)

    def __str__(self):
        return self.title
