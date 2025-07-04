// engineer.js — цифровой инженер WebKurier

const engineer = {
  log: (msg) => {
    const log = document.getElementById('terminal-log');
    log.innerHTML += `<div>${msg}</div>`;
    log.scrollTop = log.scrollHeight;
  },

  run: (cmd) => {
    switch (cmd) {
      case 'status':
        engineer.log('✅ Инженер работает. Все системы в норме.');
        break;

      case 'clear':
        document.getElementById('terminal-log').innerHTML = '';
        engineer.log('🧹 Лог очищен.');
        break;

      case 'version':
        engineer.log('🛠 Версия: WebKurier Engineer v1.0');
        break;

      case 'modules':
        engineer.log('📦 Модули: кошелёк, терминал, Dropbox, DreamMaker');
        break;

      case 'report':
        const b = getBalance();
        engineer.log(`📄 Отчёт: Баланс пользователя — ${b} WKC`);
        break;

      case 'help':
        engineer.log(`🛠 Команды инженера:
- status
- clear
- version
- modules
- report
- help`);
        break;

      default:
        engineer.log(`❓ Команда "${cmd}" не распознана. Введите help.`);
    }
  }
};

// Интеграция с терминалом
function handleCommand(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('terminal-input');
    const cmd = input.value.trim();
    const log = document.getElementById('terminal-log');

    if (cmd) {
      log.innerHTML += `<div>&gt; ${cmd}</div>`;
      input.value = '';

      if (cmd.startsWith('/add')) {
        const num = parseInt(cmd.split(' ')[1] || '0');
        if (!isNaN(num) && num > 0) {
          addCoins(num);
          engineer.log(`Добавлено: ${num} WKC`);
        } else {
          engineer.log('⚠️ Укажите корректное число после /add');
        }
      } else if (cmd === 'reset') {
        resetCoins();
        engineer.log('🔄 Баланс сброшен.');
      } else if (cmd === 'balance') {
        engineer.log(`💰 Баланс: ${getBalance()} WKC`);
      } else {
        engineer.run(cmd);
      }

      log.scrollTop = log.scrollHeight;
    }
  }
}