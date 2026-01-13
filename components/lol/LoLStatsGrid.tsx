import { useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { useRiot } from "@/components/providers/RiotProvider";
import { Crosshair, Trophy, TrendingUp, Zap } from "lucide-react";

export function LoLStatsGrid() {
    const { data, loading } = useRiot();

    // Strict LoL Data from Unified Provider
    const stats = data?.lol;

    if (loading || !data || !stats) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-card/50 rounded-lg border border-border/50" />)}
            </div>
        );
    }

    // Note: Queue Selector logic removed for now as RiotAPI (v1) gives simple aggregation
    // If we want detailed queues later, we should parse 'matches' or extend RiotProvider
    // For now, simple consolidated stats

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
                label="LoL Rank"
                value={stats.rank || "Unranked"}
                subValue={stats.lp > 0 ? `${stats.lp} LP` : undefined}
                icon={Trophy}
                trend="Live Data"
                trendUp={stats.lp > 0}
            />
            <MetricCard
                label="Win Rate"
                value={stats.winRate > 0 ? `${stats.winRate}%` : "N/A"}
                icon={TrendingUp}
                trend="Recent"
                trendUp={stats.winRate > 50}
            />
            <MetricCard
                label="Recent Activity"
                value={data.matches.length > 0 ? `${data.matches.length} Games` : "0 Games"}
                icon={Crosshair}
                trend="Season Total"
                trendUp={true}
            />
            <MetricCard
                label="Performance"
                value="Analyzing"
                icon={Zap}
                trend="Waiting for games..."
                trendUp={true}
            />
        </div>
    );
}
