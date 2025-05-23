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
        <button onclick="handleRegion('${r}')">Explore ${r}</button>
      `).join('')}
    </div>

    <div id="atlas-progress" class="feedback" style="margin-top: 1rem;"></div>
    <div id="streak-display" class="feedback" style="margin-top: 0.5rem;"></div>

    <button id="share-badge" style="margin-top: 1rem;">📣 Share My Badge</button>
    <button class="back-btn" style="margin-top: 1.5rem;">◀️ Back to Menu</button>
  `;

  // Region exploration handler
  window.handleRegion = (region) => {
    const log = getProgress();
    if (!log.includes(region)) {
      log.push(region);
      localStorage.setItem('wordAtlasProgress', JSON.stringify(log));
    }
    localStorage.setItem('wordAtlasLastDate', new Date().toDateString());
    localStorage.setItem('wordAtlasStreak', (getStreak() + 1).toString());
    init({ showMenu }); // refresh UI
  };

  // UI updates
  updateProgressUI();
  document.getElementById('share-badge')?.addEventListener('click', () => {
    const msg = getShareBadge();
    if (navigator.share) {
      navigator.share({ text: msg });
    } else {
      alert(`Share this:\n${msg}`);
    }
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
  document.querySelector('main')?.classList.remove('active');
  game.classList.add('active');
}

function getProgress() {
  return JSON.parse(localStorage.getItem('wordAtlasProgress') || '[]');
}

function getStreak() {
  return parseInt(localStorage.getItem('wordAtlasStreak') || '0');
}

function updateProgressUI() {
  const progress = getProgress();
  const badgeBox = document.getElementById('atlas-progress');
  const streakBox = document.getElementById('streak-display');

  badgeBox.innerHTML = `🏅 Badges: ${REGIONS.map(r => progress.includes(r) ? EMOJIS[r] : '⬜️').join(' ')}`;
  const streak = getStreak();
  streakBox.innerHTML = `🔥 Weekly Streak: ${streak} day${streak === 1 ? '' : 's'}`;
}

function getShareBadge() {
  const count = getProgress().length;
  const emoji = ['🥚', '🐣', '🐥', '🦅', '🦄', '🌍'][Math.min(count, 5)];
  return `${emoji} Word Atlas Level: ${count}/5 regions unlocked!`;
}

