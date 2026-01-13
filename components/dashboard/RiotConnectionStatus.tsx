"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useRiot } from "@/components/providers/RiotProvider";

export function RiotConnectionStatus() {
    const { data, loading, error, fetchRiotData } = useRiot();
    const [riotId, setRiotId] = useState("Riakz#EUW");

    // Initial fetch on mount or when ID changes via input
    useEffect(() => {
        const [name, tag] = riotId.split("#");
        if (name && tag) {
            fetchRiotData(name, tag);
        }
    }, [riotId]); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) return <div className="flex items-center gap-2 text-muted-foreground text-xs"><Loader2 className="w-3 h-3 animate-spin" /> Fetching {riotId}...</div>;

    if (error) return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-destructive text-xs bg-destructive/10 px-2 py-1 rounded border border-destructive/20">
                <XCircle className="w-3 h-3" />
                <span>Invalid: {riotId}</span>
            </div>
            <input
                className="bg-background border border-border rounded px-2 py-1 text-xs w-32"
                placeholder="Name#TAG"
                defaultValue={riotId}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setRiotId(e.currentTarget.value);
                    }
                }}
            />
        </div>
    );

    if (!data) return null; // Should not happen if loading/error handled, but safe guard

    return (
        <div className="flex items-center gap-2 text-green-500 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            <CheckCircle className="w-4 h-4" />
            <span>Connected: {data.account.gameName}#{data.account.tagLine}</span>
            <span className="text-muted-foreground ml-1 font-normal">({data.matches.length} matches)</span>
        </div>
    );
}
