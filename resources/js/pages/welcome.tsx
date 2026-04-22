import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle, Leaf, Map, Search, Users, Binoculars } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const highlightPrograms = [
    {
        title: 'Pemetaan Titik Keanekaragaman',
        description:
            'Bantu menandai area dengan temuan spesies tinggi untuk mendukung kebijakan konservasi berbasis data.',
    },
    {
        title: 'Pantau Spesies Kunci',
        description:
            'Laporkan kemunculan spesies prioritas agar tren populasi dapat dipantau lebih cepat oleh peneliti.',
    },
    {
        title: 'Edukasi Warga Lokal',
        description:
            'Ajak komunitas sekitar mengenali Biodiversitas setempat melalui observasi sederhana di lingkungan sekitar.',
    },
];

type WelcomeProps = {
    canRegister: boolean;
    stats: {
        totalObservations: number;
        totalSpecies: number;
        activeContributors: number;
    };
};

const Welcome = ({ stats }: WelcomeProps) => {
    return (
        <AppLayout>
            <div className="relative flex flex-col overflow-hidden bg-white dark:bg-neutral-950">
                {/* HERO SECTION - Dengan Padding Bawah Ekstra untuk Overlap */}
                <section className="relative bg-linear-to-br from-emerald-50 via-green-50 to-white pt-24 pb-48 dark:from-emerald-950/20 dark:via-neutral-950 dark:to-neutral-950 md:pt-32 md:pb-60">
                    <div className="container relative z-10 mx-auto px-4">
                        <motion.div
                            className="mx-auto max-w-4xl text-center"
                            {...fadeUp}
                        >
                            
                            <h1 className="mb-6 text-5xl leading-[1.1] font-black text-neutral-900 md:text-7xl dark:text-white">
                                Jelajahi & Lindungi<br />
                                <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                    Biodiversitas
                                </span> Nusantara
                            </h1>
                            
                            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl dark:text-neutral-400">
                                Bergabunglah dengan ribuan warga dan ilmuwan Indonesia untuk mendokumentasikan kekayaan hayati lokal. Setiap observasi Anda berkontribusi pada konservasi.
                            </p>

                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <Link href="/jelajah?tab=galeri">
                                    <Button
                                        size="lg"
                                        className="h-14 rounded-2xl bg-emerald-600 px-8 text-base font-bold shadow-xl hover:bg-emerald-700 dark:shadow-none"
                                    >
                                        <Camera className="mr-2 h-5 w-5" /> Lihat Galeri Spesies
                                    </Button>
                                </Link>

                                <Link href="/jelajah?tab=peta">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-14 rounded-2xl border-2 border-neutral-200 px-8 text-base font-bold transition-all text-neutral-900 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                                    >
                                        <Map className="mr-2 h-5 w-5" /> Jelajahi Peta
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Dekorasi Background */}
                    <div className="pointer-events-none absolute top-0 right-0 -mr-20 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-900/10" />
                    <div className="pointer-events-none absolute bottom-0 left-0 -ml-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-900/10" />
                </section>

                {/* STATS SECTION - Overlapping Style */}
                <section className="relative z-20 -mt-32 px-4 md:-mt-40">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {[
                                {
                                    title: 'Total Observasi',
                                    value: stats.totalObservations,
                                    icon: Binoculars,
                                    gradient: 'from-emerald-500 to-teal-600',
                                    shadow: 'shadow-emerald-100',
                                },
                                {
                                    title: 'Total Spesies',
                                    value: stats.totalSpecies,
                                    icon: Leaf,
                                    gradient: 'from-blue-500 to-indigo-600',
                                    shadow: 'shadow-blue-100',
                                },
                                {
                                    title: 'Kontributor Aktif',
                                    value: stats.activeContributors,
                                    icon: Users,
                                    gradient: 'from-amber-500 to-orange-600',
                                    shadow: 'shadow-amber-100',
                                },
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                >
                                    <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-2 dark:bg-neutral-900 dark:shadow-none">
                                        <CardContent className="flex flex-col p-0">
                                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg ${item.gradient}`}>
                                                <item.icon className="h-7 w-7" />
                                            </div>
                                            <p className="text-xs font-black tracking-[0.2em] text-neutral-400 uppercase">
                                                {item.title}
                                            </p>
                                            <h3 className="mt-2 text-5xl font-black tracking-tighter text-neutral-900 dark:text-white">
                                                {item.value.toLocaleString('id-ID')}
                                            </h3>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS SECTION */}
                <section className="relative py-32">
                    <div className="container mx-auto px-4 text-center">
                        <div className="mb-16">
                            <h2 className="mb-4 text-4xl font-black text-neutral-900 dark:text-white">Bagaimana Cara Kerjanya?</h2>
                            <p className="text-neutral-500">Tiga langkah sederhana untuk memulai kontribusi ilmiah Anda.</p>
                        </div>
                        
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
                            {[
                                {
                                    title: 'Temukan & Foto',
                                    icon: Camera,
                                    color: 'bg-emerald-50 text-emerald-600',
                                    desc: 'Temukan flora atau fauna unik di sekitar Anda dan ambil fotonya.'
                                },
                                {
                                    title: 'Upload & Identifikasi',
                                    icon: Search,
                                    color: 'bg-amber-50 text-amber-600',
                                    desc: 'Unggah ke platform dan biarkan komunitas membantu identifikasi.'
                                },
                                {
                                    title: 'Validasi & Publikasi',
                                    icon: CheckCircle,
                                    color: 'bg-blue-50 text-blue-600',
                                    desc: 'Data divalidasi oleh pakar dan dipublikasikan untuk sains.'
                                },
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ${step.color} dark:bg-neutral-900`}>
                                            <step.icon className="h-10 w-10" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                                        <p className="text-sm leading-relaxed text-neutral-500">{step.desc}</p>
                                    </div>
                                    {i < 2 && (
                                        <div className="absolute top-10 left-[60%] hidden w-full border-t-2 border-dashed border-neutral-200 md:block dark:border-neutral-800" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HIGHLIGHT PROGRAMS */}
                <section className="bg-neutral-50 py-24 dark:bg-neutral-900/50">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl font-black text-neutral-900 dark:text-white">Fokus Program Komunitas</h2>
                                <p className="mt-4 text-neutral-500">Area kontribusi yang paling dibutuhkan minggu ini untuk mendukung riset nasional.</p>
                            </div>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            {highlightPrograms.map((program) => (
                                <Card
                                    key={program.title}
                                    className="group rounded-[2rem] border-none bg-white p-2 shadow-sm transition-all hover:shadow-xl dark:bg-neutral-900"
                                >
                                    <CardContent className="p-8">
                                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-neutral-800">
                                            <Leaf className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                                            {program.title}
                                        </h3>
                                        <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                            {program.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-white py-16 dark:bg-neutral-950">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-between gap-8 border-t border-neutral-100 pt-12 md:flex-row dark:border-neutral-900">
                            <div className="flex flex-col items-center md:items-start">
                                <div className="mb-4 flex items-center gap-2 text-2xl font-black text-neutral-900 dark:text-white">
                                    <Leaf className="h-8 w-8 text-emerald-600" /> BioNusantara
                                </div>
                                <p className="text-center text-sm text-neutral-500 md:text-left">
                                    © 2026 Platform citizen science untuk biodiversitas Indonesia.<br />
                                    Membangun data sains masa depan melalui kontribusi warga.
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">Supported by</span>
                                <div className="flex items-center gap-6">
                                    <img
                                        src="/images/logoBRIN.png"
                                        alt="Logo BRIN"
                                        className="h-12 w-auto grayscale transition-all hover:grayscale-0"
                                    />
                                    {/* Tambahkan logo partner lain di sini */}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </AppLayout>
    );
};

export default Welcome;