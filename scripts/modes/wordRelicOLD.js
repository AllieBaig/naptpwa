
// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
// File: wordRelic.js
// Purpose: Game mode where players guess themed words to restore a relic

import { getRandomLetter } from '../utils/randomizer.js';
import { getEasyHintOptions } from '../utils/clues.js';
import { injectFontControls, getFontScale, setFontScale } from '../utils/fontControls.js';
import { saveGameResult } from '../utils/history.js';
import { updateStreak } from '../utils/streak.js';

export default function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const letter = getRandomLetter();
  const difficulty = localStorage.getItem('napt-difficulty') || 'easy';
  const categories = ['Name', 'Place', 'Animal', 'Thing'];

  game.classList.add('active');
  game.innerHTML = '';

  let html = `<button onclick="(${showMenu})()" class="menu-btn">⬅ Back to Menu</button>`;
  html += `<h2>Word Relic 🏺 – Letter <span style="font-size:1.3em;">${letter}</span></h2>`;
  html += `<p>Solve the four clues to restore the ancient relic.</p>`;
  html += `<form id="relicForm">`;

  categories.forEach(cat => {
    html += `<label><strong>${cat}</strong><br/><input type="text" name="${cat.toLowerCase()}" required /></label><br/>`;
    if (difficulty === 'easy') {
      const hints = getEasyHintOptions(letter, cat);
      html += `<div class="easy-hint">Try one: ${hints.map(h => `<span class="hint-word">${h}</span>`).join(' ')}</div>`;
    }
  });

  html += `<br/><button type="submit">Submit</button></form>`;
  html += `<div id="result" style="margin-top:1rem;"></div>`;

  game.innerHTML = html;
  injectFontControls(game);
  setFontScale(getFontScale());

  const form = document.getElementById('relicForm');
  const resultBox = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const filled = Object.values(data).every(val => val.trim().length > 0);

    if (!filled) {
      resultBox.textContent = 'Please fill in all fields!';
      return;
    }

    saveGameResult('wordRelic', { letter, ...data });
    updateStreak('wordRelic');

    resultBox.innerHTML = `✨ Relic Restored!<br/>Letter: <strong>${letter}</strong><br/>
    <button onclick="(${init})({showMenu})">New Relic</button>`;
  });
}

