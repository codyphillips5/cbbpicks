import { fetchAndParse } from './fetch-core.mjs';
import {
  weekGamesSchema,
  teamsFileSchema,
  usersFileSchema,
  standingsFileSchema,
  tournamentFileSchema,
} from './schemas.mjs';

/**
 * @param {string | (() => string)} getBaseUrl
 */
export function createCbbApi(getBaseUrl) {
  const base = () => {
    const raw = typeof getBaseUrl === 'function' ? getBaseUrl() : getBaseUrl;
    return String(raw).replace(/\/$/, '');
  };

  return {
    getBaseUrl: base,
    fetchWeekGames(week) {
      return fetchAndParse(`${base()}/games/week${week}.json`, weekGamesSchema);
    },
    fetchTeams() {
      return fetchAndParse(`${base()}/teams.json`, teamsFileSchema);
    },
    fetchUsers() {
      return fetchAndParse(`${base()}/users.json`, usersFileSchema);
    },
    fetchStandings() {
      return fetchAndParse(`${base()}/standings.json`, standingsFileSchema);
    },
    fetchTournament() {
      return fetchAndParse(`${base()}/tournament.json`, tournamentFileSchema);
    },
  };
}
