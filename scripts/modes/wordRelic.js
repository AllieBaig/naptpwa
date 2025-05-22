// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>🏺 Word Relic</h2>
    
    <div id="clue-box" class="clue-list" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
      <!-- Clues will be inserted here -->
    </div>

    <form id="relic-form" style="display: flex; flex-direction: column; gap: 1rem;">
      <input type="text" id="relic-input" placeholder="Enter your answer..." required />
      <button type="submit">Submit</button>
    </form>

    <div id="relic-feedback" class="feedback" style="margin-top: 0.5rem;"></div>
    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  const clues = ['Ancient', 'Valuable', 'Hidden', 'Historical'];
  const correctAnswer = 'relic';

  const clueBox = document.getElementById('clue-box');
  clues.forEach((clue, i) => {
    const p = document.createElement('p');
    p.textContent = `Clue ${i + 1}: ${clue}`;
    clueBox.appendChild(p);
  });

  const form = document.getElementById('relic-form');
  const feedback = document.getElementById('relic-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const guess = document.getElementById('relic-input').value.trim().toLowerCase();
    if (guess === correctAnswer) {
      feedback.textContent = '✅ Correct! You restored the relic!';
      feedback.style.color = 'green';
      form.style.display = 'none';
    } else {
      feedback.textContent = '❌ Try again...';
      feedback.style.color = 'red';
    }
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

