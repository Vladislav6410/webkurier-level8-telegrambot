// roles.js — базовая ролевая модель

const roles = {
  admin: {
    accessLevel: 3,
    permissions: ['read', 'write', 'delete', 'manageUsers']
  },
  client: {
    accessLevel: 2,
    permissions: ['read', 'write']
  },
  guest: {
    accessLevel: 1,
    permissions: ['read']
  }
};

// Функция получения роли по user_id (будет заменено на реальные данные)
function getUserRole(userId) {
  // Пример: временно фиксированная роль
  if (userId === '123456789') return 'admin';
  if (userId === '987654321') return 'client';
  return 'guest';
}

// Экспортируем для использования в других скриптах
if (typeof module !== 'undefined') {
  module.exports = { roles, getUserRole };
}