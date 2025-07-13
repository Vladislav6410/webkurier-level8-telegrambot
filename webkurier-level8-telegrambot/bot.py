from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext, MessageHandler, Filters
from menu.menu_text import menus  # импорт меню по языкам
from config.config import (
    TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_IDS, DEFAULT_LANGUAGE,
    DROPBOX_TOKEN, GOOGLE_API_KEY, OPENAI_API_KEY, WHATSAPP_TOKEN,
    WEBAPP_URL
)

# ✅ Стартовая функция
def start(update: Update, context: CallbackContext):
    user = update.effective_user
    user_id = user.id
    user_lang = user.language_code if user.language_code in menus else 'ru'

    # Генерация клавиатуры
    keyboard = [[item] for item in menus.get(user_lang, menus['ru'])]
    markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

    # Приветствие
    update.message.reply_text(f"👋 Привет, {user.first_name or 'друг'}!\nВыберите опцию из меню ниже:", reply_markup=markup)

# ✅ Обработка текстовых нажатий на кнопки
def handle_text(update: Update, context: CallbackContext):
    text = update.message.text
    response = ""

    if text in menus['ru']:
        if text == "📖 Инструкция":
            response = "🔹 Открываю инструкцию для пользователя..."
        elif text == "📊 Бюджет":
            response = "💰 Показываю бюджет проекта..."
        elif text == "📚 База знаний":
            response = "📘 Загружаю базу знаний..."
        else:
            response = f"Вы выбрали: {text}"
    else:
        response = f"Вы нажали: {text}"

    update.message.reply_text(response)

# ✅ Главная функция запуска
def main():
    updater = Updater(TELEGRAM_BOT_TOKEN, use_context=True)
    dp = updater.dispatcher

    # Команды
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("menu", start))
    dp.add_handler(CommandHandler("help", start))
    dp.add_handler(CommandHandler("restart", start))
    dp.add_handler(CommandHandler("lang", start))  # на будущее — переключение языка

    # Обработка текста
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_text))

    # Старт
    print("✅ Бот запущен...")
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()