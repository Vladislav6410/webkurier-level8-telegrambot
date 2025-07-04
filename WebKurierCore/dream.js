// dream.js — DreamMaker: генерация медиа, синтез и анимация

const dreammaker = {
  voiceOver: (text) => {
    if (!text || text.length < 3) return "⚠️ Введите текст длиннее 3 символов.";
    return `🎤 Озвучка текста: «${text}» выполнена.`;
  },

  fromVideo: (videoFile) => {
    if (!videoFile || !videoFile.name) return "⚠️ Видео не загружено.";
    return `🎞 Видео «${videoFile.name}» принято. Генерация началась...`;
  },

  animate: (imageFile, audioFile) => {
    if (!imageFile || !audioFile) return "⚠️ Укажите и изображение, и звук.";
    return `🧠 Генерирую анимацию из: ${imageFile.name} + ${audioFile.name}`;
  },

  generateFromPrompt: (prompt) => {
    if (!prompt || prompt.length < 3) return "⚠️ Введите более развёрнутый запрос.";
    return `🧠 Создаю медиа по описанию: "${prompt}"...`;
  }
};