// terminal.js — логика командного терминала WebKurier

// Обработать команду
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
        log.innerHTML += `<div>Команды: ping, help, reset, balance, /add [n]</div>`;
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

      default:
        log.innerHTML += `<div>Неизвестная команда. Введите help.</div>`;
        break;
    }

    log.scrollTop = log.scrollHeight;
  }
}

// Установить фокус на input при загрузке
window.addEventListener('load', () => {
  const input = document.getElementById('terminal-input');
  if (input) input.focus();
});