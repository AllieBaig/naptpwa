// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

const LAST_MODE_KEY = 'napt-lastMode';

/**
 * Saves the current game mode to localStorage.
 * @param {string} mode - The name of the current game mode.
 */
export function saveLastMode(mode) {
  localStorage.setItem(LAST_MODE_KEY, mode);
}

/**
 * Retrieves the last played game mode from localStorage.
 * @returns {string|null} The name of the last mode, or null if not found.
 */
export function getLastMode() {
  return localStorage.getItem(LAST_MODE_KEY);
}

