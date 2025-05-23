

// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

const STREAK_KEY = 'napt-streaks';

export function getStreak(mode = 'solo') {
  const allStreaks = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
  const streak = allStreaks[mode] || { days: [], lastDate: '' };
  return streak;
}

export function updateStreakUI(elementId, mode = 'solo') {
  const el = document.getElementById(elementId);
  if (!el) return;

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  let streak = getStreak(mode);

  if (!streak.days.includes(today)) {
    streak.days.push(today);
    streak.days = [...new Set(streak.days)].sort().slice(-7);
    streak.lastDate = today;

    const allStreaks = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
    allStreaks[mode] = streak;
    localStorage.setItem(STREAK_KEY, JSON.stringify(allStreaks));
  }

  el.innerHTML = `🔥 Streak: ${streak.days.length} day${streak.days.length !== 1 ? 's' : ''}`;
}

