# 📄 start_handler.py
from telebot.types import Message
from loader import bot
from database.lang_db import set_lang
from utils.localization import translate

@bot.message_handler(commands=['start'])
def start_handler(message: Message):
    user_id = message.from_user.id
    tg_lang = message.from_user.language_code[:2]

    supported = ['ru', 'en', 'pl', 'de', 'fr', 'es', 'it', 'uk', 'cs']
    selected = tg_lang if tg_lang in supported else 'en'

    # Сохраняем язык пользователя
    set_lang(user_id, selected)

    # Приветствие
    bot.send_message(message.chat.id, translate(user_id, "welcome"))