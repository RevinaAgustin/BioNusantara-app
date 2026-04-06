import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="BioNusantara">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a]">
                {/* Header with Logo and Navigation */}
                <header className="w-full border-b border-[#e3e3e0] px-6 py-4 dark:border-[#3E3E3A]">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
                            BioNusantara
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center gap-6">
                            <Link href="/" className="text-sm text-[#1b1b18] hover:text-[#f53003] dark:text-[#EDEDEC] dark:hover:text-[#FF4433]">
                                Beranda
                            </Link>
                            <Link href="/jelajah" className="text-sm text-[#1b1b18] hover:text-[#f53003] dark:text-[#EDEDEC] dark:hover:text-[#FF4433]">
                                Jelajah
                            </Link>
                            <Link href="/observasi" className="text-sm text-[#1b1b18] hover:text-[#f53003] dark:text-[#EDEDEC] dark:hover:text-[#FF4433]">
                                Observasi
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm text-[#1b1b18] hover:text-[#f53003] dark:text-[#EDEDEC] dark:hover:text-[#FF4433]"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1">
                    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            {/* Left Column - Text Content */}
                            <div className="flex flex-col justify-center">
                                <span className="mb-4 text-sm font-semibold text-[#f53003] dark:text-[#FF4433]">
                                    Citizen Science Indonesia
                                </span>
                                <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
                                    Jelajahi & Lindungi
                                    <br />
                                    Biodiversitas Nusantara
                                </h1>
                                <p className="mb-8 text-lg text-[#706f6c] dark:text-[#A1A09A]">
                                    Bergabunglah dengan ribuan warga ilmuwan untuk mendokumentasikan kekayaan
                                    hayati Indonesia. Setiap observasi Anda berkontribusi pada konservasi.
                                </p>
                                
                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/kontribusi"
                                        className="rounded-sm bg-[#f53003] px-6 py-3 text-sm font-medium text-white hover:bg-[#d42d03] dark:bg-[#FF4433] dark:hover:bg-[#d43a2b]"
                                    >
                                        Mulai Berkontribusi
                                    </Link>
                                    <Link
                                        href="/peta"
                                        className="rounded-sm border border-[#19140035] px-6 py-3 text-sm font-medium text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Jelajahi Peta
                                    </Link>
                                </div>

                                {/* Statistics Cards */}
                                <div className="mt-12 grid grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">1,247</div>
                                        <div className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Total Observasi</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">328</div>
                                        <div className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Spesies Teridentifikasi</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">562</div>
                                        <div className="text-sm text-[#706f6c] dark:text-[#A1A09A]">Kontributor</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Image/Illustration */}
                            <div className="relative flex items-center justify-center lg:justify-end">
                                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg bg-[#fff2f2] dark:bg-[#1D0002]">
                                    {/* You can replace this with your illustration or image */}
                                    <div className="flex h-full items-center justify-center">
                                        <svg className="h-64 w-64 text-[#f53003] dark:text-[#FF4433]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}