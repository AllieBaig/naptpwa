// MIT License – AllieBaig – https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { showMenu } from './utils/menuVisibility.js';
import { navigateToMode } from './utils/modeLoader.js';
import { bindModeButtons } from './utils/eventBinder.js';
import { versionMap } from './utils/version.js';

document.addEventListener('DOMContentLoaded', () => {
  bindModeButtons(navigateToMode);
  window.__LAST_LOADED_VERSION = `gameNavigation.js ${versionMap.gameNavigation}`;
});

