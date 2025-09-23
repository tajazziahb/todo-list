
const input = document.querySelector('#task');
const addBtn = document.querySelector('#add-task');
const clearAllBtn = document.querySelector('#clear-list');
const list = document.querySelector('#list');
const stats = document.querySelector('#stats');

addBtn.addEventListener('click', addItem);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addItem(); }); // from ChatGPT

function addItem() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'task-text';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✓';
  completeBtn.className = 'complete';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete';

  li.append(span, completeBtn, deleteBtn);
  list.appendChild(li);

  input.value = '';
  input.focus();

  updateStats();
}

list.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('complete')) {
    el.parentElement.classList.toggle('completed');   // from ChatGPT
    updateStats();
  }
  if (el.classList.contains('delete')) {
    el.parentElement.remove();
    updateStats();
  }
});


clearAllBtn.addEventListener('click', () => {
  list.innerHTML = '';
  updateStats();
});

function updateStats() {
  const items = list.querySelectorAll('li').length;
  const done = list.querySelectorAll('li.completed').length;
  const left = items - done;
  stats.textContent = `${left} left · ${done} done`;
}

updateStats();
