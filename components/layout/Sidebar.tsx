"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, History, Crosshair, Settings, Users, Video, Swords, Zap, Eye, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VALORANT_NAV = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Match History", icon: History, href: "/dashboard/history" },
    { label: "Training", icon: Crosshair, href: "/dashboard/training" },
    { label: "Replays", icon: Video, href: "/dashboard/replays" },
    { label: "Community", icon: Users, href: "/dashboard/community" },
];

const LOL_NAV = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard/lol" },
    { label: "Live Coaching", icon: Zap, href: "/dashboard/lol/live" },
    { label: "Wave Management", icon: Swords, href: "/dashboard/lol/wave" },
    { label: "Vision Control", icon: Eye, href: "/dashboard/lol/vision" },
    { label: "Replay Analysis", icon: Brain, href: "/dashboard/lol/replays" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [game, setGame] = useState<"valorant" | "lol">("valorant");

    // Auto-detect game based on URL if landing directly
    if (pathname.includes("/dashboard/lol") && game !== "lol") {
        setGame("lol");
    }

    const navItems = game === "valorant" ? VALORANT_NAV : LOL_NAV;

    return (
        <aside className="w-64 border-r border-border bg-card/50 flex flex-col fixed inset-y-0">
            <div className="p-6">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">
                    <span className="text-primary">Van</span>tage
                </h2>

                {/* Game Switcher */}
                <div className="flex bg-muted/50 p-1 rounded-lg mb-4">
                    <button
                        onClick={() => setGame("valorant")}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all",
                            game === "valorant"
                                ? "bg-red-500 text-white shadow-lg"
                                : "text-muted-foreground hover:text-white"
                        )}
                    >
                        Valorant
                    </button>
                    <button
                        onClick={() => setGame("lol")}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all",
                            game === "lol"
                                ? "bg-blue-500 text-white shadow-lg"
                                : "text-muted-foreground hover:text-white"
                        )}
                    >
                        LoL
                    </button>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={game}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                    >
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const isLol = game === "lol";

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group text-sm font-medium relative overflow-hidden",
                                        isActive
                                            ? isLol
                                                ? "bg-blue-500/10 text-blue-400"
                                                : "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5",
                                        isActive
                                            ? isLol ? "text-blue-400" : "text-primary"
                                            : "text-muted-foreground group-hover:text-foreground"
                                    )} />
                                    <span className="relative z-10">{item.label}</span>

                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className={cn(
                                                "absolute left-0 top-0 bottom-0 w-1",
                                                isLol ? "bg-blue-500" : "bg-primary"
                                            )}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <Settings className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                            Settings
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </nav>

            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white",
                        game === "lol" ? "bg-blue-500" : "bg-primary"
                    )}>
                        R
                    </div>
                    <div>
                        <p className="text-sm font-bold">Riakz</p>
                        <p className="text-xs text-muted-foreground">{game === "valorant" ? "Immortal I" : "Diamond IV"}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
