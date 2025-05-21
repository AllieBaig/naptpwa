/*
MIT License
Copyright (c) 2025 AllieBaig
Full license: https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
*/

const modeMap = {
  regular: './modes/regular.js',
  wordRelic: './modes/wordRelic.js',
  safari: './modes/safari.js',
  dice: './modes/dice.js',
  atlas: './modes/atlas.js',
};

const menuEl = document.getElementById('menu');     // <---- make sure these IDs exist in your HTML
const gameEl = document.getElementById('game');

let currentModule = null;

// Show main menu, hide game container, hide back button
export function showMenu() {
  if (menuEl) menuEl.classList.add('active');
  if (gameEl) {
    gameEl.classList.remove('active');
    gameEl.innerHTML = '';
  }
  hideBackButton();
}

// Show back button
function showBackButton() {
  let backBtn = document.getElementById('backToMenu');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.id = 'backToMenu';
    backBtn.textContent = 'Back to Menu';
    backBtn.style.margin = '1em';
    backBtn.addEventListener('click', () => {
      if (currentModule && currentModule.cleanup) {
        currentModule.cleanup();
      }
      showMenu();
      currentModule = null;
    });
    document.body.insertBefore(backBtn, gameEl);
  }
  backBtn.style.display = 'inline-block';
}

// Hide back button
function hideBackButton() {
  const backBtn = document.getElementById('backToMenu');
  if (backBtn) backBtn.style.display = 'none';
}

// Load and initialize the selected mode
export async function navigateToMode(mode) {
  if (!modeMap[mode]) return console.error(`Mode ${mode} not found`);
  try {
    if (menuEl) menuEl.classList.remove('active');
    if (gameEl) {
      gameEl.classList.add('active');
      gameEl.innerHTML = '';
    }
    showBackButton();

    currentModule = await import(modeMap[mode]);
    if (currentModule && typeof currentModule.init === 'function') {
      await currentModule.init({ container: gameEl, showMenu });
    } else {
      console.error(`Mode ${mode} does not export init function`);
    }
  } catch (error) {
    console.error('Error loading mode:', error);
    alert('Failed to load game mode. Please try again.');
    showMenu();
  }
}
