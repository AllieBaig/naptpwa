

// MIT License – Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { resetGameContainer } from '../utils/gameUI.js';
import { getZoneHash, getUserLocation } from '../utils/location.js';
import { getDailyPromptFromZone } from '../utils/dailyPrompt.js';
import { simulateNearbyCount } from '../utils/nearbySim.js';
import { getStaticMapUrl, radiusToZoom } from '../utils/mapUtils.js';
import { versionMap } from '../utils/version.js';

const RADIUS_KEY = 'napt-radius-km';

export function init({ showMenu }) {
  resetGameContainer();
  window.__LAST_LOADED_VERSION = `nearby.js ${versionMap.nearby || 'v1.0.0'}`;

  const game = document.getElementById('game');
  if (!game) return;

  game.innerHTML = `<h2>📍 Play Nearby</h2><p>Detecting your location...</p>`;

  getUserLocation()
    .then(({ latitude, longitude }) => {
      const zone = getZoneHash(latitude, longitude);
      const prompt = getDailyPromptFromZone(zone);
      const playersNearby = simulateNearbyCount(zone);

      const savedRadius = parseInt(localStorage.getItem(RADIUS_KEY)) || 10;

      renderNearbyUI(game, prompt, zone, playersNearby, showMenu, { latitude, longitude }, savedRadius);
    })
    .catch(() => {
      game.innerHTML = `<p>⚠️ Location access denied. This mode requires location to work.</p>
                        <button class="back-btn">◀ Back</button>`;
      document.querySelector('.back-btn')?.addEventListener('click', showMenu);
    });
}

function renderNearbyUI(game, prompt, zone, count, showMenu, coords, radiusKm) {
  const { latitude, longitude } = coords;
  const zoom = radiusToZoom(radiusKm);
  const mapUrl = getStaticMapUrl(latitude, longitude, zoom);

  game.innerHTML = `
    <p><strong>Your Zone:</strong> ${zone}</p>
    <p><strong>Letter:</strong> ${prompt.letter}</p>
    <p><strong>Category:</strong> ${prompt.category}</p>
    <p><strong>Players Nearby:</strong> ${count}</p>

    <label for="radiusSelect">🔍 View Radius:</label>
    <select id="radiusSelect">
      <option value="3">3 km</option>
      <option value="10">10 km</option>
      <option value="50">50 km</option>
      <option value="200">200 km</option>
    </select>

    <img id="nearby-map" src="${mapUrl}" 
         alt="Your location zone map" 
         style="margin: 1rem auto; display: block; border-radius: 0.5rem;" />

    <form id="nearby-form" class="regular-form">
      <label>Your Answer:
        <input type="text" name="answer" required />
      </label>
      <button type="submit">Submit</button>
    </form>

    <div id="nearby-feedback" class="feedback" style="margin-top: 0.5rem;"></div>
    <button class="back-btn" style="margin-top: 1rem;">◀ Back to Menu</button>
  `;

  // Set initial radius value
  document.getElementById('radiusSelect').value = radiusKm;

  document.getElementById('radiusSelect')?.addEventListener('change', e => {
    const newRadius = parseInt(e.target.value);
    localStorage.setItem(RADIUS_KEY, newRadius);

    const newZoom = radiusToZoom(newRadius);
    const newMap = getStaticMapUrl(latitude, longitude, newZoom);
    document.getElementById('nearby-map').src = newMap;
  });

  document.getElementById('nearby-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const val = new FormData(e.target).get('answer').trim();
    const match = val.toUpperCase().startsWith(prompt.letter);
    const feedback = document.getElementById('nearby-feedback');
    feedback.textContent = match
      ? `✅ "${val}" accepted!`
      : `❌ Must start with letter "${prompt.letter}"`;
    feedback.style.color = match ? 'green' : 'red';
  });

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);
}

