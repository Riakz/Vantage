export type EconomyAction = "SAVE" | "FULL_BUY" | "FORCE" | "PISTOL" | "BONUS" | "HERO_BUY";

export interface EconomyAdvice {
    action: EconomyAction;
    reason: string;
    nextRoundMoney: number;
}

/**
 * Advanced Economy Logic for Valorant IGL
 */
export function getEconomyAdvice(currentMoney: number, lossBonus: number, roundNumber: number, wonLastRound: boolean = false, isJettOrChamber: boolean = false): EconomyAdvice {
    const MIN_FULL_BUY = 3900; // Rifle (2900) + Shield (1000)
    const MIN_NEXT_ROUND = 3900;
    const OPERATOR_COST = 4700;

    // 1. Pistol Rounds (1 & 13)
    if (roundNumber === 1 || roundNumber === 13) {
        return { action: "PISTOL", reason: "Buy Ghost/Frenzy + Util. No shields if utilizing heavy.", nextRoundMoney: 0 };
    }

    // 2. Bonus Round (Round 2 or 14 after winning Pistol)
    if (wonLastRound && (roundNumber === 2 || roundNumber === 14) && currentMoney < MIN_FULL_BUY) {
        return {
            action: "BONUS",
            reason: "We won pistol! Buy Spectre/Bulldog/Marshal + Light Shield to keep eco advantage.",
            nextRoundMoney: 0
        };
    }

    // 3. Determining Buy Status
    if (currentMoney >= MIN_FULL_BUY) {
        // We can buy. But should we save for Op?
        if (isJettOrChamber && currentMoney < OPERATOR_COST) {
            const moneyNext = (currentMoney - 2000) + lossBonus; // Assuming light buy
            if (moneyNext >= OPERATOR_COST) {
                return { action: "SAVE", reason: "Light buy this round to guarantee Operator next round.", nextRoundMoney: moneyNext };
            }
        }

        // Standard Buy
        // Check if buying leaves us broke next round on loss
        const moneyAfterLoss = (currentMoney - MIN_FULL_BUY) + lossBonus;
        if (moneyAfterLoss < 1500) {
            return { action: "FULL_BUY", reason: "All-in Buy. Playing for the win, eco will be broken if lost.", nextRoundMoney: moneyAfterLoss };
        }
        return { action: "FULL_BUY", reason: "Standard Rifle + Heavy Shield + Util.", nextRoundMoney: moneyAfterLoss };
    }

    // 4. Force Buy Situations
    // Last round of half?
    if (roundNumber === 12 || roundNumber === 24) {
        return { action: "FORCE", reason: "Last round of half! SPEND EVERY CREDIT.", nextRoundMoney: 0 };
    }
    // Round 2 after Loss? (Force vs Bonus)
    if (!wonLastRound && (roundNumber === 2 || roundNumber === 14)) {
        return { action: "FORCE", reason: "Surprise Force? Sheriff/Stinger + Light Shield to contest their Bonus.", nextRoundMoney: 0 };
    }

    // 5. Hero Buy
    // If I have 4000 but team has 2000 (Simulated by generic input for now, ideally needs team avg)
    // For this generic function, we'll assume 'currentMoney' is average.
    // But if we had individual player money, we'd trigger HERO_BUY here.

    // 6. Default Save
    // Ensure we have MIN_NEXT_ROUND (3900) for next round
    const moneyNext = currentMoney + lossBonus;
    if (moneyNext >= MIN_NEXT_ROUND + 500) { // Slight buffer
        return { action: "SAVE", reason: `Save. Spend max to ${currentMoney - (MIN_NEXT_ROUND - lossBonus)} to guarantee Full Buy next.`, nextRoundMoney: moneyNext };
    }

    // Desperation Force
    return { action: "FORCE", reason: "Broken Economy. Team Force or Eco required. IGL Call: Play for picks.", nextRoundMoney: moneyNext };
}
