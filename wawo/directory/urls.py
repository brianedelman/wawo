from rest_framework.routers import DefaultRouter

from .views import BusinessCategoryViewSet, BusinessSlugViewSet, BusinessViewSet

router = DefaultRouter()

router.register("businesses", BusinessViewSet, basename="business")
router.register("business-slugs", BusinessSlugViewSet, basename="business-slug")
router.register("categories", BusinessCategoryViewSet, basename="business-category")

urlpatterns = router.urls
