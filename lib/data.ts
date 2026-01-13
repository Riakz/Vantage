export type Session = {
    id: string;
    date: string;
    map: string;
    agent: string;
    result: "WIN" | "LOSS" | "DRAW";
    score: string;
    kda: string;
};

export const MOCK_SESSIONS: Session[] = [
    {
        id: "sess_1",
        date: "2024-01-12T18:30:00Z",
        map: "Ascent",
        agent: "Jett",
        result: "WIN",
        score: "13-9",
        kda: "24/12/5",
    },
    {
        id: "sess_2",
        date: "2024-01-12T20:00:00Z",
        map: "Haven",
        agent: "Omen",
        result: "LOSS",
        score: "11-13",
        kda: "15/15/8",
    },
    {
        id: "sess_3",
        date: "2024-01-13T12:00:00Z",
        map: "Split",
        agent: "Raze",
        result: "WIN",
        score: "13-5",
        kda: "31/10/4",
    },
];

export async function getSessions() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_SESSIONS;
}
