// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { applyUserSettings } from './utils/settings.js';
import { injectResetPWA } from './utils/debugTools.js';
import { getLastMode } from './utils/autosave.js';
import { navigateToMode } from './gameNavigation.js';
import './utils/errorHandler.js';

const RADIUS_KEY = 'napt-radius-km';

document.addEventListener('DOMContentLoaded', () => {
  applyUserSettings();
  injectResetPWA();

  const shouldResume = localStorage.getItem('napt-resume') === 'true';
  const lastMode = getLastMode();

  if (shouldResume && lastMode) {
    navigateToMode(lastMode);
  }

  // Radius selector support for Nearby Mode
  const radiusSelector = document.getElementById('radiusSelector');
  if (radiusSelector) {
    const saved = localStorage.getItem(RADIUS_KEY);
    if (saved) radiusSelector.value = saved;

    radiusSelector.addEventListener('change', () => {
      localStorage.setItem(RADIUS_KEY, radiusSelector.value);
    });
  }
});

