import { useState, useEffect } from "react";
import { MapPin, Info, Droplets, Thermometer, Wind, Loader, RefreshCw, AlertCircle } from "lucide-react";
import {
  lagosZones as configZones,
  fetchWeatherData,
  WEATHER_API_KEY,
} from "@/utils/lagosWeatherConfig";
import {
  processWeatherData,
} from "@/utils/riskCalculations";

/**
 * Map zones with x,y coordinates for positioning on the visual map
 * These have the geographic layout for the Lagos map visualization
 */
const mapZones = [
  {
    name: "Lagos Island", x: 52, y: 72,
    lat: 6.4541, lon: 3.3947, floodBias: 3, heatBias: 2,
    desc: "Low-lying coastal area highly susceptible to storm surges and flooding. Construction requires deep piling and flood barriers.",
    issues: ["Frequent tidal flooding", "High groundwater table", "Coastal erosion", "Storm surge risk"]
  },
  {
    name: "Lekki", x: 70, y: 68,
    lat: 6.4698, lon: 3.5852, floodBias: 3, heatBias: 2,
    desc: "Narrow peninsula with extremely limited drainage. Extremely flood-prone; construction needs elevated platforms.",
    issues: ["Peninsula flooding", "Poor drainage infrastructure", "Sea level rise threat", "Waterlogged soils"]
  },
  {
    name: "Victoria Island", x: 58, y: 70,
    lat: 6.4281, lon: 3.4219, floodBias: 2, heatBias: 2,
    desc: "Commercial zone at sea level. At risk from both sea-level rise and heavy rainfall events.",
    issues: ["Sea-level rise", "Heavy rainfall flooding", "Aging drainage systems", "High construction costs"]
  },
  {
    name: "Ikeja", x: 42, y: 42,
    lat: 6.6018, lon: 3.3515, floodBias: 1, heatBias: 3,
    desc: "Airport and industrial zone. Less flood-prone but experiences extreme heat stress affecting workers and materials.",
    issues: ["Extreme heat affecting workers", "Heat stress on materials", "Occasional flash floods", "Urban heat island effect"]
  },
  {
    name: "Surulere", x: 44, y: 58,
    lat: 6.5000, lon: 3.3500, floodBias: 2, heatBias: 2,
    desc: "Dense residential area with inadequate drainage. Regular flood events disrupt construction activities.",
    issues: ["Inadequate drainage", "Frequent flooding", "Traffic disruption", "Site accessibility issues"]
  },
  {
    name: "Alimosho", x: 28, y: 44,
    lat: 6.6100, lon: 3.2950, floodBias: 1, heatBias: 2,
    desc: "Largest LGA in Lagos. Moderate flood risk but significant heat stress. Rapidly developing with construction opportunities.",
    issues: ["Urban flooding", "Heat island effect", "Infrastructure gaps", "Soil instability"]
  },
  {
    name: "Ikorodu", x: 62, y: 28,
    lat: 6.6194, lon: 3.5105, floodBias: 2, heatBias: 1,
    desc: "Located near lagoon; flood risk is significant. Heavy seasonal rainfall affects project timelines.",
    issues: ["Lagoon flooding", "Seasonal road flooding", "Material storage risks", "Access route disruption"]
  },
  {
    name: "Badagry", x: 14, y: 76,
    lat: 6.4150, lon: 2.8815, floodBias: 2, heatBias: 1,
    desc: "Coastal border town. Susceptible to lagoon overflow and heavy rainfall. Remote location adds logistics challenges.",
    issues: ["Lagoon overflow", "Remote location", "Supply chain disruption", "Coastal erosion"]
  },
  {
    name: "Epe", x: 82, y: 38,
    lat: 6.5841, lon: 3.9836, floodBias: 1, heatBias: 1,
    desc: "Semi-rural area with growing construction activity. Moderate risks but improving infrastructure.",
    issues: ["Seasonal flooding", "Limited drainage", "Road access issues", "Material supply delays"]
  },
  {
    name: "Apapa", x: 44, y: 68,
    lat: 6.4488, lon: 3.3590, floodBias: 3, heatBias: 2,
    desc: "Port area with severe flooding issues. Critical infrastructure zone requiring extensive climate adaptation.",
    issues: ["Port area flooding", "Industrial heat exposure", "Heavy traffic disruption", "Groundwater issues"]
  },
];

/**
 * Convert numeric risk score (0-100) to risk level label
 */
function scoreToRiskLabel(score) {
  if (score >= 80) return "Very High";
  if (score >= 60) return "High";
  if (score >= 40) return "Moderate";
  return "Low";
}

const riskColor = {
  "Very High": "text-red-400", "High": "text-orange-400",
  "Moderate": "text-yellow-400", "Low": "text-green-400"
};
const riskDot = {
  "Very High": "bg-red-500", "High": "bg-orange-500",
  "Moderate": "bg-yellow-500", "Low": "bg-green-500"
};

export default function ClimateMap() {
  const [zones, setZones] = useState(
    mapZones.map(z => ({
      ...z,
      floodRisk: "Moderate",
      heatRisk: "Moderate",
      rainfallRisk: "Moderate",
    }))
  );
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch and process weather data for all zones
   */
  const fetchZonesData = async () => {
    try {
      setApiError(null);

      if (WEATHER_API_KEY === "INSERT_API_KEY_HERE") {
        setApiError("API key not configured. Showing default zone data.");
        // Use mapZones immediately as fallback - they have x,y positioning
        setZones(mapZones.map(z => ({
          ...z,
          floodRisk: "Moderate",
          heatRisk: "Moderate",
          rainfallRisk: "Moderate",
        })));
        setLoading(false);
        return;
      }

      // Fetch weather for all zones in parallel using mapZones (which have x,y coords)
      const promises = mapZones.map(async (zone) => {
        try {
          const weatherData = await fetchWeatherData(zone.lat, zone.lon);
          const processedData = processWeatherData(weatherData, zone);
          return {
            ...zone,
            floodRisk: scoreToRiskLabel(processedData.floodRisk),
            heatRisk: scoreToRiskLabel(processedData.heatRisk),
            rainfallRisk: scoreToRiskLabel(processedData.rainfallRisk),
            temperature: processedData.temperature,
            humidity: processedData.humidity,
            weatherDescription: processedData.weatherDescription,
            timestamp: processedData.timestamp,
          };
        } catch (err) {
          // On error, return zone with placeholder data
          return {
            ...zone,
            floodRisk: "Moderate",
            heatRisk: "Moderate",
            rainfallRisk: "Moderate",
            error: true,
          };
        }
      });

      const results = await Promise.all(promises);
      setZones(results);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      setApiError("Failed to fetch map data. Showing default zone data.");
      // Fallback to mapZones on error
      setZones(mapZones.map(z => ({
        ...z,
        floodRisk: "Moderate",
        heatRisk: "Moderate",
        rainfallRisk: "Moderate",
      })));
      console.error("Error fetching zones data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Load data on component mount
   */
  useEffect(() => {
    fetchZonesData();
  }, []);

  /**
   * Handle manual refresh
   */
  const handleRefresh = () => {
    setRefreshing(true);
    fetchZonesData();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <span className="text-teal-400 text-xs font-semibold uppercase tracking-wider">Tool 3</span>
        <h1 className="text-4xl font-bold mt-2 mb-3">Interactive Lagos Climate Map</h1>
        <p className="leading-relaxed" style={{ color: "var(--bc-text-muted)" }}>
          Real-time climate risk visualization. Click on any location to explore flood vulnerability, heat stress, and construction challenges. Data powered by live weather API.
        </p>
        
        {/* Last Updated & Refresh Controls */}
        <div className="flex items-center justify-between mt-4">
          {lastUpdated && (
            <p className="text-xs" style={{ color: "var(--bc-text-muted)" }}>
              Last updated: {lastUpdated}
            </p>
          )}
          <button
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium transition-colors"
          >
            {refreshing ? (
              <>
                <Loader className="w-3.5 h-3.5 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh Map
              </>
            )}
          </button>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div
            className="mt-3 p-3 rounded-lg border flex items-start gap-2 text-xs"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              borderColor: "rgba(239, 68, 68, 0.3)",
            }}
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-red-700">{apiError}</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden relative" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }} style={{ paddingBottom: "65%" }}>
            {/* Map background */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80"
                alt="Lagos Map Background"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-950/80 to-blue-950/80" />
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                {[10,20,30,40,50,60,70,80,90].map(v => (
                  <g key={v}>
                    <line x1={`${v}%`} y1="0" x2={`${v}%`} y2="100%" stroke="white" strokeWidth="0.5" />
                    <line x1="0" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="white" strokeWidth="0.5" />
                  </g>
                ))}
              </svg>
              {/* Lagos label */}
              <div className="absolute top-4 left-4 text-white/60 text-xs font-semibold uppercase tracking-widest">Lagos State — Nigeria</div>
              <div className="absolute bottom-4 right-4 text-white/40 text-xs">© BuildClimate Platform</div>

              {/* Zone Pins */}
              {zones.map((z, i) => {
                const isSelected = selected?.name === z.name;
                const riskDotClass = riskDot[z.floodRisk];
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(z)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${z.x}%`, top: `${z.y}%` }}
                  >
                    <div className={`relative flex items-center justify-center transition-all ${isSelected ? "scale-125" : "hover:scale-110"}`}>
                      <div className={`w-4 h-4 rounded-full ${riskDotClass} ${isSelected ? "ring-4 ring-white/40" : ""} shadow-lg`} />
                      <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 pointer-events-none`}>
                        {z.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4">
            {Object.entries(riskDot).map(([label, cls]) => (
              <div key={label} className="flex items-center gap-2 text-xs" style={{ color: "var(--bc-text-muted)" }}>
                <div className={`w-3 h-3 rounded-full ${cls}`} />
                {label} Flood Risk
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="rounded-2xl p-6" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full py-16" style={{ color: "var(--bc-text-muted)" }}>
              <MapPin className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm text-center">Click a location pin on the map to view climate risk details.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-teal-400" />
                <h3 className="text-xl font-bold">{selected.name}</h3>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--bc-text-muted)" }}>{selected.desc}</p>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm" style={{ color: "var(--bc-text-soft)" }}><Droplets className="w-4 h-4 text-blue-400" /> Flood Risk</div>
                  <span className={`font-bold text-sm ${riskColor[selected.floodRisk]}`}>{selected.floodRisk}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm" style={{ color: "var(--bc-text-soft)" }}><Thermometer className="w-4 h-4 text-orange-400" /> Heat Stress Risk</div>
                  <span className={`font-bold text-sm ${riskColor[selected.heatRisk]}`}>{selected.heatRisk}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm" style={{ color: "var(--bc-text-soft)" }}><Wind className="w-4 h-4 text-purple-400" /> Rainfall Delay Risk</div>
                  <span className={`font-bold text-sm ${riskColor[selected.rainfallRisk]}`}>{selected.rainfallRisk}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--bc-text-muted)" }}>Key Construction Issues</p>
                <ul className="space-y-1.5">
                  {selected.issues.map((issue, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--bc-text-soft)" }}>
                      <span className="text-teal-400 mt-0.5">▸</span> {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zone Summary Table */}
      <div className="mt-8 rounded-2xl overflow-hidden" style={{ background: "var(--bc-surface)", border: "1px solid var(--bc-border)" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--bc-border)" }}>
          <h2 className="font-bold">All Zones — Risk Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--bc-surface2)" }}>
              <tr>
                <th className="px-6 py-3 text-left font-medium" style={{ color: "var(--bc-text-muted)" }}>Location</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: "var(--bc-text-muted)" }}>Flood Risk</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: "var(--bc-text-muted)" }}>Heat Risk</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: "var(--bc-text-muted)" }}>Rainfall Risk</th>
              </tr>
            </thead>
            <tbody style={{ borderColor: "var(--bc-border)" }} className="divide-y"
            >
              {zones.map((z, i) => (
                <tr key={i} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelected(z)}>
                  <td className="px-6 py-3 font-medium" style={{ color: "var(--bc-text)" }}>{z.name}</td>
                  <td className={`px-6 py-3 font-semibold ${riskColor[z.floodRisk]}`}>{z.floodRisk}</td>
                  <td className={`px-6 py-3 font-semibold ${riskColor[z.heatRisk]}`}>{z.heatRisk}</td>
                  <td className={`px-6 py-3 font-semibold ${riskColor[z.rainfallRisk]}`}>{z.rainfallRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}