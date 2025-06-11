import telebot
import logging

# Замените на свой токен и Telegram ID администратора
in BOT TOKEN:print("7760997174:AAHFS_BpIMekNheOlU82M4WZ7qCxRxusFj4")exit()
ADMIN_IDS = [7760997174]  # Ваш Telegram ID
@bot.message_handler(commands=['myid'])
def my_id(message):
    bot.send_message(message.chat.id, f"Ваш Telegram ID: {message.from_user.id}")

bot = telebot.TeleBot(BOT_TOKEN)
user_data = {}

logging.basicConfig(level=logging.INFO)

# Приветствие и инструкция
@bot.message_handler(commands=['start'])
def start(message):
    logging.info(f"User {message.from_user.id} использовал /start")
    bot.send_message(
        message.chat.id,
        "👋 Добро пожаловать!\n\n"
        "1. Введите /register для регистрации\n"
        "2. Введите email и телефон\n"
        "3. Введите /getpdf для получения PDF-инструкции\n\n"
        "Support: info@webkurier.ai",
        parse_mode='Markdown'
    )

# Регистрация пользователя
@bot.message_handler(commands=['register'])
def get_email(message):
    logging.info(f"User {message.from_user.id} начал регистрацию")
    bot.send_message(message.chat.id, "Пожалуйста, введите ваш email:")
    bot.register_next_step_handler(message, get_phone)

def get_phone(message):
    email = message.text.strip()
    if "@" not in email or "." not in email:
        bot.send_message(message.chat.id, "❗ Похоже, это не email. Попробуйте ещё раз:")
        return bot.register_next_step_handler(message, get_phone)
    user_data[message.chat.id] = {'email': email}
    bot.send_message(message.chat.id, "Теперь введите номер телефона:")
    bot.register_next_step_handler(message, complete_registration)

def complete_registration(message):
    phone = message.text.strip()
    if not phone.replace('+', '').isdigit():
        bot.send_message(message.chat.id, "❗ Номер телефона должен содержать только цифры. Попробуйте ещё раз:")
        return bot.register_next_step_handler(message, complete_registration)
    user_data[message.chat.id]['phone'] = phone
    logging.info(f"User {message.from_user.id} завершил регистрацию: {user_data[message.chat.id]}")
    bot.send_message(
        message.chat.id,
        "✅ Регистрация завершена!\n\n"
        "Теперь вы можете получить PDF-инструкцию с помощью команды /getpdf"
    )

# Выдача PDF после регистрации
@bot.message_handler(commands=['getpdf'])
def send_pdf(message):
    if message.chat.id in user_data:
        pdf_url = "https://www.dropbox.com/scl/fo/hj4ittvewpbrlicfi1a8a/AODLElTJcpBWrLUSWLTgRh0?rlkey=rw12efhti79wmdfzb7o9wcxl7&st=kmxuohf7&dl=0"
        bot.send_message(
            message.chat.id,
            f"📄 Ваша PDF-инструкция: [скачать]({pdf_url})",
            parse_mode='Markdown'
        )
        logging.info(f"User {message.from_user.id} получил PDF")
    else:
        bot.send_message(
            message.chat.id,
            "❗ Сначала зарегистрируйтесь с помощью команды /register"
        )

# Админ-доступ
@bot.message_handler(commands=['admin'])
def admin_access(message):
    if message.from_user.id in ADMIN_IDS:
        bot.send_message(message.chat.id, "✅ Админ-доступ подтвержден.")
        logging.info(f"Admin {message.from_user.id} вошёл в админ-панель")
    else:
        bot.send_message(message.chat.id, "❌ У вас нет прав администратора.")

# Обработка неизвестных команд
@bot.message_handler(func=lambda message: True)
def unknown_message(message):
    bot.send_message(
        message.chat.id,
        "❓ Неизвестная команда. Используйте /start для начала или /help для справки."
    )

# Запуск бота с обработкой ошибок
if __name__ == '__main__':
    try:
        bot.polling(none_stop=True)
    except Exception as e:
        logging.error(f"Ошибка запуска бота: {e}")
