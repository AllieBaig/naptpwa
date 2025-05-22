// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>🦁 Word Safari</h2>
    <div id="prompt" style="margin-bottom: 1rem;"></div>

    <form id="safari-form" style="display: flex; flex-direction: column; gap: 1rem;">
      <input type="text" id="safari-input" placeholder="Your word..." required />
      <button type="submit">Submit</button>
    </form>

    <div id="safari-feedback" class="feedback"></div>
    <button class="back-btn">◀️ Back to Menu</button>
  `;

  const prompts = [
    'Animal found in Africa',
    'Bird with long migration',
    'Colorful jungle plant',
    'Ocean predator',
    'Desert survivor'
  ];
  let index = 0;

  const promptBox = game.querySelector('#prompt');
  const feedback = game.querySelector('#safari-feedback');

  function showPrompt() {
    promptBox.textContent = `Prompt: ${prompts[index]}`;
    feedback.textContent = '';
  }

  showPrompt();

  game.querySelector('#safari-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = game.querySelector('#safari-input').value.trim();
    if (input) {
      feedback.textContent = `✅ You entered: "${input}"`;
      feedback.style.color = 'green';
      index++;
      if (index < prompts.length) {
        showPrompt();
      } else {
        promptBox.textContent = '🌿 Safari complete!';
      }
    }
  });

  game.querySelector('.back-btn').addEventListener('click', showMenu);

  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

