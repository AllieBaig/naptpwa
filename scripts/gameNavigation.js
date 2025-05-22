// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { saveLastMode } from './utils/autosave.js';

const modeMap = {
  regular: './modes/regular.js',
  wordRelic: './modes/wordRelic.js',
  wordSafari: './modes/wordSafari.js',
  dice: './modes/dice.js',
  atlas: './modes/atlas.js',
  versus: './modes/versus.js'
};

function showError(message) {
  let box = document.getElementById('mode-error-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'mode-error-box';
    box.style = `
      background: #ffe0e0;
      color: #900;
      padding: 1rem;
      margin: 1rem auto;
      text-align: center;
      border: 1px solid #f88;
      border-radius: 0.5rem;
      max-width: 600px;
      font-weight: bold;
    `;
    document.body.insertBefore(box, document.body.firstChild);
  }
  box.textContent = message;
}

export function showMenu() {
  const menu = document.querySelector('main');
  const game = document.getElementById('game');
  const settings = document.getElementById('settings-panel');
  const errorLink = document.getElementById('error-viewer-link');

  menu?.classList.add('active');
  game?.classList.remove('active');
  game.innerHTML = '';

  if (settings) settings.style.display = '';
  if (errorLink) errorLink.style.display = 'block';

  const errorBox = document.getElementById('mode-error-box');
  if (errorBox) errorBox.remove();
}

export async function navigateToMode(mode) {
  const path = modeMap[mode];
  if (!path) {
    showError(`Unknown mode: "${mode}"`);
    return;
  }

  try {
    const module = await import(path);
    module.init({ showMenu });
    saveLastMode(mode);

    const menu = document.querySelector('main');
    const game = document.getElementById('game');
    const settings = document.getElementById('settings-panel');
    const errorLink = document.getElementById('error-viewer-link');

    if (menu) menu.classList.remove('active');
    if (game) game.classList.add('active');
    if (settings) settings.style.display = 'none';
    if (errorLink) errorLink.style.display = 'none';

  } catch (err) {
    console.error(`Failed to load mode "${mode}"`, err);
    showError(`Failed to load "${mode}" mode. Please try again or reload.`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.menu-btn');
  const gameContainer = document.createElement('div');
  gameContainer.id = 'game';
  gameContainer.classList.add('game-container');
  document.body.appendChild(gameContainer);

  const errorLink = document.createElement('div');
  errorLink.id = 'error-viewer-link';
  errorLink.style = 'text-align:center; margin-top:1rem;';
  errorLink.innerHTML = `<a href="./scripts/utils/error-log.html" target="_blank" style="font-size: 0.9rem;">🐞 View Error Log</a>`;
  document.body.appendChild(errorLink);

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.getAttribute('data-mode');
      navigateToMode(mode);
    });
  });
});

