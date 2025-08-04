from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import CommandHandler, CallbackQueryHandler, ContextTypes

# Команда /цены
async def prices(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("🔹 Base Map — 390€", callback_data="price_base")],
        [InlineKeyboardButton("🔷 3D Terrain — 790€", callback_data="price_3d")],
        [InlineKeyboardButton("🔴 GeoAnalysis — 1290€", callback_data="price_geo")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        "📊 Выберите пакет съёмки (1 км²):",
        reply_markup=reply_markup
    )

# Ответ на нажатие кнопки
async def price_selected(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    selection = query.data
    packages = {
        "price_base": (
            "🔹 Base Map\n"
            "• Ортофото (GeoTIFF, JPG)\n"
            "• PDF-карта, базовая обработка\n"
            "💰 390€, ⏱ 1–2 дня"
        ),
        "price_3d": (
            "🔷 3D Terrain\n"
            "• DSM/DTM, 3D-модель, облако точек\n"
            "• Геопривязка с повышенной точностью\n"
            "💰 790€, ⏱ 2–3 дня"
        ),
        "price_geo": (
            "🔴 GeoAnalysis\n"
            "• NDVI/NDRE, PDF-отчёт, классификация\n"
            "• Объёмы, аналитика, границы объектов\n"
            "💰 1290€, ⏱ 3–5 дней"
        )
    }

    await query.edit_message_text(
        text=f"{packages.get(selection)}\n\n"
             "📍 Пожалуйста, укажите участок:\n"
             "— адрес, координаты или прикрепите файл (.kml, .jpg)"
    )

# Регистрация хендлеров
def register_price_handlers(application):
    application.add_handler(CommandHandler("цены", prices))
    application.add_handler(CallbackQueryHandler(price_selected))cp prices.py yourbot/handlers/