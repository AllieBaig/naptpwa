
// MIT License
// Copyright (c) 2025 AllieBaig
// Licensed under the MIT License.
// See https://github.com/AllieBaig/naptpwa/blob/main/LICENSE for details.

// <----------------- before this line - Centralized client-side error handling

const ERROR_STORAGE_KEY = 'naptpwa_error_log';

function getStoredErrors() {
  try {
    const stored = localStorage.getItem(ERROR_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeError(errorEntry) {
  const errors = getStoredErrors();
  errors.push(errorEntry);
  if (errors.length > 100) errors.shift();
  localStorage.setItem(ERROR_STORAGE_KEY, JSON.stringify(errors));
}

export function initErrorLogging() {
  window.addEventListener('error', event => {
    const err = event.error || {};
    const errorEntry = {
      message: err.message || event.message || 'Unknown error',
      source: event.filename || 'unknown source',
      lineno: event.lineno || 0,
      colno: event.colno || 0,
      stack: err.stack || 'no stack',
      time: new Date().toISOString(),
      type: 'error',
    };
    storeError(errorEntry);
    console.error('Logged error:', errorEntry);
  });

  window.addEventListener('unhandledrejection', event => {
    const reason = event.reason || {};
    const errorEntry = {
      message: reason.message || String(reason) || 'Unhandled rejection',
      stack: reason.stack || 'no stack',
      time: new Date().toISOString(),
      type: 'unhandledrejection',
    };
    storeError(errorEntry);
    console.error('Logged unhandled rejection:', errorEntry);
  });
}

export function getErrorLog() {
  return getStoredErrors();
}

export function clearErrorLog() {
  localStorage.removeItem(ERROR_STORAGE_KEY);
}

