// webcoin/wallet/wallet-ui.js

import { WebCoinWallet } from './wallet.js';

export function renderWalletUI(containerId, userId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const user = WebCoinWallet.getUser(userId);

  container.innerHTML = `
    <div class="wallet-ui">
      <h3>WebCoin Кошелёк</h3>
      <p>Пользователь: <strong>${user?.name || 'Неизвестен'}</strong></p>
      <p>Монеты: <strong>${user?.coins || 0}</strong> 🪙</p>
      <button id="add-coins">+10 монет</button>
    </div>
  `;

  document.getElementById("add-coins").onclick = () => {
    WebCoinWallet.addCoins(userId, 10);
    renderWalletUI(containerId, userId); // перерисовка
  };
}