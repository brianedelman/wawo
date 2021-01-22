from model_bakery.recipe import Recipe, foreign_key, related

from wawo.account.baker_recipes import founder, founder1

from .constants import BusinessType, PricePoint
from .models import Business, BusinessCategory

category = Recipe(BusinessCategory, name="Black-Owned", slug="black-owned")
category1 = Recipe(BusinessCategory, name="Green-Owned", slug="green-owned")

business = Recipe(
    Business,
    founder=foreign_key(founder),
    name="Super Cool Biz",
    categories=related(category),
    description="a longer description",
    short_description="a shorter description",
    facebook="https://www.facebook.com",
    business_url="https://www.google.com",
    business_type=BusinessType.PRODUCT.value,
)

business1 = Recipe(
    Business,
    founder=foreign_key(founder1),
    name="Amazing Biz",
    categories=related(category1),
    description="search me",
    short_description="a shorter description",
    facebook="https://www.facebook.com",
    business_url="https://www.google.com",
    city="New York",
    state="WV",
    postal_code="10010",
    business_type=BusinessType.SERVICE.value,
    price_point=PricePoint.ONE.value,
)
