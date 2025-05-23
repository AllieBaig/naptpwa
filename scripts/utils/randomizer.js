// scripts/utils/randomizer.js

// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

/**
 * Returns a random element from the given array.
 * @param {Array} array The array to get a random element from.
 * @returns {*} A random element from the array, or null if the array is empty or not an array.
 */
export function getRandomFromArray(array) {
  if (!Array.isArray(array) || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffles an array in place.
 * @param {Array} array The array to shuffle.
 * @returns {Array} The shuffled array.
 */
export function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

/**
 * Returns random prompts organized by category.
 * @param {Object.<string, Array<string>>} promptMap An object where keys are categories and values are arrays of prompts.
 * @param {number} limit The number of prompts to select from each category. Defaults to 1.
 * @returns {Object.<string, Array<string>>} An object with random prompts for each category.
 */
export function getRandomPromptsByCategory(promptMap, limit = 1) {
  const result = {};
  for (const category in promptMap) {
    const options = promptMap[category];
    const prompts = shuffleArray(options).slice(0, limit);
    result[category] = prompts;
  }
  return result;
}

/**
 * Returns a random uppercase letter from the English alphabet.
 * @returns {string} A single random uppercase letter.
 */
export function getRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
}
