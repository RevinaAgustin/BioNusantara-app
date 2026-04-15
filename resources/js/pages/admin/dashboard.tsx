import DashboardLayout from '@/layouts/dashboard-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Admin Dashboard', href: '/dashboard' }];
interface AdminDashboardProps {
    stats: {
        total_users: number;
        total_observations: number;
        total_species: number;
        pending_verifications: number;
    };
    recent_users: any[];
}

export default function AdminDashboard({ stats, recent_users }: AdminDashboardProps) {
    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <p className="text-sm text-neutral-500">Total Pengguna</p>
                        <h3 className="text-2xl font-bold">{stats.total_users}</h3>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <p className="text-sm text-neutral-500">Total Spesies</p>
                        <h3 className="text-2xl font-bold">{stats.total_species}</h3>
                    </div>
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <p className="text-sm text-neutral-500">Observasi Masuk</p>
                        <h3 className="text-2xl font-bold">{stats.total_observations}</h3>
                    </div>
                </div>
                <div className="relative min-h-screen flex-1 rounded-xl border border-sidebar-border/70 p-6 md:min-h-min dark:border-sidebar-border">
                    <h4 className="font-semibold mb-4">Aktivitas Sistem Terbaru</h4>
                    {/* Kamu bisa mapping recent_users di sini nanti */}
                    <p className="text-sm text-neutral-400">Menunggu data aktivitas...</p>
                </div>
            </div>
        </DashboardLayout>
    );
}