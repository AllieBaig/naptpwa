// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

export function injectResetPWA() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('debug')) return;

  const link = document.createElement('a');
  link.href = '#';
  link.textContent = 'PWA not working? Click here to reset';
  link.style.display = 'block';
  link.style.textAlign = 'center';
  link.style.margin = '1rem auto';
  link.style.color = '#d00';
  link.style.fontWeight = 'bold';

  link.onclick = (e) => {
    e.preventDefault();
    resetPWA();
  };

  document.body.appendChild(link);
}

function resetPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => reg.unregister());
    });
  }

  if ('caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }

  alert('PWA reset complete. Please refresh the page.');
}
