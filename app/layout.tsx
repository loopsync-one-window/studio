import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Roboto, Merriweather, Courier_Prime } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { DynamicSidebar } from "@/components/dynamic-sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});

const merriweather = Merriweather({
    weight: ["300", "400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-merriweather",
});

const courierPrime = Courier_Prime({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-courier-prime",
});

export const metadata: Metadata = {
    title: "LoopSync Studio",
    description: "AI Design Studio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} ${merriweather.variable} ${courierPrime.variable} antialiased`}>
                <DynamicSidebar>
                    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans selection:bg-red-900/60 overflow-hidden">
                        <AppSidebar />
                        <main className="flex-1 flex flex-col relative overflow-hidden">
                            {/* Persistent Background Gradient */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 to-black pointer-events-none" />
                            {/* Dynamic Page Content */}
                            {children}
                        </main>
                    </div>
                </DynamicSidebar>
            </body>
        </html>
    );
}
