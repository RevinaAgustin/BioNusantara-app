import React from "react";
import Navbar from "@/components/Navbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
<<<<<<< HEAD
        <div className="flex min-h-screen w-full flex-col bg-linear-to-b from-[#ecfdf5] via-white to-[#fffbeb]">
=======
        <div className="flex min-h-screen w-full flex-col bg-linear-to-b from-emerald-light/70 
        via-background to-amber-light/60 transition-colors dark:from-[#0b1f1a] dark:via-background dark:to-[#221a0d]">
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
            <Navbar /> 
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}