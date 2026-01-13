import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Header />
                <main className="pt-16 p-8 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
