import { z } from 'zod';

/** Single game row in json/games/weekN.json */
export const gameRowSchema = z
  .object({
    gameId: z.number(),
    awayTeam: z.union([z.string(), z.number()]),
    homeTeam: z.union([z.string(), z.number()]),
    favorite: z.union([z.string(), z.number()]).optional(),
    spread: z.union([z.number(), z.string()]).optional(),
    gameTime: z.string().optional(),
    channel: z.string().optional(),
    foxId: z.union([z.number(), z.string()]).optional(),
    awayScore: z.number().optional(),
    homeScore: z.number().optional(),
    cover: z.union([z.string(), z.number()]).optional(),
    active: z.boolean().optional(),
  })
  .passthrough();

export const weekGamesSchema = z
  .object({
    games: z.array(gameRowSchema),
  })
  .passthrough();

export const teamRowSchema = z
  .object({
    teamId: z.number(),
    team: z.string(),
    teamMascot: z.string(),
    teamValue: z.string(),
    teamImage: z.union([z.number(), z.string()]),
  })
  .passthrough();

export const teamsFileSchema = z
  .object({
    teams: z.array(teamRowSchema),
  })
  .passthrough();

export const userRowSchema = z
  .object({
    userId: z.number(),
    FirstName: z.string(),
    LastName: z.string(),
    Email: z.string(),
    paid: z.boolean(),
  })
  .passthrough();

export const usersFileSchema = z
  .object({
    users: z.array(userRowSchema),
  })
  .passthrough();

export const standingRowSchema = z.record(z.string(), z.any()).refine((row) => row && typeof row.userId === 'number', {
  message: 'Each standing row must include userId',
});

export const standingsFileSchema = z
  .object({
    picks: z.array(standingRowSchema),
  })
  .passthrough();

export const tournamentFileSchema = z
  .object({
    auto: z.array(
      z
        .object({
          conf: z.string(),
          winner: z.string(),
        })
        .passthrough()
    ),
    atlarge: z.array(
      z
        .object({
          team: z.string(),
        })
        .passthrough()
    ),
  })
  .passthrough();
