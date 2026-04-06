/**
 * JSON feed layer for static pages. Validates payloads before use (subset of lib/schemas.mjs).
 * Load after scripts/config.js so CBB_JSON_BASE is set.
 */
(function () {
  'use strict';

  function getBase() {
    var b = typeof window !== 'undefined' && window.CBB_JSON_BASE ? window.CBB_JSON_BASE : '';
    b = String(b || 'https://codyphillips5.github.io/cbbpicks/json').replace(/\/$/, '');
    return b;
  }

  function validateWeekGames(data) {
    if (!data || typeof data !== 'object' || !Array.isArray(data.games)) {
      throw new Error('Invalid games data');
    }
    for (var i = 0; i < data.games.length; i++) {
      var g = data.games[i];
      if (!g || typeof g !== 'object' || typeof g.gameId !== 'number') {
        throw new Error('Invalid game row');
      }
    }
    return data;
  }

  function validateTeams(data) {
    if (!data || typeof data !== 'object' || !Array.isArray(data.teams)) {
      throw new Error('Invalid teams data');
    }
    return data;
  }

  function validateUsers(data) {
    if (!data || typeof data !== 'object' || !Array.isArray(data.users)) {
      throw new Error('Invalid users data');
    }
    return data;
  }

  function validateStandings(data) {
    if (!data || typeof data !== 'object' || !Array.isArray(data.picks)) {
      throw new Error('Invalid standings data');
    }
    return data;
  }

  function validateTournament(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid tournament data');
    }
    if (!Array.isArray(data.auto) || !Array.isArray(data.atlarge)) {
      throw new Error('Invalid tournament shape');
    }
    return data;
  }

  function fetchJson(path, validate) {
    return fetch(getBase() + path)
      .then(function (res) {
        if (!res.ok) {
          throw new Error('Request failed (' + res.status + ')');
        }
        return res.json();
      })
      .then(function (data) {
        return validate(data);
      });
  }

  window.CBBApi = {
    getBaseUrl: getBase,
    fetchWeekGames: function (week) {
      return fetchJson('/games/week' + week + '.json', validateWeekGames);
    },
    fetchTeams: function () {
      return fetchJson('/teams.json', validateTeams);
    },
    fetchUsers: function () {
      return fetchJson('/users.json', validateUsers);
    },
    fetchStandings: function () {
      return fetchJson('/standings.json', validateStandings);
    },
    fetchTournament: function () {
      return fetchJson('/tournament.json', validateTournament);
    },
  };
})();
