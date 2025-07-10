// 📦 dropbox-agent.js — агент Dropbox для WebKurierCore с конфигом

import { Dropbox } from 'https://unpkg.com/dropbox@11.0.4/dist/Dropbox-sdk.min.js';

let config = {
  access_token: '',
  default_path: '/WebKurierCore/memory/',
  default_filename: 'webcoin.txt',
  auto_save_on_exit: true,
  log_enabled: true
};

let dbx = null;

// 🔧 Загрузка конфигурации
async function loadConfig() {
  try {
    const res = await fetch('./engine/dropbox-config.json');
    const data = await res.json();
    config = { ...config, ...data }; // объединяем с дефолтом
    dbx = new Dropbox({ accessToken: config.access_token });
    logToTerminal('⚙️ Конфигурация Dropbox загружена.');
  } catch (err) {
    console.warn('⚠️ Ошибка загрузки dropbox-config.json:', err.message);
    logToTerminal('⚠️ Не удалось загрузить конфигурацию Dropbox.');
  }
}

// 📤 Сохранить файл
async function save(filename = config.default_filename, content = '') {
  const path = config.default_path + filename;
  try {
    await dbx.filesUpload({ path, contents: content, mode: 'overwrite' });
    if (config.log_enabled) logToTerminal(`📤 Файл "${filename}" сохранён.`);
  } catch (err) {
    logToTerminal(`❌ Ошибка при сохранении "${filename}": ${err.message}`);
  }
}

// 📥 Загрузить файл
async function load(filename = config.default_filename) {
  const path = config.default_path + filename;
  try {
    const res = await dbx.filesDownload({ path });
    const blob = res.result.fileBlob;
    const text = await blob.text();
    if (config.log_enabled) logToTerminal(`📥 Загружено из Dropbox:\n${text}`);
    return text;
  } catch (err) {
    logToTerminal(`❌ Ошибка при загрузке "${filename}": ${err.message}`);
    return null;
  }
}

// 📁 Список файлов
async function list() {
  try {
    const res = await dbx.filesListFolder({ path: config.default_path });
    const files = res.result.entries;
    if (!files.length) return logToTerminal('📂 Папка Dropbox пуста.');
    const listText = files.map(f => '• ' + f.name).join('\n');
    logToTerminal(`📁 Список файлов:\n${listText}`);
    return files;
  } catch (err) {
    logToTerminal(`❌ Ошибка при получении списка: ${err.message}`);
    return [];
  }
}

// 🖨️ Лог в терминал
function logToTerminal(msg) {
  const el = document.getElementById('terminal-output') || document.getElementById('terminal-log');
  if (el) {
    if (el.tagName === 'TEXTAREA') {
      el.value += msg + '\n';
      el.scrollTop = el.scrollHeight;
    } else {
      el.innerHTML += `<div>${msg}</div>`;
      el.scrollTop = el.scrollHeight;
    }
  }
}

// 🚀 Инициализация при запуске
await loadConfig();

// 🧩 Экспорт агента
export const dropboxAgent = { save, load, list };