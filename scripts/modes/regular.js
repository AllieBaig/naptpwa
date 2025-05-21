// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

const STORAGE_PREFIX = 'napt-regular-';
const todayDate = new Date().toISOString().slice(0, 10);
const todayKey = `${STORAGE_PREFIX}${todayDate}`;



export function init({ showMenu }) {
  const container = document.getElementById('game');
  container.innerHTML = '';


/*export default function init({ showMenu }) {
  const gameArea = document.getElementById('game');
  if (!gameArea) return;
  gameArea.innerHTML = `
  */
  
    <section class="game-section">
      <h2>📝 Regular Mode</h2>
      <form id="regular-form" class="regular-form">
        <label>🙋 Name: <input type="text" name="name" required /></label>
        <label>🗺️ Place: <input type="text" name="place" required /></label>
        <label>🐾 Animal: <input type="text" name="animal" required /></label>
        <label>🎒 Thing: <input type="text" name="thing" required /></label>
        <button type="submit">✅ Submit</button>
      </form>
      <button class="back-btn">🔙 Back to Menu</button>
      <div id="regular-feedback" class="feedback"></div>

      <details class="history-log">
        <summary>📅 View Past Entries</summary>
        <ul id="history-list"></ul>
      </details>
      <div id="streak-info" class="streak-display"></div>
    </section>
  `;

  const form = document.getElementById('regular-form');
  const feedback = document.getElementById('regular-feedback');
  const historyList = document.getElementById('history-list');
  const streakDisplay = document.getElementById('streak-info');
  const backBtn = document.querySelector('.back-btn');

  const savedToday = JSON.parse(localStorage.getItem(todayKey));
  if (savedToday) {
    form.name.value = savedToday.name || '';
    form.place.value = savedToday.place || '';
    form.animal.value = savedToday.animal || '';
    form.thing.value = savedToday.thing || '';
    feedback.textContent = '📌 Today’s entry loaded.';
    feedback.style.color = 'gray';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const place = formData.get('place').trim();
    const animal = formData.get('animal').trim();
    const thing = formData.get('thing').trim();

    if (name && place && animal && thing) {
      const entry = { name, place, animal, thing, date: todayDate };
      localStorage.setItem(todayKey, JSON.stringify(entry));
      feedback.textContent = '🎉 Entry saved for today!';
      feedback.style.color = 'green';
      displayHistory();
      displayStreak();
    } else {
      feedback.textContent = '⚠️ Please complete all fields.';
      feedback.style.color = 'red';
    }
  });

  backBtn.addEventListener('click', () => showMenu());

  displayHistory();
  displayStreak();

  document.querySelector('main')?.classList.remove('active');
  gameArea.classList.add('active');
}

function displayHistory() {
  const list = document.getElementById('history-list');
  list.innerHTML = '';

  const keys = Object.keys(localStorage)
    .filter(k => k.startsWith(STORAGE_PREFIX))
    .sort()
    .reverse();

  for (const key of keys) {
    const entry = JSON.parse(localStorage.getItem(key));
    if (!entry) continue;

    const li = document.createElement('li');
    li.textContent = `📆 ${entry.date}: ${entry.name}, ${entry.place}, ${entry.animal}, ${entry.thing}`;
    list.appendChild(li);
  }
}

function displayStreak() {
  const info = document.getElementById('streak-info');
  const keys = Object.keys(localStorage)
    .filter(k => k.startsWith(STORAGE_PREFIX))
    .map(k => k.replace(STORAGE_PREFIX, ''))
    .sort();

  let streak = 0;
  let today = new Date();
  for (let i = keys.length - 1; i >= 0; i--) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - streak);
    const expectedKey = expected.toISOString().slice(0, 10);
    if (keys.includes(expectedKey)) {
      streak++;
    } else {
      break;
    }
  }

  let badge = '';
  if (streak >= 30) badge = '🏆';
  else if (streak >= 14) badge = '🔥';
  else if (streak >= 7) badge = '🌟';
  else if (streak >= 3) badge = '✨';
  else if (streak > 0) badge = '✅';

  info.textContent = `${badge} Current Streak: ${streak} day${streak !== 1 ? 's' : ''}`;
}

