"use client";

import { useLoL } from "@/components/providers/LoLProvider";
import { Zap, Shield, Swords, Brain } from "lucide-react";

export default function LiveCoaching() {
    const { live, loading } = useLoL();

    if (loading) return <div className="p-10 text-center animate-pulse">Scanning Summoner's Rift...</div>;

    if (!live?.inGame) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
                    <Zap className="w-12 h-12 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold">No Active Game Detected</h2>
                <p className="text-muted-foreground max-w-md">
                    Launch League of Legends and enter a match to activate the Live Coaching Assistant.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header / Matchup Info */}
            <div className="flex items-center justify-between p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent" />

                <div className="relative z-10 flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-sm font-bold text-blue-400 uppercase tracking-widest">YOU</div>
                        <div className="text-4xl font-black text-white">{live.championName}</div>
                    </div>

                    <div className="flex flex-col items-center px-4">
                        <Swords className="w-8 h-8 text-muted-foreground mb-1" />
                        <span className="text-xs font-mono text-muted-foreground">VS</span>
                    </div>

                    <div className="text-center">
                        <div className="text-sm font-bold text-red-400 uppercase tracking-widest">OPPONENT</div>
                        <div className="text-4xl font-black text-white opacity-80">{live.opponentChampionName}</div>
                    </div>
                </div>

                <div className="relative z-10 text-right">
                    <div className="text-xs text-muted-foreground uppercase">Game Time</div>
                    <div className="text-2xl font-mono text-blue-400">
                        {Math.floor(live.gameTime / 60)}:{String(live.gameTime % 60).padStart(2, '0')}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Rune Guidance */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <h3 className="font-bold text-lg">Active Runes Plan</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Detected setup optimized for vs {live.opponentChampionName}.
                    </p>
                    <div className="space-y-2">
                        <div className="p-3 bg-secondary/30 rounded flex justify-between items-center">
                            <span>Primary: Electrocute</span>
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Burst</span>
                        </div>
                        <div className="p-3 bg-secondary/30 rounded flex justify-between items-center">
                            <span>Secondary: Sorcery</span>
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Scaling</span>
                        </div>
                    </div>
                </div>

                {/* 2. Wave Management */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-blue-400" />
                        <h3 className="font-bold text-lg">Laning Strategy</h3>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4 text-center">
                        <div className="text-xs uppercase text-blue-400 font-bold mb-1">Current Goal</div>
                        <div className="text-2xl font-black text-white">SLOW PUSH</div>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                        <li>Build a large wave to crash.</li>
                        <li>Look for roam timer at level 6.</li>
                        <li>Respect enemy jungle pathing (Top Side).</li>
                    </ul>
                </div>

                {/* 3. Item Build */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <h3 className="font-bold text-lg">Next Item Spike</h3>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-800 rounded border border-gray-600"></div>
                        <div>
                            <div className="font-bold text-purple-300">Luden's Companion</div>
                            <div className="text-xs text-muted-foreground">Cost: 3200g</div>
                        </div>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full w-[65%]" />
                    </div>
                    <div className="text-xs text-center mt-1 text-muted-foreground">Gold Needed: 450g</div>
                </div>
            </div>
        </div>
    );
}
