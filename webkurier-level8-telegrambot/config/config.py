@bot.message_handler(commands=['config'])
def show_config(message):
    if message.from_user.id not in TELEGRAM_ADMIN_IDS:
        bot.send_message(message.chat.id, "❌ Доступ запрещён.")
        return

    msg = (
        f"🔐 Текущая конфигурация:\n\n"
        f"🧾 Telegram: {TELEGRAM_BOT_TOKEN[:10]}... (скрыто)\n"
        f"📦 Dropbox: {DROPBOX_TOKEN[:10]}...\n"
        f"☁️ Google API: {GOOGLE_API_KEY[:10]}...\n"
        f"🤖 OpenAI: {OPENAI_API_KEY[:10]}...\n"
        f"📱 WhatsApp: {WHATSAPP_TOKEN[:10]}...\n"
        f"🌐 WebApp: {WEBAPP_URL}\n"
    )
    bot.send_message(message.chat.id, msg)