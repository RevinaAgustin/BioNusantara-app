import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Map, Leaf, Search, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from '@/layouts/app-layout';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Welcome = () => {
  return (
    <AppLayout>
 
      <div className="flex flex-col">
 
            <div className="relative flex flex-col">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-linear-to-b from-emerald-500/12 to-transparent dark:from-emerald-400/10" />
 
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Leaf className="h-4 w-4 text-primary" />
                Citizen Science Indonesia
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl text-foreground">
                Jelajahi & Lindungi <span className="text-primary">Biodiversitas</span> Nusantara
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Bergabunglah dengan ribuan warga dan ilmuwan Indonesia untuk mendokumentasikan kekayaan hayati lokal. 
                Setiap observasi Anda berkontribusi pada konservasi.
              </p>
 
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/observasi">
                  <Button size="lg" className="gap-2 text-base">
                    <Camera className="h-5 w-5" /> Mulai Berkontribusi
                  </Button>
                </Link>
                <Link href="/jelajah">
 

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/jelajah?tab=galeri">
                  <Button size="lg" className="gap-2 text-base">
                    <Camera className="h-5 w-5" /> Lihat Galeri Spesies Kami!
                  </Button>
                </Link>

                <Link href="/jelajah?tab=peta">
 
                  <Button size="lg" variant="outline" className="gap-2 text-base">
                    <Map className="h-5 w-5" /> Jelajahi Peta
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
 
        <section className="border-y border-white/10 py-12">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {['Total Observasi', 'Total Spesies', 'Kontributor aktif'].map((title, i) => (
              <div key={title} className="relative group overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:shadow-xl">
 
        <section className="border-y border-border/60 py-12">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {['Total Observasi', 'Total Spesies', 'Kontributor aktif'].map((title, i) => (
               <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-8 shadow-lg backdrop-blur-md transition-all hover:bg-card hover:shadow-xl dark:bg-card/60"
              >
 
                <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full blur-2xl transition-all ${i === 0 ? 'bg-primary/20' : i === 1 ? 'bg-blue-500/20' : 'bg-purple-500/20'}`} />
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold tracking-tight text-foreground">{i === 0 ? '1,234' : i === 1 ? '567' : '89'}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cara Kerja Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground">Bagaimana Cara Kerjanya?</h2>
            <p className="mb-12 text-muted-foreground">Tiga langkah sederhana untuk berkontribusi</p>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { title: "Temukan & Foto", icon: Camera, color: "bg-emerald-500/20 text-emerald-600" },
                { title: "Upload & Identifikasi", icon: Search, color: "bg-amber-500/20 text-amber-600" },
                { title: "Validasi & Publikasi", icon: CheckCircle, color: "bg-blue-500/20 text-blue-600" },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
 
                  <Card className="border-white/20 bg-white/5 backdrop-blur-sm shadow-md">
 
                  <Card className="border-border/70 bg-card/60 backdrop-blur-sm shadow-md dark:bg-card/50">
 
                    <CardContent className="flex flex-col items-center p-8">
                      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${step.color}`}>
                        <step.icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
 
        <footer className="border-t border-white/10 py-8 text-center text-sm text-muted-foreground">
 
         <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
 
          <div className="flex justify-center items-center gap-2 font-medium text-foreground mb-2">
            <Leaf className="h-4 w-4 text-primary" /> BioNusantara
          </div>
          <p>© 2026 Platform citizen science untuk biodiversitas Indonesia</p>
        </footer>
      </div>
    </AppLayout>
  );
};

export default Welcome;