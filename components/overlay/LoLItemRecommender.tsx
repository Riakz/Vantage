"use client";

import { useMemo } from "react";
import { getItemRecommendations } from "@/lib/coaching/lol";
import { ShieldAlert, Sword } from "lucide-react";

export function LoLItemRecommender({ myChamp = "Ahri", enemies = [] }: { myChamp?: string, enemies?: string[] }) {
    const items = useMemo(() => getItemRecommendations(myChamp, enemies), [myChamp, enemies]);

    if (items.length === 0) return null;

    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase mb-3 flex items-center gap-2">
                <Sword className="w-4 h-4" />
                Smart Build Path
            </h3>
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                        {/* Mock Icon - In real app use LCU assets */}
                        <div className="w-8 h-8 rounded bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold">ITEM</span>
                        </div>
                        <div>
                            <div className="font-bold text-sm text-purple-200">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.reason}</div>
                            {item.priority === "COUNTER" && (
                                <span className="inline-block mt-1 text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded border border-red-500/30">
                                    COUNTER
                                </span>
                            )}
                            {item.priority === "CRITICAL" && (
                                <span className="inline-block mt-1 text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 animate-pulse">
                                    CRITICAL
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
