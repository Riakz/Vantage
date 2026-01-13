"use client";

import { useEffect, useState } from "react";
import { Eye, Clock } from "lucide-react";

export function PeakTimer() {
    const [progress, setProgress] = useState(100);

    // Mock simulation of a timing window
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => (prev > 0 ? prev - 1 : 100));
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-primary/50 w-64 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="font-bold uppercase text-sm">Peak Hazard</span>
                </div>
                <span className="font-mono text-xs text-primary animate-pulse">HIGH</span>
            </div>

            <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="mt-2 text-xs text-center text-white/60">
                Wait for Jett dash before peeking mid.
            </div>
        </div>
    );
}
