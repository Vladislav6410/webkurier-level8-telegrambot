// engine/agents/master/master-agent.js

const masterAgent = {
  agents: {
    wallet: null,
    translator: null,
    engineer: null,
    dream: null
  },

  log: (msg) => {
    console.log(`[MasterAgent] ${msg}`);
  },

  init: () => {
    masterAgent.log("Инициализация агента...");

    try {
      masterAgent.agents.wallet = require('../wallet/wallet-agent.js');
      masterAgent.agents.translator = require('../translator/translator-agent.js');
      masterAgent.agents.engineer = require('../../engineer.js');
      masterAgent.agents.dream = require('../../dream.js');

      masterAgent.log("Агенты успешно подключены.");
    } catch (e) {
      masterAgent.log("Ошибка при подключении агентов: " + e.message);
    }
  },

  listAgents: () => {
    return Object.keys(masterAgent.agents).map((name) => {
      const status = masterAgent.agents[name] ? "✅ подключен" : "❌ отсутствует";
      return `${name} — ${status}`;
    }).join("\n");
  },

  run: (agentName) => {
    if (masterAgent.agents[agentName] && masterAgent.agents[agentName].run) {
      masterAgent.agents[agentName].run();
      masterAgent.log(`Агент "${agentName}" запущен.`);
    } else {
      masterAgent.log(`Агент "${agentName}" не найден или не поддерживает запуск.`);
    }
  },

  stop: (agentName) => {
    if (masterAgent.agents[agentName] && masterAgent.agents[agentName].stop) {
      masterAgent.agents[agentName].stop();
      masterAgent.log(`Агент "${agentName}" остановлен.`);
    } else {
      masterAgent.log(`Агент "${agentName}" не найден или не поддерживает остановку.`);
    }
  }
};

module.exports = masterAgent;