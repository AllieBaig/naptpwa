// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

const modeMap = {
  regular: './scripts/modes/regular.js',
  wordRelic: './scripts/modes/wordRelic.js',
  wordSafari: './scripts/modes/safari.js',
  dice: './scripts/modes/dice.js',
  atlas: './scripts/modes/atlas.js',
};

export function showMenu() {
  document.getElementById('menu')?.classList.add('active');
  const gameEl = document.getElementById('game');
  if (gameEl) {
    gameEl.classList.remove('active');
    gameEl.innerHTML = '';
  }
}

export async function navigateToMode(mode) {
  if (!modeMap[mode]) {
    console.error(`Mode ${mode} not found`);
    return;
  }
  try {
    const module = await import(modeMap[mode]);
    module.init?.({ showMenu });
  } catch (err) {
    console.error(`Failed to load mode "${mode}"`, err);
  }
}

// Attach event listeners after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      navigateToMode(mode);
    });
  });
});
