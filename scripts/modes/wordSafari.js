

// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { safariPrompts } from '../utils/clues.js';
import { getRandomPromptsByCategory } from '../utils/randomizer.js';
import { speak } from '../utils/voice.js';
import { versionMap } from '../utils/version.js';
import { resetGameContainer } from '../utils/gameUI.js';

export function init({ showMenu }) {
  resetGameContainer();
  window.__LAST_LOADED_VERSION = `wordSafari.js ${versionMap.wordSafari}`;

  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>🦁 Word Safari</h2>
    <div id="prompt" class="feedback"></div>
    
    <form id="safari-form" class="regular-form">
      <input type="text" id="safari-input" placeholder="Your answer..." required />
      <button type="submit">Submit</button>
    </form>

    <div id="safari-feedback" class="feedback" style="margin-top:0.5rem;"></div>
    <button id="refreshPromptsBtn">🔄 New Questions</button>
    <button class="back-btn" style="margin-top:1rem;">◀ Back to Menu</button>
  `;

  const promptBox = document.getElementById('prompt');
  const input = document.getElementById('safari-input');
  const feedback = document.getElementById('safari-feedback');

  let currentPrompt = '';

  function showNewPrompt() {
    const random = getRandomPromptsByCategory(safariPrompts, 1);
    const cat = Object.keys(random)[0];
    const prompt = random[cat][0];
    currentPrompt = prompt;

    promptBox.innerHTML = `<strong>${cat.toUpperCase()}</strong>: ${prompt}`;
    feedback.textContent = '';
    input.value = '';
    speak(prompt);
  }

  document.getElementById('safari-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const answer = input.value.trim();
    if (answer) {
      feedback.textContent = `✅ Submitted: ${answer}`;
      feedback.style.color = 'green';
    } else {
      feedback.textContent = '⚠️ Please enter something.';
      feedback.style.color = 'orange';
    }
  });

  document.getElementById('refreshPromptsBtn')?.addEventListener('click', showNewPrompt);
  document.querySelector('.back-btn')?.addEventListener('click', showMenu);

  showNewPrompt();
}

