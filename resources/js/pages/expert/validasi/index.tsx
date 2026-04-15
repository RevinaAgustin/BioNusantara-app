import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import type { BreadcrumbItem } from '@/types';
import { Shield, Leaf, Search, BookOpen, Microscope, Info } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Validasi Spesies', href: '/expert/validasi' }];

export default function Validasi({ species_references }: any) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSpecies = species_references?.filter((s: any) =>
        s.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout breadcrumbs={[{ title: 'Manajemen User', href: '/admin/users' }]}>
            <Head title="Validasi Spesies" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Shield className="w-7 h-7 text-green-600" /> Kunci Identifikasi Pakar
                        </h2>
                        <p className="text-sm text-neutral-500">
                            Database referensi taksonomi untuk validasi temuan lapangan.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Cari referensi spesies..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-sidebar-border bg-white dark:bg-neutral-900 text-sm focus:ring-2 focus:ring-green-500 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Main Content */}
                {filteredSpecies?.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredSpecies.map((s: any) => (
                            <div key={s.id} className="group flex flex-col rounded-2xl border border-sidebar-border bg-white dark:bg-neutral-900 overflow-hidden hover:border-green-500 transition-all shadow-sm">
                                <div className="p-5 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                                            <Leaf className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-500">
                                            {s.category}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold italic text-neutral-800 dark:text-neutral-100">
                                        {s.scientific_name}
                                    </h3>
                                    
                                    <div className="mt-4 space-y-2 grow">
                                        <div className="flex gap-2 text-xs text-neutral-500">
                                            <Microscope className="w-4 h-4 shrink-0" />
                                            <p className="line-clamp-2">Kunci Identifikasi: Fokus pada struktur morfologi {s.category.toLowerCase()}.</p>
                                        </div>
                                        <div className="flex gap-2 text-xs text-neutral-500">
                                            <BookOpen className="w-4 h-4 shrink-0" />
                                            <p>Referensi: Database BioNusantara v1.0</p>
                                        </div>
                                    </div>

                                    <button className="mt-5 w-full py-2 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl text-xs font-bold hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                                        <Info className="w-3 h-3" /> Lihat Detail Morfologi
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-sidebar-border rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/50">
                        <Search className="w-12 h-12 text-neutral-300 mb-4" />
                        <p className="text-neutral-500 font-medium">Spesies referensi tidak ditemukan.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}