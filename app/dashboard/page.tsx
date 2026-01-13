import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardStatsGrid } from "@/components/dashboard/DashboardStatsGrid";
import { RecentMatches } from "@/components/dashboard/RecentMatches";
import { PerformanceGraph } from "@/components/dashboard/PerformanceGraph";
import { OverlayController } from "@/components/admin/OverlayController";
import { Crosshair, Trophy, TrendingUp, Skull } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">Overview</h1>
                <p className="text-muted-foreground">Welcome back, Agent.</p>
            </div>

            <DashboardStatsGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {/* Placeholder for Graph */}
                    <PerformanceGraph />
                    {/* Admin Controls for Demo */}
                    <div className="mt-4">
                        <h3 className="font-bold text-lg mb-2 text-primary">Live Control</h3>
                        <OverlayController />
                    </div>
                    <div className="bg-gradient-to-r from-secondary to-card p-6 rounded-lg border border-border">
                        <h3 className="font-bold text-xl mb-2 text-primary">Coach Insight</h3>
                        <p className="text-sm text-foreground/80 max-w-2xl">
                            Great job on <span className="text-accent">Ascent</span> lately. Your mid-control has improved significantly.
                            However, watch your eco-management on defense rounds; you tend to force buy too frequently.
                        </p>
                    </div>
                </div>

                <div>
                    <RecentMatches />
                </div>
            </div>
        </div>
    );
}
