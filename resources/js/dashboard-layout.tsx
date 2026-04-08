import { AppSidebar } from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { BreadcrumbItem } from '@/types';
import React from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function DashboardLayout({ children, breadcrumbs = [] }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <main className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}