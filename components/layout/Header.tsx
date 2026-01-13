import { Bell, Search } from "lucide-react";
import { RiotConnectionStatus } from "@/components/dashboard/RiotConnectionStatus";

export function Header() {
    return (
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-8 fixed top-0 left-64 right-0 z-50">
            <div className="flex items-center gap-4 text-muted-foreground">
                <RiotConnectionStatus />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
                    <Search className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </button>
            </div>
        </header>
    );
}
