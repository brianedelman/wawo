# Generated by Django 3.1.5 on 2021-01-27 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("directory", "0002_auto_20210124_0140"),
    ]

    operations = [
        migrations.AddField(
            model_name="businesscategory",
            name="color_hex",
            field=models.CharField(
                help_text="Enter the hex code for the color of the category. Ex. #333333",
                max_length=7,
                null=True,
            ),
        ),
    ]