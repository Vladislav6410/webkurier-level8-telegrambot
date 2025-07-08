from telebot import types
from menu_text import menus  # импорт языкового словаря

# Языковые флаги
lang_flags = {
    'ru': '🇷🇺', 'en': '🇬🇧', 'de': '🇩🇪', 'pl': '🇵🇱', 'fr': '🇫🇷',
    'es': '🇪🇸', 'it': '🇮🇹', 'ro': '🇷🇴', 'bg': '🇧🇬', 'lt': '🇱🇹',
    'hr': '🇭🇷', 'hu': '🇭🇺', 'cs': '🇨🇿', 'da': '🇩🇰', 'pt': '🇵🇹',
    'tr': '🇹🇷', 'el': '🇬🇷', 'sr': '🇷🇸', 'nl': '🇳🇱', 'et': '🇪🇪',
    'lv': '🇱🇻'
}

# Команда /language
@bot.message_handler(commands=['language'])
def choose_language(message):
    markup = types.InlineKeyboardMarkup(row_width=3)
    for code in menus:
        flag = lang_flags.get(code, '🏳️')
        btn = types.InlineKeyboardButton(f"{flag} {code.upper()}", callback_data=f"setlang:{code}")
        markup.add(btn)
    bot.send_message(message.chat.id, "🌍 Выберите язык / Choose language:", reply_markup=markup)

# Обработка кнопки языка
@bot.callback_query_handler(func=lambda call: call.data.startswith('setlang:'))
def set_language(call):
    lang = call.data.split(':')[1]
    user_id = call.from_user.id
    # Здесь можно сохранить язык в БД или файл, пока — просто в память
    user_lang[user_id] = lang
    bot.answer_callback_query(call.id, f"Язык установлен: {lang.upper()}")
    bot.send_message(call.message.chat.id, f"✅ Установлен язык: {lang.upper()}")