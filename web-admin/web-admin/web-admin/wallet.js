// webcoin/wallet/wallet.js
export let WebCoinWallet = {
  users: [],

  async loadWallet() {
    const res = await fetch('./webcoin/wallet/wallet-data.json');
    const data = await res.json();
    this.users = data.users || [];
  },

  getUser(id) {
    return this.users.find(user => user.id === id);
  },

  addUser(id, name) {
    const user = { id, name, coins: 0 };
    this.users.push(user);
    return user;
  },

  addCoins(id, amount) {
    const user = this.getUser(id);
    if (user) {
      user.coins += amount;
    }
  }
};