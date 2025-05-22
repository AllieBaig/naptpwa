

// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  const letter = rollLetter();
  const computerAnswers = getComputerAnswers(letter);

  game.innerHTML = `
    <h2>🤖 Play vs Computer</h2>
    <p>Letter: <strong>${letter}</strong> — fill in each field before the computer wins!</p>

    <form id="versus-form" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
      <label>Name: <input type="text" name="name" required /></label>
      <label>Place: <input type="text" name="place" required /></label>
      <label>Animal: <input type="text" name="animal" required /></label>
      <label>Thing: <input type="text" name="thing" required /></label>
      <button type="submit">Submit</button>
    </form>

    <div id="versus-results" class="feedback" style="margin-top: 1rem;"></div>
    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  const form = document.getElementById('versus-form');
  const results = document.getElementById('versus-results');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userData = Object.fromEntries(new FormData(form));
    const playerValid = validate(userData, letter);
    const computerValid = validate(computerAnswers, letter);

    const scoreMsg = `
      <strong>Your Answers:</strong> ${playerValid.count}/4 valid<br/>
      <strong>Computer:</strong> ${computerValid.count}/4 valid<br/><br/>
      ${playerValid.count > computerValid.count ? '✅ You win!' :
        playerValid.count < computerValid.count ? '🤖 Computer wins!' : '⚖️ It\'s a tie!'}
    `;

    results.innerHTML = scoreMsg;
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

function rollLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function getComputerAnswers(letter) {
  const sample = word => `${letter}${word.slice(1)}`; // fake logic
  return {
    name: sample('athan'),
    place: sample('land'),
    animal: sample('ntelope'),
    thing: sample('able')
  };
}

function validate(answers, letter) {
  let count = 0;
  for (let key in answers) {
    if (answers[key].trim().toLowerCase().startsWith(letter.toLowerCase())) {
      count++;
    }
  }
  return { count };
}

