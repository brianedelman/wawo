from django.core.mail import send_mail
from django.db import models

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _
from model_utils.models import TimeStampedModel
from polymorphic.models import PolymorphicManager, PolymorphicModel

from wawo.util.util import file_url


class UserManager(BaseUserManager, PolymorphicManager):
    use_in_migrations = True

    @classmethod
    def normalize_email(cls, email):
        """All email providers treat emails in a case-insensitive manner."""
        email = email or ""
        return email.lower()

    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(  # noqa
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, **extra_fields)

    def get_by_natural_key(
        self, username
    ):  # Used by contrib.auth.backends.ModelBackend
        return self.get(email__iexact=username)


class User(PolymorphicModel, TimeStampedModel, AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        _("email address"),
        unique=True,
        error_messages={"unique": _("A user with that email address already exists.")},
    )
    first_name = models.CharField(_("first name"), max_length=30, blank=True)
    last_name = models.CharField(_("last name"), max_length=30, blank=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin " "site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as "
            "active. Unselect this instead of deleting accounts."
        ),
    )

    birthday = models.DateField(null=True, blank=True)
    # TODO email verified flow
    email_verified = models.BooleanField(default=False)
    # TODO terms agreed flow or just force them to agree
    terms_agreed = models.BooleanField(default=False)
    profile_image = models.ImageField(
        upload_to=file_url("profiles"), blank=True, null=True
    )

    favorites = models.ManyToManyField("directory.Business", blank=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def get_full_name(self):
        """Returns the first_name plus the last_name, with a space in between."""
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Returns the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Sends an email to this User."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def __str__(self):
        name = self.get_full_name()
        return name if name else self.email

    def get_absolute_url(self):
        """
        The absolute url of the user model
        """
        raise NotImplementedError()

    @cached_property
    def display_first_name(self):
        return self.founder_first_name if self.founder_first_name else self.first_name

    @cached_property
    def display_last_name(self):
        return self.founder_last_name if self.founder_last_name else self.last_name


class BusinessUser(User):
    about = models.CharField(max_length=255, blank=True, null=True)
    founder_first_name = models.CharField(max_length=30, blank=True, null=True)
    founder_last_name = models.CharField(max_length=30, blank=True, null=True)
    founder_title = models.CharField(max_length=30, blank=True, null=True)

    display_founder_information = models.BooleanField(default=True)
