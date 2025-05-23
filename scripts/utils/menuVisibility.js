

export function showMenu() {
  const menu = document.querySelector('main');
  const game = document.getElementById('game');
  const settings = document.getElementById('settings-panel');
  const errorLink = document.getElementById('error-viewer-link');
  const modeButtons = document.getElementById('mode-buttons');

  menu?.classList.add('active');
  game?.classList.remove('active');
  game.innerHTML = '';

  settings?.style.setProperty('display', '');
  errorLink?.style.setProperty('display', 'block');
  modeButtons?.style.setProperty('display', 'flex');

  document.getElementById('mode-error-box')?.remove();
  window.__LAST_LOADED_VERSION = 'mainMenu';
}

