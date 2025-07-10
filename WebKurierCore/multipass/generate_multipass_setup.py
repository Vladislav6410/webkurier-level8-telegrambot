import os

# Папка для файлов
base_dir = "WebKurierCore/multipass"
os.makedirs(base_dir, exist_ok=True)

# --- README.md ---
readme_content = """# WebKurierCore Multipass

Этот модуль предназначен для запуска WebKurierCore-помощника внутри виртуальной машины Ubuntu с использованием **Multipass**.

## 📦 Что входит
- `multipass.yaml` — базовая настройка ВМ (Ubuntu 22.04, 2 ядра, 4 ГБ ОЗУ)
- `cloud-init.yaml` — автоматическая установка зависимостей и WebKurierCore

## 🚀 Как использовать

1. Установите Multipass:
```bash
sudo snap install multipass --classic