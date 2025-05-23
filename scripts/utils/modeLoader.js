
// scripts/utils/modeLoader.js

import { saveLastMode } from './autosave.js';
import { resetGameContainer } from './gameUI.js';
import { showMenu } from './menuVisibility.js';
import { showError } from './errorBox.js';
import { versionMap } from './version.js';

const modeMap = {
  // Use absolute paths from the GitHub Pages root (e.g., /naptpwa/scripts/modes/...)
  regular: '/naptpwa/scripts/modes/regular.js',
  wordRelic: '/naptpwa/scripts/modes/wordRelic.js',
  wordSafari: '/naptpwa/scripts/modes/wordSafari.js',
  dice: '/naptpwa/scripts/modes/dice.js',
  atlas: '/naptpwa/scripts/modes/atlas.js',
  versus: '/naptpwa/scripts/modes/versus.js',
  trail: '/naptpwa/scripts/modes/trail.js',
  nearby: '/naptpwa/scripts/modes/nearby.js',
};

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
    document.getElementById('mode-buttons')?.style.setProperty('display', 'none');

    window.__LAST_LOADED_VERSION = `${mode}.js ${versionMap[mode] || 'v?'}`;
  } catch (err) {
    console.error(`Failed to load mode "${mode}"`, err);
    showError(`Failed to load "${mode}" mode. Please try again or reload.`);
  }
}

