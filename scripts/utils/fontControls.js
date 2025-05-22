

// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

const FONT_SIZE_KEY = 'napt-fontSize';

export function applyFontControls(container, key = '#game') {
  const target = document.querySelector(key);
  if (!target || !container) return;

  const storedSize = parseInt(localStorage.getItem(FONT_SIZE_KEY)) || 100;
  target.style.fontSize = `${storedSize}%`;

  const smaller = container.querySelector('#fontSmaller');
  const larger = container.querySelector('#fontLarger');

  smaller?.addEventListener('click', () => adjustFont(-10, target));
  larger?.addEventListener('click', () => adjustFont(10, target));
}

function adjustFont(delta, target) {
  const currentSize = parseInt(target.style.fontSize) || 100;
  let newSize = currentSize + delta;
  newSize = Math.max(60, Math.min(newSize, 200)); // clamp 60–200%

  target.style.fontSize = `${newSize}%`;
  localStorage.setItem(FONT_SIZE_KEY, newSize);
}

