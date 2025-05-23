// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

export function applyUserSettings() {
  const body = document.body;

  // Font
  const font = localStorage.getItem('napt-font');
  if (font) body.classList.add(`font-${font}`);
  const fontSelector = document.getElementById('fontSelector');
  if (fontSelector) fontSelector.value = font;

  // Theme
  const theme = localStorage.getItem('napt-theme') || 'system';
  applyTheme(theme);
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) themeSelector.value = theme;

  // Contrast
  const contrast = localStorage.getItem('napt-contrast') === 'true';
  if (contrast) body.classList.add('theme-high-contrast');
  const contrastToggle = document.getElementById('highContrastToggle');
  if (contrastToggle) contrastToggle.checked = contrast;

  // Voice
  const voice = localStorage.getItem('napt-voice') === 'true';
  const voiceToggle = document.getElementById('voiceHelpToggle');
  if (voiceToggle) voiceToggle.checked = voice;

  // Resume
  const resume = localStorage.getItem('napt-resume') === 'true';
  const resumeToggle = document.getElementById('resumeToggle');
  if (resumeToggle) resumeToggle.checked = resume;

  // Difficulty
  const difficulty = localStorage.getItem('napt-difficulty') || 'medium';
  const difficultySelector = document.getElementById('difficultySelector');
  if (difficultySelector) difficultySelector.value = difficulty;

  // Bind all changes
  setupListeners();
}

function setupListeners() {
  // Font
  const fontSelector = document.getElementById('fontSelector');
  fontSelector?.addEventListener('change', () => {
    document.body.classList.remove('font-domine', 'font-merriweather', 'font-lora', 'font-tinos');
    const value = fontSelector.value;
    if (value) {
      document.body.classList.add(`font-${value}`);
      localStorage.setItem('napt-font', value);
    } else {
      localStorage.removeItem('napt-font');
    }
  });

  // Theme
  const themeSelector = document.getElementById('themeSelector');
  themeSelector?.addEventListener('change', () => {
    const theme = themeSelector.value;
    applyTheme(theme);
    localStorage.setItem('napt-theme', theme);
  });

  // Contrast
  const contrastToggle = document.getElementById('highContrastToggle');
  contrastToggle?.addEventListener('change', () => {
    document.body.classList.toggle('theme-high-contrast', contrastToggle.checked);
    localStorage.setItem('napt-contrast', contrastToggle.checked);
  });

  // Voice
  const voiceToggle = document.getElementById('voiceHelpToggle');
  voiceToggle?.addEventListener('change', () => {
    localStorage.setItem('napt-voice', voiceToggle.checked);
  });

  // Resume
  const resumeToggle = document.getElementById('resumeToggle');
  resumeToggle?.addEventListener('change', () => {
    localStorage.setItem('napt-resume', resumeToggle.checked);
  });

  // Difficulty
  const difficultySelector = document.getElementById('difficultySelector');
  difficultySelector?.addEventListener('change', () => {
    localStorage.setItem('napt-difficulty', difficultySelector.value);
  });
}

function applyTheme(mode) {
  document.body.classList.remove('theme-light', 'theme-dark');
  if (mode === 'light' || mode === 'dark') {
    document.body.classList.add(`theme-${mode}`);
  }
}

