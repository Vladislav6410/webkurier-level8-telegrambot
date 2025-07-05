// === Импорт Dropbox агента ===
import { dropboxAgent } from './engine/dropbox-agent.js';

// === Функции работы с балансом (заглушки, замените на ваши реализации) ===
function getBalance() {
  // Получить баланс (пример)
  return parseInt(localStorage.getItem('balance') || '0');
}
function setBalance(val) {
  localStorage.setItem('balance', val);
}
function addCoins(n) {
  setBalance(getBalance() + n);
}
function resetCoins() {
  setBalance(0);
}

// === Функция для вывода в терминал ===
function printToTerminal(msg, isHtml = false) {
  const log = document.getElementById('terminal-log');
  log.innerHTML += isHtml ? `<div>${msg}</div>` : `<div>${escapeHtml(msg)}</div>`;
  log.scrollTop = log.scrollHeight;
}
function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// === Основная функция обработки команд ===
function handleCommand(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('terminal-input');
    const command = input.value.trim();

    if (command) {
      printToTerminal(`> ${command}`);
      input.value = '';
    }

    // Команды терминала
    switch (true) {
      case command === 'ping':
        printToTerminal('Pong 🟢');
        break;

      case command === 'help':
        printToTerminal('Команды: ping, help, reset, balance, /add [n], /save [имя], /load [имя], /list, /history');
        break;

      case command === 'reset':
        resetCoins();
        printToTerminal('Баланс сброшен.');
        break;

      case command === 'balance':
        printToTerminal(`Баланс: ${getBalance()} WKC`);
        break;

      case command.startsWith('/add'):
        {
          const parts = command.split(' ');
          const num = parseInt(parts[1] || '0');
          if (isNaN(num) || num <= 0) {
            printToTerminal('Ошибка: укажите корректное число.');
          } else {
            addCoins(num);
            printToTerminal(`Добавлено: ${num} WKC`);
          }
        }
        break;

      case command.startsWith('/save'):
        {
          const saveParts = command.split(' ');
          const saveName = saveParts[1] || 'webcoin.txt';
          const content = `Баланс: ${getBalance()} WKC`;
          dropboxAgent.save(saveName, content)
            .then(() => printToTerminal(`✅ Файл "${saveName}" сохранён в Dropbox.`))
            .catch(err => printToTerminal(`❌ Ошибка сохранения: ${err.message || err}`));
        }
        break;

      case command.startsWith('/load
