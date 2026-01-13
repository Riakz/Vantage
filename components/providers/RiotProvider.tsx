"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RiotData {
    account: any;
    matches: any[];
    // Generic Stats (Deprecated - use specific game stats)
    stats: {
        rr: number;
        tier: number;
        headshotPercent: number;
        winRate: number;
        kdRatio: number;
        currentRankText?: string;
    } | null;

    // Dedicated Game Stats
    valorant: {
        rank: string;
        rr: number;
        winRate: number;
        kdRatio: number;
        matches: any[];
    } | null;

    lol: {
        rank: string;
        lp: number;
        winRate: number;
        matches: any[];
    } | null;
}

interface RiotContextType {
    data: RiotData | null;
    loading: boolean;
    error: string | null;
    fetchRiotData: (name: string, tag: string) => Promise<void>;
}

const RiotContext = createContext<RiotContextType | undefined>(undefined);

export function RiotProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<RiotData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRiotData = async (name: string, tag: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/riot/me?name=${name}&tag=${tag}`);
            const json = await res.json();

            if (json.error) throw new Error(json.error);

            // Parse Valorant Data
            const valStats = json.valorant?.ranked;
            let valRank = "UNRANKED";
            let valRR = 0;
            if (valStats && valStats.rankedRating) {
                // valStats structure depends on what getRankedStats returns.
                // Assuming it returns the V1 object { currenttier, rankedRating, ... }
                // Need to map tier ID to name if possible, or just show RR
                valRR = valStats.rankedRating;
                valRank = `Tier ${valStats.currenttier}`; // TODO: Map to Name
            }

            // Parse LoL Data
            const lolStats = json.lol?.ranked;
            let lolRank = "UNRANKED";
            let lolLP = 0;
            if (lolStats && Array.isArray(lolStats)) {
                const soloQ = lolStats.find((q: any) => q.queueType === "RANKED_SOLO_5x5");
                if (soloQ) {
                    lolRank = `${soloQ.tier} ${soloQ.rank}`;
                    lolLP = soloQ.leaguePoints;
                }
            }

            setData({
                account: json.account,
                matches: [],
                stats: { // Legacy fallback (defaults to LoL if present, else Val)
                    rr: lolLP || valRR,
                    tier: 0,
                    headshotPercent: 0,
                    winRate: 0, kdRatio: 0,
                    currentRankText: lolLP > 0 ? lolRank : valRank
                },
                valorant: {
                    rank: valRank,
                    rr: valRR,
                    winRate: 0, kdRatio: 0, matches: []
                },
                lol: {
                    rank: lolRank,
                    lp: lolLP,
                    winRate: 0, matches: []
                }
            });

        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RiotContext.Provider value={{ data, loading, error, fetchRiotData }}>
            {children}
        </RiotContext.Provider>
    );
}

export function useRiot() {
    const context = useContext(RiotContext);
    if (context === undefined) {
        throw new Error("useRiot must be used within a RiotProvider");
    }
    return context;
}

