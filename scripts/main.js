// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

// <----------------- before this line - Main app bootstrap with error log and PWA reset buttons

import renderErrorLog from './scripts/utils/errorLog.js';
import { initErrorLogging } from './scripts/utils/errorHandler.js';

initErrorLogging();

/* ----------- Dev mode error log button (password protected) ----------- */
function setupErrorLogButton() {
  const btn = document.createElement('button');
  btn.textContent = 'Error Log (Dev)';
  btn.style.position = 'fixed';
  btn.style.bottom = '1rem';
  btn.style.right = '1rem';
  btn.style.zIndex = '9999';
  btn.style.padding = '0.5rem 1rem';
  btn.style.background = '#222';
  btn.style.color = '#eee';
  btn.style.border = 'none';
  btn.style.borderRadius = '0.3rem';
  btn.style.cursor = 'pointer';

  btn.addEventListener('click', () => {
    const password = prompt('Enter developer password:');
    const correctPassword = 'YOUR_SECRET_PASSWORD'; // CHANGE THIS before deployment

    if (password === correctPassword) {
      const main = document.querySelector('main');
      if (!main) return;
      main.innerHTML = '';
      renderErrorLog(main);
    } else {
      alert('Incorrect password');
    }
  });

  document.body.appendChild(btn);
}

function setupErrorLogButtonIfDevMode() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('dev') === 'true') {
    setupErrorLogButton();
  }
}

setupErrorLogButtonIfDevMode();

/* ----------- User-facing PWA Reset Button ----------- */
function createPwaResetButton() {
  const btn = document.createElement('button');
  btn.textContent = 'PWA not working? Click here to reset';
  btn.style.position = 'fixed';
  btn.style.bottom = '4rem';
  btn.style.right = '1rem';
  btn.style.zIndex = '10000';
  btn.style.padding = '0.6rem 1rem';
  btn.style.background = '#b33';
  btn.style.color = 'white';
  btn.style.border = 'none';
  btn.style.borderRadius = '0.4rem';
  btn.style.cursor = 'pointer';
  btn.style.fontSize = '0.9rem';
  btn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Resetting PWA...';

    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }

      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (const cacheName of cacheNames) {
          await caches.delete(cacheName);
        }
      }

      btn.textContent = 'Reset done! Reloading...';
      setTimeout(() => location.reload(), 1500);
    } catch (e) {
      console.error('PWA reset failed:', e);
      btn.textContent = 'Reset failed, check console';
      btn.disabled = false;
    }
  });

  /*
MIT License
Copyright (c) 2025 AllieBaig
See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
*/

import { initErrorLogging } from './scripts/utils/error-handler.js';

initErrorLogging();

// Your existing main.js code here...

  document.body.appendChild(btn);
}

createPwaResetButton();

/* ----------- Other app init code here ----------- */
// ... your existing main.js initialization logic ...
