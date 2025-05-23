

// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

/**
 * Generates a repeatable daily letter and category
 * based on a zoneHash (like "25.3_46.7")
 */
export function getDailyPromptFromZone(zoneHash) {
  const date = new Date().getDate(); // Day of the month (1–31)

  // Generate letter (A–Z) from first char code + day
  const letterCode = (zoneHash.charCodeAt(0) + date) % 26;
  const letter = String.fromCharCode(65 + letterCode);

  // Cycle through 4 base categories
  const categories = ['Name', 'Place', 'Animal', 'Thing'];
  const index = zoneHash.charCodeAt(1) % categories.length;

  return {
    letter,
    category: categories[index]
  };
}

