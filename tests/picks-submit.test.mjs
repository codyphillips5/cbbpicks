import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

function loadPicksFns() {
  const src = fs.readFileSync(new URL('../scripts/auth.js', import.meta.url), 'utf8');
  const start = src.indexOf('/* picks-submit */');
  const end = src.indexOf('/* end-picks-submit */');
  if (start < 0 || end < 0) {
    throw new Error('picks submit helpers not found in scripts/auth.js');
  }
  const body = src.slice(start, end);
  return new Function(
    `${body}\nreturn { isGameOpenForPicks, buildWeekPicksPatch, readOpenGameSelections };`
  )();
}

const { isGameOpenForPicks, buildWeekPicksPatch, readOpenGameSelections } = loadPicksFns();

const now = Date.parse('2026-11-06T12:00:00Z');

describe('buildWeekPicksPatch', () => {
  it('writes only the games chosen on this submit', () => {
    const patch = buildWeekPicksPatch('fan@example.com', {
      1: 'MIA',
      2: '',
      3: '   ',
      5: 'DUKE',
    });
    expect(patch.user).toBe('fan@example.com');
    expect(patch.fields).toEqual({ game1: 'MIA', game5: 'DUKE' });
    expect(patch.fields.game2).toBeUndefined();
    expect(patch.fields.game4).toBeUndefined();
  });

  it('accepts gameN keys and trims team codes', () => {
    const patch = buildWeekPicksPatch('fan@example.com', { game4: '  ZONA ' });
    expect(patch.fields).toEqual({ game4: 'ZONA' });
  });

  it('returns null when there is nothing new to save', () => {
    expect(buildWeekPicksPatch('fan@example.com', { 1: '', 2: '  ' })).toBeNull();
    expect(buildWeekPicksPatch('', { 1: 'MIA' })).toBeNull();
    expect(buildWeekPicksPatch('fan@example.com', null)).toBeNull();
  });
});

describe('isGameOpenForPicks', () => {
  it('allows an active game that has not started', () => {
    expect(
      isGameOpenForPicks(
        { gameId: 5, active: true, gameTime: '2026-11-07T00:00:00Z' },
        now
      )
    ).toBe(true);
  });

  it('blocks games that are inactive, final, or already started', () => {
    expect(isGameOpenForPicks({ active: false, gameTime: '2026-11-07T00:00:00Z' }, now)).toBe(
      false
    );
    expect(
      isGameOpenForPicks(
        { active: true, cover: 'FLA', gameTime: '2026-11-07T00:00:00Z' },
        now
      )
    ).toBe(false);
    expect(
      isGameOpenForPicks({ active: true, gameTime: '2026-11-06T12:00:00Z' }, now)
    ).toBe(false);
    expect(isGameOpenForPicks(null, now)).toBe(false);
  });
});

describe('readOpenGameSelections', () => {
  it('keeps selections for open games and ignores locked ones', () => {
    const doc = {
      getElementById(id) {
        const selects = {
          game1: { tagName: 'SELECT', value: 'MIA' },
          game2: { tagName: 'SELECT', value: 'PURD' },
          game5: { tagName: 'SELECT', value: '' },
          game6: { tagName: 'DIV', value: 'UCONN' },
        };
        return selects[id] || null;
      },
    };
    const games = [
      { gameId: 1, active: true, gameTime: '2026-11-07T00:00:00Z' },
      { gameId: 2, active: true, cover: 'GONZ', gameTime: '2026-11-07T00:00:00Z' },
      { gameId: 5, active: true, gameTime: '2026-11-07T00:00:00Z' },
      { gameId: 6, active: true, gameTime: '2026-11-07T01:00:00Z' },
    ];
    expect(readOpenGameSelections(doc, games, now)).toEqual({ 1: 'MIA', 5: '' });
  });
});

describe('week picks submit', () => {
  it('merges a partial update instead of rewriting every game', () => {
    const src = fs.readFileSync(new URL('../scripts/auth.js', import.meta.url), 'utf8');
    expect(src).toContain('set(payload, { merge: true })');
    expect(src).not.toContain("game1: document.getElementById('seasongame1').value");
    expect(src).not.toContain('createForm.reset()');
  });
});
