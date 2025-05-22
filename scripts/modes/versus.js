// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.floor(Math.random() * letters.length)];

  game.innerHTML = `
    <h2>🤖 Versus Mode</h2>
    <p>Enter answers starting with: <strong>${letter}</strong></p>
    <form id="versus-form">
      <label>Name: <input type="text" name="name" required /></label>
      <label>Place: <input type="text" name="place" required /></label>
      <label>Animal: <input type="text" name="animal" required /></label>
      <label>Thing: <input type="text" name="thing" required /></label>
      <button type="submit">Submit</button>
    </form>
    <div id="versus-feedback" class="feedback"></div>
    <button class="back-btn">◀ Back to Menu</button>
  `;

  const form = document.getElementById('versus-form');
  const feedback = document.getElementById('versus-feedback');

  form.onsubmit = e => {
    e.preventDefault();
    const formData = new FormData(form);
    const values = Object.values(Object.fromEntries(formData));
    const valid = values.every(val => val.trim().toUpperCase().startsWith(letter));

    if (valid) {
      feedback.textContent = `✅ All answers start with ${letter}! You win!`;
      feedback.style.color = 'green';
    } else {
      feedback.textContent = `❌ One or more answers do not start with ${letter}.`;
      feedback.style.color = 'red';
    }
  };

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

