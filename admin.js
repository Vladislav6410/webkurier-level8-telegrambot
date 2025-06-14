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