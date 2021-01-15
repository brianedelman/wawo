from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Business
from .permission import IsBusinessUser
from .serializers import BusinessSerializer


class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.prefetch_related(
        "categories", "events", "promotions", "testimonials", "images"
    )
    serializer_class = BusinessSerializer
    permission_classes = [IsBusinessUser]
