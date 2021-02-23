from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):
    scaled_url = serializers.SerializerMethodField()

    class Meta:
        from .models import CustomImage  # noqa

        model = CustomImage
        fields = [
            "scaled_url",
            "height",
            "width",
            "focal_point_x",
            "focal_point_y",
            "focal_point_height",
            "focal_point_width",
            "alt",
        ]

    def get_scaled_url(self, obj):
        thumbnail = obj.get_rendition("scale-100")
        url = thumbnail.url

        return url
