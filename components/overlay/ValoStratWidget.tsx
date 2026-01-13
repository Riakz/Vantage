"use client";

import { useMemo, useState } from "react";
import { getOpeningStrat } from "@/lib/coaching/valorant-strats";
import { Map, Crosshair, Users } from "lucide-react";

export function ValoStratWidget({ map = "Ascent", agent = "Jett" }: { map?: string; agent?: string }) {
    // In a real app, 'side' comes from live game state. Here we toggle for demo.
    const [side, setSide] = useState<"ATTACK" | "DEFENSE">("DEFENSE");
    const strat = useMemo(() => getOpeningStrat(map, agent, side), [map, agent, side]);

    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-4 h-full flex flex-col">
            {/* Header / Toggles */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    Opening Strategy
                </h3>
                <div className="flex p-1 bg-white/5 rounded-lg">
                    <button
                        onClick={() => setSide("ATTACK")}
                        className={`px-3 py-1 text-xs font-bold rounded ${side === "ATTACK" ? "bg-red-500/20 text-red-300" : "hover:bg-white/5"}`}
                    >
                        ATK
                    </button>
                    <button
                        onClick={() => setSide("DEFENSE")}
                        className={`px-3 py-1 text-xs font-bold rounded ${side === "DEFENSE" ? "bg-blue-500/20 text-blue-300" : "hover:bg-white/5"}`}
                    >
                        DEF
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-lg p-3 flex-1">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-white tracking-wide">{strat.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${strat.difficulty === "HARD" ? "border-red-500/30 text-red-400 bg-red-500/10" :
                            strat.difficulty === "MEDIUM" ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/10" :
                                "border-green-500/30 text-green-400 bg-green-500/10"
                        }`}>
                        {strat.difficulty}
                    </span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {strat.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-2 border-t border-white/5">
                    <Crosshair className="w-3 h-3" />
                    <span>Agent: {agent}</span>
                    <span className="mx-1">•</span>
                    <span>Map: {map}</span>
                </div>
            </div>
        </div>
    );
}
