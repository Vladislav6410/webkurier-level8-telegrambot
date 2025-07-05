import { uploadFile, downloadFile, listFiles } from './dropbox.js';

export const dropboxAgent = {
  async save(filename = 'webcoin.txt', content = '') {
    try {
      await uploadFile('/WebKurierCore/memory/' + filename, content);
      log(`📤 Файл "${filename}" сохранён в Dropbox.`);
    } catch (err) {
      log('❌ Ошибка при сохранении в Dropbox.');
    }
  },

  async load(filename = 'webcoin.txt') {
    try {
      const blob = await downloadFile('/WebKurierCore/memory/' + filename);
      const text = await blob.text();
      log(`📥 Содержимое "${filename}":\n${text}`);
    } catch (err) {
      log('❌ Ошибка при загрузке из Dropbox.');
    }
  },

  async list() {
    try {
      const files = await listFiles('/WebKurierCore/memory/');
      if (files.length === 0) return log('📂 Папка пуста.');
      log('📁 Файлы в Dropbox:\n' + files.map(f => '• ' + f.name).join('\n'));
    } catch (err) {
      log('❌ Ошибка при получении списка файлов.');
    }
  }
};

// Лог в терминал
function log(text) {
  const logEl = document.getElementById('terminal-log');
  if (logEl) {
    logEl.innerHTML += `<div>${text}</div>`;
    logEl.scrollTop = logEl.scrollHeight;
  }
}