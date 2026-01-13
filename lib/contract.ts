import { z } from "zod";

// We use Zod for runtime validation of the incoming JSON packet

export const GameStateSchema = z.object({
    // Metadata
    timestamp: z.number(), // Unix ms
    matchId: z.string().optional(),

    // Game Context
    phase: z.enum(["LOBBY", "AGENT_SELECT", "BUY_PHASE", "ROUND_START", "ROUND_PLAY", "ROUND_END", "MATCH_END"]),
    roundNumber: z.number().int().min(0).max(30),
    mapName: z.string().optional(),

    // Player State (Local Player Only - complying with "Visible Info")
    player: z.object({
        agent: z.string(),
        health: z.number().min(0).max(150), // HP + Shield
        money: z.number().min(0).max(9000),
        weapon: z.string().optional(),
        isDead: z.boolean(),
        abilities: z.record(z.string(), z.object({
            charges: z.number(),
            cooldown: z.number() // seconds remaining
        })).optional()
    }),

    // Team State (Only visible info like ult status or alive count)
    team: z.object({
        alliesAlive: z.number().int(),
        enemiesVisible: z.number().int().optional() // Only if on minimap
    }),

    // Economy / Game Events
    events: z.array(z.object({
        type: z.enum(["KILL", "DEATH", "PLANT", "DEFUSE", "BUY_LOG"]),
        payload: z.any()
    })).optional()
});

export type GameStatePacket = z.infer<typeof GameStateSchema>;
