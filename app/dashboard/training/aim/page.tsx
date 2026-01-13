"use client";

import { NeonButton } from "@/components/ui/NeonButton";
import { useState, useEffect, useRef } from "react";
import { Crosshair, Play, RotateCcw } from "lucide-react";

export default function AimTrainer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [target, setTarget] = useState({ x: 50, y: 50 }); // Percentages
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    const moveTarget = () => {
        const x = Math.random() * 90 + 5; // Keep away from edges
        const y = Math.random() * 80 + 10;
        setTarget({ x, y });
    };

    const handleClick = () => {
        if (!isPlaying) return;
        setScore(s => s + 1);
        moveTarget();
        // Play sound if possible
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setIsPlaying(true);
        moveTarget();
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Reflex <span className="text-primary">Grid</span></h1>
                    <p className="text-muted-foreground">Click the blue targets as fast as you can.</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-mono font-bold text-primary">{timeLeft}s</div>
                    <div className="text-sm uppercase text-muted-foreground">Time Remaining</div>
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative h-[500px] w-full bg-card border border-border rounded-xl overflow-hidden cursor-crosshair select-none"
                onClick={() => {
                    if (isPlaying) setScore(s => Math.max(0, s - 1)); // Penalty for miss
                }}
            >
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />

                {!isPlaying && timeLeft > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
                        <div className="text-center space-y-4">
                            <Crosshair className="w-16 h-16 mx-auto text-primary animate-pulse" />
                            <NeonButton onClick={startGame} variant="primary" className="text-xl px-8 py-6">
                                Start Round
                            </NeonButton>
                        </div>
                    </div>
                )}

                {!isPlaying && timeLeft === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black uppercase text-accent">Finished!</h2>
                            <div className="text-6xl font-black text-white">{score}</div>
                            <p className="text-muted-foreground uppercase tracking-widest text-sm">Target Eliminations</p>
                            <NeonButton onClick={startGame} variant="secondary">
                                <RotateCcw className="w-4 h-4 mr-2" /> Play Again
                            </NeonButton>
                        </div>
                    </div>
                )}

                {isPlaying && (
                    <div
                        className="absolute w-12 h-12 bg-primary rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:bg-white transition-colors duration-75 flex items-center justify-center z-10"
                        style={{ top: `${target.y}%`, left: `${target.x}%`, transform: 'translate(-50%, -50%)' }}
                        onMouseDown={(e) => {
                            e.stopPropagation(); // Prevent background click penalty
                            handleClick();
                        }}
                    >
                        <div className="w-2 h-2 bg-black rounded-full" />
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center bg-secondary/20 p-4 rounded-lg border border-border">
                <div className="text-sm text-muted-foreground">
                    Avg Reaction: <span className="text-white font-mono">{score > 0 ? (30000 / score).toFixed(0) : 0}ms</span>
                </div>
                <div className="text-2xl font-black uppercase text-white">
                    Score: {score}
                </div>
            </div>
        </div>
    );
}
