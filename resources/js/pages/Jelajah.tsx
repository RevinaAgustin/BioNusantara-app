import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockObservations, mockSpecies } from "@/lib/mock-data";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map, Grid3X3, Search, Filter, ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "@inertiajs/react";
import { Button } from "../components/ui/button";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const validated = mockObservations.filter((o) => o.status === "validated");
const CATEGORIES = ["Semua", "Hoya", "Kayu", "Plankton"];

const Jelajah = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Jelajah Biodiversitas</h1>
      <p className="mb-6 text-muted-foreground">Eksplorasi observasi yang sudah divalidasi</p>

      <Tabs defaultValue="peta" className="space-y-4">
        <TabsList>
          <TabsTrigger value="peta" className="gap-2">
            <Map className="h-4 w-4" /> Peta Interaktif
          </TabsTrigger>
          <TabsTrigger value="galeri" className="gap-2">
            <Grid3X3 className="h-4 w-4" /> Galeri Spesies
          </TabsTrigger>
        </TabsList>

        {/* PETA CONTENT */}
        <TabsContent value="peta">
          <div className="overflow-hidden rounded-lg border" style={{ height: "500px" }}>
            <MapContainer
              center={[-2.5, 118]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {validated.map((obs) => (
                <Marker key={obs.id} position={[obs.latitude, obs.longitude]}>
                  <Popup
                    eventHandlers={{
                      add: (e) => {
                        const popupNode = e.target.getElement();

                        if (popupNode) {
                          popupNode
                            .querySelector(".detail-btn")
                            ?.addEventListener("click", (ev) => {
                              ev.stopPropagation();
                              window.location.href = `/detailSpesies/${obs.id}`;
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
                      onClick={() => { window.location.href = `/detailSpesies/${obs.id}`; }}
                      onPointerUp={() => { window.location.href = `/detailSpesies/${obs.id}`; }}
                      onTouchEnd={() => { window.location.href = `/detailSpesies/${obs.id}`; }}
                    >
                      Lihat Detail
                    </Button>
                    
                  </div>
                </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </TabsContent>

        {/* GALERI CONTENT */}
        <TabsContent value="galeri">
          {selectedSpecies ? (
            <div>
              <button
                onClick={() => setSelectedSpecies(null)}
                className="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Spesies
              </button>

              {speciesObservations.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                          onClick={() => navigate(`/detailSpesies/${obs.id}`)} 
                        >
                          Lihat Detail
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border rounded-lg bg-muted/20">
                  <p className="text-muted-foreground">Belum ada data observasi untuk spesies {selectedSpecies}.</p>
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
                        >
                          Lihat Daftar Observasi
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border rounded-lg bg-muted/20">
                  <p className="text-muted-foreground">Tidak ada spesies yang cocok dengan filter tersebut.</p>
                  <button 
                    onClick={() => {setSearch(""); setSelectedCategory("Semua");}}
                    className="mt-4 text-primary hover:underline font-medium"
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
  );
};

export default Jelajah;