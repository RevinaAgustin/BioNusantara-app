import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import type { BreadcrumbItem } from '@/types';
import { FileText, CheckCircle2, XCircle, Search, Calendar, User, Tag } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Riwayat Verifikasi', href: '/expert/riwayat' }];

export default function Riwayat({ verifications }: any) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredHistory = verifications?.filter((v: any) =>
        v.observation?.species?.scientific_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.observation?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout breadcrumbs={[{ title: 'Manajemen User', href: '/admin/users' }]}>
            <Head title="Riwayat Verifikasi" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="flex items-center gap-2 text-2xl font-bold">
                            <FileText className="h-6 w-6 text-neutral-500" /> 
                            Jejak Digital Verifikasi
                        </h2>
                        <p className="text-sm text-neutral-500">Daftar keputusan validasi yang telah Anda berikan.</p>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Cari riwayat..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-sidebar-border bg-white dark:bg-neutral-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-3">
                    {filteredHistory?.length > 0 ? (
                        filteredHistory.map((v: any) => (
                            <div
                                key={v.id}
                                className="flex flex-col md:flex-row md:items-center justify-between rounded-2xl border border-sidebar-border bg-white p-4 transition-all hover:border-neutral-300 dark:bg-neutral-900 dark:hover:border-neutral-700"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Thumbnail Foto Observasi */}
                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                                        <img
                                            src={v.observation?.photos?.[0]?.file_path || '/placeholder.jpg'}
                                            className="h-full w-full object-cover"
                                            alt="Obs"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold italic text-neutral-800 dark:text-neutral-200">
                                                {v.observation?.species?.scientific_name || 'Spesies Tidak Diketahui'}
                                            </span>
                                            <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                                                v.is_valid 
                                                ? 'bg-green-50 text-green-600 dark:bg-green-900/20' 
                                                : 'bg-red-50 text-red-600 dark:bg-red-900/20'
                                            }`}>
                                                {v.is_valid ? <CheckCircle2 className="h-2.5 w-2.5" /> : <XCircle className="h-2.5 w-2.5" />}
                                                {v.is_valid ? 'Valid' : 'Rejected'}
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-neutral-500">
                                            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {v.observation?.user?.name}</span>
                                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(v.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {v.observation?.species?.category}</span>
                                        </div>
                                        
                                        {v.notes && (
                                            <p className="mt-1 text-xs text-neutral-400 line-clamp-1 italic">
                                                " {v.notes} "
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2 md:mt-0">
                                    <button className="rounded-lg border border-sidebar-border px-3 py-1.5 text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-800">
                                        Detail Observasi
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-sidebar-border rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/50">
                            <FileText className="h-12 w-12 text-neutral-300 mb-2" />
                            <p className="text-neutral-500 italic">Data riwayat tidak ditemukan.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}