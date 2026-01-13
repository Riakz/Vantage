import { NextResponse } from "next/server";
import { getLatestState } from "@/lib/gamestate";

export async function GET() {
    const state = getLatestState();
    return NextResponse.json(state || { empty: true });
}
