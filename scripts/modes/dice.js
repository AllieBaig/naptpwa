// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
// File: dice.js
// Purpose: Implements Dice Challenge mode with timed prompt and letter roll

import { getRandomLetter } from '../utils/randomizer.js';
import { injectFontControls, setFontScale, getFontScale } from '../utils/fontControls.js';
import { getEasyHintOptions } from '../utils/clues.js';
import { saveGameResult } from '../utils/history.js';
import { updateStreak } from '../utils/streak.js';
import { startTimer } from '../utils/timer.js';

export default function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const letter = getRandomLetter();
  const difficulty = localStorage.getItem('napt-difficulty') || 'easy';
  const categories = ['Name', 'Place', 'Animal', 'Thing'];

  game.classList.add('active');
  game.innerHTML = '';

  let html = `<button onclick="(${showMenu})()" class="menu-btn">⬅ Back to Menu</button>`;
  html += `<h2>Dice Challenge 🎲 – Letter <span style="font-size: 1.3em;">${letter}</span></h2>`;
  html += `<div id="timerBox">⏱️ 1:00</div>`;
  html += `<form id="diceForm">`;

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

  // Timer logic
  startTimer(60, document.getElementById('timerBox'), () => {
    document.querySelector('#diceForm button[type="submit"]').disabled = true;
    document.getElementById('result').textContent = '⏰ Time is up! Submit is disabled.';
  });

  const form = document.getElementById('diceForm');
  const resultBox = document.getElementById('result');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const filled = Object.values(data).every(val => val.trim().length > 0);

    if (!filled) {
      resultBox.textContent = 'Please fill in all fields!';
      return;
    }

    saveGameResult('dice', { letter, ...data });
    updateStreak('dice');

    resultBox.innerHTML = `✅ Challenge complete!<br/>Letter: <strong>${letter}</strong><br/>
    <button onclick="(${init})({showMenu})">New Dice Roll</button>`;
  });
}

