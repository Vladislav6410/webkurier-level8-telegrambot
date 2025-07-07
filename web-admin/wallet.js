// web-admin/wallet.js
export let WebCoinWallet = {
  users: [],

  async loadWallet() {
    try {
      const res = await fetch('./wallet-data.json');
      const data = await res.json();
      this.users = data.users || [];
    } catch (err) {
      console.error('Ошибка загрузки wallet-data.json:', err);
      this.users = [];
    }
  },

  getUser(id) {
    return this.users.find(user => user.id === id);
  },

  addUser(id, name) {
    if (!this.getUser(id)) {
      const user = { id, name, coins: 0 };
      this.users.push(user);
      this.saveWallet(); // авто-сохранение
      return user;
    }
    return null; // уже есть
  },

  addCoins(id, amount) {
    const user = this.getUser(id);
    if (user) {
      user.coins += amount;
      this.saveWallet(); // авто-сохранение
    }
  },

  async saveWallet() {
    try {
      await fetch('./wallet-data.json', {
        method: 'POST', // ⚠️ требуется сервер
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: this.users })
      });
    } catch (err) {
      console.error('Ошибка сохранения:', err);
    }
  }
};