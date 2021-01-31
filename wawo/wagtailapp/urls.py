from django.urls import include, path, re_path

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.contrib.sitemaps.views import sitemap
from wagtail.core import urls as wagtail_urls

from .api.v2 import urls as api_urls

urlpatterns = [
    re_path(r"^cms/", include(wagtailadmin_urls)),
    path("api/v2/", include(api_urls)),
    re_path(r"^sitemap\.xml$", sitemap),
    re_path(r"^", include(wagtail_urls)),
]
