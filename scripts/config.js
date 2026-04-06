/**
 * Central runtime config for static hosting. Override before this script in HTML if needed:
 *   window.CBB_ENV = 'development';
 *   window.CBB_JSON_BASE = 'https://...';
 *   window.CBB_SENTRY_DSN = 'https://...@....ingest.sentry.io/...';
 */
(function () {
  'use strict';

  window.CBB_ENV = window.CBB_ENV || 'production';
  window.CBB_JSON_BASE =
    window.CBB_JSON_BASE || 'https://codyphillips5.github.io/cbbpicks/json';

  window.CBB_FIREBASE_CONFIG = window.CBB_FIREBASE_CONFIG || {
    apiKey: 'AIzaSyDFXCFaM3jQMZ26lNNH7bbewFa6wH6z6r0',
    authDomain: 'cbb-picks.firebaseapp.com',
    databaseURL: 'https://cbb-picks.firebaseio.com',
    projectId: 'cbb-picks',
    storageBucket: 'cbb-picks.appspot.com',
    messagingSenderId: '215555236913',
    appId: '1:215555236913:web:27a28125eec1ee36a06110',
    measurementId: 'G-5S7HXFNGJN',
  };

  var dev = window.CBB_ENV === 'development';
  window.CBBLogger =
    window.CBBLogger ||
    {
      debug: function () {
        if (dev) console.debug.apply(console, arguments);
      },
      info: function () {
        if (dev) console.info.apply(console, arguments);
      },
      warn: function () {
        console.warn.apply(console, arguments);
      },
      error: function () {
        console.error.apply(console, arguments);
      },
    };
})();
