// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
// File: regular.js
// Purpose: Implements Solo (Regular) game mode with word input, hints, and streak tracking

import { getRandomLetter } from '../utils/randomizer.js';
import { getEasyHintOptions } from '../utils/clues.js'; // Assuming you still need hints
import { saveHistoryEntry, renderHistoryList } from '../utils/history.js';
import { updateStreakUI } from '../utils/streak.js'; // Corrected to updateStreakUI based on your streak.js
import { applyFontControls } from '../utils/fontControls.js'; // Using applyFontControls based on your fontControls.js
import { versionMap } from '../utils/version.js'; // To track the version of this module

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  // Track the version of this module being loaded for error logging
  window.__LAST_LOADED_VERSION = `regular.js ${versionMap.regular}`;

  const letter = getRandomLetter();
  const difficulty = localStorage.getItem('napt-difficulty') || 'easy';
  const categories = ['Name', 'Place', 'Animal', 'Thing'];

  game.classList.add('active');
  game.innerHTML = `
    <h2>🧠 Solo Mode</h2>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div id="streakDisplay">🔥 Streak: 0 days</div>
      <div id="fontControls">
        <button id="fontSmaller" aria-label="Decrease font size">A−</button>
        <button id="fontLarger" aria-label="Increase font size">A+</button>
      </div>
    </div>

    <p style="font-size: 1.3em; text-align: center; margin: 1rem 0;">Letter: <strong>${letter}</strong></p>

    <form id="solo-form" class="regular-form" style="margin-top: 1rem;">
      ${categories.map(category => `
        <label><strong>${category}</strong><br/>
          <input type="text" name="${category.toLowerCase()}" required />
        </label><br/>
        ${difficulty === 'easy' ? `<div class="easy-hint">Try one: ${getEasyHintOptions(letter, category).map(h => `<span class="hint-word">${h}</span>`).join(' ')}</div>` : ''}
      `).join('')}
      <button type="submit">Submit</button>
    </form>

    <div id="solo-feedback" class="feedback"></div>

    <details style="margin-top: 1rem;">
      <summary>📜 View Answer History</summary>
      <ul id="historyList" style="margin-top: 0.5rem;"></ul>
    </details>

    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  // Controls
  applyFontControls(document.getElementById('fontControls'), '#game'); // Apply font controls to the game container

  const form = document.getElementById('solo-form');
  const feedback = document.getElementById('solo-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const entryData = Object.fromEntries(formData.entries());
    const complete = Object.values(entryData).every(val => val.trim());

    if (complete) {
      // Create a more descriptive entry for history
      const combinedEntry = `Letter ${letter}: ${categories.map(cat => `${cat}: ${entryData[cat.toLowerCase()]}`).join(' | ')}`;
      
      feedback.textContent = `✅ Answers submitted! You entered: ${combinedEntry}`;
      feedback.style.color = 'green';

      // Save game result using saveHistoryEntry
      saveHistoryEntry(combinedEntry, 'solo-history'); // Use 'solo-history' as the key for solo mode
      renderHistoryList('historyList', 'solo-history'); // Re-render history list
      updateStreakUI('streakDisplay', 'solo'); // Update solo streak
    } else {
      feedback.textContent = '⚠️ Please fill in all fields.';
      feedback.style.color = 'orange';
    }
  });

  // Initial render of history and streak on load
  renderHistoryList('historyList', 'solo-history');
  updateStreakUI('streakDisplay', 'solo');

  // Back button functionality
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}
