// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

const LOG_KEY = 'napt-error-log';
let errorLog = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');

export function getErrorLog() {
  return errorLog;
}

export function clearErrorLog() {
  errorLog = [];
  localStorage.removeItem(LOG_KEY);
}

// Automatically store browser errors globally
export function captureGlobalErrors() {
  window.onerror = (msg, src, lineno, colno, err) => {
    const entry = {
      type: 'error',
      message: msg,
      source: src,
      lineno,
      colno,
      stack: err?.stack || '',
      time: new Date().toLocaleString(),
      version: window.__LAST_LOADED_VERSION || 'unknown'
    };
    errorLog.unshift(entry);
    errorLog = errorLog.slice(0, 50); // limit log length
    localStorage.setItem(LOG_KEY, JSON.stringify(errorLog));
  };

  window.onunhandledrejection = (e) => {
    const entry = {
      type: 'promise',
      message: e.reason?.message || e.reason,
      source: '',
      lineno: '',
      colno: '',
      stack: e.reason?.stack || '',
      time: new Date().toLocaleString(),
      version: window.__LAST_LOADED_VERSION || 'unknown'
    };
    errorLog.unshift(entry);
    errorLog = errorLog.slice(0, 50);
    localStorage.setItem(LOG_KEY, JSON.stringify(errorLog));
  };
}

// Activate immediately
captureGlobalErrors();

