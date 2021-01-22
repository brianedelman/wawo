from model_bakery.recipe import Recipe, seq

from .models import BusinessUser, User

email_seq = seq("test@wearewomenowned.com")

user = Recipe(User, first_name="Johnny", last_name=seq("User"), email=email_seq)

founder = Recipe(
    BusinessUser, first_name="Lisa", last_name=seq("Bobisa"), email=email_seq
)

founder1 = Recipe(
    BusinessUser, first_name="Founder", last_name=seq("User"), email=email_seq
)
