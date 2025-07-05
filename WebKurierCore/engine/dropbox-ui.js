// dropbox-agent.js — агент Dropbox для WebKurierCore

import { uploadFile, downloadFile, listFiles } from './dropbox.js';

export const dropboxAgent = {
  // 📤 Сохранить файл в Dropbox
  async save(filename = 'webcoin.txt', content = '') {
    try {
      await uploadFile('/WebKurierCore/memory/' + filename, content);
      logToTerminal(`📤 Файл "${filename}" успешно сохранён в Dropbox.`);
    } catch (err) {
      logToTerminal(`❌ Ошибка при сохранении файла "${filename}": ${err.message}`);
    }
  },

  // 📥 Загрузить файл из Dropbox
  async load(filename = 'webcoin.txt') {
    try {
      const blob = await downloadFile('/WebKurierCore/memory/' + filename);
      const text = await blob.text();
      logToTerminal(`📥 Файл "${filename}" загружен из Dropbox:\n${text}`);
    } catch (err) {
      logToTerminal(`❌ Ошибка при загрузке файла "${filename}": ${err.message}`);
    }
  },

  // 📁 Показать список файлов в папке
  async list() {
    try {
      const files = await listFiles('/WebKurierCore/memory/');
      if (!files.length) return logToTerminal('📂 Папка Dropbox пуста.');
      const fileList = files.map(f => '• ' + f.name).join('\n');
      logToTerminal(`📁 Файлы в Dropbox:\n${fileList}`);
    } catch (err) {
      logToTerminal(`❌ Ошибка при получении списка файлов: ${err.message}`);
    }
  }
};

// 🔧 Вывод сообщений в терминал
function logToTerminal(message) {
  const el = document.getElementById('terminal-log');
  if (el) {
    el.innerHTML += `<div>${message}</div>`;
    el.scrollTop = el.scrollHeight;
  }
}// === ⏬ [Начало блока: кнопка История Copilot] ===
document.getElementById('history-btn').addEventListener('click', async () => {
  const content = await dropboxAgent.load('dropbox-history.json');
  if (content) {
    alert('📜 История Copilot:\n\n' + content);
  } else {
    alert('❌ История не найдена.');
  }
});
// === ⏫ [Конец блока: кнопка История Copilot] ===