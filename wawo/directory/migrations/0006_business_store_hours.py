# Generated by Django 3.1.5 on 2021-02-13 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("directory", "0005_carouselimage"),
    ]

    operations = [
        migrations.AddField(
            model_name="business",
            name="store_hours",
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
