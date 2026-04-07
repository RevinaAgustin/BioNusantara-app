import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockObservations } from "@/lib/mock-data";
import { Camera, Leaf, TrendingUp, Clock } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

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

const Dashboard = () => {
  const userObservations = mockObservations;
  const uniqueSpecies = new Set(userObservations.map((o) => o.scientificName)).size;
  const validated = userObservations.filter((o) => o.status === "validated").length;
  const pending = userObservations.filter((o) => o.status === "pending").length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
      <p className="mb-6 text-muted-foreground">Rapor kontribusi Anda</p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Observasi", value: userObservations.length, icon: Camera, color: "text-primary" },
          { label: "Tervalidasi", value: validated, icon: TrendingUp, color: "text-secondary" },
          { label: "Menunggu", value: pending, icon: Clock, color: "text-accent" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-sans">Observasi per Bulan</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="observasi" fill="var(--color-observasi)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Riwayat Observasi </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userObservations.map((obs) => (
              <div
                key={obs.id}
                className="flex items-center gap-4 rounded-lg border p-3"
              >
                <img
                  src={obs.photoUrl}
                  alt={obs.speciesName}
                  className="h-14 w-14 rounded-lg object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
                <div className="flex-1">
                  <p className="font-medium">{obs.speciesName}</p>
                  <p className="text-sm italic text-muted-foreground">{obs.scientificName}</p>
                  <p className="text-xs text-muted-foreground">{obs.date}</p>
                </div>
                <Badge variant={obs.status === "validated" ? "default" : "secondary"}>
                  {obs.status === "validated" ? "Tervalidasi" : "Menunggu"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;