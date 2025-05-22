// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { relicClues } from '../utils/clues.js';
import { saveHistoryEntry, renderHistoryList } from '../utils/history.js';
import { updateStreakUI } from '../utils/streak.js';

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const relic = relicClues[Math.floor(Math.random() * relicClues.length)];

  game.innerHTML = `
    <h2>🏺 Word Relic</h2>
    <p>Guess the one word that connects all four clues.</p>
    <ul>${relic.clues.map(clue => `<li>${clue}</li>`).join('')}</ul>
    <form id="relic-form">
      <input type="text" id="relic-input" placeholder="Your guess..." required />
      <button type="submit">Submit</button>
    </form>
    <div id="relic-feedback" class="feedback"></div>
    <details><summary>🗃️ Past Correct Relics</summary><ul id="historyList"></ul></details>
    <div id="streakDisplay"></div>
    <button class="back-btn">◀ Back to Menu</button>
  `;

  document.getElementById('relic-form').onsubmit = e => {
    e.preventDefault();
    const input = document.getElementById('relic-input').value.trim().toLowerCase();
    const feedback = document.getElementById('relic-feedback');
    if (input === relic.answer.toLowerCase()) {
      feedback.textContent = '✅ Correct!';
      feedback.style.color = 'green';
      saveHistoryEntry(relic.answer, 'word-relic-history');
      renderHistoryList('historyList', 'word-relic-history');
      updateStreakUI('streakDisplay', 'word-relic');
    } else {
      feedback.textContent = '❌ Try again!';
      feedback.style.color = 'red';
    }
  };

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  renderHistoryList('historyList', 'word-relic-history');
  updateStreakUI('streakDisplay', 'word-relic');

  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

