/*
MIT License
Copyright (c) 2025 AllieBaig
See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
*/

// Key used in localStorage
const ERROR_LOG_KEY = 'appErrorLog';

/**
 * Initializes global error and unhandled promise rejection logging.
 * Stores up to 50 most recent errors in localStorage.
 */
export function initErrorLogging() {
  window.addEventListener('error', event => {
    logError({
      type: 'error',
      time: new Date().toISOString(),
      message: event.message,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack || null,
    });
  });

  window.addEventListener('unhandledrejection', event => {
    logError({
      type: 'unhandledrejection',
      time: new Date().toISOString(),
      message: event.reason?.message || String(event.reason) || 'Unhandled rejection',
      source: null,
      lineno: null,
      colno: null,
      stack: event.reason?.stack || null,
    });
  });
}

/**
 * Logs an error object into localStorage.
 * Keeps only the 50 most recent entries.
 */
function logError(entry) {
  try {
    const log = JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
    log.push(entry);
    if (log.length > 50) log.shift(); // keep last 50
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(log));
  } catch (e) {
    console.warn('Failed to log error:', e);
  }
}

/**
 * Retrieves the current error log from localStorage.
 * @returns {Array<Object>} Array of error entries.
 */
export function getErrorLog() {
  try {
    return JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
  } catch {
    return [];
  }
}

/**
 * Clears all logged errors from localStorage.
 */
export function clearErrorLog() {
  localStorage.removeItem(ERROR_LOG_KEY);
}

