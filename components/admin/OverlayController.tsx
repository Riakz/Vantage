"use client";

import { useState } from "react";
import { Zap, DollarSign, Bomb } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton"; // Assuming I will create this or use standard button
import { cn } from "@/lib/utils";

export function OverlayController() {
    const [status, setStatus] = useState("Idle");

    const sendEvent = (type: string, payload: any) => {
        const bc = new BroadcastChannel("vantage_live_events");
        bc.postMessage({ type, payload });
        setStatus(`Sent: ${type}`);
        setTimeout(() => setStatus("Idle"), 2000);
    };

    return (
        <div className="bg-card border border-border p-6 rounded-lg space-y-4">
            <h3 className="font-bold text-lg uppercase tracking-wider flex justify-between">
                <span>Overlay Controller</span>
                <span className="text-xs font-mono text-muted-foreground">{status}</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => sendEvent("ECONOMY_UPDATE", { money: 3000, round: 4, recommendation: "SAVE" })}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-secondary hover:bg-secondary/80 rounded border border-border transition-all hover:border-yellow-500"
                >
                    <DollarSign className="w-6 h-6 text-yellow-500" />
                    <span className="text-xs font-bold">Force Save</span>
                </button>

                <button
                    onClick={() => sendEvent("ECONOMY_UPDATE", { money: 9000, round: 12, recommendation: "FULL_BUY" })}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-secondary hover:bg-secondary/80 rounded border border-border transition-all hover:border-green-500"
                >
                    <DollarSign className="w-6 h-6 text-green-500" />
                    <span className="text-xs font-bold">Full Buy</span>
                </button>

                <button
                    onClick={() => sendEvent("PEAK_HAZARD", { duration: 5000 })}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-secondary hover:bg-secondary/80 rounded border border-border transition-all hover:border-primary"
                >
                    <Zap className="w-6 h-6 text-primary" />
                    <span className="text-xs font-bold">Peak Hazard</span>
                </button>

                <button
                    onClick={() => sendEvent("SPIKE_PLANTED", { site: "A" })}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-secondary hover:bg-secondary/80 rounded border border-border transition-all hover:border-red-500"
                >
                    <Bomb className="w-6 h-6 text-destructive" />
                    <span className="text-xs font-bold">Spike Planted</span>
                </button>
            </div>

            <div className="text-xs text-muted-foreground text-center pt-2">
                Open /overlay/test in a new tab to see updates.
            </div>
        </div>
    );
}
