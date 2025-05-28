
// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { applyUserSettings } from './utils/settings.js';
import { injectResetPWA } from './utils/debugTools.js';
import { getLastMode } from './utils/autosave.js';
import { navigateToMode } from './gameNavigation.js';
import './utils/errorHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  applyUserSettings();
  injectResetPWA();

  const shouldResume = localStorage.getItem('napt-resume') === 'true';
  const lastMode = getLastMode();
  if (shouldResume && lastMode) {
    navigateToMode(lastMode);
  }

  // Font selector
  const fontSelector = document.getElementById('fontSelector');
  if (fontSelector) {
    fontSelector.value = localStorage.getItem('napt-font') || '';
    fontSelector.addEventListener('change', () => {
      localStorage.setItem('napt-font', fontSelector.value);
      location.reload();
    });
  }

  // Theme selector
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) {
    themeSelector.value = localStorage.getItem('napt-theme') || 'system';
    themeSelector.addEventListener('change', () => {
      localStorage.setItem('napt-theme', themeSelector.value);
      location.reload();
    });
  }

  // Emoji toggle
  const emojiToggle = document.getElementById('emojiToggle');
  if (emojiToggle) {
    const current = localStorage.getItem('napt-use-emojis');
    emojiToggle.checked = current !== 'false';
    emojiToggle.addEventListener('change', () => {
      localStorage.setItem('napt-use-emojis', emojiToggle.checked ? 'true' : 'false');
      location.reload();
    });
  }

  // High contrast toggle
  const contrastToggle = document.getElementById('highContrastToggle');
  if (contrastToggle) {
    const stored = localStorage.getItem('napt-contrast') === 'true';
    contrastToggle.checked = stored;
    contrastToggle.addEventListener('change', () => {
      localStorage.setItem('napt-contrast', contrastToggle.checked);
      location.reload();
    });
  }

  // Resume toggle
  const resumeToggle = document.getElementById('resumeToggle');
  if (resumeToggle) {
    resumeToggle.checked = localStorage.getItem('napt-resume') === 'true';
    resumeToggle.addEventListener('change', () => {
      localStorage.setItem('napt-resume', resumeToggle.checked);
    });
  }

  // Difficulty selector
  const difficultySelector = document.getElementById('difficultySelector');
  if (difficultySelector) {
    difficultySelector.value = localStorage.getItem('napt-difficulty') || 'easy';
    difficultySelector.addEventListener('change', () => {
      localStorage.setItem('napt-difficulty', difficultySelector.value);
    });
  }

  // Radius selector
  const radiusSelector = document.getElementById('radiusSelector');
  if (radiusSelector) {
    radiusSelector.value = localStorage.getItem('napt-radius-km') || '10';
    radiusSelector.addEventListener('change', () => {
      localStorage.setItem('napt-radius-km', radiusSelector.value);
    });
  }
});

