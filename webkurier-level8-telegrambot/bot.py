from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext
from menu.menu_text import menus  # импорт меню по языкам

# Функция старта бота
def start(update: Update, context: CallbackContext):
    user = update.effective_user

    # Получаем язык из Telegram-профиля, если нет — по умолчанию 'ru'
    lang = user.language_code if user.language_code in menus else 'ru'

    # Формируем клавиатуру
    keyboard = [[item] for item in menus.get(lang, menus['ru'])]
    markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

    # Приветствие с клавиатурой
    update.message.reply_text("Привет! Выберите опцию:", reply_markup=markup)

# Обработка любого текстового сообщения
def handle_text(update: Update, context: CallbackContext):
    text = update.message.text
    update.message.reply_text(f"Вы нажали: {text}")

def main():
    # 🔐 Вставь свой токен бота
    TOKEN = 'YOUR_BOT_TOKEN_HERE'
    
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    # Обработчики
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("menu", start))  # ещё одна команда для вызова меню
    dp.add_handler(CommandHandler("help", start))
    dp.add_handler(CommandHandler("restart", start))

    dp.add_handler(CommandHandler("lang", start))  # переключение языка в будущем
    from telegram.ext import MessageHandler, Filters
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_text))

    # Запуск
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()