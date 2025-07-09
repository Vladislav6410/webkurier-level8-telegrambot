SUPPORTED_LANGUAGES = ['ru', 'en', 'de', 'pl', 'fr', 'es', 'it', 'uk', 'cs']

def detect_language(message: Message) -> str:
    user_lang = message.from_user.language_code
    return user_lang if user_lang in SUPPORTED_LANGUAGES else 'en'