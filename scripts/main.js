/*
MIT License

Copyright (c) 2025 AllieBaig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { navigateToMode, showMenu } from './gameNavigation.js';

document.querySelectorAll('#menu button').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    navigateToMode(mode);
  });
});




// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

import { initErrorLogging } from './utils/errorHandler.js';
import renderErrorLog from './utils/errorLog.js';

// <----------------- before this line - Initialize error logging
initErrorLogging();

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
    const main = document.querySelector('main');
    if (!main) return;
    main.innerHTML = '';
    renderErrorLog(main);
  });

  document.body.appendChild(btn);
}

setupErrorLogButton();




// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

// <----------------- before this line - Dev mode URL + password protected error log button

import renderErrorLog from './utils/errorLog.js';
import { initErrorLogging } from './utils/errorHandler.js';

initErrorLogging();

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







