// === roles.js ===
// Список ролей и определение роли по Telegram ID

// 🔐 Словарь пользователей и их ролей
export const roles = {
  "7760997174": "admin",    // ← замени на свой Telegram ID
  "987654321": "client",   // ← пример клиента
  // Другие ID...
};

// 🎭 Функция: получить роль по ID
export function getUserRole(userId) {
  if (userId in roles) {
    return roles[userId];
  }
  return "guest";
}