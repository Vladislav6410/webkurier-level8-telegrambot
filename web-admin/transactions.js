// transactions.js — лог обменов

let logs = [];

export function logTransaction(userId, message) {
  const timestamp = new Date().toISOString();
  logs.push({ userId, message, timestamp });
  console.log(`[ЛОГ] [${timestamp}] [ID: ${userId}] ${message}`);
}

export function getTransactionLog() {
  return logs;
}