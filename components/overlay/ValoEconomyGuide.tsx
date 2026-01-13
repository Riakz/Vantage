"use client";

import { useMemo } from "react";
import { getEconomyAdvice } from "@/lib/coaching/valorant";
import { DollarSign, ShieldAlert, ArrowRight } from "lucide-react";

export function ValoEconomyGuide({ money = 800, round = 1, lossBonus = 1900, wonRound = false }: { money?: number, round?: number, lossBonus?: number, wonRound?: boolean }) {
    const advice = useMemo(() => getEconomyAdvice(money, lossBonus, round, wonRound), [money, round, lossBonus, wonRound]);

    const colorMap: Record<string, string> = {
        "SAVE": "text-yellow-400 border-yellow-500/50 bg-yellow-500/10",
        "FULL_BUY": "text-green-400 border-green-500/50 bg-green-500/10",
        "FORCE": "text-red-400 border-red-500/50 bg-red-500/10",
        "PISTOL": "text-blue-400 border-blue-500/50 bg-blue-500/10",
        "BONUS": "text-purple-400 border-purple-500/50 bg-purple-500/10",
        "HERO_BUY": "text-orange-400 border-orange-500/50 bg-orange-500/10"
    };

    const style = colorMap[advice.action] || colorMap["SAVE"];

    return (
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 backdrop-blur-md ${style}`}>
            <div className="flex items-center gap-2 text-2xl font-black uppercase tracking-widest">
                <DollarSign className="w-6 h-6" />
                {advice.action.replace("_", " ")}
            </div>
            <div className="text-sm font-medium opacity-90 text-center">
                {advice.reason}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs opacity-60">
                <span>Next Round: ${advice.nextRoundMoney}</span>
                <ArrowRight className="w-3 h-3" />
            </div>
        </div>
    );
}
