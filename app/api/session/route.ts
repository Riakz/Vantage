import { NextResponse } from "next/server";
import { getSessions, MOCK_SESSIONS } from "@/lib/data";

export async function GET() {
    const sessions = await getSessions();
    return NextResponse.json(sessions);
}

export async function POST(request: Request) {
    const body = await request.json();
    // In a real app, this would insert into DB
    const newSession = {
        id: `sess_${Date.now()}`,
        date: new Date().toISOString(),
        map: body.map || "Unknown",
        agent: body.agent || "Unknown",
        result: "PENDING",
        score: "0-0",
        kda: "0/0/0",
    };

    return NextResponse.json(newSession);
}
