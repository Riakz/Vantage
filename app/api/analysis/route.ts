import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // Simulate heavy AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({
        matchId: "match_123",
        analysis: {
            economyGrade: "A-",
            positioningGrade: "B+",
            keyInsights: [
                "Good meticulous economy management in rounds 1-5.",
                "Rotation to A site on Ascent was consistently slow (avg 12s)."
            ]
        }
    });
}
