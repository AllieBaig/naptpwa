import { navigateToMode, showMenu } from './gameNavigation.js';

document.querySelectorAll('#menu button').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    navigateToMode(mode);
  });
});
