// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export default function init({ showMenu }) {
  const gameArea = document.getElementById('game');
  if (!gameArea) return;

  gameArea.innerHTML = `
    <section class="game-section">
      <h2>Regular Mode</h2>
      <form id="regular-form" class="regular-form">
        <label>
          Name: <input type="text" name="name" required />
        </label>
        <label>
          Place: <input type="text" name="place" required />
        </label>
        <label>
          Animal: <input type="text" name="animal" required />
        </label>
        <label>
          Thing: <input type="text" name="thing" required />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button class="back-btn">Back to Menu</button>
      <div id="regular-feedback" class="feedback"></div>
    </section>
  `;

  const form = document.getElementById('regular-form');
  const feedback = document.getElementById('regular-feedback');
  const backBtn = document.querySelector('.back-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const place = formData.get('place').trim();
    const animal = formData.get('animal').trim();
    const thing = formData.get('thing').trim();

    if (name && place && animal && thing) {
      feedback.textContent = `You entered: ${name}, ${place}, ${animal}, ${thing}`;
      feedback.style.color = 'green';
    } else {
      feedback.textContent = 'Please fill in all fields.';
      feedback.style.color = 'red';
    }
  });

  backBtn.addEventListener('click', () => {
    showMenu();
  });

  // Activate game view
  document.querySelector('main')?.classList.remove('active');
  gameArea.classList.add('active');
}

