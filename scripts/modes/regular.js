// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { updateStreakUI } from '../utils/streak.js';
import { saveHistoryEntry, renderHistoryList } from '../utils/history.js';
import { applyFontControls } from '../utils/fontControls.js';

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>🧠 Solo Mode</h2>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div id="streakDisplay">🔥 Streak: 0 days</div>
      <div id="fontControls">
        <button id="fontSmaller" aria-label="Decrease font size">A−</button>
        <button id="fontLarger" aria-label="Increase font size">A+</button>
      </div>
    </div>

    <form id="solo-form" class="regular-form" style="margin-top: 1rem;">
      <label>Name: <input type="text" name="name" required /></label>
      <label>Place: <input type="text" name="place" required /></label>
      <label>Animal: <input type="text" name="animal" required /></label>
      <label>Thing: <input type="text" name="thing" required /></label>
      <button type="submit">Submit</button>
    </form>

    <div id="solo-feedback" class="feedback"></div>

    <details style="margin-top: 1rem;">
      <summary>📜 View Answer History</summary>
      <ul id="historyList" style="margin-top: 0.5rem;"></ul>
    </details>

    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  // Font controls
  const fontControls = document.getElementById('fontControls');
  applyFontControls(fontControls);

  // Form logic
  const form = document.getElementById('solo-form');
  const feedback = document.getElementById('solo-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const allFilled = Object.values(data).every(val => val.trim());

    if (allFilled) {
      const entry = `${data.name}, ${data.place}, ${data.animal}, ${data.thing}`;
      feedback.textContent = `✅ You entered: ${entry}`;
      feedback.style.color = 'green';

      saveHistoryEntry(entry);
      updateStreakUI('streakDisplay');
      renderHistoryList('historyList');
    } else {
      feedback.textContent = '⚠️ Please fill in all fields.';
      feedback.style.color = 'red';
    }
  });

  document.getElementById('historyList')?.classList.add('loaded');
  renderHistoryList('historyList');
  updateStreakUI('streakDisplay');

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

