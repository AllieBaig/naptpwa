// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

/**
 * Maps game mode names to their respective module paths.
 * Paths are relative to the location of gameNavigation.js (which is in scripts/).
 */
const modeMap = {
  regular: './modes/regular.js',
  wordRelic: './modes/wordRelic.js',
  wordSafari: './modes/safari.js',
  dice: './modes/dice.js',
  atlas: './modes/atlas.js',
};

/**
 * Displays a temporary error message at the top of the body.
 * @param {string} message - The error message to display.
 */
function showError(message) {
  let errorBox = document.getElementById('mode-error-box');
  if (!errorBox) {
    errorBox = document.createElement('div');
    errorBox.id = 'mode-error-box';
    // Inline styles for quick visual feedback; consider moving to CSS for larger projects.
    errorBox.style.cssText = `
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

/**
 * Shows the main menu and hides the game area.
 * Also clears any active error messages.
 */
export function showMenu() {
  const menu = document.querySelector('main');
  const game = document.getElementById('game');

  menu?.classList.add('active'); // Ensure main menu is visible
  game?.classList.remove('active'); // Hide game area
  if (game) game.innerHTML = ''; // Clear game content

  const errorBox = document.getElementById('mode-error-box');
  if (errorBox) errorBox.remove(); // Remove any active error messages
}

/**
 * Navigates to a specific game mode by dynamically importing its module.
 * @param {string} mode - The name of the game mode to navigate to.
 */
export async function navigateToMode(mode) {
  const modulePath = modeMap[mode];

  if (!modulePath) {
    showError(`Unknown game mode: "${mode}". Please select a valid option.`);
    console.error(`Unknown game mode: ${mode}`);
    return;
  }

  try {
    const module = await import(modulePath);
    // Call the init function of the imported module.
    // This assumes all game mode modules export 'init' as a named export.
    module.init({ showMenu });
  } catch (err) {
    showError(`Failed to load "${mode}" mode. Please try again or reload.`);
    console.error(`Error loading mode "${mode}"`, err);
  }
}

/**
 * Attaches event listeners to all game mode buttons on DOMContentLoaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuButtons = document.querySelectorAll('.menu-btn');
  menuButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const mode = event.target.dataset.mode;
      navigateToMode(mode);
    });
  });
});


