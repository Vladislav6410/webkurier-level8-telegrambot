// engine/dropbox.js

// Импорт SDK Dropbox
import { Dropbox } from 'https://unpkg.com/dropbox@11.0.4/dist/Dropbox-sdk.min.js';

// 🔐 Вставьте ваш Dropbox access token
const ACCESS_TOKEN = 'YOUR_DROPBOX_ACCESS_TOKEN_HERE';

export const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

// 📥 Загрузка файла в Dropbox
export async function uploadFile(path, contents) {
  try {
    const response = await dbx.filesUpload({
      path: path,
      contents: contents,
      mode: 'overwrite'
    });
    console.log('✅ Файл загружен:', response);
    return response;
  } catch (error) {
    console.error('❌ Ошибка загрузки:', error);
    return null;
  }
}

// 📤 Скачивание файла из Dropbox
export async function downloadFile(path) {
  try {
    const response = await dbx.filesDownload({ path });
    const blob = response.result.fileBlob;
    console.log('✅ Файл скачан:', response);
    return blob;
  } catch (error) {
    console.error('❌ Ошибка скачивания:', error);
    return null;
  }
}

// 📂 Получение списка файлов
export async function listFiles(folderPath = '') {
  try {
    const response = await dbx.filesListFolder({ path: folderPath });
    return response.result.entries;
  } catch (error) {
    console.error('❌ Ошибка при получении списка файлов:', error);
    return [];
  }
}