export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>📝 Regular Mode</h2>
    <form id="regular-form" class="regular-form">
      <label>Name: <input type="text" name="name" required /></label>
      <label>Place: <input type="text" name="place" required /></label>
      <label>Animal: <input type="text" name="animal" required /></label>
      <label>Thing: <input type="text" name="thing" required /></label>
      <button type="submit">Submit</button>
    </form>
    <button class="back-btn">◀️ Back to Menu</button>
    <div id="regular-feedback" class="feedback"></div>
  `;

  const form = game.querySelector('#regular-form');
  const feedback = game.querySelector('#regular-feedback');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (Object.values(data).every(v => v.trim())) {
      feedback.textContent = `✅ Saved: ${data.name}, ${data.place}, ${data.animal}, ${data.thing}`;
      feedback.style.color = 'green';
    } else {
      feedback.textContent = '⚠️ Please fill in all fields.';
      feedback.style.color = 'red';
    }
  });

  game.querySelector('.back-btn').addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

