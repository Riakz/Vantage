import agentsData from "../data/valorant-agents.json";

export interface Strat {
    map: string;
    agent: string;
    side: "ATTACK" | "DEFENSE";
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
}

// Validation Helper
function getOfficialAgentName(inputName: string): string | undefined {
    const agent = agentsData.find(a => a.name.toLowerCase() === inputName.toLowerCase());
    return agent ? agent.name : undefined;
}

const STRAT_DB: Strat[] = [
    // --- ASCENT ---
    {
        map: "Ascent", agent: "Jett", side: "DEFENSE",
        title: "A Short Operator Hold",
        description: "Hold the angle from A Short or Garden. Take the first shot and dash back to Tree/Site immediately. Do not re-peek.",
        difficulty: "EASY"
    },
    {
        map: "Ascent", agent: "Jett", side: "ATTACK",
        title: "Dash-Smoke Entry A",
        description: "Smoke the generator/Door switch. Dash into the smoke to create space while teammates flash A Main.",
        difficulty: "MEDIUM"
    },
    {
        map: "Ascent", agent: "Sova", side: "ATTACK",
        title: "B Main Recon God Arrow",
        description: "Stand back B Main. Aim at the window corner. Reveals back site and stairs. clears close angles for duelists.",
        difficulty: "HARD"
    },
    {
        map: "Ascent", agent: "Killjoy", side: "DEFENSE",
        title: "B Site Lockdown Setup",
        description: "Place Alarmbot on Lane. Turret on Market. Nano Swarms on the default plant spot and Lane choke.",
        difficulty: "MEDIUM"
    },

    // --- BIND ---
    {
        map: "Bind", agent: "Viper", side: "ATTACK",
        title: "A Short Execution Wall",
        description: "Wall from A Short to block U-Hall and Site vision. Orb on Showers exit. Plant safely in the pocket.",
        difficulty: "MEDIUM"
    },
    {
        map: "Bind", agent: "Raze", side: "DEFENSE",
        title: "Showers Aggression",
        description: "Paint Shells early into Showers to deny entry. Hold offset angle with flowing movements.",
        difficulty: "EASY"
    },

    // --- HAVEN ---
    {
        map: "Haven", agent: "Omen", side: "ATTACK",
        title: "C Long Smoke & Blind",
        description: "Smoke C Site (Logs and Platform). Paranoia efficiently towards back site before team enters.",
        difficulty: "EASY"
    }
];

export function getOpeningStrat(mapName: string, agentName: string, side: "ATTACK" | "DEFENSE"): Strat {
    const officialName = getOfficialAgentName(agentName) || agentName; // Use official name if found

    const strat = STRAT_DB.find(s =>
        s.map.toLowerCase() === mapName.toLowerCase() &&
        s.agent.toLowerCase() === officialName.toLowerCase() &&
        s.side === side
    );

    if (strat) return strat;

    // Fallback Advice
    if (side === "ATTACK") {
        return {
            map: mapName, agent: officialName, side: "ATTACK",
            title: "Default Entry / Trade",
            description: `Play standard ${officialName} protocol. If Duelist, enter first. If Support, trade kills.`,
            difficulty: "EASY"
        };
    } else {
        return {
            map: mapName, agent: officialName, side: "DEFENSE",
            title: "Hold Standard Angles",
            description: "Do not over-peek. Hold crossfires with teammates. Play for retake if outnumbered.",
            difficulty: "EASY"
        };
    }
}
