import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { stats } from "@/lib/mock-data";
import { Camera, Map, Users, Leaf, Search, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from '@/layouts/app-layout';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const welcome = () => {
  return (
    <AppLayout>
      {/* Di sini gue pasang gradasinya di pembungkus paling luar biar nyatu semua */}
      <div className="flex flex-col bg-linear-to-b from-emerald-light via-background to-amber-light/30">
        
        {/* Hero Section - Background gue buat transparan biar ikut pembungkus luar */}
        <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Leaf className="h-4 w-4 text-primary" />
              Citizen Science Indonesia
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl text-foreground">
              Jelajahi & Lindungi{" "}
              <span className="text-primary">Biodiversitas</span>{" "}
              Nusantara
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Bergabunglah dengan ribuan warga dan ilmuwan Indonesia untuk mendokumentasikan kekayaan hayati lokal. 
              Setiap observasi Anda berkontribusi pada konservasi.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/observasi">
                <Button size="lg" className="gap-2 text-base">
                  <Camera className="h-5 w-5" />
                  Mulai Berkontribusi
                </Button>
              </Link>
              <Link href="/jelajah">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  <Map className="h-5 w-5" />
                  Jelajahi Peta
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - bg-card gue hapus biar nembus ke gradasi background */}
      <section className="border-y border-white/10 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* Card Total Observasi */}
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:shadow-xl">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Observasi</p>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-4xl font-bold tracking-tight text-foreground">1,234</h3>
              <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground italic">*Data terverifikasi</p>
          </div>

          {/* Card Total Spesies */}
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:shadow-xl">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20" />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Spesies</p>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-4xl font-bold tracking-tight text-foreground">567</h3>
              <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">Baru</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground italic">*Hoya, Kayu, Plankton</p>
          </div>

          {/* Card Kontributor */}
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:shadow-xl">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all group-hover:bg-purple-500/20" />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Kontributor aktif</p>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-4xl font-bold tracking-tight text-foreground">89</h3>
              <span className="text-xs font-medium text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full">Pakar & Umum</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground italic">*Komunitas BioNusantara</p>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground">Bagaimana Cara Kerjanya?</h2>
            <p className="text-muted-foreground">Tiga langkah sederhana untuk berkontribusi</p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Temukan & Foto",
                desc: "Temukan flora atau fauna di sekitar Anda dan ambil fotonya.",
                icon: Camera,
                color: "bg-emerald-500/20 text-emerald-600",
              },
              {
                step: "2",
                title: "Upload & Identifikasi",
                desc: "Upload foto Anda. AI kami akan membantu mengidentifikasi spesiesnya.",
                icon: Search,
                color: "bg-amber-500/20 text-amber-600",
              },
              {
                step: "3",
                title: "Validasi & Publikasi",
                desc: "Observasi divalidasi lalu tampil di peta dan galeri publik.",
                icon: CheckCircle,
                color: "bg-blue-500/20 text-blue-600",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              >
                <Card className="relative overflow-hidden border-white/20 bg-white/5 backdrop-blur-sm shadow-md hover:bg-white/10 transition-all">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${step.color}`}>
                      <step.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold font-sans text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - bg-card dihapus juga */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Leaf className="h-4 w-4 text-primary" />
            BioNusantara
          </div>
          <p>© 2026 Platform citizen science untuk biodiversitas Indonesia</p>
        </div>
      </footer>
    </div>
    </AppLayout>
  );
};

export default welcome;