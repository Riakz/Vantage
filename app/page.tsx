import Image from "next/image";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background pointer-events-none" />

      <main className="z-10 flex flex-col items-center gap-8 text-center px-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">
            <span className="text-primary drop-shadow-[0_0_15px_rgba(255,70,85,0.5)]">Van</span>
            <span className="text-foreground">tage</span>
          </h1>
          <p className="text-xl text-muted-foreground uppercase tracking-widest font-mono">
            Elevate Your Game
          </p>
        </div>

        <Link
          href="/dashboard"
          className={cn(
            "group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold uppercase tracking-wider rounded-sm",
            "hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,70,85,0.3)] hover:shadow-[0_0_30px_rgba(255,70,85,0.6)]"
          )}
        >
          Enter Dashboard
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </main>

      <footer className="absolute bottom-8 text-sm text-muted-foreground font-mono">
        VANTAGE SYSTEM // v0.1.0
      </footer>
    </div>
  );
}
