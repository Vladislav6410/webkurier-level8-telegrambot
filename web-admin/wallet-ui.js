// web-admin/wallet-ui.js

import { WebCoinWallet } from './wallet.js';

export function renderWalletUI(containerId, userId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let user = WebCoinWallet.getUser(userId);
  if (!user) {
    user = WebCoinWallet.addUser(userId, `User${userId}`);
  }

  container.innerHTML = `
    <div class="wallet-ui">
      <h3>💰 WebCoin Кошелёк</h3>
      <p>👤 Пользователь: <strong>${user.name}</strong></p>
      <p>🪙 Монеты: <strong id="wallet-coins">${user.coins}</strong></p>
      <button id="add-coins">+10 монет</button>
      <button id="reset-coins">Сброс</button>
    </div>
  `;

  document.getElementById("add-coins").onclick = () => {
    WebCoinWallet.addCoins(userId, 10);
    updateCoins();
  };

  document.getElementById("reset-coins").onclick = () => {
    user.coins = 0;
    updateCoins();
  };

  function updateCoins() {
    document.getElementById("wallet-coins").textContent = user.coins;
  }
}