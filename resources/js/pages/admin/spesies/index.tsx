import { Head, router } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import type { BreadcrumbItem } from '@/types';
import { Leaf, Plus, Search } from 'lucide-react';
import { useState } from 'react'; // Import useState

export default function SpeciesIndex({ species, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    // Fungsi pusat untuk update data ke server
    const updateFilters = (newSearch: string, newCat: string) => {
        router.get('/admin/spesies', 
            { search: newSearch, category: newCat }, 
            { preserveState: true, replace: true }
        );
    };

    return (
        <DashboardLayout breadcrumbs={[{ title: 'Manajemen Spesies', href: '/admin/spesies' }]}>
            {/* ... Header ... */}
            <div className="rounded-xl border border-sidebar-border bg-white p-4 dark:bg-neutral-900">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                        <input 
                            type="text" 
                            placeholder="Cari nama ilmiah atau lokal..." 
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                updateFilters(e.target.value, category);
                            }}
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-sidebar-border text-sm dark:bg-neutral-800" 
                        />
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2">
                        {['plankton', 'hoya', 'kayu'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    const nextCat = category === cat ? '' : cat;
                                    setCategory(nextCat);
                                    updateFilters(search, nextCat);
                                }}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all border ${
                                    category === cat 
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                                    }`}
                                    >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Spesies */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {species.length > 0 ? species.map((s: any) => (
                        <div key={s.id} className="p-4 border rounded-xl border-sidebar-border hover:shadow-sm transition-all dark:border-neutral-800">
                            <p className="text-[10px] uppercase font-bold text-green-600 mb-1">{s.category}</p>
                            <h4 className="font-bold italic text-neutral-800 dark:text-neutral-200">{s.scientific_name}</h4>
                            <p className="text-sm text-neutral-500">{s.common_name || 'Tidak ada nama lokal'}</p>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center text-neutral-400 italic">
                            Spesies tidak ditemukan...
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}