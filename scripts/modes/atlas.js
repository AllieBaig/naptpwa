// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

const REGION_LIST = ['Africa', 'Asia', 'Europe', 'Americas', 'Oceania'];
const REGION_EMOJIS = {
  Africa: '🦁',
  Asia: '🐉',
  Europe: '🏰',
  Americas: '🦅',
  Oceania: '🦘',
};

// Local Storage Keys for Word Atlas data
const ATLAS_PROGRESS_KEY = 'wordAtlasProgress';
const ATLAS_LAST_DATE_KEY = 'wordAtlasLastDate';
const ATLAS_STREAK_KEY = 'wordAtlasStreak';

/**
 * Initializes the Word Atlas game mode.
 * This function is the entry point called by gameNavigation.js.
 * @param {object} options - Configuration options for initialization.
 * @param {Function} options.showMenu - Callback function to navigate back to the main menu.
 */
export function init({ showMenu }) {
  const gameContainer = document.getElementById('game');
  if (!gameContainer) {
    console.error('Game container not found. Cannot initialize Word Atlas mode.');
    return;
  }

  // 1. Render the initial UI for the Word Atlas game mode
  renderAtlasUI(gameContainer);

  // 2. Set up the core game logic and attach event listeners
  setupAtlasGame(showMenu);
}

/**
 * Renders the HTML structure for the Word Atlas game mode into the given container.
 * It also handles the visibility of the main menu and the game area.
 * @param {HTMLElement} container - The DOM element where the game UI will be rendered.
 */
function renderAtlasUI(container) {
  container.innerHTML = `
    <section class="word-atlas-section" style="padding: 1rem; text-align: center;">
      <h2>🗺️ Word Atlas</h2>
      <p>Explore regions and earn word badges!</p>

      <div class="region-buttons" style="margin: 1rem 0;">
        ${REGION_LIST.map(region => `
          <button class="region-btn" data-region="${region}" style="margin: 0.3rem; padding: 0.6rem 1rem;">
            Explore ${region}
          </button>`).join('')}
      </div>

      <div class="badges-display" style="margin-top: 1.5rem;">
        <strong>🏆 Your Badges:</strong><br />
        <div id="atlas-progress-display" style="margin-top: 0.5rem;"></div>
      </div>

      <div class="streak-display" style="margin-top: 1rem;">
        <strong>⏳ Current Streak:</strong><br />
        <div id="atlas-streak-text" style="font-size: 1.2rem;"></div>
      </div>

      <div class="share-section" style="margin-top: 2rem;">
        <button id="share-level-btn">📣 Share My Level</button>
      </div>

      <button id="atlas-back-btn" style="margin-top: 2rem;">◀️ Back to Menu</button>
    </section>
  `;

  // Hide the main menu and show the game container
  document.querySelector('main')?.classList.remove('active');
  container.classList.add('active');

  // Perform initial update of dynamic UI elements
  updateAtlasUI();
}

/**
 * Sets up the core game logic for Word Atlas, including attaching all necessary event listeners.
 * @param {Function} showMenu - The function to call when the "Back to Menu" button is clicked.
 */
function setupAtlasGame(showMenu) {
  // Attach event listeners to all region exploration buttons
  document.querySelectorAll('.region-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const region = event.target.dataset.region; // Get the region name from the button's data attribute
      if (region) {
        saveProgress(region); // Save the explored region
        updateAtlasUI(); // Refresh the UI to show new badges and streak
        alert(`You explored ${region}! Great job!`); // Provide immediate feedback to the user
      }
    });
  });

  // Attach event listener for the "Share My Level" button
  document.getElementById('share-level-btn')?.addEventListener('click', handleShareLevel);

  // Attach event listener for the "Back to Menu" button
  document.getElementById('atlas-back-btn')?.addEventListener('click', showMenu);
}

/**
 * Updates all dynamic UI elements of the Word Atlas mode, such as progress badges and streak text.
 */
function updateAtlasUI() {
  const progressDisplay = document.getElementById('atlas-progress-display');
  if (progressDisplay) {
    progressDisplay.innerHTML = renderProgress(); // Update the badges display
  }

  const streakTextDisplay = document.getElementById('atlas-streak-text');
  if (streakTextDisplay) {
    streakTextDisplay.textContent = getStreakText(); // Update the streak text
  }
}

/**
 * Retrieves the current progress of explored regions from local storage.
 * @returns {Array<string>} An array of region names that have been explored.
 */
function getProgress() {
  try {
    const stored = localStorage.getItem(ATLAS_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Error parsing Word Atlas progress from localStorage:', e);
    return []; // Return an empty array on error to prevent breaking the app
  }
}

/**
 * Saves a newly explored region to local storage and triggers a streak update.
 * A region is only saved if it hasn't been explored before.
 * @param {string} region - The name of the region to save.
 */
function saveProgress(region) {
  const progress = getProgress();
  if (!progress.includes(region)) { // Only add if not already present
    progress.push(region);
    localStorage.setItem(ATLAS_PROGRESS_KEY, JSON.stringify(progress));
    updateDailyStreak(); // Update the daily streak when new progress is made
  }
}

/**
 * Generates the HTML string for displaying the earned region badges.
 * Displays an emoji for explored regions and a placeholder for unexplored ones.
 * @returns {string} HTML string of region emojis or placeholders.
 */
function renderProgress() {
  const progress = getProgress();
  if (progress.length === 0) {
    return 'No regions explored yet. Start exploring!';
  }
  return REGION_LIST.map(region => {
    const emoji = REGION_EMOJIS[region] || '🗺️'; // Default emoji if not found
    const earned = progress.includes(region);
    // Display earned emoji clearly, and unexplored with lower opacity
    return `<span title="${region}" style="font-size: 1.5rem; margin: 0 0.3rem; opacity: ${earned ? '1' : '0.5'};">${earned ? emoji : '⬜️'}</span>`;
  }).join('');
}

// -------- Daily Streak Tracking for Atlas Mode --------
/**
 * Updates the daily streak for Word Atlas mode.
 * The streak counts consecutive days a user has explored at least one region.
 */
function updateDailyStreak() {
  const today = new Date().toDateString(); // e.g., "Wed May 21 2025"
  const lastDate = localStorage.getItem(ATLAS_LAST_DATE_KEY);
  let currentStreak = parseInt(localStorage.getItem(ATLAS_STREAK_KEY) || '0', 10);

  if (lastDate === today) {
    // If progress was already made today, the streak doesn't change
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toDateString();

  if (lastDate === yesterdayString) {
    // If the last activity was yesterday, the streak continues
    currentStreak += 1;
  } else {
    // If the last activity was not yesterday (or never), the streak resets or starts
    currentStreak = 1;
  }

  localStorage.setItem(ATLAS_STREAK_KEY, currentStreak.toString());
  localStorage.setItem(ATLAS_LAST_DATE_KEY, today); // Record today's date as the last active date
}

/**
 * Retrieves the current daily streak count for Word Atlas mode.
 * @returns {number} The current streak count.
 */
function getStreak() {
  return parseInt(localStorage.getItem(ATLAS_STREAK_KEY) || '0', 10);
}

/**
 * Generates the display text for the current daily streak.
 * @returns {string} A descriptive string about the current streak.
 */
function getStreakText() {
  const streak = getStreak();
  if (streak === 0) return 'No streak yet. Explore a region to start!';
  return `${streak} consecutive days explored!`; // Clarified: This reflects daily engagement.
}

/**
 * Generates the shareable text containing the user's Word Atlas exploration level.
 * This text can be used with the Web Share API.
 * @returns {string} The text message to be shared.
 */
function getShareBadge() {
  const regions = getProgress().length;
  let levelEmoji = '👶'; // Default emoji for new explorers
  if (regions >= 5) levelEmoji = '👑'; // All regions explored
  else if (regions >= 3) levelEmoji = '🌟'; // 3 or more regions explored
  return `${levelEmoji} Word Atlas Explorer - ${regions}/5 regions explored!`;
}

/**
 * Handles the click event for the Share My Level button.
 * Utilizes the Web Share API if available, otherwise provides an alert fallback.
 */
function handleShareLevel() {
  const shareText = getShareBadge();
  if (navigator.share) {
    // Use Web Share API for native sharing experience
    navigator.share({
        title: 'My Word Atlas Progress',
        text: shareText,
        url: window.location.href // Share the current PWA URL
      })
      .catch((error) => console.error('Error sharing Word Atlas progress:', error));
  } else {
    // Fallback for browsers that do not support Web Share API
    alert(`Share your Word Atlas progress: ${shareText}\n\n(Web Share API not supported in this browser)`);
  }
}
