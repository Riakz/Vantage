const RIOT_API_KEY = process.env.RIOT_API_KEY;
const REGION = "europe"; // Account/PUUID lookup
const SHARD = "eu"; // Valorant Match Data

/**
 * Validates the API Key and throws if missing.
 */
function getApiKey() {
    if (!RIOT_API_KEY) {
        throw new Error("RIOT_API_KEY is not defined in environment variables.");
    }
    return RIOT_API_KEY;
}

/**
 * Fetches the User Account (PUUID) by Riot ID.
 * Example: Riakz#EUW
 */
export async function getAccount(gameName: string, tagLine: string) {
    const key = getApiKey();
    const url = `https://${REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;

    const res = await fetch(url, {
        headers: { "X-Riot-Token": key },
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
        console.error("Riot API Error (Account):", res.status, res.statusText);
        return null;
    }

    return res.json();
}

/**
 * Fetches the last 5 matches for a given PUUID.
 */
export async function getMatchHistory(puuid: string) {
    const key = getApiKey();
    const url = `https://${SHARD}.api.riotgames.com/val/match/v1/matches/by-puuid/${puuid}`;

    const res = await fetch(url, {
        headers: { "X-Riot-Token": key },
        next: { revalidate: 0 } // No cache for debugging
    });

    if (!res.ok) {
        console.error("Riot API Error (History):", res.status, res.statusText);
        return null;
    }

    // Returns list of Match IDs
    return res.json();
}

/**
 * Fetches details of a specific match.
 */
export async function getMatchDetails(matchId: string) {
    const key = getApiKey();
    const url = `https://${SHARD}.api.riotgames.com/val/match/v1/matches/${matchId}`;

    const res = await fetch(url, {
        headers: { "X-Riot-Token": key },
        next: { revalidate: 0 } // No cache for debugging
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

/**
 * Fetches MMR / Ranked Stats.
 */
export async function getRankedStats(puuid: string) {
    const key = getApiKey();
    const url = `https://${SHARD}.api.riotgames.com/val/ranked/v1/by-puuid/${puuid}`;

    const res = await fetch(url, {
        headers: { "X-Riot-Token": key },
        next: { revalidate: 0 } // No cache for debugging
    });

    if (!res.ok) {
        console.error("Riot API Error (Ranked):", res.status, res.statusText);
        return null;
    }
    return res.json();
}

// --- LEAGUE OF LEGENDS ---

export async function getLoLSummoner(puuid: string) {
    const key = getApiKey();
    // LoL Summoner V4
    const url = `https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;

    const res = await fetch(url, { headers: { "X-Riot-Token": key }, next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
}

export async function getLoLRanked(summonerId: string) {
    const key = getApiKey();
    // LoL League V4
    const url = `https://${REGION}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;

    const res = await fetch(url, { headers: { "X-Riot-Token": key }, next: { revalidate: 600 } });
    if (!res.ok) return null;
    return res.json();
}

export async function getLoLMatches(puuid: string) {
    const key = getApiKey();
    // LoL Match V5 (Regional Routing -> europe)
    const url = `https://${REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`;

    const res = await fetch(url, { headers: { "X-Riot-Token": key }, next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
}
