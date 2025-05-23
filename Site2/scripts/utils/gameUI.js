// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

export function resetGameContainer() {
  const game = document.getElementById('game');
  if (game) {
    game.innerHTML = '';
    game.classList.add('active');
  }

  const menu = document.querySelector('main');
  if (menu) menu.classList.remove('active');
}
