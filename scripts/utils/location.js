// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

/**
 * Get the user's geolocation coordinates.
 * Returns: Promise resolving to { latitude, longitude }
 */
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => resolve(pos.coords),
      err => reject(err),
      { enableHighAccuracy: false, timeout: 5000 }
    );
  });
}

/**
 * Create a simplified "zone hash" based on coordinates.
 * Useful for shared daily prompts by region.
 * Grid size defaults to 0.1 degrees (~10km).
 */
export function getZoneHash(lat, lon, grid = 0.1) {
  const zoneLat = Math.floor(lat / grid) * grid;
  const zoneLon = Math.floor(lon / grid) * grid;
  return `${zoneLat.toFixed(1)}_${zoneLon.toFixed(1)}`;
}

