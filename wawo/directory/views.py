from django.db.models import Q
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from django_filters import rest_framework as filters

from .models import Business, BusinessCategory
from .permission import IsBusinessUser
from .serializers import BusinessCategorySerializer, BusinessSerializer


class BusinessPagination(PageNumberPagination):
    page_size = 4
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


class BusinessFilter(filters.FilterSet):
    category = filters.CharFilter(method="filter_category", label="Category")
    search = filters.CharFilter(method="filter_search", label="Search")
    location = filters.CharFilter(method="filter_location", label="City or zip code")

    class Meta:
        model = Business
        fields = [
            "location",
            "category",
            "price_point",
            "search",
            "location",
        ]

    def filter_category(self, queryset, name, value):  # pylint: disable=unused-argument
        return queryset.filter(categories__slug__istartswith=value)

    def filter_search(self, queryset, name, value):  # pylint: disable=unused-argument
        return queryset.filter(
            Q(name__icontains=value)
            | Q(description__icontains=value)
            | Q(short_description__icontains=value)
            | Q(founder__first_name__istartswith=value)
            | Q(founder__last_name__istartswith=value)
        )

    def filter_location(self, queryset, name, value):  # pylint: disable=unused-argument
        return queryset.filter(
            Q(city__istartswith=value)
            | Q(postal_code__istartswith=value)
            | Q(state__istartswith=value)
        )


class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.prefetch_related(
        "categories", "events", "promotions", "testimonials", "images"
    )
    serializer_class = BusinessSerializer
    permission_classes = [IsBusinessUser]
    pagination_class = BusinessPagination
    filterset_class = BusinessFilter


class BusinessCategoryViewSet(viewsets.ModelViewSet):

    queryset = BusinessCategory.objects.all()
    serializer_class = BusinessCategorySerializer
    permission_classes = [IsBusinessUser]
