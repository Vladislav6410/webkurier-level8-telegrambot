// roles.js — определение ролей по Telegram ID

export const Roles = {
  "123456789": "admin",     // Владислав
  "987654321": "client",    // Пример клиента
  "000000000": "guest"      // Гость по умолчанию
};

export function getUserRole(userId) {
  return Roles[userId] || "guest";
}