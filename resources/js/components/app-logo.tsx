import { Link } from '@inertiajs/react';

import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <Link href="/" className="group flex items-center gap-3">
            <AppLogoIcon className="h-10 w-10 object-contain transition-transform group-hover:scale-[1.02]" />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate font-semibold leading-tight transition-colors group-hover:text-sidebar-primary">
                    BioNusantara
                </span>
                <span className="text-[10px] leading-none text-muted-foreground">Kembali ke Beranda</span>
            </div>
        </Link>
    );
}