/*
MIT License
Copyright (c) 2025 AllieBaig
See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
*/

// Error logging utility to capture and store errors in localStorage

export function initErrorLogging() {
  window.addEventListener('error', event => {
    const log = JSON.parse(localStorage.getItem('appErrorLog') || '[]');

    log.push({
      time: new Date().toISOString(),
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error ? event.error.stack : null,
    });

    if (log.length > 50) log.shift();

    localStorage.setItem('appErrorLog', JSON.stringify(log));
  });

  window.addEventListener('unhandledrejection', event => {
    const log = JSON.parse(localStorage.getItem('appErrorLog') || '[]');

    log.push({
      time: new Date().toISOString(),
      message: event.reason ? event.reason.message || event.reason : 'Unhandled rejection',
      stack: event.reason ? event.reason.stack : null,
    });

    if (log.length > 50) log.shift();

    localStorage.setItem('appErrorLog', JSON.stringify(log));
  });
}
