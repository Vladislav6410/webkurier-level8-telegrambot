<!-- 📋 Меню администратора -->
<div class="block">
  <h2>🔧 Панель администратора</h2>

  <button class="menu-button" data-target="section-users">👤 Пользователи</button>
  <button class="menu-button" data-target="section-logs">📑 Логи</button>
  <button class="menu-button" data-target="section-config">⚙️ Настройки</button>

  <div id="section-users" class="admin-section" style="display:none;">
    <h3>👤 Пользователи</h3>
    <p>Здесь отображаются зарегистрированные пользователи.</p>
  </div>

  <div id="section-logs" class="admin-section" style="display:none;">
    <h3>📑 Логи</h3>
    <p>Здесь отображаются системные логи и действия.</p>
  </div>

  <div id="section-config" class="admin-section" style="display:none;">
    <h3>⚙️ Настройки</h3>
    <p>Панель управления конфигурацией системы.</p>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.menu-button');
    const sections = document.querySelectorAll('.admin-section');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.dataset.target;

        sections.forEach(section => {
          section.style.display = (section.id === target) ? 'block' : 'none';
        });
      });
    });
  });
</script>