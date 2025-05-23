

export function bindModeButtons(navigateToMode) {
  const buttons = document.querySelectorAll('.menu-btn');

  const gameContainer = document.getElementById('game') || document.createElement('div');
  if (!gameContainer.id) {
    gameContainer.id = 'game';
    gameContainer.classList.add('game-container');
    document.body.appendChild(gameContainer);
  }

  const errorLink = document.createElement('div');
  errorLink.id = 'error-viewer-link';
  errorLink.style = 'text-align:center; margin-top:1rem;';
  errorLink.innerHTML = `<a href="./scripts/utils/error-log.html" target="_blank" style="font-size: 0.9rem;">🐞 View Error Log</a>`;
  document.body.appendChild(errorLink);

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const mode = button.getAttribute('data-mode');
      navigateToMode(mode);
    });
  });
}

