"use client";

import { useRiot } from "@/components/providers/RiotProvider";
import { cn } from "@/lib/utils";

export function RecentMatches() {
    const { data } = useRiot();

    if (!data || !data.matches || data.matches.length === 0) {
        return (
            <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
                <p>No recent matches analyzed.</p>
            </div>
        );
    }

    const matches = data.matches.map((m: any) => {
        // Find local player
        const player = m.players.find((p: any) => p.puuid === data.account.puuid);
        const teamId = player?.teamId;
        const team = m.teams?.find((t: any) => t.teamId === teamId);
        const won = team?.won || false;

        return {
            id: m.matchInfo.matchId,
            map: m.matchInfo.mapId.split("/").pop() || "Unknown", // /Game/Maps/Ascent -> Ascent
            result: won ? "WIN" : "LOSS",
            agent: player?.characterId || "Unknown",
            score: `${m.teams.find((t: any) => t.teamId === teamId)?.roundsWon} - ${m.teams.find((t: any) => t.teamId !== teamId)?.roundsWon}`,
            kda: `${player?.stats?.kills}/${player?.stats?.deaths}/${player?.stats?.assists}`,
            date: m.matchInfo.gameStartMillis
        };
    });

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-bold text-lg">Recent Matches</h3>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Last {matches.length} Games</span>
            </div>

            <div className="divide-y divide-border">
                {matches.map((session: any) => (
                    <div key={session.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-1 h-12 rounded-full",
                                session.result === "WIN" ? "bg-accent" : "bg-destructive"
                            )} />

                            <div>
                                <div className="font-bold text-lg leading-none capitalize">{session.map.toLowerCase()}</div>
                                <div className="text-xs text-muted-foreground">{new Date(session.date).toLocaleDateString()}</div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className={cn(
                                "font-black text-xl",
                                session.result === "WIN" ? "text-accent" : "text-destructive"
                            )}>
                                {session.score}
                            </div>
                            <div className="text-xs font-mono text-muted-foreground">KDA: {session.kda}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
