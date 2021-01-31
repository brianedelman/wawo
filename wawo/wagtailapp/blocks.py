from wagtail.core.blocks import (
    BooleanBlock,
    CharBlock,
    ChoiceBlock,
    IntegerBlock,
    PageChooserBlock,
    RichTextBlock,
    StreamBlock,
    StructBlock,
    StructValue,
    TextBlock,
    URLBlock,
)
from wagtail.images.blocks import ImageChooserBlock

from . import constants


class APIImageChooserBlock(ImageChooserBlock):
    def get_api_representation(self, value, context=None):
        # pylint: disable=cyclic-import
        from . import serializers as local_serializers  # noqa

        # pylint: enable=cyclic-import

        return local_serializers.ImageSerializer(context=context).to_representation(
            value
        )


class ComponentStreamBlock(StreamBlock):
    def get_api_representation(self, value, context=None):
        if value is None:
            # treat None as identical to an empty stream
            return []

        representation = []
        for child in value:  # child is a StreamChild instance
            child_data = {
                "type": child.block.name,
                "value": child.block.get_api_representation(
                    child.value, context=context
                ),
                "id": child.id,
                "component": getattr(child.block.meta, "component", ""),
            }
            representation.append(child_data)
        return representation


class ComponentStructBlock(StructBlock):
    def get_api_representation(self, value, context=None):
        """ Recursively call get_api_representation on children and return as a plain dict """
        representation = []
        for name, val in value.items():
            if isinstance(self.child_blocks[name], StreamBlock):
                self.child_blocks[name].__class__ = ComponentStreamBlock
            representation.append(
                (
                    name,
                    self.child_blocks[name].get_api_representation(
                        val, context=context
                    ),
                )
            )
        return dict(representation)


class TitleBlock(ComponentStructBlock):
    title = CharBlock()
    variant = ChoiceBlock(choices=constants.HEADING_CHOICES, default="h1")
    component = CharBlock(
        max_length="2",
        required=False,
        help_text="""Enter h1, h2, h3, h4, h5, or h6. This will mean the component gets the styling
        of an h1 (for instance with the variant) but the html tag will be an h2 (for instance)""",
    )
    color_override = CharBlock(
        max_length=7, required=False, help_text="Hex code of color"
    )
    background_color = CharBlock(
        max_length=7,
        required=False,
        help_text="Meant to use as a full width background color",
    )
    alignment = ChoiceBlock(choices=constants.ALIGNMENT_CHOICES, default="center")
    containment = ChoiceBlock(choices=constants.CONTAINMENT_CHOICES, default="md")

    class Meta:
        component = "Title"
        template = "blocks/title_block.html"


class CustomRichTextBlock(ComponentStructBlock):
    text = RichTextBlock()
    alignment = ChoiceBlock(choices=constants.ALIGNMENT_CHOICES, default="center")
    containment = ChoiceBlock(choices=constants.CONTAINMENT_CHOICES, default="md")

    class Meta:
        component = "CustomRichText"


class LinkStructValue(StructValue):
    def url(self):
        url = self.get("url")
        page = self.get("page")
        if url:
            return url
        if page:
            return page.url
        return ""


class LinkBlock(ComponentStructBlock):
    link_text = CharBlock(max_length=100)
    page = PageChooserBlock(label="Internal Page", required=False)
    url = CharBlock(
        label="URL to internal page (like directory) or external site", required=False
    )
    component_type = ChoiceBlock(
        choices=constants.LINK_COMPONENT_TYPE_CHOICES, default="button"
    )
    button_background = ChoiceBlock(
        choices=constants.COLOR_PROP_CHOICES, default="primary"
    )
    button_variant = ChoiceBlock(
        choices=constants.BUTTON_VARIANT_PROP_CHOICES, default="contained"
    )
    button_size = ChoiceBlock(
        choices=constants.BUTTON_SIZE_PROP_CHOICES, default="medium"
    )
    color = CharBlock(max_length=7, required=False, help_text="Hex code of color")

    class Meta:
        component = "LinkButton"
        value_class = LinkStructValue


class ColumnBlock(ComponentStructBlock):
    class_name = "column"
    body = StreamBlock(
        [
            ("title", TitleBlock(required=False)),
            ("text", RichTextBlock(required=False)),
            ("image", APIImageChooserBlock(required=False)),
            ("link", LinkBlock(required=False)),
        ]
    )

    class Meta:
        component = "Column"
        icon = "cogs"
        label = "Column"
        template = "blocks/column.html"

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        context["class_name"] = self.class_name
        return context


class SpacerBlock(ComponentStructBlock):
    height = IntegerBlock(default=0)
    mobile_height = IntegerBlock(default=0)

    class Meta:
        component = "Spacer"
        template = "blocks/spacer.html"


class HeroBlock(ComponentStructBlock):
    height_override = IntegerBlock(
        default=0, help_text="Override default styling for minheight"
    )
    mobile_height_override = IntegerBlock(
        default=0, help_text="Override default styling for minheight for mobile"
    )
    image = APIImageChooserBlock()
    title = CharBlock(required=False)
    text = RichTextBlock(required=False)
    contained = BooleanBlock(default=True, required=False)

    class Meta:
        component = "Hero"
        icon = "image / picture"


class RowBlock(ComponentStructBlock):
    content = StreamBlock([("column", ColumnBlock(required=False))])

    class Meta:
        component = "Row"
        template = "blocks/row.html"
        icon = "cogs"
        label = "Row"


class SectionBlock(ComponentStructBlock):
    special_class = CharBlock(required=False)

    rows = StreamBlock(
        [
            ("row", RowBlock()),
            ("title", TitleBlock()),
            ("text", CustomRichTextBlock()),
            ("link", LinkBlock()),
            ("spacer", SpacerBlock()),
        ]
    )

    class Meta:
        component = "Section"
        template = "blocks/section.html"
        icon = "doc-empty"
        label = "Section"


class SocialBlock(ComponentStructBlock):
    url = URLBlock(help_text="Your social page URL")
    title = CharBlock()
    logo_text = TextBlock()
    image = ImageChooserBlock(required=False)
