// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

const modeMap = {
  regular: './modes/regular.js',
  wordRelic: './modes/wordRelic.js',
  wordSafari: './modes/safari.js',
  dice: './modes/dice.js',
  atlas: './modes/atlas.js',
};

function showError(message) {
  let errorBox = document.getElementById('mode-error-box');
  if (!errorBox) {
    errorBox = document.createElement('div');
    errorBox.id = 'mode-error-box';
    errorBox.style = `
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
    document.body.insertBefore(errorBox, document.body.firstChild);
  }
  errorBox.textContent = message;
}

export function showMenu() {
  const menu = document.querySelector('main');
  const game = document.getElementById('game');

  menu?.classList.add('active');
  game?.classList.remove('active');
  if (game) game.innerHTML = '';

  const errorBox = document.getElementById('mode-error-box');
  if (errorBox) errorBox.remove();
}

export async function navigateToMode(mode) {
  const modulePath = modeMap[mode];

  if (!modulePath) {
    showError(`Unknown game mode: "${mode}". Please select a valid option.`);
    console.error(`Unknown game mode: ${mode}`);
    return;
  }

  try {
    const module = await import(modulePath);
    module.init({ showMenu });
  } catch (err) {
    showError(`Failed to load "${mode}" mode. Please try again or reload.`);
    console.error(`Error loading mode "${mode}"`, err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.menu-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      navigateToMode(mode);
    });
  });
});

