import { NextResponse } from "next/server";
import { getAccount, getMatchHistory, getMatchDetails, getRankedStats, getLoLSummoner, getLoLRanked, getLoLMatches } from "@/lib/riot";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get("name") || "Riakz";
    const tagLine = searchParams.get("tag") || "EUW";

    try {
        const account = await getAccount(gameName, tagLine);
        if (!account) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // --- VALORANT ---
        const valRanked = await getRankedStats(account.puuid);
        // We skip matches for now to save API calls unless requested specifically

        // --- LEAGUE OF LEGENDS ---
        const lolSummoner = await getLoLSummoner(account.puuid);
        let lolRanked = null;
        if (lolSummoner) {
            lolRanked = await getLoLRanked(lolSummoner.id);
        }

        return NextResponse.json({
            account,
            valorant: {
                ranked: valRanked
            },
            lol: {
                summoner: lolSummoner,
                ranked: lolRanked
            }
        });
    } catch (e: any) {
        console.error("[API] Critical Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
