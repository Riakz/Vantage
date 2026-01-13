"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface QueueStats {
    queueType: string;
    tier: string;
    rank: string;
    lp: number;
    wins: number;
    losses: number;
    winRate: number;
}

export interface LoLStats {
    queues: QueueStats[];
}

interface LoLLiveData {
    inGame: boolean;
    championId: number;
    championName: string;
    opponentChampionName: string; // Enemy Laner
    gameTime: number;
}

interface LoLContextType {
    stats: LoLStats | null;
    live: LoLLiveData | null;
    loading: boolean;
    refresh: () => Promise<void>;
}

const LoLContext = createContext<LoLContextType | undefined>(undefined);

export function LoLProvider({ children }: { children: ReactNode }) {
    const [stats, setStats] = useState<LoLStats | null>(null);
    const [live, setLive] = useState<LoLLiveData | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        try {
            const res = await fetch("/api/live/state");
            const data = await res.json();

            // Check if we have LoL data
            if (data?.type === "PROFILE" || data?.type === "LOL_LIVE") {
                setLoading(false);

                // Update Stats if available
                if (data.lolRank && data.lolRank.queues) {
                    const parsedQueues = data.lolRank.queues.map((q: any) => ({
                        queueType: q.queueType,
                        tier: q.tier,
                        rank: q.rank,
                        lp: q.leaguePoints,
                        wins: q.wins,
                        losses: q.losses,
                        winRate: Math.round((q.wins / (q.wins + q.losses)) * 100)
                    }));
                    setStats({ queues: parsedQueues });
                }

                // Update Live Game Status
                if (data.inGame) {
                    setLive({
                        inGame: true,
                        // We will need to fetch real champ info via LCU later
                        // For now we trust the "inGame" flag
                        championId: 0,
                        championName: "Unknown (In Game)",
                        opponentChampionName: "Analyzing...",
                        gameTime: 0
                    });
                } else {
                    setLive(prev => prev ? { ...prev, inGame: false } : null);
                }
            }
        } catch (e) {
            console.error("Failed to fetch LoL state", e);
        }
    };

    useEffect(() => {
        // Poll every second
        const interval = setInterval(refresh, 1000);
        return () => clearInterval(interval);
    }, []);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Auto-Redirect to Live Match when game starts
        if (live?.inGame && pathname !== "/live-match") {
            console.log(">> Game Detected! Redirecting to Live Match...");
            router.push("/live-match");
        }
    }, [live?.inGame, pathname, router]);

    return (
        <LoLContext.Provider value={{ stats, live, loading, refresh }}>
            {children}
        </LoLContext.Provider>
    );
}

export function useLoL() {
    const context = useContext(LoLContext);
    if (context === undefined) {
        // Return fallback to prevent build errors during prerendering
        return {
            stats: null,
            live: null,
            loading: false,
            refresh: async () => { }
        };
    }
    return context;
}

