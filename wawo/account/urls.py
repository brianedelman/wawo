from django.urls import include, path  # NOQA
from rest_framework.routers import DefaultRouter

from .views import TokenCreateView, UserCreateView, UserViewSet

router = DefaultRouter()
router.register("users", UserViewSet)


urlpatterns = [
    path("token/login/", TokenCreateView.as_view(), name="login"),
    path("register/", UserCreateView.as_view(), name="register"),
] + router.urls
