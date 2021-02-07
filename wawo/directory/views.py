from django.db.models import Q
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from django_filters import rest_framework as filters

from .constants import BusinessType
from .models import Business, BusinessCategory
from .permission import IsBusinessUser
from .serializers import (
    BusinessCategorySerializer,
    BusinessSerializer,
    BusinessSlugSerializer,
)


class BusinessPagination(PageNumberPagination):
    page_size = 12
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


class BusinessSlugPagination(PageNumberPagination):
    page_size = 255
    max_page_size = 255


class BusinessFilter(filters.FilterSet):
    category = filters.CharFilter(method="filter_category", label="Category")
    search = filters.CharFilter(method="filter_search", label="Search")
    location = filters.CharFilter(method="filter_location", label="City or zip code")
    type = filters.CharFilter(method="filter_type", label="Business Type")
    founder = filters.CharFilter(method="filter_founder", label="Founder")

    class Meta:
        model = Business
        fields = [
            "location",
            "category",
            "founder",
            "price_point",
            "search",
            "location",
            "type",
            "founder",
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

    def filter_type(self, queryset, name, value):  # pylint: disable=unused-argument
        business_type = BusinessType[value.upper()].value
        return queryset.filter(business_type=business_type)

    def filter_founder(self, queryset, name, value):  # pylint: disable=unused-argument
        return queryset.filter(founder=value)


class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.prefetch_related(
        "categories", "events", "promotions", "testimonials", "images"
    ).select_related("founder")
    lookup_field = "slug"
    serializer_class = BusinessSerializer
    permission_classes = [IsBusinessUser]
    pagination_class = BusinessPagination
    filterset_class = BusinessFilter


class BusinessSlugViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.all()
    serializer_class = BusinessSlugSerializer
    permission_classes = [IsBusinessUser]
    pagination_class = BusinessSlugPagination


class BusinessCategoryViewSet(viewsets.ModelViewSet):

    queryset = BusinessCategory.objects.all()
    serializer_class = BusinessCategorySerializer
    permission_classes = [IsBusinessUser]
