
// modeLoader js

import { saveLastMode } from './autosave.js';
import { resetGameContainer } from './gameUI.js';
import { showMenu } from './menuVisibility.js';
import { showError } from './errorBox.js';
import { versionMap } from './version.js';

const modeMap = {
  regular: '/modes/regular.js',
  wordRelic: '/modes/wordRelic.js',
  wordSafari: '../modes/wordSafari.js',
  dice: '../modes/dice.js',
  atlas: '../modes/atlas.js',
  versus: '../modes/versus.js',
  trail: '../modes/trail.js',
  nearby: '../modes/nearby.js',
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

