import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2, MapPin, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { mockObservations, mockSpecies } from "@/lib/mock-data";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const DetailSpesies = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const observation = mockObservations.find((o) => o.id === id);
  const species = mockSpecies.find((s) => s.id === id);

  const data = observation
    ? {
        name: observation.speciesName,
        scientific: observation.scientificName,
        photo: observation.photoUrl,
        lat: observation.latitude,
        lng: observation.longitude,
        observer: observation.observer,
        date: observation.date,
        category: mockSpecies.find(s => s.scientificName === observation.scientificName)?.category || "Umum",
        locationName: "Kawasan Konservasi Hutan Hujan Tropis", 
      }
    : species
    ? {
        name: species.commonName,
        scientific: species.scientificName,
        photo: species.photoUrl,
        lat: -2.5,
        lng: 118,
        observer: "Sistem BioNusantara",
        date: "-",
        category: species.category,
        locationName: "Taman Nasional Lore Lindu",
      }
    : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Tautan disalin! 🔗",
      description: "Tautan halaman detail spesies ini siap dibagikan ke teman atau tim.",
    });
  };

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Data tidak ditemukan</h2>
        <p className="text-muted-foreground mb-6">Observasi dengan ID {id} tidak ada dalam sistem.</p>
        <Link to="/jelajah">
          <Button>Kembali ke Jelajah</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Link to="/jelajah" className="inline-flex items-center text-primary hover:underline font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Jelajah
        </Link>
        <Button onClick={handleShare} className="gap-2 bg-primary hover:bg-accent text-white transition-colors">
          <Share2 className="w-4 h-4" /> Bagikan Observasi
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-border shadow-sm">
            <img
              src={data.photo}
              alt={data.name}
              className="w-full h-[400px] object-cover bg-muted"
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
            />
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold font-sans">{data.name}</h1>
                  <p className="text-xl italic text-muted-foreground mt-1">{data.scientific}</p>
                </div>
                <Badge variant={data.category === 'Hoya' ? 'default' : data.category === 'Kayu' ? 'secondary' : 'outline'} className="text-sm px-3 py-1">
                  {data.category}
                </Badge>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="font-semibold mb-2">Deskripsi Singkat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Observasi spesies <span className="font-semibold">{data.name}</span> ({data.scientific}) yang didokumentasikan dalam database BioNusantara. Data ini telah diverifikasi dan sangat berguna untuk penelitian serta pelestarian keanekaragaman hayati ekosistem Indonesia.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border-border">
            <CardHeader className="pb-3 border-b border-border bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Informasi Pelapor
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Nama User</span>
                <span className="font-medium text-right">{data.observer}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Tgl. Observasi</span>
                <span className="font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" /> {data.date}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border overflow-hidden relative">
            <CardHeader className="pb-3 border-b border-border bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Lokasi Peta
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div className="h-[250px] w-full relative isolate" style={{ zIndex: 0 }}>
                <MapContainer
                  center={[data.lat, data.lng]}
                  zoom={7}
                  scrollWheelZoom={false}
                  dragging={false}
                  zoomControl={false}
                  style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[data.lat, data.lng]} />
                </MapContainer>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-background/95 backdrop-blur-sm p-3 rounded-md border border-border text-center shadow-md z-10 pointer-events-none">
                <p className="font-bold text-sm text-primary mb-1">{data.locationName}</p>
                <p className="text-xs text-muted-foreground font-medium">Lat: {data.lat.toFixed(4)}, Lng: {data.lng.toFixed(4)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailSpesies;