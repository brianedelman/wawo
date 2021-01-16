from model_bakery.recipe import Recipe, foreign_key, related

from wawo.account.baker_recipes import founder

from .models import Business, BusinessCategory

category = Recipe(BusinessCategory, name="Black-Owned", slug="black-owned")

business = Recipe(
    Business,
    founder=foreign_key(founder),
    name="Super Cool Biz",
    categories=related(category),
    description="a longer description",
    short_description="a shorter description",
    facebook="https://www.facebook.com",
    business_url="https://www.google.com",
)
