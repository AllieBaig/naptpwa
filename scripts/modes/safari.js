// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { safariPrompts } from '../utils/clues.js';
import { speak } from '../utils/voice.js';

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const categories = Object.keys(safariPrompts);
  let index = 0;

  game.innerHTML = `
    <h2>🦁 Word Safari</h2>
    <div id="prompt" class="feedback"></div>
    <form id="safari-form">
      <input type="text" id="safari-input" placeholder="Your answer..." required />
      <button type="submit">Submit</button>
    </form>
    <div id="safari-feedback" class="feedback"></div>
    <button class="back-btn">◀ Back to Menu</button>
  `;

  const promptBox = document.getElementById('prompt');
  const input = document.getElementById('safari-input');
  const feedback = document.getElementById('safari-feedback');

  function nextPrompt() {
    const cat = categories[index % categories.length];
    const prompt = safariPrompts[cat][Math.floor(Math.random() * safariPrompts[cat].length)];
    promptBox.textContent = `Category [${cat.toUpperCase()}]: ${prompt}`;
    speak(prompt);
    index++;
    input.value = '';
    feedback.textContent = '';
  }

  document.getElementById('safari-form').onsubmit = e => {
    e.preventDefault();
    const word = input.value.trim();
    if (word) {
      feedback.textContent = `✅ Submitted: ${word}`;
      feedback.style.color = 'green';
      setTimeout(nextPrompt, 1000);
    }
  };

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  nextPrompt();

  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

