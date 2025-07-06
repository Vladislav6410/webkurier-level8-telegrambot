from pathlib import Path

# 🔹 Вручную вставленные блоки (приоритетные)
intro_blocks = """
# 📘 Инструкция по использованию WebCourierBot

## 🇷🇺 Русский
Добро пожаловать в WebCourierBot!  
Этот бот помогает вам управлять задачами, получать PDF-инструкции, использовать WebCoin и многое другое.  
Для начала просто введите команду /start.  
🔗 Сайт: webkurier.github.io  
📨 Telegram: @WebKurierBot  
📌 Поддержка: WebKurier Team

## 🇬🇧 English
Welcome to WebCourierBot!  
This bot helps you manage tasks, get PDF instructions, use WebCoin, and more.  
Just type /start to begin.  
🔗 Website: webkurier.github.io  
📨 Telegram: @WebKurierBot  
📌 Support: WebKurier Team

## 🇩🇪 Deutsch
Willkommen bei WebCourierBot!  
Dieser Bot hilft Ihnen, Aufgaben zu verwalten, PDF-Anleitungen zu erhalten, WebCoin zu verwenden und mehr.  
Geben Sie einfach /start ein, um zu beginnen.  
🔗 Webseite: webkurier.github.io  
📨 Telegram: @WebKurierBot  
📌 Support: WebKurier Team

## 🇵🇱 Polski
Witamy w WebCourierBot!  
Ten bot pomaga zarządzać zadaniami, uzyskać instrukcje PDF, korzystać z WebCoin i wiele więcej.  
Wpisz /start, aby rozpocząć.  
🔗 Strona: webkurier.github.io  
📨 Telegram: @WebKurierBot  
📌 Wsparcie: WebKurier Team

---
"""

# 🔹 Автоматическая часть (остальные страны)
countries = [
    ("🇦🇱 Albania", "Mirë se vini në WebCourierBot!", "Për të filluar, shkruani /start."),
    ("🇦🇶 Antarctica", "Welcome to WebCourierBot!", "Type /start to begin."),
    ("🇦🇲 Armenia", "Բարի գալուստ WebCourierBot:", "Սկսելու համար մուտքագրեք /start:"),
    ("🇦🇺 Australia", "Welcome to WebCourierBot!", "Just type /start to begin."),
    ("🇦🇹 Austria", "Willkommen bei WebCourierBot!", "Geben Sie einfach /start ein."),
    ("🇧🇪 Belgium", "Welkom bij WebCourierBot!", "Typ /start om te beginnen."),
    ("🇧🇬 Bulgaria", "Добре дошли в WebCourierBot!", "Напишете /start, за да започнете."),
    ("🇨🇦 Canada", "Welcome to WebCourierBot!", "Just type /start to begin."),
    ("🇨🇿 Czechia", "Vítejte ve WebCourierBot!", "Napište /start pro spuštění."),
    ("🇫🇷 France", "Bienvenue sur WebCourierBot!", "Tapez simplement /start pour commencer."),
    ("🇬🇷 Greece", "Καλώς ήρθατε στο WebCourierBot!", "Πληκτρολογήστε /start για να ξεκινήσετε."),
    ("🇮🇩 Indonesia", "Selamat datang di WebCourierBot!", "Ketik /start untuk memulai."),
    ("🇮🇹 Italy", "Benvenuto su WebCourierBot!", "Scrivi /start per iniziare."),
    ("🇲🇹 Malta", "Welcome to WebCourierBot!", "Just type /start to begin."),
    ("🇲🇾 Malaysia", "Selamat datang ke WebCourierBot!", "Taip /start untuk mula."),
    ("🇳🇱 Netherlands", "Welkom bij WebCourierBot!", "Typ /start om te beginnen."),
    ("🇳🇴 Norway", "Velkommen til WebCourierBot!", "Skriv /start for å begynne."),
    ("🇵🇹 Portugal", "Bem-vindo ao WebCourierBot!", "Digite /start para começar."),
    ("🇷🇴 Romania", "Bine ați venit la WebCourierBot!", "Tastați /start pentru a începe."),
    ("🇸🇪 Sweden", "Välkommen till WebCourierBot!", "Skriv /start för att börja."),
    ("🇸🇬 Singapore", "Welcome to WebCourierBot!", "Just type /start to begin."),
    ("🇰🇷 South Korea", "WebCourierBot에 오신 것을 환영합니다!", "/start를 입력하여 시작하세요."),
    ("🇨🇭 Switzerland", "Willkommen bei WebCourierBot!", "Geben Sie /start ein, um zu beginnen."),
    ("🇺🇦 Ukraine", "Ласкаво просимо до WebCourierBot!", "Введіть /start для початку."),
    ("🇬🇧 United Kingdom", "Welcome to WebCourierBot!", "Just type /start to begin."),
    ("🇺🇸 United States", "Welcome to WebCourierBot!", "Just type /start to begin."),
]

middle = "This bot helps you manage tasks, get PDF instructions, and use WebCoin."
footer = "Thanks for using WebCourierBot! – WebKurier Team"

# ✏️ Генерация всего файла
content = intro_blocks + "\n"

for country, greeting, start in countries:
    content += f"## {country}\n\n"
    content += f"{greeting}\n"
    content += f"{middle}\n"
    content += f"{start}\n"
    content += f"{footer}\n"
    content += "\n---\n\n"

# 💾 Сохраняем файл
output_path = Path("WebCourierBot_Instructions_Multilang.md")
output_path.write_text(content, encoding="utf-8")

print(f"✅ Инструкция успешно создана: {output_path.resolve()}")