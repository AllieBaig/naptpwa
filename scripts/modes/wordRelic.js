// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export default async function init({ showMenu }) {
  // <----------------- before this line - Initialize Word Relic mode UI
  const gameContainer = document.getElementById('game');
  gameContainer.innerHTML = `
    <section class="word-relic">
      <h2>Word Relic</h2>
      <p>Guess the 4 related words from clues.</p>
      <div id="relic-clues" class="clue-list"></div>
      <input type="text" id="user-answer" placeholder="Your answer..." />
      <button id="submit-answer">Submit</button>
      <div id="relic-feedback"></div>
      <button id="back-btn">Back to Menu</button>
    </section>
  `;

  document.getElementById('menu').classList.remove('active');
  gameContainer.classList.add('active');

  // <----------------- before this line - Game logic and mock data
  const clues = ['Shiny', 'Ancient', 'Unearthed', 'Mysterious'];
  const correctAnswer = 'relic';
  const clueContainer = document.getElementById('relic-clues');

  clues.forEach((clue, index) => {
    const clueEl = document.createElement('p');
    clueEl.textContent = `Clue ${index + 1}: ${clue}`;
    clueContainer.appendChild(clueEl);
  });

  // <----------------- before this line - Event handling
  document.getElementById('submit-answer').addEventListener('click', () => {
    const userInput = document.getElementById('user-answer').value.trim().toLowerCase();
    const feedback = document.getElementById('relic-feedback');
    if (userInput === correctAnswer) {
      feedback.textContent = 'Correct! You discovered the relic!';
      feedback.style.color = 'green';
    } else {
      feedback.textContent = 'Incorrect. Try again!';
      feedback.style.color = 'red';
    }
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    showMenu();
  });
}

