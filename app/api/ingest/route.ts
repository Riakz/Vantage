import { NextResponse } from "next/server";
import { updateState } from "@/lib/gamestate";

// This endpoint receives data from the local game client/OCR
export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate secret key (simple security for now)
        const apiKey = request.headers.get("x-vantage-key");
        if (apiKey !== "dev-secret") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // console.log(">> VANTAGE INGEST:", data); // Silenced for cleaner terminal

        // Save to in-memory store
        updateState(data);

        // Here we would push to WebSocket/Supabase Realtime
        // For now, we just acknowledge

        return NextResponse.json({ success: true, processed: true });
    } catch (error) {
        return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }
}
