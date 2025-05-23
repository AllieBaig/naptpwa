// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const letter = rollLetter();
  let timerInterval = null;
  let secondsLeft = 60;

  game.innerHTML = `
    <h2>🎲 Dice Challenge</h2>
    <p id="rolled-letter" style="font-size: 2rem;">You rolled: <strong>${letter}</strong></p>
    <p id="timer" class="feedback">⏳ Time Left: <strong>60s</strong></p>

    <form id="dice-form" class="dice-form" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
      <label>Name: <input type="text" name="name" required /></label>
      <label>Place: <input type="text" name="place" required /></label>
      <label>Animal: <input type="text" name="animal" required /></label>
      <label>Thing: <input type="text" name="thing" required /></label>
      <button type="submit">Submit</button>
    </form>

    <div id="dice-feedback" class="feedback" style="margin-top: 0.5rem;"></div>
    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  const form = document.getElementById('dice-form');
  const feedback = document.getElementById('dice-feedback');
  const timerDisplay = document.getElementById('timer');

  startTimer();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    stopTimer();

    const data = Object.fromEntries(new FormData(form));
    const missed = Object.entries(data).filter(([k, v]) => !v.trim().toLowerCase().startsWith(letter.toLowerCase()));

    if (missed.length > 0) {
      feedback.textContent = `❌ Incorrect. These didn’t start with "${letter}": ${missed.map(([k]) => k).join(', ')}`;
      feedback.style.color = 'red';
    } else {
      feedback.textContent = `✅ All correct! Great job!`;
      feedback.style.color = 'green';
    }
  });

  function startTimer() {
    timerInterval = setInterval(() => {
      secondsLeft--;
      timerDisplay.innerHTML = `⏳ Time Left: <strong>${secondsLeft}s</strong>`;
      if (secondsLeft <= 0) {
        stopTimer();
        form.querySelector('button[type="submit"]').click(); // auto-submit
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  document.querySelector('.back-btn')?.addEventListener('click', () => {
    stopTimer();
    showMenu();
  });

  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

function rollLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

