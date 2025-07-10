from telebot.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, CallbackQuery
from loader import bot

# 🔤 Полный список языков с флагами и подписями
LANG_FLAGS_FULL = {
    'de': '🇩🇪 Deutsch',
    'en': '🇬🇧 English',
    'fr': '🇫🇷 Français',
    'ru': '🇷🇺 Русский',
    'pl': '🇵🇱 Polski',
    'cs': '🇨🇿 Čeština',
    'ro': '🇷🇴 Română',
    'bg': '🇧🇬 Български',
    'lt': '🇱🇹 Lietuvių',
    'hr': '🇭🇷 Hrvatski',
    'hu': '🇭🇺 Magyar',
    'da': '🇩🇰 Dansk',
    'es': '🇪🇸 Español',
    'it': '🇮🇹 Italiano',
    'no': '🇳🇴 Norsk',
    'pt': '🇵🇹 Português',
    'tr': '🇹🇷 Türkçe',
    'sl': '🇸🇮 Slovenščina',
    'nl': '🇳🇱 Nederlands',
    'et': '🇪🇪 Eesti',
    'lv': '🇱🇻 Latviešu',
    'el': '🇬🇷 Ελληνικά',
    'sr': '🇷🇸 Српски'
}

# 🔘 Команда /language
@bot.message_handler(commands=['language'])
def language_command(message: Message):
    markup = InlineKeyboardMarkup(row_width=3)
    buttons = []

    for code, label in LANG_FLAGS_FULL.items():
        buttons.append(InlineKeyboardButton(text=label, callback_data=f"set_lang_{code}"))

    # Разбиваем на строки по 3 кнопки
    for i in range(0, len(buttons), 3):
        markup.row(*buttons[i:i+3])

    bot.send_message(
        message.chat.id,
        "🌐 Пожалуйста, выберите язык интерфейса:",
        reply_markup=markup
    )

# 💾 Обработчик выбора языка
user_langs = {}  # или используй БД

@bot.callback_query_handler(func=lambda call: call.data.startswith("set_lang_"))
def set_language(call: CallbackQuery):
    lang_code = call.data.split("_")[-1]
    user_langs[call.from_user.id] = lang_code

    lang_label = LANG_FLAGS_FULL.get(lang_code, lang_code.upper())
    bot.answer_callback_query(call.id, f"Язык установлен: {lang_label}")
    bot.send_message(call.message.chat.id, f"✅ Интерфейс теперь на {lang_label}")