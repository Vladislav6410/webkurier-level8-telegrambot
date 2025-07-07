// auth-check.js — проверка доступа на основе роли пользователя
import { getUserRole } from './roles.js';

window.addEventListener('DOMContentLoaded', () => {
  // Проверка Telegram WebApp API
  if (!window.Telegram || !Telegram.WebApp || !Telegram.WebApp.initDataUnsafe) {
    alert("Пожалуйста, запустите через Telegram WebApp");
    return;
  }

  const user = Telegram.WebApp.initDataUnsafe.user;
  if (!user || !user.id) {
    alert("Не удалось определить пользователя Telegram.");
    return;
  }

  const userId = user.id.toString();
  const role = getUserRole(userId);

  console.log(`🔐 Пользователь: ${user.first_name} (${userId}), роль: ${role}`);

  // Пример: показать ID и роль на странице
  const infoEl = document.getElementById("user-info");
  if (infoEl) {
    infoEl.textContent = `ID: ${userId}, Роль: ${role}`;
  }

  // Ограничения: скрыть админские блоки для неадминов
  if (role !== "admin") {
    const adminBlocks = document.querySelectorAll(".admin-only");
    adminBlocks.forEach(el => el.style.display = "none");
  }
});