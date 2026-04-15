<<<<<<< HEAD
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockObservations, mockSpecies } from "@/lib/mock-data";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map, Grid3X3, Search, Filter, ArrowLeft } from "lucide-react";
import { Link, router } from "@inertiajs/react"; // Ganti: Pakai router bawaan Inertia
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout"; // Tambah: Biar Navbar muncul

// Fix icon leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
=======
import { router } from "@inertiajs/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowLeft, Filter, Grid3X3, Map, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import { mockObservations, mockSpecies } from "@/lib/mock-data";

type ExploreTab = "peta" | "galeri";

// Leaflet marker asset fix for Vite/React setup
if ((L.Icon.Default.prototype as any)._getIconUrl) {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
}

>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

<<<<<<< HEAD
const validated = mockObservations.filter((o) => o.status === "validated");
const CATEGORIES = ["Semua", "Hoya", "Kayu", "Plankton"];

const Jelajah = () => {
  // Ganti: Di Inertia pake router.visit atau router.get, bukan useNavigate
=======
const VALID_TABS: ExploreTab[] = ["peta", "galeri"];
const CATEGORIES = ["Semua", "Hoya", "Kayu", "Plankton"];
const validatedObservations = mockObservations.filter((o) => o.status === "validated");

const getTabFromLocation = (): ExploreTab => {
  if (typeof window === "undefined") return "peta";

  const tab = new URLSearchParams(window.location.search).get("tab");
  return VALID_TABS.includes(tab as ExploreTab) ? (tab as ExploreTab) : "peta";
};

const Jelajah = () => {
  const [activeTab, setActiveTab] = useState<ExploreTab>(() => getTabFromLocation());
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

<<<<<<< HEAD
  const filteredSpecies = mockSpecies.filter((s) => {
    const matchSearch =
      s.commonName.toLowerCase().includes(search.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(search.toLowerCase());
    
    const matchCategory = selectedCategory === "Semua" || s.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const speciesObservations = selectedSpecies 
    ? validated.filter(obs => obs.speciesName === selectedSpecies)
    : [];
=======
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      setActiveTab(getTabFromLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const filteredSpecies = useMemo(() => {
    return mockSpecies.filter((species) => {
      const keyword = search.toLowerCase();
      const matchSearch =
        species.commonName.toLowerCase().includes(keyword) ||
        species.scientificName.toLowerCase().includes(keyword);

      const matchCategory = selectedCategory === "Semua" || species.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  const speciesObservations = useMemo(() => {
    if (!selectedSpecies) return [];
    return validatedObservations.filter((observation) => observation.speciesName === selectedSpecies);
  }, [selectedSpecies]);

  const onTabChange = (value: string) => {
    if (!VALID_TABS.includes(value as ExploreTab)) return;

    const nextTab = value as ExploreTab;
    setActiveTab(nextTab);

    if (typeof window === "undefined") return;

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("tab", nextTab);
    window.history.replaceState({}, "", nextUrl.toString());
  };
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">Jelajah Biodiversitas</h1>
        <p className="mb-6 text-muted-foreground">Eksplorasi observasi yang sudah divalidasi</p>

<<<<<<< HEAD
        <Tabs defaultValue="peta" className="space-y-4">
          <TabsList>
=======
        <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
          <TabsList className="border border-border/70 bg-card/70 dark:bg-card/60">
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
            <TabsTrigger value="peta" className="gap-2">
              <Map className="h-4 w-4" /> Peta Interaktif
            </TabsTrigger>
            <TabsTrigger value="galeri" className="gap-2">
              <Grid3X3 className="h-4 w-4" /> Galeri Spesies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="peta">
<<<<<<< HEAD
            <div className="overflow-hidden rounded-lg border" style={{ height: "500px" }}>
              <MapContainer
                center={[-2.5, 118]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
              >
=======
            <div className="overflow-hidden rounded-lg border border-border/70 bg-card/70" style={{ height: "500px" }}>
              <MapContainer center={[-2.5, 118]} zoom={5} style={{ height: "100%", width: "100%" }}>
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
<<<<<<< HEAD
                {validated.map((obs) => (
                  <Marker key={obs.id} position={[obs.latitude, obs.longitude]}>
                    <Popup
                      eventHandlers={{
                        add: (e: any) => { // Fix: Tambah tipe any
                          const popupNode = e.target.getElement();

                          if (popupNode) {
                            popupNode
                              .querySelector(".detail-btn")
                              ?.addEventListener("click", (ev: any) => { // Fix: Tambah tipe any
                                ev.stopPropagation();
                                router.visit(`/detailSpesies/${obs.id}`);
                              });
                          }
                        },
                      }}
                    >
                      <div className="w-52">
                      <img
                        src={obs.photoUrl}
                        alt={obs.speciesName}
                        className="mb-2 h-32 w-full rounded object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                      />
                      <p className="font-bold">{obs.speciesName}</p>
                      <p className="text-xs italic text-gray-500">{obs.scientificName}</p>
                      <p className="mt-1 text-xs">📅 {obs.date}</p>
                      <p className="text-xs">👤 {obs.observer}</p>
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-2 gap-2 cursor-pointer relative z-50 detail-btn" 
                        onClick={() => { router.visit(`/detailSpesies/${obs.id}`); }}
                      >
                        Lihat Detail
                      </Button>
                      
=======

                {validatedObservations.map((observation) => (
                  <Marker
                    key={observation.id}
                    position={[observation.latitude, observation.longitude]}
                  >
                    <Popup>
                      <div className="w-52">
                        <img
                          src={observation.photoUrl}
                          alt={observation.speciesName}
                          className="mb-2 h-32 w-full rounded object-cover"
                          onError={(event) => {
                            (event.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <p className="font-bold">{observation.speciesName}</p>
                        <p className="text-xs italic text-gray-500">{observation.scientificName}</p>
                        <p className="mt-1 text-xs">📅 {observation.date}</p>
                        <p className="text-xs">👤 {observation.observer}</p>

                        <Button
                          size="sm"
                          className="mt-2 w-full gap-2"
                          onClick={() => router.visit(`/detailSpesies/${observation.id}`)}
                        >
                          Lihat Detail
                        </Button>
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </TabsContent>

          <TabsContent value="galeri">
            {selectedSpecies ? (
              <div>
                <button
                  onClick={() => setSelectedSpecies(null)}
<<<<<<< HEAD
                  className="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
=======
                  className="mb-6 flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Spesies
                </button>

                {speciesObservations.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
<<<<<<< HEAD
                    {speciesObservations.map((obs) => (
                      <Card key={obs.id} className="overflow-hidden transition-all hover:shadow-md">
                        <img
                          src={obs.photoUrl}
                          alt={obs.speciesName}
                          className="h-48 w-full object-cover transition-transform hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                        />
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1">📅 {obs.date} • 👤 {obs.observer}</p>
                          <h3 className="font-bold text-lg">{obs.speciesName}</h3>
                          <p className="text-sm italic text-muted-foreground mb-3">{obs.scientificName}</p>
                          
                          <Button 
                            size="sm" 
                            className="w-full mt-2 gap-2" 
                            onClick={() => router.visit(`/detailSpesies/${obs.id}`)} 
=======
                    {speciesObservations.map((observation) => (
                      <Card key={observation.id} className="overflow-hidden transition-all hover:shadow-md">
                        <img
                          src={observation.photoUrl}
                          alt={observation.speciesName}
                          className="h-48 w-full object-cover transition-transform hover:scale-105"
                          onError={(event) => {
                            (event.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <CardContent className="p-4">
                          <p className="mb-1 text-xs text-muted-foreground">
                            📅 {observation.date} • 👤 {observation.observer}
                          </p>
                          <h3 className="text-lg font-bold">{observation.speciesName}</h3>
                          <p className="mb-3 text-sm italic text-muted-foreground">
                            {observation.scientificName}
                          </p>
                          <Button
                            size="sm"
                            className="mt-2 w-full gap-2"
                            onClick={() => router.visit(`/detailSpesies/${observation.id}`)}
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
                          >
                            Lihat Detail
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
<<<<<<< HEAD
                  <div className="py-12 text-center border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground">Belum ada data observasi untuk spesies {selectedSpecies}.</p>
=======
                  <div className="rounded-lg border bg-muted/20 py-12 text-center">
                    <p className="text-muted-foreground">
                      Belum ada data observasi untuk spesies {selectedSpecies}.
                    </p>
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari nama spesies..."
                      value={search}
<<<<<<< HEAD
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <Filter className="h-4 w-4 text-muted-foreground mr-1 hidden sm:block" />
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent border-border"
                        }`}
                      >
                        {cat}
=======
                      onChange={(event) => setSearch(event.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <Filter className="mr-1 hidden h-4 w-4 text-muted-foreground sm:block" />
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                          selectedCategory === category
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {category}
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
                      </button>
                    ))}
                  </div>
                </div>

                {filteredSpecies.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSpecies.map((species) => (
                      <Card key={species.id} className="overflow-hidden transition-all hover:shadow-md">
                        <img
                          src={species.photoUrl}
                          alt={species.commonName}
                          className="h-48 w-full object-cover transition-transform hover:scale-105"
<<<<<<< HEAD
                          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                        />
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg">{species.commonName}</h3>
                          <p className="text-sm italic text-muted-foreground mb-3">{species.scientificName}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant={
                              species.category === 'Hoya' ? 'default' : 
                              species.category === 'Kayu' ? 'secondary' : 'outline'
                            }>
                              {species.category}
                            </Badge>
                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                              {species.observationCount} obs
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full mt-2 gap-2" 
                            onClick={() => setSelectedSpecies(species.commonName)} 
=======
                          onError={(event) => {
                            (event.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <CardContent className="p-4">
                          <h3 className="text-lg font-bold">{species.commonName}</h3>
                          <p className="mb-3 text-sm italic text-muted-foreground">
                            {species.scientificName}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                species.category === "Hoya"
                                  ? "default"
                                  : species.category === "Kayu"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {species.category}
                            </Badge>
                            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                              {species.observationCount} obs
                            </span>
                          </div>
                          <Button
                            size="sm"
                            className="mt-2 w-full gap-2"
                            onClick={() => setSelectedSpecies(species.commonName)}
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
                          >
                            Lihat Daftar Observasi
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
<<<<<<< HEAD
                  <div className="py-12 text-center border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground">Tidak ada spesies yang cocok dengan filter tersebut.</p>
                    <button 
                      onClick={() => {setSearch(""); setSelectedCategory("Semua");}}
                      className="mt-4 text-primary hover:underline font-medium"
=======
                  <div className="rounded-lg border bg-muted/20 py-12 text-center">
                    <p className="text-muted-foreground">
                      Tidak ada spesies yang cocok dengan filter tersebut.
                    </p>
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory("Semua");
                      }}
                      className="mt-4 font-medium text-primary hover:underline"
>>>>>>> 8071d13446745e222fe9619d7717fefb0162ec36
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Jelajah;