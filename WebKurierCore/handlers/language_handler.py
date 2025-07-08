from telebot.types import Message, InlineKeyboardMarkup, InlineKeyboardButton
from loader import bot  # импорт основного объекта бота

# Словари флагов и языков
LANG_FLAGS = {
    'ru': '🇷🇺 Русский',
    'en': '🇬🇧 English',
    'de': '🇩🇪 Deutsch',
    'pl': '🇵🇱 Polski',
    'fr': '🇫🇷 Français',
    'es': '🇪🇸 Español',
    'it': '🇮🇹 Italiano',
    'uk': '🇺🇦 Українська',
    'cs': '🇨🇿 Čeština',
}

@bot.message_handler(commands=['language'])
def language_command(message: Message):
    markup = InlineKeyboardMarkup(row_width=2)
    for code, label in LANG_FLAGS.items():
        markup.add(InlineKeyboardButton(text=label, callback_data=f"set_lang_{code}"))
    
    bot.send_message(
        message.chat.id,
        "🌐 Пожалуйста, выберите язык интерфейса:",
        reply_markup=markup
    )

@bot.callback_query_handler(func=lambda call: call.data.startswith("set_lang_"))
def set_language(call):
    lang_code = call.data.split("_")[-1]
    # Сохраняем язык пользователя в БД или памяти
    # Пример: user_data[call.from_user.id]['lang'] = lang_code
    bot.answer_callback_query(call.id, f"Язык установлен: {LANG_FLAGS[lang_code]}")
    bot.send_message(call.message.chat.id, f"✅ Интерфейс теперь на {LANG_FLAGS[lang_code]}")