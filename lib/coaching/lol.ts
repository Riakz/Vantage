import championsData from "../data/lol-champions.json";

// Role Definitions matched with our Fetch Script
type Role = "MAGE" | "MARKSMAN" | "ASSASSIN" | "TANK" | "BRUISER" | "SUPPORT_ENCHANTER";

// Create a Map for O(1) Lookup
const CHAMPION_MAP = new Map<string, Role>();
championsData.forEach((c: any) => {
    // Normalize names (remove spaces/punctuation for better matching if needed, but API usually is clean)
    CHAMPION_MAP.set(c.id, c.role as Role); // 'id' in DDragon is usually the Key name (e.g. "MonkeyKing")
    CHAMPION_MAP.set(c.name, c.role as Role); // Map Name as well for safety
});

export interface ItemRecommendation {
    id: number;
    name: string;
    reason: string;
    priority: "CORE" | "SITUATIONAL" | "COUNTER" | "CRITICAL";
}

export function getItemRecommendations(championName: string, enemyChampions: string[]): ItemRecommendation[] {
    const recommendations: ItemRecommendation[] = [];

    // Lookup Role from Official Data
    // Fallback to MAGE if not found (or could use BRUISER as generic)
    const myRole = CHAMPION_MAP.get(championName) || "BRUISER";

    // --- Threat Analysis ---
    // We can also check enemies against our DB to see if they are Healers/Tanks!
    // But for now, we'll keep the manual lists for "Archetypes" (Healers/Shielders) 
    // because DDragon tags like "Support" are too broad (could be Brand or Soraka).
    // Ideally, we'd tag them manually or use more granular data.
    const healers = ["Soraka", "Yuumi", "Sona", "Nami", "Taric", "Vladimir", "Aatrox", "Sylas", "DrMundo", "Warwick", "Briar"];
    const shielders = ["Lulu", "Janna", "Karma", "Sett", "TahmKench", "Shen", "Seraphine", "Ivern"];
    const tanks = ["Ornn", "Sion", "Malphite", "ChoGath", "Rammus", "Sejuani", "Zac", "Amumu", "Ksante"];
    const ccHeavy = ["Malzahar", "Skarner", "Warwick", "Lissandra", "Leona", "Nautilus", "Blitzcrank"];
    const burstAssassins = ["Zed", "Talon", "Rengar", "Khazix", "Leblanc", "Fizz", "Akali", "Qiyana"];

    const enemyHealers = enemyChampions.filter(c => healers.includes(c));
    const enemyShielders = enemyChampions.filter(c => shielders.includes(c));
    const enemyTanks = enemyChampions.filter(c => tanks.includes(c));
    const enemyCC = enemyChampions.filter(c => ccHeavy.includes(c));
    const enemyBurst = enemyChampions.filter(c => burstAssassins.includes(c));

    // --- Logic Engine ---

    // 1. Anti-Heal (Grievous Wounds)
    if (enemyHealers.length > 0) {
        if (myRole === "MAGE" || myRole === "SUPPORT_ENCHANTER") {
            recommendations.push({ id: 3165, name: "Morellonomicon", reason: `Anti-Heal needed vs ${enemyHealers[0]}`, priority: "COUNTER" });
        } else if (myRole === "MARKSMAN" || myRole === "ASSASSIN" || myRole === "BRUISER") {
            recommendations.push({ id: 3033, name: "Mortal Reminder/Chempunk", reason: `Anti-Heal needed vs ${enemyHealers[0]}`, priority: "COUNTER" });
        } else if (myRole === "TANK") {
            recommendations.push({ id: 3075, name: "Thornmail", reason: `Anti-Heal needed vs ${enemyHealers[0]}`, priority: "COUNTER" });
        }
    }

    // 2. Anti-Shield
    if (enemyShielders.length > 0) {
        if (myRole === "MAGE") { // AP Users
            recommendations.push({ id: 4645, name: "Shadowflame", reason: `Shield Breaker vs ${enemyShielders[0]}`, priority: "SITUATIONAL" });
        } else if (myRole === "MARKSMAN" || myRole === "ASSASSIN") { // AD Users (Assuming Assassins are AD for simplicity or Lethality users)
            recommendations.push({ id: 6695, name: "Serpent's Fang", reason: `Destroy Shields vs ${enemyShielders[0]}`, priority: "SITUATIONAL" });
        }
    }

    // 3. Anti-Tank (% HP / Pen)
    if (enemyTanks.length > 1) {
        if (myRole === "MAGE") {
            recommendations.push({ id: 6653, name: "Liandry's Torment", reason: "Burn down High HP Tanks", priority: "CORE" });
            recommendations.push({ id: 3135, name: "Void Staff", reason: "Magic Pen vs MR Stacking", priority: "CRITICAL" });
        } else if (myRole === "MARKSMAN") {
            recommendations.push({ id: 3036, name: "Lord Dominik's Regards", reason: "Armor Pen vs Tanks", priority: "CRITICAL" });
            recommendations.push({ id: 3153, name: "Blade of the Ruined King", reason: "% HP Damage vs Heartsteel users", priority: "SITUATIONAL" });
        } else if (myRole === "BRUISER") {
            recommendations.push({ id: 3071, name: "Black Cleaver", reason: "Armor Shred vs Tanks", priority: "CORE" });
        }
    }

    // 4. Anti-CC (QSS / Cleanse)
    if (enemyCC.length > 0) {
        recommendations.push({ id: 3111, name: "Mercury's Treads", reason: "High CC detected (Tenacity)", priority: "SITUATIONAL" });
        if (myRole === "MARKSMAN" || myRole === "ASSASSIN") {
            recommendations.push({ id: 3139, name: "Mercurial Scimitar (QSS)", reason: `Cleanse suppression from ${enemyCC[0]}`, priority: "CRITICAL" });
        }
    }

    // 5. Anti-Burst (Survival)
    if (enemyBurst.length > 0) {
        if (myRole === "MAGE") {
            recommendations.push({ id: 3157, name: "Zhonya's Hourglass", reason: `Survive burst from ${enemyBurst[0]}`, priority: "CRITICAL" });
        } else if (myRole === "MARKSMAN") {
            recommendations.push({ id: 3026, name: "Guardian Angel", reason: `Revive after burst from ${enemyBurst[0]}`, priority: "CRITICAL" });
        }
    }

    return recommendations.slice(0, 4); // Top 4 recommendations
}
