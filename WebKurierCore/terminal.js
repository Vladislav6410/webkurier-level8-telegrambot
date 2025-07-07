
// === terminal.js ===
// Виртуальный терминал с поддержкой команд, Dropbox и юридического агента

// --- Импорты ---
import { dropboxAgent } from './engine/dropbox-agent.js';
import { LegalAgent } from './engine/agents/legal-agent.js';

// --- Глобальные переменные ---
let balance = 0;
const autoLoadHistory = true;

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

      case command.startsWith('/save'): {
        const parts = command.split(' ');
        const filename = parts[1] || 'webcoin.txt';
        const data = `Баланс: ${balance}`;
        dropboxAgent.save(filename, data)
          .then(() => printToTerminal(`✅ Баланс сохранён в файл "${filename}".`))
          .catch(err => printToTerminal(`❌ Ошибка сохранения: ${err.message || err}`));
        break;
      }

      case command.startsWith('/load'): {
        const parts = command.split(' ');
        const loadName = parts[1] || 'webcoin.txt';
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

      case command === '/history': {
        loadCopilotHistory();
        break;
      }

      case command === '/balance': {
        printToTerminal(`💰 Текущий баланс: ${balance}`);
        break;
      }

      case command === '/reset': {
        resetTerminal();
        break;
      }

      case command === '/ping': {
        printToTerminal('🏓 Pong!');
        break;
      }

      case command === 'help': {
        printToTerminal(
`📝 Доступные команды:
/add N         — добавить сумму к балансу
/save [имя]    — сохранить баланс в файл
/load [имя]    — загрузить файл
/list          — список файлов в Dropbox
/history       — история Copilot
/balance       — текущий баланс
/reset         — сброс баланса
/ping          — проверка связи
/legal         — юридический агент
help           — эта справка`);
        break;
      }

      case command.startsWith('/legal'): {
        const [, action, ...rest] = command.split(" ");
        if (action === "analyze") {
          const text = rest.join(" ");
          printToTerminal(await LegalAgent.analyze(text));
        } else if (action === "template") {
          printToTerminal(LegalAgent.getTemplate(rest[0]));
        } else {
          printToTerminal(LegalAgent.help());
        }
        break;
      }

      default: {
        printToTerminal('❓ Неизвестная команда. Введите help для списка.');
        break;
      }
    }
  }
}

// --- Загрузка истории ---
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

// --- Привязка обработчиков ---
document.getElementById('terminal-input').addEventListener('keydown', handleCommand);

const copilotBtn = document.createElement('button');
copilotBtn.textContent = '📜 История Copilot';
copilotBtn.style.margin = '8px 0';
copilotBtn.onclick = loadCopilotHistory;
document.getElementById('dropbox-controls').appendChild(copilotBtn);

// --- Инициализация ---
if (autoLoadHistory) {
  loadCopilotHistory();
}
printToTerminal('🖥️ Виртуальный терминал готов. Введите help для списка команд.');
