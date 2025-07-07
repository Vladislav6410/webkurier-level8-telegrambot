// Главный управляющий агент WebKurier
export const MasterAgent = {
  agents: {
    wallet: './wallet.js',
    exchanger: './exchanger.js',
    transactions: './transactions.js',
    admin: './admin.js'
  },

  status: {},

  async init() {
    console.log('🧠 MasterAgent запущен');

    for (const [name, path] of Object.entries(this.agents)) {
      try {
        const module = await import(path);
        this.status[name] = '🟢 активен';
        console.log(`✅ Агент ${name} подключен: ${path}`);

        // Автозапуск, если есть функция init
        if (typeof module.init === 'function') {
          await module.init();
          console.log(`🚀 Агент ${name} инициализирован`);
        }

      } catch (err) {
        this.status[name] = '🔴 ошибка';
        console.error(`❌ Ошибка при загрузке ${name}:`, err);
      }
    }
  },

  report() {
    console.log('📋 Статус агентов:');
    for (const [agent, state] of Object.entries(this.status)) {
      console.log(`• ${agent}: ${state}`);
    }
  },

  reload(agentName) {
    if (!(agentName in this.agents)) {
      console.warn(`⚠️ Агент ${agentName} не найден`);
      return;
    }

    import(`${this.agents[agentName]}?t=${Date.now()}`)
      .then((module) => {
        console.log(`🔄 Агент ${agentName} перезагружен`);
        if (typeof module.init === 'function') {
          module.init();
        }
        this.status[agentName] = '🟢 активен';
      })
      .catch((err) => {
        console.error(`❌ Ошибка при перезагрузке ${agentName}:`, err);
        this.status[agentName] = '🔴 ошибка';
      });
  }
};

// Автозапуск MasterAgent при загрузке страницы
MasterAgent.init();