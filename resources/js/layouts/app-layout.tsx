import React from "react";
import Navbar from "@/components/Navbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-linear-to-b from-[#ecfdf5] via-white to-[#fffbeb]">
            <Navbar /> 
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}