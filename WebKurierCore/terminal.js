// === terminal.js ===
// Виртуальный терминал с поддержкой команд и интеграцией с Dropbox-агентом

// --- Импорт агента Dropbox ---
import { dropboxAgent } from './engine/dropbox-agent.js';

// --- Глобальные переменные ---
let balance = 0;
const autoLoadHistory = true; // ← включите/выключите автозагрузку истории

// --- Вспомогательные функции ---
function printToTerminal(message) {
  const output = document.getElementById('terminal-output');
  output.value += message + '\n';
  output.scrollTop = output.scrollHeight;
}

function resetTerminal() {
  balance = 0;
  printToTerminal('🔄 Баланс сброшен.');
}

// --- Обработка команд ---
async function handleCommand(event) {
  if (event.key === 'Enter') {
    const input = event.target;
    const command = input.value.trim();
    input.value = '';

    if (!command) return;

    printToTerminal('> ' + command);

    switch (true) {
      // Добавить сумму к балансу: /add 10
      case command.startsWith('/add '): {
        const parts = command.split(' ');
        const amount = parseFloat(parts[1]);
        if (isNaN(amount)) {
          printToTerminal('❌ Неверный формат суммы.');
        } else {
          balance += amount;
          printToTerminal(`💰 Баланс увеличен на ${amount}. Текущий баланс: ${balance}.`);
        }
        break;
      }

      // Сохранить баланс в файл: /save имя.txt
      case command.startsWith('/save'): {
        const parts = command.split(' ');
        const filename = parts[1] || 'webcoin.txt';
        const data = `Баланс: ${balance}`;
        dropboxAgent.save(filename, data)
          .then(() => printToTerminal(`✅ Баланс сохранён в файл "${filename}".`))
          .catch(err => printToTerminal(`❌ Ошибка сохранения: ${err.message || err}`));
        break;
      }

      // Загрузить файл: /load имя.txt
      case command.startsWith('/load'): {
        const loadParts = command.split(' ');
        const loadName = loadParts[1] || 'webcoin.txt';
        dropboxAgent.load(loadName)
          .then(text => {
            if (text) {
              printToTerminal(`📥 Содержимое файла "${loadName}":\n${text}`);
            } else {
              printToTerminal(`❌ Файл "${loadName}" не найден.`);
            }
          })
          .catch(err => printToTerminal(`❌ Ошибка загрузки: ${err.message || err}`));
        break;
      }

      // Список файлов в Dropbox: /list
      case command === '/list': {
        dropboxAgent.list()
          .then(files => {
            if (!files.length) return printToTerminal('📂 Папка Dropbox пуста.');
            const fileList = files.map(f => '• ' + (f.name || f)).join('\n');
            printToTerminal(`📁 Файлы в Dropbox:\n${fileList}`);
          })
          .catch(err => printToTerminal(`❌ Ошибка списка: ${err.message || err}`));
        break;
      }

      // История Copilot: /history
      case command === '/history': {
        loadCopilotHistory();
        break;
      }

      // Баланс: /balance
      case command === '/balance': {
        printToTerminal(`💰 Текущий баланс: ${balance}`);
        break;
      }

      // Сброс баланса: /reset
      case command === '/reset': {
        resetTerminal();
        break;
      }

      // Проверка связи: /ping
      case command === '/ping': {
        printToTerminal('🏓 Pong!');
        break;
      }

      // Справка: help
      case command === 'help': {
        printToTerminal(
`📝 Доступные команды:
/add N         — добавить сумму к балансу
/save [имя]    — сохранить баланс в файл (по умолчанию webcoin.txt)
/load [имя]    — загрузить файл (по умолчанию webcoin.txt)
/list          — список файлов в Dropbox
/history       — показать историю Copilot
/balance       — показать баланс
/reset         — сбросить баланс
/ping          — проверка связи
help           — показать эту справку`
        );
        break;
      }

      // Неизвестная команда
      default: {
        printToTerminal('❓ Неизвестная команда. Введите help для списка.');
        break;
      }
    }
  }
}

// --- Загрузка истории Copilot ---
function loadCopilotHistory() {
  dropboxAgent.load('dropbox-history.json')
    .then(text => {
      if (text) {
        printToTerminal(`📜 История Copilot:\n${text}`);
      } else {
        printToTerminal('❌ История не найдена.');
      }
    })
    .catch(err => printToTerminal(`❌ Ошибка загрузки истории: ${err.message || err}`));
}

// --- Привязка обработчика к input ---
document.getElementById('terminal-input').addEventListener('keydown', handleCommand);

// --- Кнопка "История Copilot" ---
const copilotBtn = document.createElement('button');
copilotBtn.textContent = '📜 История Copilot';
copilotBtn.style.margin = '8px 0';
copilotBtn.onclick = loadCopilotHistory;
document.getElementById('dropbox-controls').appendChild(copilotBtn);

// --- Автозагрузка истории при старте ---
if (autoLoadHistory) {
  loadCopilotHistory();
}

// --- Инициализация ---
printToTerminal('🖥️ Виртуальный терминал готов. Введите help для списка команд.');
