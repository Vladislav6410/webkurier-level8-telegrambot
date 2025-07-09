# 📁 utils/localization.py
from database.lang_db import get_lang
from data.menu_text import menus

# Универсальный доступ к кнопкам
def get_menu(user_id):
    lang = get_lang(user_id)
    return menus.get(lang, menus['en'])

# Перевод по ключу
def translate(user_id, key: str) -> str:
    translations = {
        "welcome": {
            "ru": "Добро пожаловать!",
            "en": "Welcome!",
            "pl": "Witamy!",
            "de": "Willkommen!",
            "fr": "Bienvenue!",
            "uk": "Ласкаво просимо!",
        },
        "select_option": {
            "ru": "Выберите опцию:",
            "en": "Select an option:",
            "pl": "Wybierz opcję:",
        }
    }
    lang = get_lang(user_id)
    return translations.get(key, {}).get(lang, key)