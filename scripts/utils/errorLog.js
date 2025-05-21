// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

import { getErrorLog, clearErrorLog } from './naptpwa/scripts/utils/errorHandler.js';

export function renderErrorLog(container, options = {}) {
  if (!container) {
    console.error('No container element provided to renderErrorLog');
    return;
  }

  // Setup DOM references
  const title = document.createElement('h2');
  title.id = 'logTitle';
  title.textContent = 'Error Log';
  container.appendChild(title);

  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.innerHTML = `
    <button id="clearErrorLogBtn">Clear Log</button>
    <button id="exportLogBtn">Export Log</button>
    <label>
      Refresh:
      <select id="intervalSelect">
        <option value="10000">10 sec</option>
        <option value="30000">30 sec</option>
        <option value="60000" selected>1 min</option>
        <option value="300000">5 min</option>
      </select>
    </label>
  `;
  container.appendChild(controls);

  const logContainer = document.createElement('div');
  logContainer.className = 'error-log';
  logContainer.id = 'errorLogContainer';
  container.appendChild(logContainer);

  const clearBtn = controls.querySelector('#clearErrorLogBtn');
  const exportBtn = controls.querySelector('#exportLogBtn');
  const intervalSelect = controls.querySelector('#intervalSelect');

  let previousSerializedLog = '';
  let intervalId;

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  function render() {
    const errors = getErrorLog();
    const serialized = JSON.stringify(errors);

    if (serialized === previousSerializedLog) return;
    previousSerializedLog = serialized;

    title.textContent = `Error Log (${errors.length} entr${errors.length === 1 ? 'y' : 'ies'})`;

    if (errors.length === 0) {
      logContainer.innerHTML = '<p>No errors logged.</p>';
      return;
    }

    logContainer.innerHTML = errors.map(e => `
      <div class="error-entry">
        <strong>${escapeHTML(e.type || 'ERROR')}:</strong> ${escapeHTML(e.message)}<br />
        <small>${escapeHTML(e.source || '')} [${e.lineno || ''}:${e.colno || ''}]</small><br />
        <pre>${escapeHTML(e.stack || '')}</pre>
        <div class="timestamp">${escapeHTML(e.time)}</div>
      </div>
    `).join('');
  }

  function startPolling(interval) {
    clearInterval(intervalId);
    intervalId = setInterval(render, interval);
  }

  // Event handlers
  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all stored error logs?')) {
      clearErrorLog();
      previousSerializedLog = '';
      render();
    }
  });

  exportBtn.addEventListener('click', () => {
    const errors = getErrorLog();
    const blob = new Blob([JSON.stringify(errors, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-log-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  intervalSelect.addEventListener('change', () => {
    const interval = parseInt(intervalSelect.value, 10);
    startPolling(interval);
  });

  // Initial render + polling
  render();
  startPolling(options.interval || 60000); // default to 1 minute
}

