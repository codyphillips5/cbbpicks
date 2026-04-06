/**
 * Loads Sentry browser SDK when window.CBB_SENTRY_DSN is set (optional).
 */
(function () {
  'use strict';

  var dsn = typeof window !== 'undefined' ? window.CBB_SENTRY_DSN : '';
  if (!dsn || typeof document === 'undefined') return;

  var s = document.createElement('script');
  s.src = 'https://browser.sentry-cdn.com/7.91.0/bundle.min.js';
  s.crossOrigin = 'anonymous';
  s.onload = function () {
    if (window.Sentry && typeof window.Sentry.init === 'function') {
      window.Sentry.init({
        dsn: dsn,
        environment: window.CBB_ENV || 'production',
      });
    }
  };
  document.head.appendChild(s);
})();
