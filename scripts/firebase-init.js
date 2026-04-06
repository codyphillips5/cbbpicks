/**
 * Initializes the compat Firebase app once and exposes global `auth` and `db` for legacy scripts.
 * Requires: Firebase 6.x SDK scripts, then scripts/config.js (CBB_FIREBASE_CONFIG).
 */
(function () {
  'use strict';

  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK must load before firebase-init.js');
    return;
  }

  var cfg = window.CBB_FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey) {
    console.error('CBB_FIREBASE_CONFIG is missing; load scripts/config.js first.');
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(cfg);
  }

  window.auth = firebase.auth();
  window.db = firebase.firestore();
})();
