"use client";

import { useMemo } from "react";
import { getStatsComparison } from "@/lib/coaching/lol-stats";
import { TrendingUp, Target } from "lucide-react";

export function LoLBenchmarkWidget({ cs = 0, time = 0 }: { cs?: number, time?: number }) {
    const stats = useMemo(() => getStatsComparison(cs, time), [cs, time]);

    const colorMap = {
        "POOR": "text-red-400 border-red-500/30",
        "AVERAGE": "text-yellow-400 border-yellow-500/30",
        "GOOD": "text-blue-400 border-blue-500/30",
        "CARRYING": "text-green-400 border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]"
    };

    return (
        <div className={`mt-2 bg-black/40 border border-white/10 rounded-xl p-3 flex items-center justify-between`}>
            {/* Main Stat */}
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border bg-white/5 ${colorMap[stats.pacing]} text-lg font-bold`}>
                    {stats.csPerMin}
                </div>
                <div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">CS / Min</div>
                    <div className={`text-sm font-medium ${colorMap[stats.pacing].split(" ")[0]}`}>
                        {stats.pacing}
                    </div>
                </div>
            </div>

            {/* Target Advice */}
            <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground mb-1">
                    <Target className="w-3 h-3" />
                    Target
                </div>
                <span className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10">
                    {stats.targetDifference}
                </span>
            </div>
        </div>
    );
}
