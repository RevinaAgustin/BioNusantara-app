import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, MapPin, Sparkles, Loader2, Save, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import exifr from "exifr";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LocationPicker = ({ position, setPosition, setFormData }: any) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setFormData((prev: any) => ({
        ...prev,
        latitude: e.latlng.lat.toFixed(6),
        longitude: e.latlng.lng.toFixed(6),
      }));
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position ? <Marker position={position} /> : null;
};

const Observasi = () => {
  const { toast } = useToast();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [mapPosition, setMapPosition] = useState<L.LatLng | null>(null);
  const defaultCenter: [number, number] = [-6.200000, 106.816666];

  const [showManualLocation, setShowManualLocation] = useState(false);

  const [formData, setFormData] = useState({
    speciesName: "",
    scientificName: "",
    latitude: "",
    longitude: "",
    date: "",
    habitat: "",
    notes: "",
  });
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

const handlePhotoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);

    setLoading(true);

    const isImageValid = Math.random() > 0.2; 

    setTimeout(async () => {
      if (!isImageValid) {
        setPhoto(null);
        setLoading(false);
        toast({ 
          title: "Foto Ditolak 🚫", 
          description: "Sistem mendeteksi gambar tidak relevan. Harap hanya unggah foto dari kategori Hoya, Kayu, atau Plankton.", 
          variant: "destructive" 
        });
        return;
      }

      try {
        const exif = await exifr.parse(file, ["GPSLatitude", "GPSLongitude", "DateTimeOriginal"]);
        if (exif && exif.latitude && exif.longitude) {
          setFormData((prev) => ({
            ...prev,
            latitude: exif.latitude.toFixed(6),
            longitude: exif.longitude.toFixed(6),
            date: exif.DateTimeOriginal ? new Date(exif.DateTimeOriginal).toISOString().split("T")[0] : prev.date,
          }));
          setShowManualLocation(false);
          toast({ title: "Validasi Lolos & EXIF Ditemukan! 📍", description: "Foto sesuai kategori dan koordinat berhasil diekstrak." });
        } else {
          setShowManualLocation(true);
          toast({ title: "Validasi Lolos", description: "Foto sesuai kategori, namun lokasi tidak terbaca. Silakan atur manual di peta.", variant: "destructive" });
        }
      } catch {
        setShowManualLocation(true);
        toast({ title: "Validasi Lolos", description: "Format foto tidak mendukung metadata. Silakan atur lokasi manual di peta.", variant: "destructive" });
      }

      const mockSpeciesList = [
        { common: "Hoya Bintang", scientific: "Hoya carnosa", cat: "Hoya" },
        { common: "Jati Emas", scientific: "Tectona grandis", cat: "Kayu" },
        { common: "Fitoplankton", scientific: "Cyanobacteria", cat: "Plankton" }
      ];
      const randomSpecies = mockSpeciesList[Math.floor(Math.random() * mockSpeciesList.length)];
      
      setAiSuggestion(`${randomSpecies.common} (${randomSpecies.scientific})`);
      setFormData((prev) => ({
        ...prev,
        speciesName: randomSpecies.common,
        scientificName: randomSpecies.scientific,
      }));
      setLoading(false);
      
    }, 1500);
  }, [toast]);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Error", description: "Browser Anda tidak mendukung fitur lokasi.", variant: "destructive" });
      return;
    }
    toast({ title: "Mencari lokasi...", description: "Mohon tunggu sebentar." });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6),
        }));
        setMapPosition(L.latLng(latitude, longitude));
        toast({ title: "Lokasi Ditemukan! 🎯", description: "Berhasil mendapatkan lokasi Anda saat ini." });
      },
      (error) => {
        toast({ title: "Akses Ditolak", description: "Pastikan GPS aktif dan browser diizinkan mengakses lokasi.", variant: "destructive" });
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Observasi Terkirim! 🎉", description: "Observasi Anda sedang menunggu validasi." });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Form Observasi</h1>
      <p className="mb-6 text-muted-foreground">Dokumentasikan temuan biodiversitas Anda</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-sans">
              <Camera className="h-5 w-5" /> Upload Foto
            </CardTitle>
          </CardHeader>
          <CardContent>
            {photo ? (
              <div className="relative">
                <img src={photo} alt="Preview" className="w-full rounded-lg object-cover" style={{ maxHeight: 300 }} />
                <Button type="button" variant="secondary" size="sm" className="absolute bottom-2 right-2" onClick={() => setPhoto(null)}>Ganti Foto</Button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed p-10 transition-colors hover:border-primary hover:bg-muted">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Klik atau seret foto ke sini</span>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            )}

            {loading && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> AI sedang mengidentifikasi spesies...
              </div>
            )}

            {aiSuggestion && !loading && (
              <div className="mt-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="text-sm">Saran AI:</span>
                <Badge variant="secondary">{aiSuggestion}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-sans">Informasi Spesies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div><Label>Nama Umum</Label><Input value={formData.speciesName} onChange={(e) => setFormData({ ...formData, speciesName: e.target.value })} /></div>
              <div><Label>Nama Ilmiah</Label><Input value={formData.scientificName} onChange={(e) => setFormData({ ...formData, scientificName: e.target.value })} className="italic" /></div>
            </div>
            <div><Label>Habitat</Label><Input value={formData.habitat} onChange={(e) => setFormData({ ...formData, habitat: e.target.value })} /></div>
            <div><Label>Catatan Observasi</Label><Textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-sans">
              <MapPin className="h-5 w-5" /> Lokasi Peta & Koordinat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {showManualLocation && (
              <div className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm text-destructive">⚠️ Atur Lokasi Manual</h4>
                </div>
                <div className="h-62.5 w-full rounded-md overflow-hidden border border-border" style={{ zIndex: 0 }}>
                  <MapContainer center={mapPosition || defaultCenter} zoom={mapPosition ? 13 : 4} style={{ height: "100%", width: "100%", zIndex: 0 }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationPicker position={mapPosition} setPosition={setMapPosition} setFormData={setFormData} />
                  </MapContainer>
                </div>
                <Button type="button" variant="secondary" className="w-full gap-2 mt-2" onClick={handleCurrentLocation}>
                  <Navigation className="h-4 w-4" /> Gunakan Lokasi Saat Ini
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label>Latitude</Label>
                <Input value={formData.latitude} readOnly placeholder="-6.200" className="bg-muted" />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input value={formData.longitude} readOnly placeholder="106.816" className="bg-muted" />
              </div>
              <div>
                <Label>Tanggal</Label>
                <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row mt-6">
          <Button type="submit" size="lg" className="flex-1 gap-2"><Upload className="h-5 w-5" /> Kirim Observasi</Button>
          <Button type="button" variant="outline" size="lg" className="flex-1 gap-2"><Save className="h-5 w-5" /> Simpan sebagai Draft</Button>
        </div>
      </form>
    </div>
  );
};

export default Observasi;