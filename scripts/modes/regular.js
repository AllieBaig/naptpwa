// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>🧠 Solo Mode</h2>
    <p>Enter a Name, Place, Animal, and Thing — no timer, just you vs. the alphabet.</p>

    <form id="solo-form" class="regular-form" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
      <label>Name: <input type="text" name="name" required /></label>
      <label>Place: <input type="text" name="place" required /></label>
      <label>Animal: <input type="text" name="animal" required /></label>
      <label>Thing: <input type="text" name="thing" required /></label>
      <button type="submit">Submit</button>
    </form>

    <div id="solo-feedback" class="feedback" style="margin-top: 0.5rem;"></div>
    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  const form = document.getElementById('solo-form');
  const feedback = document.getElementById('solo-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (Object.values(data).every(v => v.trim())) {
      feedback.textContent = `✅ Nice! You entered: ${data.name}, ${data.place}, ${data.animal}, ${data.thing}`;
      feedback.style.color = 'green';
    } else {
      feedback.textContent = '⚠️ Please fill in all fields.';
      feedback.style.color = 'red';
    }
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

