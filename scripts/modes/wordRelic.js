// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { relicClues } from '../utils/clues.js';
import { saveHistoryEntry, renderHistoryList } from '../utils/history.js';
import { updateStreakUI } from '../utils/streak.js';

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const relic = getRandomRelic();

  game.innerHTML = `
    <h2>🏺 Word Relic</h2>
    <p>Guess the one word that connects all the clues.</p>

    <ul id="clue-list" style="margin: 1rem 0;"></ul>

    <form id="relic-form" style="display: flex; flex-direction: column; gap: 1rem;">
      <input type="text" id="relic-input" placeholder="Your guess..." required />
      <button type="submit">Submit</button>
    </form>

    <div id="relic-feedback" class="feedback"></div>

    <details style="margin-top: 1rem;">
      <summary>🗃️ Past Correct Relics</summary>
      <ul id="historyList" style="margin-top: 0.5rem;"></ul>
    </details>

    <div id="streakDisplay" style="margin-top: 0.5rem;"></div>
    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  const clueList = document.getElementById('clue-list');
  relic.clues.forEach(clue => {
    const li = document.createElement('li');
    li.textContent = `• ${clue}`;
    clueList.appendChild(li);
  });

  const form = document.getElementById('relic-form');
  const input = document.getElementById('relic-input');
  const feedback = document.getElementById('relic-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const guess = input.value.trim().toLowerCase();
    if (guess === relic.answer.toLowerCase()) {
      feedback.textContent = '✅ Correct! You restored the relic!';
      feedback.style.color = 'green';
      saveHistoryEntry(relic.answer, 'word-relic-history');
      renderHistoryList('historyList', 'word-relic-history');
      updateStreakUI('streakDisplay', 'word-relic');
      form.style.display = 'none';
    } else {
      feedback.textContent = '❌ Incorrect. Try again.';
      feedback.style.color = 'red';
    }
  });

  renderHistoryList('historyList', 'word-relic-history');
  updateStreakUI('streakDisplay', 'word-relic');

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

function getRandomRelic() {
  return relicClues[Math.floor(Math.random() * relicClues.length)];
}

