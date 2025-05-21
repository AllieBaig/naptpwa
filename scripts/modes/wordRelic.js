// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

/**
 * Initializes the Word Relic game mode.
 * This function is called by gameNavigation.js when the Word Relic mode is selected.
 * @param {object} options - Configuration options for initialization.
 * @param {Function} options.showMenu - Callback function to navigate back to the main menu.
 */
export async function init({ showMenu }) {
  const gameContainer = document.getElementById('game');
  if (!gameContainer) {
    console.error('Game container not found. Cannot initialize Word Relic mode.');
    return;
  }

  // 1. Render the initial UI for Word Relic mode
  renderWordRelicUI(gameContainer, showMenu);

  // 2. Set up the core game logic and attach event listeners
  setupWordRelicGame();
}

/**
 * Renders the HTML structure for the Word Relic game mode into the given container.
 * It also handles the visibility of the main menu and game area.
 * @param {HTMLElement} container - The DOM element where the game UI will be rendered.
 * @param {Function} showMenu - The function to call when the 'Back to Menu' button is clicked.
 */
function renderWordRelicUI(container, showMenu) {
  container.innerHTML = `
    <section class="word-relic">
      <h2>Word Relic</h2>
      <p>Guess the 4 related words from clues.</p>
      <div id="relic-clues" class="clue-list"></div>
      <input type="text" id="user-answer" placeholder="Your answer..." autocomplete="off" />
      <button id="submit-answer">Submit</button>
      <div id="relic-feedback" class="feedback"></div>
      <button id="back-btn">Back to Menu</button>
    </section>
  `;

  // Hide the main menu and show the game container
  document.querySelector('main')?.classList.remove('active');
  container.classList.add('active');

  // Attach event listener for the 'Back to Menu' button
  document.getElementById('back-btn')?.addEventListener('click', showMenu);
}

/**
 * Initializes the game logic for Word Relic, including displaying clues and setting up input handling.
 */
function setupWordRelicGame() {
  const clues = ['Shiny', 'Ancient', 'Unearthed', 'Mysterious'];
  const correctAnswer = 'relic'; // The answer for this specific puzzle

  // Get references to DOM elements
  const clueContainer = document.getElementById('relic-clues');
  const userAnswerInput = document.getElementById('user-answer');
  const submitButton = document.getElementById('submit-answer');
  const feedbackElement = document.getElementById('relic-feedback');

  // Basic check to ensure all necessary elements are present
  if (!clueContainer || !userAnswerInput || !submitButton || !feedbackElement) {
    console.error('One or more Word Relic UI elements are missing. Cannot setup game.');
    return;
  }

  // Display clues dynamically
  clues.forEach((clue, index) => {
    const clueEl = document.createElement('p');
    clueEl.textContent = `Clue ${index + 1}: ${clue}`;
    clueContainer.appendChild(clueEl);
  });

  // Attach event listener for the submit button
  submitButton.addEventListener('click', () =>
    handleAnswerSubmission(userAnswerInput, feedbackElement, correctAnswer)
  );

  // Allow submission by pressing 'Enter' key in the input field
  userAnswerInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleAnswerSubmission(userAnswerInput, feedbackElement, correctAnswer);
    }
  });
}

/**
 * Handles the user's answer submission, checks it against the correct answer,
 * and provides visual feedback.
 * @param {HTMLInputElement} userInputField - The input element where the user types their answer.
 * @param {HTMLElement} feedbackElement - The element used to display feedback messages.
 * @param {string} correctAnswer - The correct answer to compare against.
 */
function handleAnswerSubmission(userInputField, feedbackElement, correctAnswer) {
  const userInput = userInputField.value.trim().toLowerCase(); // Normalize input for comparison

  if (userInput === correctAnswer) {
    feedbackElement.textContent = 'Correct! You discovered the relic!';
    feedbackElement.style.color = 'green';
    // Optional: Disable input and button after correct answer or proceed to next puzzle
    userInputField.disabled = true;
    document.getElementById('submit-answer').disabled = true;
  } else {
    feedbackElement.textContent = 'Incorrect. Try again!';
    feedbackElement.style.color = 'red';
    userInputField.value = ''; // Clear input for next attempt
  }
}

