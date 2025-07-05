<div id="dropbox-controls">
  <button id="save-btn">📤 Сохранить</button>
  <button id="load-btn">📥 Загрузить</button>
  <button id="list-btn">📁 Файлы</button>
</div>import { dropboxAgent } from './engine/dropbox-agent.js'; // ← вставить в начало terminal.js

function handleCommand(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('terminal-input');
    const log = document.getElementById('terminal-log');
    const command = input.value.trim();

    if (command) {
      log.innerHTML += `<div>&gt; ${command}</div>`;
      input.value = '';
    }

    // Команды терминала
    switch (true) {
      case command === 'ping':
        log.innerHTML += `<div>Pong 🟢</div>`;
        break;

      case command === 'help':
        log.innerHTML += `<div>Команды: ping, help, reset, balance, /add [n], /save [имя], /load [имя], /list</div>`;
        break;

      case command === 'reset':
        resetCoins();
        log.innerHTML += `<div>Баланс сброшен.</div>`;
        break;

      case command === 'balance':
        log.innerHTML += `<div>Баланс: ${getBalance()} WKC</div>`;
        break;

      case command.startsWith('/add'):
        const parts = command.split(' ');
        const num = parseInt(parts[1] || '0');
        if (isNaN(num) || num <= 0) {
          log.innerHTML += `<div>Ошибка: укажите корректное число.</div>`;
        } else {
          addCoins(num);
          log.innerHTML += `<div>Добавлено: ${num} WKC</div>`;
        }
        break;

      case command.startsWith('/save'):
        const saveParts = command.split(' ');
        const saveName = saveParts[1] || 'webcoin.txt';
        const content = `Баланс: ${getBalance()} WKC`;
        dropboxAgent.save(saveName, content);
        break;

      case command.startsWith('/load'):
        const loadParts = command.split(' ');
        const loadName = loadParts[1] || 'webcoin.txt';
        dropboxAgent.load(loadName);
        break;

      case command === '/list':
        dropboxAgent.list();
        break;

      default:
        log.innerHTML += `<div>Неизвестная команда. Введите help.</div>`;
        break;
    }

    log.scrollTop = log.scrollHeight;
  }
}