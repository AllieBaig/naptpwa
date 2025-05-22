// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { safariPrompts } from '../utils/clues.js';

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const categories = Object.keys(safariPrompts);
  let currentIndex = 0;
  let currentPrompt = '';
  let currentCategory = '';

  game.innerHTML = `
    <h2>🦁 Word Safari</h2>
    <div id="prompt-box" class="feedback" style="margin-bottom: 1rem;"></div>

    <form id="safari-form" style="display: flex; flex-direction: column; gap: 1rem;">
      <input type="text" id="safari-input" placeholder="Enter a word..." required />
      <button type="submit">Submit</button>
    </form>

    <div id="safari-feedback" class="feedback" style="margin-top: 0.5rem;"></div>
    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  const promptBox = document.getElementById('prompt-box');
  const feedback = document.getElementById('safari-feedback');
  const form = document.getElementById('safari-form');
  const input = document.getElementById('safari-input');

  function loadNextPrompt() {
    currentCategory = categories[currentIndex % categories.length];
    const options = safariPrompts[currentCategory];
    currentPrompt = options[Math.floor(Math.random() * options.length)];
    promptBox.textContent = `Prompt [${capitalize(currentCategory)}]: ${currentPrompt}`;
    feedback.textContent = '';
    input.value = '';
    input.focus();
    currentIndex++;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (word) {
      feedback.textContent = `✅ "${word}" submitted for "${currentCategory}"`;
      feedback.style.color = 'green';
      setTimeout(loadNextPrompt, 1000);
    }
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  loadNextPrompt();

  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

