import { Head, router } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import {
    CheckCircle,
    XCircle,
    Search,
    UserCheck,
    Clock,
    AlertCircle,
} from 'lucide-react';
import React, { useState } from 'react';

// Menggunakan komponen dasar shadcn/ui
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Expert {
    id: number;
    name: string;
    email: string;
    expert_verified_at: string | null;
    created_at: string;
}

interface Props {
    experts: {
        data: Expert[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: any;
}

export default function Index({ experts, filters }: Props) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/verifikasi-ahli',
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleVerify = (id: number, status: 'verified' | 'rejected') => {
        const actionText = status === 'verified' ? 'MENYETUJUI' : 'MENOLAK & MENGHAPUS';

        if (confirm(`APAKAH ANDA YAKIN INGIN ${actionText} AKUN INI?`)) {
            router.patch(
                `/admin/verifikasi-ahli/${id}`,
                { status: status },
                {
                    onSuccess: () => alert('Berhasil memperbarui status verifikasi!'),
                    preserveScroll: true,
                },
            );
        }
    };

    const expertList = experts?.data || [];

    return (
        <DashboardLayout breadcrumbs={[{ title: 'Verifikasi Ahli', href: '/admin/verifikasi-ahli' }]}>
            <Head title="Verifikasi Ahli" />

            <div className="p-4 space-y-6">
                {/* Header Section sesuai style Manajemen Spesies */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            Verifikasi Ahli
                        </h2>
                        <p className="text-sm text-neutral-500">
                            Kelola verifikasi pengguna dengan peran (role) Pakar/Expert.
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border bg-white p-4 dark:bg-neutral-900 dark:border-neutral-800">
                    {/* Search Bar - Mengikuti style input di Manajemen Spesies */}
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                            <input 
                                type="text" 
                                placeholder="Cari nama atau email..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-sidebar-border text-sm dark:bg-neutral-800 dark:border-neutral-700 outline-none focus:ring-1 focus:ring-neutral-400" 
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="font-bold uppercase text-[10px] tracking-widest">
                            Cari Ahli
                        </Button>
                    </form>

                    {/* Table Section */}
                    <div className="overflow-hidden rounded-lg border border-sidebar-border dark:border-neutral-800">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-neutral-50 text-[10px] font-black tracking-widest text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-800/50">
                                <tr>
                                    <th className="px-6 py-4">Nama Lengkap</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Tgl Daftar</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {expertList.length > 0 ? (
                                    expertList.map((expert) => (
                                        <tr key={expert.id} className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50">
                                            <td className="px-6 py-4 font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-tighter">
                                                {expert.name}
                                            </td>
                                            <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                                                {expert.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {expert.expert_verified_at ? (
                                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-tight text-green-700 dark:border-green-800/50 dark:bg-green-900/20 dark:text-green-400">
                                                        <UserCheck className="h-3 w-3" /> Terverifikasi
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-tight text-amber-700 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-400">
                                                        <Clock className="h-3 w-3" /> Menunggu
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-neutral-500">
                                                {new Date(expert.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {!expert.expert_verified_at ? (
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleVerify(expert.id, 'verified')}
                                                            className="rounded-md bg-green-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-green-700 transition-colors"
                                                        >
                                                            Terima
                                                        </button>
                                                        <button
                                                            onClick={() => handleVerify(expert.id, 'rejected')}
                                                            className="rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-red-700 transition-colors"
                                                        >
                                                            Tolak
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-neutral-400 uppercase italic">Validated</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <div className="flex flex-col items-center justify-center text-neutral-400">
                                                <AlertCircle className="mb-2 h-10 w-10 opacity-20" />
                                                <p className="text-sm italic">Data ahli tidak ditemukan...</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}