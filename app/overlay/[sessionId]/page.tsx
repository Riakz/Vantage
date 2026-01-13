import { EconomyGuide } from "@/components/overlay/EconomyGuide";
import { PeakTimer } from "@/components/overlay/PeakTimer";

export default async function OverlayPage({ params }: { params: { sessionId: string } }) {
    // In a real app, we would fetch session config here.
    const { sessionId } = params;

    return (
        <div className="relative w-full h-screen p-8 pointer-events-none">
            <div className="absolute top-8 right-8 pointer-events-auto">
                <EconomyGuide />
            </div>

            <div className="absolute bottom-32 left-8 pointer-events-auto">
                <PeakTimer />
            </div>

            <div className="absolute bottom-8 left-8 text-xs text-white/50 font-mono">
                VANTAGE OVERLAY // SESSION: {sessionId}
            </div>
        </div>
    );
}
