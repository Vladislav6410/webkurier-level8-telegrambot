let data = {};
let currentArea = '';
let currentPage = 0;
const itemsPerPage = 5;

// Загрузка JSON
fetch('data/areas.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    populateAreaSelect();
  })
  .catch(err => {
    console.error('Ошибка загрузки areas.json:', err);
  });

// Заполнение выпадающего списка
function populateAreaSelect() {
  const select = document.getElementById('areaSelect');
  select.innerHTML = '<option disabled selected>Выберите район</option>';
  Object.keys(data).forEach(area => {
    const option = document.createElement('option');
    option.value = area;
    option.textContent = area;
    select.appendChild(option);
  });
}

// Обработка выбора района
function onAreaSelect() {
  const select = document.getElementById('areaSelect');
  currentArea = select.value;
  currentPage = 0;
  renderList();
}

// Отображение объектов
function renderList() {
  const list = document.getElementById('objectList');
  const pagination = document.getElementById('pagination');
  list.innerHTML = '';

  if (!data[currentArea]) return;

  const sorted = [...data[currentArea]].sort();
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = sorted.slice(start, end);

  pageItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  // Обновить пагинацию
  pagination.style.display = 'flex';
  document.getElementById('prevBtn').disabled = currentPage === 0;
  document.getElementById('nextBtn').disabled = end >= sorted.length;
}

// Кнопка назад
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    renderList();
  }
}

// Кнопка вперёд
function nextPage() {
  if (data[currentArea]) {
    const maxPage = Math.floor(data[currentArea].length / itemsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      renderList();
    }
  }
}