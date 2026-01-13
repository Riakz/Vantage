"use client";

import { Swords, Eye, Zap, Brain } from "lucide-react";
import { LoLStatsGrid } from "@/components/lol/LoLStatsGrid";

export default function LoLDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-500">
                League of Legends <span className="text-foreground">Command Center</span>
            </h1>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-pointer group">
                    <Zap className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg">Live Coaching</h3>
                    <p className="text-sm text-muted-foreground">Real-time macro guidance & itemization</p>
                </div>

                <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-pointer group">
                    <Swords className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg">Wave Management</h3>
                    <p className="text-sm text-muted-foreground">Freeze, push, and bounce logic drills</p>
                </div>

                <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-pointer group">
                    <Eye className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg">Vision Control</h3>
                    <p className="text-sm text-muted-foreground">Ward maps & tracking timers</p>
                </div>

                <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-pointer group">
                    <Brain className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg">Replay Analysis</h3>
                    <p className="text-sm text-muted-foreground">AI-powered post-game review</p>
                </div>
            </div>

            {/* Placeholder for Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-4 mb-6">
                    <LoLStatsGrid />
                </div>

                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 min-h-[300px]">
                    <h3 className="font-bold text-xl mb-4">Ranked Progression</h3>
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Analysis waiting for first match...
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-bold text-xl mb-4">Recent Games</h3>
                    <div className="space-y-4">
                        {/* Mock Match */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600"></div>
                                <div>
                                    <div className="font-bold text-blue-400">Victory</div>
                                    <div className="text-xs text-muted-foreground">Ahri Mid • 25:12</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-bold">12/3/8</div>
                                <div className="text-xs text-muted-foreground">8.2 CS/m</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
