// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
// File: wordSafari.js
// Purpose: Freeform category-based word listing mode with hints and emoji support

import { getRandomLetter } from '../utils/randomizer.js';
import { getEasyHintOptions } from '../utils/clues.js';
import { injectFontControls, setFontScale, getFontScale } from '../utils/fontControls.js';
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
  html += `<h2>Word Safari 🦁 – Letter <span style="font-size: 1.3em;">${letter}</span></h2>`;
  html += `<p>Type a word in each category that starts with <strong>${letter}</strong>.</p>`;
  html += `<form id="safariForm">`;

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

  const form = document.getElementById('safariForm');
  const resultBox = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const filled = Object.values(data).every(val => val.trim().length > 0);

    if (!filled) {
      resultBox.textContent = 'Please fill in all fields!';
      return;
    }

    saveGameResult('wordSafari', { letter, ...data });
    updateStreak('wordSafari');

    resultBox.innerHTML = `✅ Great job explorer!<br/>Letter: <strong>${letter}</strong><br/>
    <button onclick="(${init})({showMenu})">New Safari</button>`;
  });
}

