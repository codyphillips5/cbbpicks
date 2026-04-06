import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  weekGamesSchema,
  teamsFileSchema,
  usersFileSchema,
  standingsFileSchema,
  tournamentFileSchema,
} from '../lib/schemas.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonDir = join(__dirname, '..', 'json');

function readJson(name) {
  return JSON.parse(readFileSync(join(jsonDir, name), 'utf8'));
}

describe('JSON fixtures match Zod schemas', () => {
  it('week1 games', () => {
    const data = readJson('games/week1.json');
    expect(() => weekGamesSchema.parse(data)).not.toThrow();
  });

  it('teams', () => {
    const data = readJson('teams.json');
    expect(() => teamsFileSchema.parse(data)).not.toThrow();
  });

  it('users', () => {
    const data = readJson('users.json');
    expect(() => usersFileSchema.parse(data)).not.toThrow();
  });

  it('standings', () => {
    const data = readJson('standings.json');
    expect(() => standingsFileSchema.parse(data)).not.toThrow();
  });

  it('tournament', () => {
    const data = readJson('tournament.json');
    expect(() => tournamentFileSchema.parse(data)).not.toThrow();
  });
});
