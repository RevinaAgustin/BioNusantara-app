import DashboardLayout from '@/layouts/dashboard-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Expert Panel', href: '/dashboard' }];
interface ExpertDashboardProps {
    tasks: {
        pending_count: number;
        verified_count: number;
    };
    recent_pending: any[];
}

export default function ExpertDashboard({ tasks, recent_pending }: ExpertDashboardProps) {
    return (
        <DashboardLayout breadcrumbs={breadcrumbs}>
            <Head title="Expert Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-yellow-500/50 p-4 bg-yellow-50/5 dark:bg-yellow-900/5">
                        <p className="text-sm text-yellow-600">Menunggu Verifikasi</p>
                        <h3 className="text-2xl font-bold">{tasks.pending_count}</h3>
                    </div>
                    <div className="rounded-xl border border-green-500/50 p-4 bg-green-50/5 dark:bg-green-900/5">
                        <p className="text-sm text-green-600">Berhasil Diverifikasi</p>
                        <h3 className="text-2xl font-bold">{tasks.verified_count}</h3>
                    </div>
                </div>
                <div className="relative min-h-screen flex-1 rounded-xl border border-sidebar-border/70 p-6 md:min-h-min dark:border-sidebar-border">
                    <h4 className="font-semibold mb-4">Antrean Identifikasi Spesies</h4>
                    <p className="text-sm text-neutral-400">Silahkan cek menu Verifikasi untuk memproses data.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}