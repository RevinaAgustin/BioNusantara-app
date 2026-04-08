import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import type { BreadcrumbItem } from '@/types';
import { Leaf, Plus, Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Manajemen Spesies', href: '/admin/spesies' }];

export default function SpeciesIndex({ species }: any) {
    return (
        <DashboardLayout breadcrumbs={[{ title: 'Manajemen User', href: '/admin/users' }]}>
            <Head title="Manajemen Spesies" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Leaf className="text-green-600"/> Master Data Spesies</h2>
                    <button className="bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <Plus className="w-4 h-4"/> Tambah Spesies
                    </button>
                </div>

                <div className="rounded-xl border border-sidebar-border bg-white p-4 dark:bg-neutral-900">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                        <input type="text" placeholder="Cari nama ilmiah atau lokal..." className="w-full pl-10 pr-4 py-2 rounded-md border border-sidebar-border text-sm dark:bg-neutral-800" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {species?.map((s: any) => (
                            <div key={s.id} className="p-4 border rounded-xl border-sidebar-border hover:shadow-sm transition-all">
                                <p className="text-[10px] uppercase font-bold text-neutral-400">{s.category}</p>
                                <h4 className="font-bold italic text-neutral-800 dark:text-neutral-200">{s.scientific_name}</h4>
                                <p className="text-sm text-neutral-500">{s.common_name || 'Tidak ada nama lokal'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}