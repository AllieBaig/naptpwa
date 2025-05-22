// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>🦁 Word Safari</h2>
    <div id="prompt-box" class="feedback" style="margin-bottom: 1rem;"></div>

    <form id="safari-form" class="safari-form" style="display: flex; flex-direction: column; gap: 1rem;">
      <input type="text" id="safari-input" placeholder="Your word..." required />
      <button type="submit">Submit</button>
    </form>

    <div id="safari-feedback" class="feedback" style="margin-top: 0.5rem;"></div>
    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  const prompts = [
    'Animal found in Africa',
    'Bird with long migration',
    'Colorful jungle plant',
    'Ocean predator',
    'Desert survivor'
  ];
  let index = 0;

  const promptBox = document.getElementById('prompt-box');
  const feedback = document.getElementById('safari-feedback');
  const form = document.getElementById('safari-form');

  function showPrompt() {
    promptBox.textContent = `Prompt: ${prompts[index]}`;
    feedback.textContent = '';
  }

  showPrompt();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('safari-input').value.trim();
    if (input) {
      feedback.textContent = `✅ You entered: "${input}"`;
      feedback.style.color = 'green';
      index++;
      if (index < prompts.length) {
        showPrompt();
        document.getElementById('safari-input').value = '';
      } else {
        promptBox.textContent = '🌿 Safari complete!';
        form.style.display = 'none';
      }
    }
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

