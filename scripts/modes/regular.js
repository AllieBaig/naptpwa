// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

// Prefix for keys stored in localStorage to distinguish entries for this mode
const STORAGE_PREFIX = 'napt-regular-';

/**
 * Initializes the Regular game mode.
 * This function is called by gameNavigation.js when the Regular mode is selected.
 * @param {object} options - Configuration options for initialization.
 * @param {Function} options.showMenu - Callback function to navigate back to the main menu.
 */
export function init({ showMenu }) {
  const gameContainer = document.getElementById('game');
  if (!gameContainer) {
    console.error('Game container not found. Cannot initialize Regular mode.');
    return;
  }

  // 1. Render the initial UI for Regular mode
  renderRegularUI(gameContainer, showMenu);

  // 2. Set up the game logic and event listeners
  setupRegularGame();
}

/**
 * Renders the HTML structure for the Regular Game mode into the given container.
 * It also handles the visibility of the main menu and game area.
 * @param {HTMLElement} container - The DOM element where the game UI will be rendered.
 * @param {Function} showMenu - The function to call when the 'Back to Menu' button is clicked.
 */
function renderRegularUI(container, showMenu) {
  container.innerHTML = `
    <section class="game-section">
      <h2>📝 Regular Mode</h2>
      <form id="regular-form" class="regular-form">
        <label>🙋 Name: <input type="text" name="name" required autocomplete="name" /></label>
        <label>🗺️ Place: <input type="text" name="place" required autocomplete="off" /></label>
        <label>🐾 Animal: <input type="text" name="animal" required autocomplete="off" /></label>
        <label>🎒 Thing: <input type="text" name="thing" required autocomplete="off" /></label>
        <button type="submit">✅ Submit</button>
      </form>
      <button class="back-btn">🔙 Back to Menu</button>
      <div id="regular-feedback" class="feedback"></div>

      <details class="history-log">
        <summary>📅 View Past Entries</summary>
        <ul id="history-list"></ul>
      </details>
      <div id="streak-info" class="streak-info"></div>
    </section>
  `;

  // Hide the main menu and show the game container
  document.querySelector('main')?.classList.remove('active');
  container.classList.add('active');

  // Attach event listener for the 'Back to Menu' button
  document.getElementById('back-btn')?.addEventListener('click', showMenu);
}

/**
 * Sets up the core game logic for Regular mode, including form submission and history/streak display updates.
 */
function setupRegularGame() {
  const form = document.getElementById('regular-form');
  const feedbackDiv = document.getElementById('regular-feedback');

  if (!form || !feedbackDiv) {
    console.error('Required Regular mode UI elements (form or feedback div) not found.');
    return;
  }

  // Initial display of history and streak on game load
  displayHistory();
  displayStreak();

  // Attach event listener for the form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default browser form submission

    const todayDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const todayKey = `${STORAGE_PREFIX}${todayDate}`;

    // Check if an entry for today already exists
    if (localStorage.getItem(todayKey)) {
      feedbackDiv.textContent = 'You have already submitted an entry for today! Come back tomorrow.';
      feedbackDiv.style.color = 'orange';
      return;
    }

    // Gather form data
    const formData = new FormData(form);
    const entry = {
      date: todayDate,
      name: formData.get('name'),
      place: formData.get('place'),
      animal: formData.get('animal'),
      thing: formData.get('thing'),
    };

    // Attempt to save the entry to localStorage
    try {
      localStorage.setItem(todayKey, JSON.stringify(entry));
      feedbackDiv.textContent = 'Entry saved! Great job!';
      feedbackDiv.style.color = 'green';
      form.reset(); // Clear form fields after successful submission
      displayHistory(); // Update history display
      displayStreak(); // Update streak display
    } catch (e) {
      feedbackDiv.textContent = 'Error saving entry. Storage might be full or disabled.';
      feedbackDiv.style.color = 'red';
      console.error('Local storage error in regular.js:', e);
    }
  });
}

/**
 * Retrieves all saved daily entries from local storage for the Regular mode.
 * Entries are sorted by date (key).
 * @returns {Array<Object>} An array of entry objects.
 */
function getSavedEntries() {
  const keys = Object.keys(localStorage)
    .filter(k => k.startsWith(STORAGE_PREFIX))
    .sort(); // Sort keys (which are dates) to process in chronological order

  const entries = [];
  for (const key of keys) {
    try {
      const entry = JSON.parse(localStorage.getItem(key));
      if (entry) { // Ensure entry is not null/undefined
        entries.push(entry);
      }
    } catch (e) {
      console.warn(`Error parsing localStorage key "${key}":`, e);
    }
  }
  return entries;
}

/**
 * Displays the history of past entries in the dedicated UI list.
 */
function displayHistory() {
  const list = document.getElementById('history-list');
  if (!list) {
    console.warn('History list element (#history-list) not found.');
    return;
  }

  list.innerHTML = ''; // Clear existing history entries

  const entries = getSavedEntries().reverse(); // Get all entries and display most recent first

  if (entries.length === 0) {
    list.innerHTML = '<li>No entries yet. Submit your first one!</li>';
    return;
  }

  for (const entry of entries) {
    const li = document.createElement('li');
    li.textContent = `📆 ${entry.date}: ${entry.name}, ${entry.place}, ${entry.animal}, ${entry.thing}`;
    list.appendChild(li);
  }
}

/**
 * Calculates and displays the current daily submission streak based on stored entries.
 * A streak is consecutive daily submissions ending on the most recent submission,
 * or today if today's entry is present.
 */
function displayStreak() {
  const info = document.getElementById('streak-info');
  if (!info) {
    console.warn('Streak info element (#streak-info) not found.');
    return;
  }

  const savedDates = getSavedEntries().map(entry => entry.date); // Get only the date strings
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Normalize to the start of today for consistent date comparison

  // Iterate backwards from today to find consecutive days
  for (let i = 0; i < 366; i++) { // Check up to a year back to cover long streaks
    const isoDate = currentDate.toISOString().slice(0, 10);

    if (savedDates.includes(isoDate)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
    } else {
      // If the current date being checked is missing an entry:
      // If it's today's date (i.e., i === 0) and it's missing, the streak ends today (or is 0).
      // If it's an earlier date and missing, the streak is broken at that point.
      if (i === 0 && !savedDates.includes(new Date().toISOString().slice(0, 10))) {
        // If today's entry is explicitly missing, the current streak is 0.
        // This handles cases where the last entry was yesterday or earlier, and today's is skipped.
        streak = 0;
      }
      break; // Streak is broken
    }
  }

  // Determine achievement badges based on streak length
  let badge = '';
  if (streak >= 30) {
    badge = '🔥 Super Streak (30+ Days)!';
  } else if (streak >= 7) {
    badge = '🌟 Weekly Warrior (7+ Days)!';
  } else if (streak >= 3) {
    badge = '✨ On a Roll (3+ Days)!';
  }

  // Update the streak info display
  info.innerHTML = `
    <strong>Current Streak:</strong> ${streak} Days ${badge ? `<br/>${badge}` : ''}
  `;
}

