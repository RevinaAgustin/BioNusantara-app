import { Link } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground group-hover:opacity-90 transition-opacity">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold group-hover:text-sidebar-primary transition-colors">
                    BioNusantara
                </span>
                <span className="text-[10px] text-muted-foreground leading-none">
                    Kembali ke Beranda
                </span>
            </div>
        </Link>
    );
 
 
    
 
}