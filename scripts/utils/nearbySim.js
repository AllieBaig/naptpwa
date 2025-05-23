

// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

/**
 * Generate a consistent simulated player count
 * based on zoneHash and current date.
 */
export function simulateNearbyCount(zoneHash) {
  const day = new Date().getDate(); // 1–31
  const seed = zoneHash.charCodeAt(2) * day;
  return 5 + (seed % 10); // 5 to 14 players
}

