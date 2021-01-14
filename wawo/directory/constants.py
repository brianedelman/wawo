from django.db.models import IntegerChoices, TextChoices


class BusinessType(TextChoices):
    PRODUCT = "PDCT", "Product"
    NON_PROFIT = "NPFT", "Non-Profit"
    SERVICE = "SRVC", "Service"


class LocationType(TextChoices):
    ONLINE = "ONLN", "Online"
    PHYSICAL = "PHYS", "Brick & Mortar"


class PricePoint(IntegerChoices):
    ONE = 1, "$"
    TWO = 2, "$$"
    THREE = 3, "$$$"
    FOUR = 4, "$$$$"
