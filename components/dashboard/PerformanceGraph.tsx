"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useRiot } from "@/components/providers/RiotProvider";

export function PerformanceGraph() {
    const { data } = useRiot();

    if (!data || !data.matches || data.matches.length < 2) {
        return (
            <div className="bg-card border border-border rounded-lg p-6 h-[300px] w-full flex items-center justify-center text-muted-foreground">
                <p>Not enough match data for performance graph.</p>
            </div>
        );
    }

    // Transform matches into graph data (Reverse to show oldest to newest)
    const graphData = [...data.matches].reverse().map((m, i) => {
        const player = m.players.find((p: any) => p.puuid === data.account.puuid);
        const kills = player?.stats?.kills || 0;
        const deaths = player?.stats?.deaths || 1;
        const kd = Number((kills / deaths).toFixed(2));

        return {
            name: `Match ${i + 1}`,
            kd: kd,
            map: m.matchInfo.mapId.split("/").pop()
        };
    });

    return (
        <div className="bg-card border border-border rounded-lg p-6 h-[300px] w-full">
            <h3 className="font-bold text-lg mb-4">Performance Trend (K/D)</h3>
            <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={graphData}>
                        <defs>
                            <linearGradient id="colorKd" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2e2e3a" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#a1a1aa"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#a1a1aa"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 'auto']}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f1f27', borderColor: '#2e2e3a', color: '#ededed' }}
                            itemStyle={{ color: '#10b981' }}
                            formatter={(value: any) => [`${value} K/D`, "Performance"]}
                            labelFormatter={(label, payload) => {
                                if (payload && payload[0]) {
                                    return `${label} (${payload[0].payload.map})`;
                                }
                                return label;
                            }}
                        />
                        <Area type="monotone" dataKey="kd" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorKd)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
