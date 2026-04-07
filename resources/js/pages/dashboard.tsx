import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockObservations } from "@/lib/mock-data";
import { Camera, TrendingUp, Clock } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// Data untuk Grafik
const chartData = [
  { month: "Sep", observasi: 3 },
  { month: "Okt", observasi: 5 },
  { month: "Nov", observasi: 20 },
  { month: "Des", observasi: 4 },
  { month: "Jan", observasi: 6 },
  { month: "Feb", observasi: 7 },
];

const chartConfig = {
  observasi: { label: "Observasi", color: "hsl(var(--primary))" },
};

// Definisi Breadcrumb biar sama kayak template BE
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard() {
  const userObservations = mockObservations;
  const validated = userObservations.filter((o) => o.status === "validated").length;
  const pending = userObservations.filter((o) => o.status === "pending").length;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        {/* STATS SECTION - Pakai gaya kotak-kotak template BE */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border flex items-center gap-4 bg-card">
             <div className="p-2 bg-primary/10 rounded-lg"><Camera className="h-6 w-6 text-primary" /></div>
             <div>
                <p className="text-sm text-neutral-500">Total Observasi</p>
                <h3 className="text-2xl font-bold">{userObservations.length}</h3>
             </div>
          </div>
          <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border flex items-center gap-4 bg-card">
             <div className="p-2 bg-emerald-500/10 rounded-lg"><TrendingUp className="h-6 w-6 text-emerald-600" /></div>
             <div>
                <p className="text-sm text-neutral-500">Tervalidasi</p>
                <h3 className="text-2xl font-bold">{validated}</h3>
             </div>
          </div>
          <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border flex items-center gap-4 bg-card">
             <div className="p-2 bg-amber-500/10 rounded-lg"><Clock className="h-6 w-6 text-amber-600" /></div>
             <div>
                <p className="text-sm text-neutral-500">Menunggu</p>
                <h3 className="text-2xl font-bold">{pending}</h3>
             </div>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border bg-card">
          <h4 className="font-semibold mb-4">Statistik Observasi</h4>
          <ChartContainer config={chartConfig} className="h-62.5 w-full">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="observasi" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        {/* HISTORY SECTION */}
        <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border bg-card">
          <h4 className="font-semibold mb-4">Riwayat Terbaru</h4>
          <div className="space-y-4">
            {userObservations.slice(0, 5).map((obs) => (
              <div key={obs.id} className="flex items-center gap-4 rounded-lg border p-3">
                <img
                  src={obs.photoUrl}
                  alt={obs.speciesName}
                  className="h-12 w-12 rounded-lg object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{obs.speciesName}</p>
                  <p className="text-xs text-muted-foreground">{obs.date}</p>
                </div>
                <Badge variant={obs.status === "validated" ? "default" : "secondary"}>
                  {obs.status === "validated" ? "Tervalidasi" : "Menunggu"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}