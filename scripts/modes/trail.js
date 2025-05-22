

// MIT License — Copyright 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { resetGameContainer } from '../utils/gameUI.js';
import { versionMap } from '../utils/version.js';
import { trailThemes } from '../utils/trailThemes.js';

export function init({ showMenu }) {
  resetGameContainer();
  window.__LAST_LOADED_VERSION = `trail.js ${versionMap.trail || 'v1.0.0'}`;

  const game = document.getElementById('game');
  if (!game) return;

  const today = new Date();
  const letter = String.fromCharCode(65 + (today.getDay() % 26)); // A-G by weekday
  const theme = trailThemes[today.getDay() % trailThemes.length];

  const categories = ['Name', 'Place', 'Animal', 'Thing'];

  game.innerHTML = `
    <h2>🗺️ Trail of Letters</h2>
    <p><strong>Theme:</strong> ${theme.name} — <em>${theme.description}</em></p>
    <p><strong>Letter of the Day:</strong> ${letter}</p>

    <form id="trail-form" class="regular-form">
      ${categories.map(cat => `
        <label>${cat}:
          <input type="text" name="${cat.toLowerCase()}" required />
        </label>
      `).join('')}
      <button type="submit">Submit</button>
    </form>

    <div id="trail-feedback" class="feedback" style="margin-top:1rem;"></div>
    <button class="back-btn">◀ Back to Menu</button>
  `;

  const form = document.getElementById('trail-form');
  const feedback = document.getElementById('trail-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entries = Object.values(Object.fromEntries(data.entries()));
    const allMatch = entries.every(word => word.trim().toUpperCase().startsWith(letter));

    if (allMatch) {
      feedback.innerHTML = `✅ Well done! You’ve completed the trail.<br/><em>You found a relic: “The ${letter}n Codex”</em>`;
      feedback.style.color = 'green';
    } else {
      feedback.textContent = `❌ One or more words don't start with ${letter}. Try again!`;
      feedback.style.color = 'red';
    }
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

