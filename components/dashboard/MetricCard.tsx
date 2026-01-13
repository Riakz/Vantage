import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    label: string;
    value: string;
    subValue?: string;
    icon: any;
    trend?: string;
    trendUp?: boolean;
}

export function MetricCard({ label, value, subValue, icon: Icon, trend, trendUp }: MetricCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between hover:border-primary/50 transition-colors group relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 z-10 relative">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                <div className="p-2 bg-secondary rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Icon className="w-4 h-4" />
                </div>
            </div>

            <div className="z-10 relative">
                <div className="text-2xl font-black tracking-tight">{value}</div>
                {subValue && <div className="text-xs text-muted-foreground font-mono mt-1">{subValue}</div>}
            </div>

            {trend && (
                <div className={cn("text-xs font-bold mt-2 flex items-center gap-1 z-10 relative", trendUp ? "text-green-500" : "text-red-500")}>
                    {trendUp ? "↑" : "↓"} {trend}
                </div>
            )}

            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}
