import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RiotProvider } from "@/components/providers/RiotProvider";
import { LoLProvider } from "@/components/providers/LoLProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vantage - Elite Coaching",
  description: "Live Valorant Coaching & Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RiotProvider>
          <LoLProvider>
            {children}
          </LoLProvider>
        </RiotProvider>
      </body>
    </html>
  );
}
