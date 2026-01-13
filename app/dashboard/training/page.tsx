import { NeonButton } from "@/components/ui/NeonButton";
import { Crosshair, Brain, Play } from "lucide-react";
import Link from "next/link";

export default function TrainingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">Training Modules</h1>
                <p className="text-muted-foreground">Sharpen your skills with Vantage proprietary drills.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Aim / Reflex ModuleCard */}
                <div className="group relative bg-card border border-border p-8 rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Crosshair className="w-32 h-32" />
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-primary/20 w-fit p-3 rounded-lg">
                            <Crosshair className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold uppercase">Aim & Reflex</h2>
                        <p className="text-muted-foreground">
                            Test your reaction time and raw mechanical precision with our micro-drills.
                        </p>
                        <div className="pt-4">
                            <Link href="/dashboard/training/aim">
                                <NeonButton variant="primary">Start Drill <Play className="w-4 h-4 ml-2 inline" /></NeonButton>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decision Making ModuleCard */}
                <div className="group relative bg-card border border-border p-8 rounded-lg overflow-hidden hover:border-accent/50 transition-colors">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Brain className="w-32 h-32 text-accent" />
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="bg-accent/20 w-fit p-3 rounded-lg">
                            <Brain className="w-8 h-8 text-accent" />
                        </div>
                        <h2 className="text-2xl font-bold uppercase text-accent">Decision Making</h2>
                        <p className="text-muted-foreground">
                            Analyze clutch scenarios and improve your game sense with interactive puzzles.
                        </p>
                        <div className="pt-4">
                            <Link href="/dashboard/training/decision">
                                <NeonButton variant="secondary">Start Analysis <Play className="w-4 h-4 ml-2 inline" /></NeonButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
