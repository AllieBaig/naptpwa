

// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

export function getRandomFromArray(array) {
  if (!Array.isArray(array) || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Category-based randomization
export function getRandomPromptsByCategory(promptMap, limit = 1) {
  const result = {};
  for (const category in promptMap) {
    const options = promptMap[category];
    const prompts = shuffleArray(options).slice(0, limit);
    result[category] = prompts;
  }
  return result;
}

