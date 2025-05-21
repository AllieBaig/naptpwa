// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

const STORAGE_KEY = 'dice_challenge_history';

export function init({ showMenu }) {
  const container = document.getElementById('game');
  container.innerHTML = '';

  const backButton = document.createElement('button');
  backButton.textContent = '◀️ Back to Menu';
  backButton.addEventListener('click', showMenu);
  container.appendChild(backButton);

  const title = document.createElement('h2');
  title.textContent = '🎲 Dice Challenge';
  container.appendChild(title);

  const result = document.createElement('p');
  result.style.fontSize = '2rem';
  result.style.margin = '1rem 0';
  result.textContent = 'Roll the dice!';
  container.appendChild(result);

  const rollButton = document.createElement('button');
  rollButton.textContent = 'Roll Dice';
  rollButton.style.fontSize = '1.5rem';
  rollButton.addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    result.textContent = `You rolled: ${getDiceEmoji(roll)} (${roll})`;
    recordToday();
    updateStatsUI(statsContainer);
  });

  container.appendChild(rollButton);

  const statsContainer = document.createElement('div');
  statsContainer.style.marginTop = '1rem';
  container.appendChild(statsContainer);
  updateStatsUI(statsContainer);

  container.classList.add('active');
}

function getDiceEmoji(number) {
  const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  return diceEmojis[number - 1] || '?';
}

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function loadHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // storage full or disabled
  }
}

function recordToday() {
  const history = loadHistory();
  const today = getTodayDate();
  if (!history.includes(today)) {
    history.push(today);
    saveHistory(history);
  }
}

function calculateStreak(history) {
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const key = checkDate.toISOString().split('T')[0];
    if (history.includes(key)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function updateStatsUI(container) {
  const history = loadHistory();
  const streak = calculateStreak(history);
  const last7 = history.slice(-7).join(', ') || 'None';

  container.innerHTML = `
    <p><strong>🔥 Weekly Streak:</strong> ${streak} day(s)</p>
    <p><strong>📅 Recent Plays:</strong> ${last7}</p>
  `;
}

