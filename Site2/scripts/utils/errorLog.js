import { getErrorLog, clearErrorLog } from './scripts/utils/modules.js';

export function renderErrorLog(container) {
  if (!container) {
    console.error('No container element provided to renderErrorLog');
    return;
  }

  const errors = getErrorLog();

  container.innerHTML = `
    <h2>Error Log (${errors.length} entries)</h2>
    <button id="clearErrorLogBtn">Clear Log</button>
    <div class="error-list" style="max-height:400px; overflow:auto; font-family: monospace; background:#111; color:#eee; padding:1em; border-radius:0.5em;">
      ${errors.map(e => `
        <div style="margin-bottom:1em; border-bottom:1px solid #444; padding-bottom:0.5em;">
          <strong>${(e.type || 'ERROR').toUpperCase()}:</strong> ${e.message} <br/>
          <small>${e.filename || e.source || ''} [${e.lineno || ''}:${e.colno || ''}]</small><br/>
          <pre style="white-space: pre-wrap;">${e.stack || ''}</pre>
          <em>${e.time}</em>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelector('#clearErrorLogBtn').addEventListener('click', () => {
    if (confirm('Clear all stored error logs?')) {
      clearErrorLog();
      container.innerHTML = '<p>Error log cleared.</p>';
    }
  });
}

