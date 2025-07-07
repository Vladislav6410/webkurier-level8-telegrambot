// exchanger.js — обработка обмена WebCoin ↔ бонусы

import { WebCoinWallet } from './wallet.js';
import { logTransaction } from './transactions.js';

export const ExchangeRates = {
  coinToBonus: 10,   // 1 WebCoin = 10 бонусов
  bonusToCoin: 0.1   // 10 бонусов = 1 WebCoin
};

export function exchangeToBonus(userId) {
  const user = WebCoinWallet.getUser(userId);
  if (!user || user.coins <= 0) return 0;

  const bonus = user.coins * ExchangeRates.coinToBonus;
  logTransaction(userId, `Обмен: ${user.coins} WebCoin → ${bonus} бонусов`);
  user.coins = 0;
  return bonus;
}

export function exchangeToCoins(userId, bonusAmount) {
  const user = WebCoinWallet.getUser(userId);
  if (!user || bonusAmount < 10) return 0;

  const coins = Math.floor(bonusAmount * ExchangeRates.bonusToCoin);
  logTransaction(userId, `Обмен: ${bonusAmount} бонусов → ${coins} WebCoin`);
  user.coins += coins;
  return coins;
}

export function updateRate(type, newRate) {
  if (type === 'coinToBonus') ExchangeRates.coinToBonus = newRate;
  if (type === 'bonusToCoin') ExchangeRates.bonusToCoin = newRate;
}