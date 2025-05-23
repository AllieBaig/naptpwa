

// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

export function saveHistoryEntry(entry, key = 'solo-history') {
  const now = new Date().toLocaleDateString();
  const item = { text: entry, date: now };

  let history = JSON.parse(localStorage.getItem(key) || '[]');
  history.unshift(item);
  history = history.slice(0, 30); // limit to 30 entries
  localStorage.setItem(key, JSON.stringify(history));
}

export function loadHistory(key = 'solo-history') {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export function renderHistoryList(containerId, key = 'solo-history') {
  const list = document.getElementById(containerId);
  if (!list) return;

  const history = loadHistory(key);
  list.innerHTML = '';

  if (history.length === 0) {
    list.innerHTML = '<li>No history yet.</li>';
    return;
  }

  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.text} (${item.date})`;
    list.appendChild(li);
  });
}

