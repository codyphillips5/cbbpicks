import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createCbbApi } from '../lib/cbb-api.mjs';
import { weekGamesSchema } from '../lib/schemas.mjs';

describe('createCbbApi', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetchWeekGames parses valid payload', async () => {
    const sample = { games: [{ gameId: 1, awayTeam: 'A', homeTeam: 'B' }] };
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => sample,
    });

    const api = createCbbApi('https://example.com/json');
    const out = await api.fetchWeekGames(1);
    expect(out.games).toHaveLength(1);
    expect(globalThis.fetch).toHaveBeenCalledWith('https://example.com/json/games/week1.json');
  });

  it('fetchAndParse rejects invalid schema', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ notGames: [] }),
    });

    const api = createCbbApi('https://example.com/json');
    await expect(api.fetchWeekGames(1)).rejects.toThrow();
  });
});

describe('weekGamesSchema', () => {
  it('allows optional scores and cover', () => {
    const parsed = weekGamesSchema.parse({
      games: [
        {
          gameId: 1,
          awayTeam: 'X',
          homeTeam: 'Y',
          awayScore: 70,
          homeScore: 71,
          cover: 'Y',
        },
      ],
    });
    expect(parsed.games[0].cover).toBe('Y');
  });
});
