// MIT License – AllieBaig – https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

const FONT_SCALE_KEY = 'napt-font-scale';

export function getFontScale() {
  return parseFloat(localStorage.getItem(FONT_SCALE_KEY)) || 1;
}

export function setFontScale(value) {
  const scale = Math.max(0.8, Math.min(2, value)); // limit 80%–200%
  localStorage.setItem(FONT_SCALE_KEY, scale);
  document.documentElement.style.setProperty('--font-scale', scale);
}

export function injectFontControls(targetEl = document.body) {
  const wrapper = document.createElement('div');
  wrapper.className = 'font-controls';
  wrapper.innerHTML = `
    <button id="fontMinus" aria-label="Decrease font size">➖</button>
    <button id="fontPlus" aria-label="Increase font size">➕</button>
  `;
  targetEl.appendChild(wrapper);

  document.getElementById('fontMinus')?.addEventListener('click', () => {
    const scale = getFontScale() - 0.1;
    setFontScale(scale);
  });
  document.getElementById('fontPlus')?.addEventListener('click', () => {
    const scale = getFontScale() + 0.1;
    setFontScale(scale);
  });
}

