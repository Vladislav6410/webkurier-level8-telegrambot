// wallet.js — управление балансом WebCoin

// Получить текущий баланс
function getBalance() {
  return parseInt(localStorage.getItem('webcoin') || '0');
}

// Установить баланс
function setBalance(amount) {
  localStorage.setItem('webcoin', amount.toString());
  updateBalanceUI();
}

// Обновить отображение баланса в интерфейсе
function updateBalanceUI() {
  const balance = getBalance();
  const el = document.getElementById('webcoin-balance');
  if (el) el.textContent = `Баланс: ${balance} WKC`;
}

// Добавить монеты
function addCoins(amount) {
  let current = getBalance();
  current += amount;
  setBalance(current);
}

// Сбросить баланс
function resetCoins() {
  setBalance(0);
}

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
  updateBalanceUI();
});