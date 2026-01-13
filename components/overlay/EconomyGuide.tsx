"use client";

import { Wallet, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function EconomyGuide() {
    // Mock data - in real app, these come from Websocket/Context
    const [money, setMoney] = useState(4200);
    const [round, setRound] = useState(3);
    const [rec, setRec] = useState("HALF_BUY");

    useEffect(() => {
        // 1. Poll Server for C++ Client updates
        const interval = setInterval(async () => {
            try {
                const res = await fetch("/api/live/state");
                const data = await res.json();
                if (!data.empty && data.player) {
                    setMoney(data.player.money);
                    setRound(data.roundNumber);
                }
            } catch (e) { /* ignore */ }
        }, 200);

        // 2. Listen to local BroadcastChannel (for Admin Dashboard buttons)
        const bc = new BroadcastChannel("vantage_live_events");
        bc.onmessage = (event) => {
            if (event.data.type === "ECONOMY_UPDATE") {
                setMoney(event.data.payload.money);
                setRound(event.data.payload.round);
                setRec(event.data.payload.recommendation);
            }
        };
        return () => bc.close();
    }, []);

    return (
        <div className="bg-black/80 backdrop-blur-sm border-l-4 border-yellow-500 p-4 rounded-r-lg max-w-xs animate-in slide-in-from-right duration-500">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-500/20 p-2 rounded-full">
                    <Wallet className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                    <h3 className="font-bold text-lg uppercase leading-none">Economy</h3>
                    <p className="text-xs text-white/50 font-mono">ROUND {round} // ${money}</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-2xl font-black uppercase text-yellow-400 tracking-wider">
                    {rec.replace("_", " ")}
                </div>
                <p className="text-sm text-white/80 leading-tight">
                    Save for Operator next round. Buy light shields + Sheriff.
                </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs font-bold text-yellow-500/80 uppercase">
                <AlertTriangle className="w-3 h-3" />
                <span>Enemy has Rifles</span>
            </div>
        </div>
    );
}
