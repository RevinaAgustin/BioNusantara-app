import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: ReactNode }) {
    // Ambil data user yang login dari shared data Inertia
    const { auth } = usePage().props; 

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-emerald-light via-background to-amber-light/30">
            <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Menu Kiri (Selalu Muncul) */}
                    <div className="flex gap-6">
                        <Link href="/">Beranda</Link>
                        <Link href="/jelajah">Jelajah</Link>
                    </div>

                    {/* Menu Kanan (Dinamis ala Dicoding) */}
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            // JIKA SUDAH LOGIN
                            <>
                                <Link href="/observasi">Form Observasi</Link>
                                {/* Dashboard otomatis ke route /dashboard, BE yang atur role-nya */}
                                <Link href="/dashboard" className="font-bold text-primary">
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            // JIKA BELUM LOGIN
                            <Link href="/login">
                                <Button variant="outline">Masuk</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
