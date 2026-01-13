export type Pacing = "POOR" | "AVERAGE" | "GOOD" | "CARRYING";

export function getStatsComparison(cs: number, gameTimeMinutes: number): { csPerMin: string, pacing: Pacing, targetDifference: string } {
    if (gameTimeMinutes < 1) return { csPerMin: "0.0", pacing: "AVERAGE", targetDifference: "0" };

    const csPerMin = cs / gameTimeMinutes;
    const formattedCspm = csPerMin.toFixed(1);

    // Benchmarks (Simplified)
    // Pro: ~10 CS/min
    // Good: ~8 CS/min
    // Average: ~6 CS/min

    let pacing: Pacing = "POOR";
    let target = 0;

    if (csPerMin >= 9.5) {
        pacing = "CARRYING"; // Pro Level
        target = 0;
    } else if (csPerMin >= 7.5) {
        pacing = "GOOD"; // Diamond+
        target = Math.ceil((10 - csPerMin) * gameTimeMinutes);
    } else if (csPerMin >= 5.5) {
        pacing = "AVERAGE"; // Silver/Gold
        target = Math.ceil((8 - csPerMin) * gameTimeMinutes);
    } else {
        pacing = "POOR"; // Needs work
        target = Math.ceil((6 - csPerMin) * gameTimeMinutes);
    }

    const diffText = target > 0 ? `-${target} CS for Next Tier` : "Perfect";

    return {
        csPerMin: formattedCspm,
        pacing,
        targetDifference: diffText
    };
}
