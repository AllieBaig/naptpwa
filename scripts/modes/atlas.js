// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

const REGIONS = ['Africa', 'Asia', 'Europe', 'Americas', 'Oceania'];
const EMOJIS = { Africa: '🦁', Asia: '🐉', Europe: '🏰', Americas: '🦅', Oceania: '🦘' };

export function init({ showMenu }) {
  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `
    <h2>🗺️ Word Atlas</h2>
    <div class="region-grid" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
      ${REGIONS.map(r => `
        <button onclick="handleRegion('${r}')" style="padding: 0.8rem 1rem;">Explore ${r}</button>
      `).join('')}
    </div>

    <div id="atlas-progress" style="margin-top: 1rem; font-size: 1.2rem;"></div>
    <div id="streak-display" style="margin: 1rem 0;"></div>
    <button onclick="navigator.share ? navigator.share({ text: getShareBadge() }) : alert('Copy & share manually')" style="margin-bottom: 2rem;">
      📣 Share My Badge
    </button>

    <button class="back-btn">◀️ Back to Menu</button>
  `;

  window.handleRegion = (region) => {
    const log = getProgress();
    if (!log.includes(region)) {
      log.push(region);
      localStorage.setItem('wordAtlasProgress', JSON.stringify(log));
    }
    localStorage.setItem('wordAtlasLastDate', new Date().toDateString());
    localStorage.setItem('wordAtlasStreak', (getStreak() + 1).toString());
    init({ showMenu });
  };

  updateProgress();
  document.querySelector('.back-btn').addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

function getProgress() {
  return JSON.parse(localStorage.getItem('wordAtlasProgress') || '[]');
}

function getStreak() {
  return parseInt(localStorage.getItem('wordAtlasStreak') || '0');
}

function updateProgress() {
  const badgeBox = document.getElementById('atlas-progress');
  const streakBox = document.getElementById('streak-display');
  const data = getProgress();
  badgeBox.innerHTML = `🏅 Badges: ${REGIONS.map(r => data.includes(r) ? EMOJIS[r] : '⬜️').join(' ')}`;
  const streak = getStreak();
  streakBox.innerHTML = `🔥 Weekly Streak: ${streak} day${streak === 1 ? '' : 's'}`;
}

function getShareBadge() {
  const count = getProgress().length;
  const emoji = ['🥚', '🐣', '🐥', '🦅', '🦄', '🌍'][Math.min(count, 5)];
  return `${emoji} Word Atlas Level: ${count}/5 regions unlocked!`;
}

