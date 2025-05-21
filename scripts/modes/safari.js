// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

/**
 * Initializes the Word Safari game mode.
 * This function is called by gameNavigation.js when the Word Safari mode is selected.
 * @param {object} options - Configuration options for initialization.
 * @param {Function} options.showMenu - Callback function to navigate back to the main menu.
 */
export async function init({ showMenu }) {
  const gameContainer = document.getElementById('game');
  if (!gameContainer) {
    console.error('Game container not found. Cannot initialize Word Safari mode.');
    return;
  }

  // 1. Render the initial UI for Word Safari mode
  renderSafariUI(gameContainer, showMenu);

  // 2. Set up the core game logic and attach event listeners
  setupSafariGame();
}

/**
 * Renders the HTML structure for the Word Safari game mode into the given container.
 * It also handles the visibility of the main menu and game area.
 * @param {HTMLElement} container - The DOM element where the game UI will be rendered.
 * @param {Function} showMenu - The function to call when the 'Back to Menu' button is clicked.
 */
function renderSafariUI(container, showMenu) {
  container.innerHTML = `
    <section class="word-safari">
      <button id="backBtn">Back to Menu</button>
      <h2>Word Safari</h2>
      <div id="promptContainer" class="prompt-display"></div>
      <input type="text" id="userInput" placeholder="Enter your word" autocomplete="off" />
      <button id="submitBtn">Submit</button>
      <div id="result" class="feedback"></div>
    </section>
  `;

  // Hide the main menu and show the game container
  document.querySelector('main')?.classList.remove('active');
  container.classList.add('active');

  // Attach event listener for the 'Back to Menu' button
  document.getElementById('backBtn')?.addEventListener('click', showMenu);
}

/**
 * Sets up the core game logic for Word Safari, including managing prompts and handling submissions.
 */
function setupSafariGame() {
  const prompts = [
    'Animal found in Africa',
    'Plant with medicinal value',
    'Bird that migrates long distances',
    'Insect with wings',
    'Aquatic mammal',
  ];
  let currentPromptIndex = 0; // Game state: tracks the current prompt being displayed

  // Get references to DOM elements
  const promptContainer = document.getElementById('promptContainer');
  const userInput = document.getElementById('userInput');
  const submitBtn = document.getElementById('submitBtn');
  const resultDiv = document.getElementById('result');

  // Basic check to ensure all necessary elements are present
  if (!promptContainer || !userInput || !submitBtn || !resultDiv) {
    console.error('One or more Word Safari UI elements are missing. Cannot setup game.');
    return;
  }

  /**
   * Displays the current prompt and clears input/result areas.
   */
  function displayPrompt() {
    promptContainer.textContent = prompts[currentPromptIndex];
    userInput.value = ''; // Clear previous user input
    resultDiv.textContent = ''; // Clear previous feedback
    userInput.focus(); // Automatically focus on the input field for user convenience
  }

  /**
   * Handles the user's word submission.
   */
  function handleSubmit() {
    const input = userInput.value.trim();

    if (!input) {
      resultDiv.textContent = 'Please enter a word.';
      resultDiv.style.color = 'orange'; // Indicate a warning
      return;
    }

    // --- Placeholder for actual validation logic ---
    // In a real Word Safari game, you would implement logic here to:
    // 1. Validate if the 'input' is a valid word for the 'prompts[currentPromptIndex]'.
    //    For example, if the prompt is "Animal found in Africa", valid inputs might be "lion", "elephant", etc.
    // 2. Provide specific feedback (e.g., "Correct!", "Not an animal", "Not found in Africa").
    resultDiv.textContent = `You entered: "${input}"`;
    resultDiv.style.color = 'darkblue'; // Default feedback color

    currentPromptIndex++; // Move to the next prompt
    if (currentPromptIndex < prompts.length) {
      // If there are more prompts, display the next one after a short delay
      setTimeout(displayPrompt, 1000);
    } else {
      // If all prompts are completed
      resultDiv.textContent += ' | Safari complete! Well done!';
      resultDiv.style.color = 'green';
      submitBtn.disabled = true; // Disable the submit button
      userInput.disabled = true; // Disable the input field
    }
  }

  // Attach event listeners to the submit button and input field
  submitBtn.addEventListener('click', handleSubmit);
  userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSubmit(); // Trigger submission on Enter key press
    }
  });

  // Initial display of the first prompt when the game starts
  displayPrompt();
}

