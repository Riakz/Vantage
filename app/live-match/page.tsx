"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swords, Loader2, Trophy, ArrowLeft } from "lucide-react";
import { useLoL } from "@/components/providers/LoLProvider";
import { useRiot } from "@/components/providers/RiotProvider";
import { ValoEconomyGuide } from "@/components/overlay/ValoEconomyGuide";
import { LoLItemRecommender } from "@/components/overlay/LoLItemRecommender";
import { ValoStratWidget } from "@/components/overlay/ValoStratWidget";
import { LoLBenchmarkWidget } from "@/components/overlay/LoLBenchmarkWidget";

export default function LiveMatchPage() {
    const router = useRouter();
    const { live: lolLive, stats: lolStats } = useLoL();
    const { data: valData } = useRiot();

    // Close on ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                router.push("/dashboard");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);

    // Mock Loading (Wait for real data)
    const [loading, setLoading] = useState(false); // Can bind to real data loading

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-12">
                <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center text-muted-foreground hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard (ESC)
                </button>
                <div className="flex items-center gap-3">
                    <Swords className="w-8 h-8 text-red-500 animate-pulse" />
                    <h1 className="text-2xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Live Match Tracker
                    </h1>
                </div>
                <div className="w-32" /> {/* Spacer */}
            </div>

            {/* COACHING WIDGETS (THE BRAIN) */}
            <div className="w-full max-w-4xl mb-8">
                {/* LoL Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="space-y-4">
                        <LoLItemRecommender
                            myChamp="Ahri"
                            enemies={["Soraka", "Vayne", "Lee Sin", "Syndra", "Ornn"]}
                        />
                        <LoLBenchmarkWidget cs={185} time={22} />
                    </div>
                </div>

                {/* Valorant Section (Mocked for demo below LoL, in real app toggles) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValoEconomyGuide money={1800} round={2} lossBonus={2400} />
                    <ValoStratWidget map="Ascent" agent="Jett" />
                </div>
            </div>

            {/* Content */}
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Team 1 (Blue/Ally) */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-blue-400 mb-6 uppercase tracking-wider border-b border-blue-500/30 pb-2">
                        Ally Team
                    </h2>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 hover:border-blue-500/50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <span className="font-bold text-blue-300">P{i}</span>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Player {i}</div>
                                    <div className="text-xs text-blue-300/60">Level 324</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2 justify-end text-yellow-500">
                                    <Trophy className="w-4 h-4" />
                                    <span className="font-bold">Diamond IV</span>
                                </div>
                                <div className="text-xs text-green-400 font-mono">52% Winrate</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team 2 (Red/Enemy) */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-red-400 mb-6 uppercase tracking-wider border-b border-red-500/30 pb-2 text-right">
                        Enemy Team
                    </h2>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-red-950/20 border border-red-500/20 hover:border-red-500/50 transition-all flex-row-reverse">
                            <div className="flex items-center gap-4 flex-row-reverse">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <span className="font-bold text-red-300">E{i}</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-lg">Enemy {i}</div>
                                    <div className="text-xs text-red-300/60">Level 128</div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Trophy className="w-4 h-4" />
                                    <span className="font-bold">Platinum I</span>
                                </div>
                                <div className="text-xs text-red-400 font-mono">48% Winrate</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Footer Status */}
            <div className="fixed bottom-8 flex items-center gap-2 text-muted-foreground bg-black/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">Tracking Live Match...</span>
            </div>
        </div>
    );
}
