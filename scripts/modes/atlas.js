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

function getProgress() {
  const stored = localStorage.getItem('wordAtlasProgress');
  return stored ? JSON.parse(stored) : [];
}

function saveProgress(region) {
  const progress = getProgress();
  if (!progress.includes(region)) {
    progress.push(region);
    localStorage.setItem('wordAtlasProgress', JSON.stringify(progress));
    updateStreak(); // update on progress
  }
}

function renderProgress() {
  const progress = getProgress();
  return REGION_LIST.map(region => {
    const emoji = REGION_EMOJIS[region] || '🗺️';
    const earned = progress.includes(region);
    return `<span title="${region}" style="font-size: 1.5rem; margin: 0 0.3rem;">${earned ? emoji : '⬜️'}</span>`;
  }).join('');
}

// -------- Weekly Streak Tracking --------
function updateStreak() {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem('wordAtlasLastDate');
  const currentStreak = parseInt(localStorage.getItem('wordAtlasStreak') || '0');

  if (lastDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = (lastDate === yesterday) ? currentStreak + 1 : 1;
    localStorage.setItem('wordAtlasStreak', newStreak.toString());
    localStorage.setItem('wordAtlasLastDate', today);
  }
}

function getStreakEmoji(streak) {
  if (streak >= 10) return '🔥🔥🔥';
  if (streak >= 7) return '🔥🔥';
  if (streak >= 3) return '🔥';
  return '✨';
}

function getStreakText() {
  const streak = parseInt(localStorage.getItem('wordAtlasStreak') || '0');
  const emoji = getStreakEmoji(streak);
  return `${emoji} ${streak} day${streak === 1 ? '' : 's'} streak`;
}

// -------- Shareable Badge Generator --------
function getShareBadge() {
  const regions = getProgress().length;
  const levelEmoji = ['🥚', '🐣', '🐥', '🦅', '🦄', '🌍'][Math.min(regions, 5)];
  return `${levelEmoji} Word Atlas Explorer - ${regions}/5 regions explored!`;
}

export function init({ showMenu }) {
  const gameArea = document.getElementById('game');
  if (!gameArea) return;

  updateStreak(); // always check on load

  gameArea.innerHTML = `
    <section style="padding: 1rem; text-align: center;">
      <h2>🗺️ Word Atlas</h2>
      <p>Explore regions and earn word badges!</p>

      <div style="margin: 1rem 0;">
        ${REGION_LIST.map(region => `
          <button style="margin: 0.3rem; padding: 0.6rem 1rem;" onclick="handleRegion('${region}')">
            Explore ${region}
          </button>`).join('')}
      </div>

      <div style="margin-top: 1.5rem;">
        <strong>🏆 Your Badges:</strong><br />
        <div style="margin-top: 0.5rem;">${renderProgress()}</div>
      </div>

      <div style="margin-top: 1rem;">
        <strong>⏳ Weekly Streak:</strong><br />
        <div style="font-size: 1.2rem;">${getStreakText()}</div>
      </div>

      <div style="margin-top: 2rem;">
        <button onclick="navigator.share ? navigator.share({ text: '${getShareBadge()}' }) : alert('Share not supported')">
          📣 Share My Level
        </button>
      </div>

      <button onclick="history.back()" style="margin-top: 2rem;">◀️ Back to Menu</button>
    </section>
  `;

  // Attach handler
  window.handleRegion = (region) => {
    alert(`You explored ${region} and earned a badge!`);
    saveProgress(region);
    init({ showMenu }); // refresh
  };
}

