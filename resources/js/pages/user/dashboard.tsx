import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { History, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface DashboardProps {
    user_stats: {
        my_total_uploads: number;
        my_verified: number;
        my_rejected: number;
    };
    my_recent_uploads: any[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard({ user_stats, my_recent_uploads }: DashboardProps) {
    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title="My Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Ringkasan Statistik */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 p-6 bg-white dark:bg-neutral-900 shadow-sm">
                        <div className="flex items-center gap-3">
                            <History className="w-5 h-5 text-blue-500" />
                            <p className="text-sm font-medium text-neutral-500">Total Kontribusi</p>
                        </div>
                        <h3 className="mt-2 text-3xl font-bold">{user_stats.my_total_uploads}</h3>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 p-6 bg-white dark:bg-neutral-900 shadow-sm">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <p className="text-sm font-medium text-neutral-500">Disetujui Pakar</p>
                        </div>
                        <h3 className="mt-2 text-3xl font-bold text-green-600">{user_stats.my_verified}</h3>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 p-6 bg-white dark:bg-neutral-900 shadow-sm">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <p className="text-sm font-medium text-neutral-500">Perlu Diperbaiki</p>
                        </div>
                        <h3 className="mt-2 text-3xl font-bold text-red-600">{user_stats.my_rejected}</h3>
                    </div>
                </div>

                {/* Area Informasi Utama */}
                <div className="flex-1 rounded-xl border border-sidebar-border/70 p-8 bg-neutral-50 dark:bg-neutral-900/50 flex flex-col items-center justify-center text-center">
                    <div className="max-w-md">
                        <Camera className="w-12 h-12 text-neutral-300 mb-4 mx-auto" />
                        <h2 className="text-xl font-semibold mb-2">Pantau Kontribusi Biodiversitas Kamu</h2>
                        <p className="text-neutral-500 leading-relaxed">
                            Data yang kamu masukkan membantu tim peneliti dalam memetakan persebaran Plankton dan Hoya di Nusantara. 
                            Gunakan menu <strong>"Input Observasi"</strong> di sidebar untuk menambahkan temuan baru.
                        </p>
                        <Link 
                            href="/user/observasi/riwayat" 
                            className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                        >
                            Lihat Riwayat Lengkap &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}