// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { saveLastMode } from './utils/autosave.js';
import { resetGameContainer } from './utils/gameUI.js';
import { versionMap } from './utils/version.js';

const modeMap = {
  regular: './modes/regular.js',
  wordRelic: './modes/wordRelic.js',
  wordSafari: './modes/wordSafari.js',
  dice: './modes/dice.js',
  atlas: './modes/atlas.js',
  versus: './modes/versus.js',
  trail: './modes/trail.js'
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
  const modeButtons = document.getElementById('mode-buttons');

  menu?.classList.add('active');
  game?.classList.remove('active');
  game.innerHTML = '';

  settings?.style.setProperty('display', '');
  errorLink?.style.setProperty('display', 'block');
  modeButtons?.classList.remove('hidden');

  document.getElementById('mode-error-box')?.remove();
  window.__LAST_LOADED_VERSION = 'mainMenu';
}

export async function navigateToMode(mode) {
  const path = modeMap[mode];
  if (!path) {
    showError(`Unknown mode: "${mode}"`);
    return;
  }

  try {
    const module = await import(path);
    resetGameContainer();
    module.init({ showMenu });

    saveLastMode(mode);

    document.getElementById('settings-panel')?.style.setProperty('display', 'none');
    document.getElementById('error-viewer-link')?.style.setProperty('display', 'none');
    document.getElementById('mode-buttons')?.classList.add('hidden');

    window.__LAST_LOADED_VERSION = `${mode}.js ${versionMap[mode] || 'v?'}`;
  } catch (err) {
    console.error(`Failed to load mode "${mode}"`, err);
    showError(`Failed to load "${mode}" mode. Please try again or reload.`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.menu-btn');

  const gameContainer = document.getElementById('game') || document.createElement('div');
  if (!gameContainer.id) {
    gameContainer.id = 'game';
    gameContainer.classList.add('game-container');
    document.body.appendChild(gameContainer);
  }

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

  window.__LAST_LOADED_VERSION = `gameNavigation.js ${versionMap.gameNavigation}`;
});

