import telebot
from telebot import types

# Вставь свой токен от @BotFather
bot = telebot.TeleBot ('7760997174:AAHFS_BpIMekNheOIU82M4WZ7qCxusFj4')

# Главное меню с кнопками (Русский + English)
def create_main_keyboard():
    keyboard = types.InlineKeyboardMarkup(row_width=2)
    buttons = [
        types.InlineKeyboardButton("🧠 Режим тестов / Test Mode", callback_data='test_mode'),
        types.InlineKeyboardButton("📚 База знаний / Knowledge Base", callback_data='knowledge_base'),
        types.InlineKeyboardButton("📊 Статистика / Stats", callback_data='stats'),
        types.InlineKeyboardButton("📅 Планировщик / Scheduler", callback_data='scheduler'),
        types.InlineKeyboardButton("🤖 ИИ-технологии / AI Tech", callback_data='ai_tech'),
        types.InlineKeyboardButton("🌐 Веб-разработка / Web Dev", callback_data='web_dev'),
        types.InlineKeyboardButton("🔗 API и SQL", callback_data='api_sql'),
        types.InlineKeyboardButton("🎮 Игры: Solidity/Unity/C++", callback_data='gamedev')
    ]
    keyboard.add(*buttons)
    return keyboard

# Команда /start
@bot.message_handler(commands=['start'])
def start_message(message):
    bot.send_message(message.chat.id,
        "🚀 Добро пожаловать в WebKurier LEVEL 8!\n"
        "🔧 Интерактивный Telegram-бот для обучения и тестов.\n\n"
        "🚀 Welcome to WebKurier LEVEL 8!\n"
        "🔧 Interactive Telegram bot for learning and testing.",
        reply_markup=create_main_keyboard())

# Команды /menu или /help
@bot.message_handler(commands=['menu', 'help'])
def menu_command(message):
    bot.send_message(message.chat.id,
        "📘 Главное меню / Main Menu:", 
        reply_markup=create_main_keyboard())

# Обработка кнопок
@bot.callback_query_handler(func=lambda call: True)
def handle_buttons(call):
    if call.message:
        if call.data == 'test_mode':
            bot.send_message(call.message.chat.id, 
                "🧠 Режим тестов / Test Mode\n"
                "Ответь на задания, чтобы закрепить знания.")

        elif call.data == 'knowledge_base':
            bot.send_message(call.message.chat.id,
                "📚 База знаний / Knowledge Base подключена.")

        elif call.data == 'stats':
            bot.send_message(call.message.chat.id,
                "📊 Прогресс: обучение начато.\nStats: Learning in progress.")

        elif call.data == 'scheduler':
            bot.send_message(call.message.chat.id,
                "📅 Планировщик ещё в разработке.\nScheduler coming soon.")

        elif call.data == 'ai_tech':
            markup = types.InlineKeyboardMarkup()
            markup.add(
                types.InlineKeyboardButton("🧬 Нейросети / Neural Networks", callback_data='ai_neural'),
                types.InlineKeyboardButton("📈 Машинное обучение / Machine Learning", callback_data='ai_ml')
            )
            bot.send_message(call.message.chat.id, "🤖 ИИ / AI Technologies:", reply_markup=markup)

        elif call.data == 'web_dev':
            markup = types.InlineKeyboardMarkup()
            markup.add(
                types.InlineKeyboardButton("🌐 HTML5", callback_data='html5'),
                types.InlineKeyboardButton("🎨 CSS3", callback_data='css3'),
                types.InlineKeyboardButton("💻 JavaScript", callback_data='js')
            )
            bot.send_message(call.message.chat.id, "🌐 Веб-разработка / Web Development:", reply_markup=markup)

        elif call.data == 'api_sql':
            bot.send_message(call.message.chat.id,
                "🔗 Пример API / API Example:\nGET /api/v1/users\n\n"
                "📚 SQL пример / SQL Example:\nSELECT * FROM users;")

        elif call.data == 'gamedev':
            bot.send_message(call.message.chat.id,
                "🎮 Solidity пример / Example:\n"
                "pragma solidity ^0.8.0;\ncontract Test {\n  uint val;\n}")

        # Подразделы ИИ
        elif call.data == 'ai_neural':
            bot.send_message(call.message.chat.id,
                "🧬 Нейросети / Neural Networks:\n"
                "Модели, повторяющие работу мозга и обучающиеся на данных.")

        elif call.data == 'ai_ml':
            bot.send_message(call.message.chat.id,
                "📈 Машинное обучение / Machine Learning:\n"
                "Анализ больших данных без явного программирования.")

        # Web-технологии
        elif call.data == 'html5':
            bot.send_message(call.message.chat.id,
                "<!DOCTYPE html>\n<html><body><h1>Пример HTML5</h1></body></html>")

        elif call.data == 'css3':
            bot.send_message(call.message.chat.id,
                "body {\n  background-color: #fff;\n  color: #333;\n}")

        elif call.data == 'js':
            bot.send_message(call.message.chat.id,
                "document.getElementById('demo').innerText = 'JavaScript работает!';")

# Запуск бота
bot.polling()