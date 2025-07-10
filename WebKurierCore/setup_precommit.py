import os
import subprocess
import sys

def run_command(command, check=True):
    print(f"🛠  Выполняется команда: {command}")
    result = subprocess.run(command, shell=True)
    if check and result.returncode != 0:
        print(f"❌ Ошибка выполнения: {command}")
        sys.exit(result.returncode)

def check_precommit_installed():
    try:
        subprocess.run(["pre-commit", "--version"], check=True, stdout=subprocess.DEVNULL)
        print("✅ pre-commit уже установлен.")
        return True
    except:
        print("⚠️ pre-commit не найден. Устанавливаю...")
        run_command("pip install pre-commit")
        return False

def install_precommit_hooks():
    if not os.path.exists(".pre-commit-config.yaml"):
        print("❗ Файл .pre-commit-config.yaml не найден в текущей папке.")
        sys.exit(1)
    run_command("pre-commit install")
    print("✅ Хуки успешно установлены.")

def run_precommit_check():
    print("🚀 Запуск проверки...")
    run_command("pre-commit run --all-files", check=False)

def main():
    print("📦 Настройка pre-commit для проекта WebKurierCore\n")
    check_precommit_installed()
    install_precommit_hooks()
    run_precommit_check()
    print("\n✅ Настройка завершена.")

if __name__ == "__main__":
    main()