// engine/agents/legal-agent.js

export const LegalAgent = {
  name: "LegalAgent",
  version: "1.0",
  description: "Юридический агент для анализа и генерации документов",

  async analyze(text) {
    // Простая проверка шаблонов
    const result = [];

    if (text.includes("Лицензионное соглашение")) {
      result.push("📜 Обнаружено: Лицензионное соглашение");
    }

    if (text.toLowerCase().includes("пользователь")) {
      result.push("👤 Найдено упоминание пользователя — возможно, это пользовательское соглашение");
    }

    if (text.includes("конфиденциальность") || text.includes("персональные данные")) {
      result.push("🔒 Возможно, документ связан с GDPR или защитой данных");
    }

    return result.length > 0
      ? result.join("\n")
      : "🧐 Ничего юридически значимого не найдено.";
  },

  getTemplate(type) {
    const templates = {
      license: `ЛИЦЕНЗИОННОЕ СОГЛАШЕНИЕ
Настоящее соглашение регулирует использование цифрового продукта WebKurier...`,

      nda: `СОГЛАШЕНИЕ О КОНФИДЕНЦИАЛЬНОСТИ (NDA)
Настоящим стороны соглашаются сохранять в тайне всю информацию...`,

      privacy: `ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
Мы уважаем вашу конфиденциальность и обрабатываем персональные данные согласно GDPR...`
    };

    return templates[type] || "❌ Шаблон не найден.";
  },

  help() {
    return `
📚 Команды LegalAgent:
/legal analyze <текст> — анализ юридического документа
/legal template license — шаблон лицензионного соглашения
/legal template nda — шаблон NDA
/legal template privacy — политика конфиденциальности
`;
  }
};