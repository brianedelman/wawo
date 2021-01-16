from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Business
from .permission import IsBusinessUser
from .serializers import BusinessSerializer


class BusinessPagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = "page_size"
    max_page_size = 25

    def get_paginated_response(self, data, component_count=None):
        # more attr is needed by select2 inifinite scroll
        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "page": self.page.number,
                "per_page": self.page.paginator.per_page,
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "results": data,
            }
        )


class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.prefetch_related(
        "categories", "events", "promotions", "testimonials", "images"
    )
    serializer_class = BusinessSerializer
    permission_classes = [IsBusinessUser]
    pagination_class = BusinessPagination
