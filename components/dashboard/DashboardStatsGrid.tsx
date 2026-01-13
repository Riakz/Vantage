"use client";

import { MetricCard } from "@/components/dashboard/MetricCard";
import { useRiot } from "@/components/providers/RiotProvider";
import { Crosshair, Trophy, TrendingUp, Skull } from "lucide-react";

export function DashboardStatsGrid() {
    const { data, loading } = useRiot();

    if (loading || !data || !data.valorant) {
        // Skull placeholder / Skeletons
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-card/50 rounded-lg border border-border/50" />)}
            </div>
        );
    }

    const stats = data.valorant; // Strict Valorant Data

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
                label="Valorant Rank"
                value={stats.rank || "Unranked"}
                subValue={stats.rr > 0 ? `${stats.rr} RR` : undefined}
                icon={Trophy}
                trend="Live Data"
                trendUp={stats.rr > 0}
            />
            <MetricCard
                label="Win Rate"
                value={stats.winRate > 0 ? `${stats.winRate}%` : "N/A"}
                icon={TrendingUp}
                trend={stats.winRate > 50 ? "Positive" : "Neutral"}
                trendUp={stats.winRate > 50}
            />
            <MetricCard
                label="K/D Ratio"
                value={stats.kdRatio > 0 ? `${stats.kdRatio}` : "N/A"}
                icon={Skull}
                trend={stats.kdRatio > 1 ? "Positive" : "Neutral"}
                trendUp={stats.kdRatio > 1}
            />
            <MetricCard
                label="Recent Matches"
                value={data.matches.length > 0 ? `${data.matches.length}` : "-"}
                icon={Crosshair}
                trend={data.matches.length > 0 ? "Analyzed" : "No Data"}
                trendUp={data.matches.length > 0}
            />
        </div>
    );
}
