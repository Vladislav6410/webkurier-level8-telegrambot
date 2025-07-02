// === auth-check.js ===
// Авторизация по Telegram ID + отображение роли

import { roles, getUserRole } from './roles.js';

// Функция отображения роли на экране
function showRole(role) {
  const el = document.getElementById("user-role");
  if (el) {
    el.textContent = role;
  }
}

// Функция показа уведомления
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.zIndex = 9999;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Основной блок
window.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id || localStorage.getItem("telegram_id") || "unknown";

  // Сохраняем ID
  if (userId !== "unknown") {
    localStorage.setItem("telegram_id", userId);
  }

  const role = getUserRole(userId);
  console.log(`👤 Пользователь ${userId} имеет роль: ${role}`);

  // Сохраняем глобально
  window.userRole = role;

  // Обновление UI
  showRole(role);
  showToast(`Ваша роль: ${role}`);

  // Блокировка кнопок для гостей
  if (role === 'guest') {
    document.querySelectorAll(".menu-button").forEach(btn => {
      btn.disabled = true;
      btn.title = "Только для авторизованных пользователей";
    });
  }
});