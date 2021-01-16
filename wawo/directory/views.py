from rest_framework import viewsets

from .models import Business
from .permission import IsBusinessUser
from .serializers import BusinessSerializer


class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.prefetch_related(
        "categories", "events", "promotions", "testimonials", "images"
    )
    serializer_class = BusinessSerializer
    permission_classes = [IsBusinessUser]
