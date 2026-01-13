export default function OverlayLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-transparent overflow-hidden text-white font-sans">
            {/* 
        The background is explicitly transparent for OBS.
        Global styles are applied, but we ensure no base background color interferes.
      */}
            {children}
        </div>
    );
}
