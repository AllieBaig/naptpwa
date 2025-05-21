// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export default async function init({ showMenu }) {
  const container = document.getElementById('game');
  container.classList.add('active');
  container.innerHTML = `
    <button id="backBtn">Back to Menu</button>
    <h2>Word Safari</h2>
    <div id="promptContainer"></div>
    <input type="text" id="userInput" placeholder="Enter your word" />
    <button id="submitBtn">Submit</button>
    <div id="result"></div>
  `;

  document.getElementById('backBtn').addEventListener('click', showMenu);
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);

  const prompts = [
    'Animal found in Africa',
    'Plant with medicinal value',
    'Bird that migrates long distances',
    'Insect with wings',
    'Aquatic mammal',
  ];

  let currentPromptIndex = 0;

  function displayPrompt() {
    document.getElementById('promptContainer').textContent = prompts[currentPromptIndex];
    document.getElementById('userInput').value = '';
    document.getElementById('result').textContent = '';
  }

  function handleSubmit() {
    const input = document.getElementById('userInput').value.trim();
    const resultDiv = document.getElementById('result');

    if (!input) {
      resultDiv.textContent = 'Please enter a word.';
      return;
    }

    // Placeholder for actual validation logic
    resultDiv.textContent = `You entered: "${input}"`;

    currentPromptIndex++;
    if (currentPromptIndex < prompts.length) {
      displayPrompt();
    } else {
      resultDiv.textContent += ' | Safari complete!';
      document.getElementById('submitBtn').disabled = true;
    }
  }

  displayPrompt();
}

