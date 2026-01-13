// Simple in-memory store for the latest game state
// Note: In production serverless/edge, this won't work reliably. 
// Uses a global singleton pattern for dev server persistence.

export interface GameState {
    type?: "VALORANT" | "LOL_LIVE" | "PROFILE";
    timestamp: number;

    // Valorant Specifics
    phase?: string;
    roundNumber?: number;
    player?: {
        agent: string;
        health: number;
        money: number;
        weapon: string;
    };

    // LoL Specifics
    puuid?: string;
    inGame?: boolean;
    lolRank?: {
        tier: string;
        rank: string;
        leaguePoints: number;
    };
}

let gameState: GameState | null = null;

export const getLatestState = () => gameState;

export const updateState = (newState: any) => {
    // Basic merge to keep profile data if switching to game loop
    if (gameState && newState.type === "LOL_LIVE") {
        gameState = { ...gameState, ...newState };
    } else {
        gameState = newState;
    }
};
