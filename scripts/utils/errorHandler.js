/*
MIT License
Copyright (c) 2025 AllieBaig
See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE
*/

// Define the key used to store error log entries in localStorage.
const ERROR_LOG_STORAGE_KEY = 'appErrorLog';

// Define the maximum number of error entries to retain in the log.
const MAX_ERROR_LOG_ENTRIES = 50;

/**
 * Represents a logged error entry.
 * @typedef {Object} ErrorLogEntry
 * @property {string} type - The type of error (e.g., 'error', 'unhandledrejection').
 * @property {string} time - ISO 8601 timestamp when the error occurred.
 * @property {string} message - The error message.
 * @property {string|null} source - The URL of the script where the error originated, if available.
 * @property {number|null} lineno - The line number where the error occurred, if available.
 * @property {number|null} colno - The column number where the error occurred, if available.
 * @property {string|null} stack - The stack trace of the error, if available.
 */

/**
 * Initializes global error logging by attaching event listeners to `window.onerror`
 * and `window.onunhandledrejection`. All caught errors and unhandled promise
 * rejections are stored in localStorage for later inspection, maintaining a
 * maximum of 50 recent entries.
 *
 * This function should be called once early in your application's lifecycle.
 */
export function initErrorLogging() {
  /**
   * Handles generic JavaScript errors caught by window.onerror.
   * @param {ErrorEvent} event - The error event object.
   */
  window.addEventListener('error', (event) => {
    logError({
      type: 'error',
      time: new Date().toISOString(),
      message: event.message,
      source: event.filename || null, // Ensure null if undefined
      lineno: event.lineno || null,   // Ensure null if undefined or 0
      colno: event.colno || null,     // Ensure null if undefined or 0
      stack: event.error?.stack || null, // Safely access stack or set to null
    });
  });

  /**
   * Handles unhandled promise rejections caught by window.onunhandledrejection.
   * @param {PromiseRejectionEvent} event - The promise rejection event object.
   */
  window.addEventListener('unhandledrejection', (event) => {
    // Attempt to extract message and stack from event.reason
    const reasonMessage = event.reason?.message || String(event.reason) || 'Unhandled rejection';
    const reasonStack = event.reason?.stack || null;

    logError({
      type: 'unhandledrejection',
      time: new Date().toISOString(),
      message: reasonMessage,
      source: null, // Source typically not available for unhandled rejections
      lineno: null,
      colno: null,
      stack: reasonStack,
    });
  });

  console.log('Error logging initialized. Errors will be stored in localStorage.');
}

/**
 * Logs a single error entry to localStorage.
 * The log is maintained as an array of objects, and older entries are
 * automatically removed if the log exceeds the `MAX_ERROR_LOG_ENTRIES` limit.
 *
 * @param {ErrorLogEntry} entry - The error object to log.
 * @private
 */
function logError(entry) {
  try {
    // Retrieve the current log, or initialize an empty array if none exists.
    const currentLog = JSON.parse(localStorage.getItem(ERROR_LOG_STORAGE_KEY) || '[]');

    // Add the new error entry.
    currentLog.push(entry);

    // If the log exceeds the maximum limit, remove the oldest entry.
    if (currentLog.length > MAX_ERROR_LOG_ENTRIES) {
      currentLog.shift(); // Removes the first (oldest) element
    }

    // Save the updated log back to localStorage.
    localStorage.setItem(ERROR_LOG_STORAGE_KEY, JSON.stringify(currentLog));
  } catch (e) {
    console.warn(`[errorHandler] Failed to log error to localStorage: ${e.message || e}`, entry);
  }
}

/**
 * Retrieves all stored error entries from localStorage.
 *
 * @returns {Array<ErrorLogEntry>} An array of error objects. Returns an empty array
 * if no errors are stored or if an error occurs during retrieval.
 */
export function getErrorLog() {
  try {
    const storedLog = localStorage.getItem(ERROR_LOG_STORAGE_KEY);
    return storedLog ? JSON.parse(storedLog) : [];
  } catch (e) {
    console.warn(`[errorHandler] Failed to retrieve error log from localStorage: ${e.message || e}`);
    return []; // Return an empty array to prevent further issues if data is corrupt
  }
}

/**
 * Clears all error entries from the localStorage.
 * After this operation, the error log will be empty.
 */
export function clearErrorLog() {
  try {
    localStorage.removeItem(ERROR_LOG_STORAGE_KEY);
    console.log('[errorHandler] Error log cleared successfully.');
  } catch (e) {
    console.warn(`[errorHandler] Failed to clear error log from localStorage: ${e.message || e}`);
  }
}

