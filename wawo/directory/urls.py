from rest_framework.routers import DefaultRouter

from .views import BusinessCategoryViewSet, BusinessViewSet

router = DefaultRouter()

router.register("businesses", BusinessViewSet, basename="business")
router.register("categories", BusinessCategoryViewSet, basename="business-category")

urlpatterns = router.urls
