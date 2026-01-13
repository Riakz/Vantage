const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Configuration
const API_URL = "http://localhost:3000/api/ingest";
const API_KEY = "dev-secret";

// Simulation State
let round = 1;
let money = 800;
let health = 100;
let phase = "BUY_PHASE";

async function sendPacket(payload) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-vantage-key": API_KEY
            },
            body: JSON.stringify(payload)
        });
        const json = await res.json();
        console.log(`[>>] Packet sent: ${payload.phase} (Round ${payload.roundNumber}) -> Status: ${res.status}`);
    } catch (e) {
        console.error("[!!] Failed to send packet:", e.message);
    }
}

function generatePacket() {
    return {
        timestamp: Date.now(),
        phase: phase,
        roundNumber: round,
        matchId: "mock_match_1",
        player: {
            agent: "Jett",
            health: health,
            money: money,
            isDead: health <= 0,
            weapon: money > 4000 ? "Operator" : "Sheriff"
        },
        team: {
            alliesAlive: 5,
        }
    };
}

// Game Loop Simulation
console.log("Starting Vantage C++ Mock Client...");

setInterval(() => {
    // Logic to simulate game flow
    if (phase === "BUY_PHASE") {
        if (Math.random() > 0.8) phase = "ROUND_PLAY";
    } else if (phase === "ROUND_PLAY") {
        if (Math.random() > 0.9) {
            phase = "ROUND_END";
            // Random outcome
            money += Math.random() > 0.5 ? 3000 : 1900;
        } else {
            // Take damage
            if (Math.random() > 0.7) health = Math.max(0, health - 20);
        }
    } else if (phase === "ROUND_END") {
        round++;
        health = 100;
        phase = "BUY_PHASE";
    }

    sendPacket(generatePacket());

}, 2000); // 2 seconds tick
