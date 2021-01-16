from django.test import TestCase
from django.urls import reverse

from django.utils import timezone
from model_bakery import baker

from wawo.directory.models import Business


class BusinessViewSetTest(TestCase):
    def setUp(self):
        self.business = baker.make_recipe("wawo.directory.business")
        self.founder = self.business.founder
        self.user = baker.make_recipe("wawo.account.user")

    def test_business_viewset_returns_data__logged_in_as_regular_user(self):
        url = reverse("business-list")

        self.client.force_login(self.user)
        response = self.client.get(url)
        self.assertContains(response, self.business.name)
        self.assertEqual(response.json().get("count"), 1)

    def test_business_viewset_returns_data__logged_in_as_founder(self):
        url = reverse("business-list")

        self.client.force_login(self.founder)
        response = self.client.get(url)
        self.assertContains(response, self.business.name)
        self.assertEqual(response.json().get("count"), 1)

    def test_business_viewset_returns_data__not_logged_in(self):
        url = reverse("business-list")
        response = self.client.get(url)
        self.assertEqual(response.json().get("count"), 1)

    def test_business_viewset_returns_correct_data(self):
        url = reverse("business-list")

        self.client.force_login(self.user)
        response = self.client.get(url)
        rsp = response.json().get("results")[0]
        self.assertEqual(rsp["founder"]["id"], self.founder.id)
        self.assertEqual(rsp["founder"]["first_name"], self.founder.first_name)
        self.assertEqual(rsp["description"], self.business.description)
        self.assertEqual(rsp["short_description"], self.business.short_description)
        self.assertEqual(rsp["business_url"], self.business.business_url)
        self.assertEqual(rsp["facebook"], self.business.facebook)
        self.assertEqual(
            rsp["categories"][0]["slug"], self.business.categories.first().slug
        )
