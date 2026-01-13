import fs from 'fs';
import path from 'path';

// URLs
const LOL_URL = "https://ddragon.leagueoflegends.com/cdn/16.1.1/data/fr_FR/champion.json";
const VALO_URL = "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=fr-FR";

// Paths
const DATA_DIR = path.resolve('lib/data');

// Internal Role Mapping
const ROLE_MAP = {
    "Mage": "MAGE",
    "Assassin": "ASSASSIN", // Requires nuance (AD vs AP) later, default to generic
    "Marksman": "MARKSMAN",
    "Tank": "TANK",
    "Fighter": "BRUISER",
    "Support": "SUPPORT_ENCHANTER" // Broad bucket
};

async function fetchData() {
    console.log(">> Creating data directory...");
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // --- LOL ---
    console.log(">> Fetching LoL Champions...");
    try {
        const res = await fetch(LOL_URL);
        const data = await res.json();
        const champs = Object.values(data.data).map(c => ({
            id: c.id,
            name: c.name,
            role: ROLE_MAP[c.tags[0]] || "BRUISER", // Default fallback
            tags: c.tags
        }));

        fs.writeFileSync(path.join(DATA_DIR, 'lol-champions.json'), JSON.stringify(champs, null, 2));
        console.log(`>> Saved ${champs.length} LoL Champions.`);
    } catch (e) {
        console.error("!! Failed to fetch LoL data:", e);
    }

    // --- VALORANT ---
    console.log(">> Fetching Valorant Agents...");
    try {
        const res = await fetch(VALO_URL);
        const data = await res.json();
        const agents = data.data.map(a => ({
            uuid: a.uuid,
            name: a.displayName,
            role: a.role?.displayName || "Duelist",
            abilities: a.abilities.map(ab => ({ name: ab.displayName, slot: ab.slot }))
        }));

        fs.writeFileSync(path.join(DATA_DIR, 'valorant-agents.json'), JSON.stringify(agents, null, 2));
        console.log(`>> Saved ${agents.length} Valorant Agents.`);
    } catch (e) {
        console.error("!! Failed to fetch Valorant data:", e);
    }
}

fetchData();
