// auth-check.js — авторизация по Telegram ID

import { roles, getUserRole } from './roles.js';

// Получаем Telegram ID из WebApp
document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id || "unknown";

  const role = getUserRole(userId);
  console.log(`Пользователь ${userId} имеет роль: ${role}`);

  // Можно сохранить роль в глобальный объект
  window.userRole = role;

  // Пример: блокировка кнопок по роли
  if (role === 'guest') {
    document.querySelectorAll(".menu-button").forEach(btn => {
      btn.disabled = true;
      btn.title = "Только для авторизованных пользователей";
    });
  }

  // Показать тост
  showToast(`Ваша роль: ${role}`);
});