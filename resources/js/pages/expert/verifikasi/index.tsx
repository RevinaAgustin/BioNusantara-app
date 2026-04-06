import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { CheckCircle, Clock, MapPin, Eye, Check, X, Info, Inbox } from 'lucide-react';
import { useState } from 'react';

/* @ts-ignore */
const route = (window as any).route;

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Verifikasi Observasi', href: '/expert/verifikasi' },
];

export default function Verifications({ pendingObservations }: any) {
    const [selectedObs, setSelectedObs] = useState<any>(null);
    const { post, processing, setData, reset } = useForm({
        observation_id: '',
        is_valid: true,
        notes: '',
    });

    const submitVerifikasi = (isValid: boolean) => {
        post(route('expert.verifikasi.store'), {
            onSuccess: () => {
                setSelectedObs(null);
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Verifikasi Observasi" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-1">
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                        Antrean Verifikasi
                    </h2>
                    <p className="text-sm text-neutral-500">
                        Tinjau temuan Plankton atau Hoya dari masyarakat.
                    </p>
                </div>

                {/* KONDISI JIKA DATA KOSONG */}
                {pendingObservations?.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-sidebar-border bg-white p-12 text-center dark:bg-neutral-900">
                        <div className="mb-4 rounded-full bg-neutral-50 p-4 dark:bg-neutral-800">
                            <Inbox className="h-12 w-12 text-neutral-300" />
                        </div>
                        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                            Antrean Verifikasi Kosong
                        </h3>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500">
                            Saat ini belum ada observasi baru yang perlu diverifikasi. Semua temuan dari Citizen Scientist telah diproses.
                        </p>
                    </div>
                ) : (
                    /* GRID DAFTAR OBSERVASI */
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pendingObservations.map((obs: any) => (
                            <div
                                key={obs.id}
                                className="group overflow-hidden rounded-2xl border border-sidebar-border bg-white transition-all hover:shadow-lg dark:bg-neutral-900"
                            >
                                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                                    <img
                                        src={obs.photos?.[0]?.file_path || '/placeholder.jpg'}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        alt="Observation"
                                    />
                                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase shadow-sm dark:bg-black/70">
                                        <Clock className="h-3 w-3 text-amber-500" /> {obs.status}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="text-lg font-bold italic leading-tight">
                                        {obs.species?.scientific_name || 'Spesies Tidak Diketahui'}
                                    </h4>
                                    <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                                        <MapPin className="h-3 w-3" /> {obs.latitude}, {obs.longitude}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedObs(obs);
                                            setData('observation_id', obs.id);
                                        }}
                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900"
                                    >
                                        <Eye className="h-4 w-4" /> Validasi Data
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MODAL DETAIL (Tetap sama) */}
                {selectedObs && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-neutral-900">
                            {/* ... (Isi modal sama seperti sebelumnya) ... */}
                            <div className="flex h-14 items-center justify-between border-b px-6 text-neutral-800 dark:text-neutral-200">
                                <h3 className="font-bold">Detail Verifikasi</h3>
                                <button onClick={() => setSelectedObs(null)} className="text-2xl">&times;</button>
                            </div>
                            <div className="grid md:grid-cols-2">
                                <div className="p-4">
                                    <img src={selectedObs.photos?.[0]?.file_path || '/placeholder.jpg'} className="h-64 w-full rounded-2xl object-cover" />
                                </div>
                                <div className="flex flex-col p-6">
                                    <p className="text-[10px] font-bold text-blue-600 uppercase">Nama Ilmiah</p>
                                    <h2 className="text-xl font-black italic mb-4">{selectedObs.species?.scientific_name || 'N/A'}</h2>
                                    <div className="mt-auto flex gap-3">
                                        <button 
                                            onClick={() => { setData('is_valid', false); submitVerifikasi(false); }}
                                            className="flex-1 rounded-xl border border-red-200 py-3 font-bold text-red-600 hover:bg-red-50"
                                        >
                                            <X className="w-4 h-4 inline mr-1"/> Tolak
                                        </button>
                                        <button 
                                            onClick={() => { setData('is_valid', true); submitVerifikasi(true); }}
                                            className="flex-1 rounded-xl bg-green-600 py-3 font-bold text-white hover:bg-green-700"
                                        >
                                            <Check className="w-4 h-4 inline mr-1"/> Setuju
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}