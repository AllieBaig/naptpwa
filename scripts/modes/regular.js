// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
// File: regular.js
// Purpose: Implements Solo (Regular) game mode with word input, hints, and streak tracking

import { injectFontControls, setFontScale, getFontScale } from '../utils/fontControls.js';
import { getEasyHintOptions } from '../utils/clues.js';
import { getRandomLetter } from '../utils/randomizer.js';
import { saveGameResult } from '../utils/history.js';
import { updateStreak } from '../utils/streak.js';

export default function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.classList.add('active');
  game.innerHTML = '';

  const letter = getRandomLetter();
  const difficulty = localStorage.getItem('napt-difficulty') || 'easy';

  const categories = ['Name', 'Place', 'Animal', 'Thing'];
  let html = `<button onclick="(${showMenu})()" class="menu-btn">⬅ Back to Menu</button>`;
  html += `<h2>Solo Mode: Letter <span style="font-size: 1.3em;">${letter}</span></h2>`;
  html += `<form id="regularForm">`;

  categories.forEach(category => {
    html += `<label><strong>${category}</strong><br/><input type="text" name="${category.toLowerCase()}" required /></label><br/>`;

    if (difficulty === 'easy') {
      const hints = getEasyHintOptions(letter, category);
      html += `<div class="easy-hint">Try one: ${hints.map(h => `<span class="hint-word">${h}</span>`).join(' ')}</div>`;
    }
  });

  html += `<br/><button type="submit">Submit</button></form>`;
  html += `<div id="result" style="margin-top:1rem;"></div>`;

  game.innerHTML = html;
  injectFontControls(game);
  setFontScale(getFontScale());

  const form = document.getElementById('regularForm');
  const resultBox = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const filled = Object.values(data).every(val => val.trim().length > 0);

    if (!filled) {
      resultBox.textContent = 'Please fill in all fields!';
      return;
    }

    saveGameResult('regular', { letter, ...data });
    updateStreak('regular');

    resultBox.innerHTML = `✅ Answers submitted!<br/>Letter: <strong>${letter}</strong><br/>
    <button onclick="(${init})({showMenu})">Try another letter</button>`;
  });
}

