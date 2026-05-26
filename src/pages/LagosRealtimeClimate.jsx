import { useState, useEffect } from "react";
import {
  Cloud,
  Droplets,
  Wind,
  AlertTriangle,
  RefreshCw,
  Loader,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import {
  lagosZones,
  fetchWeatherData,
  WEATHER_API_KEY,
} from "@/utils/lagosWeatherConfig";
import {
  processWeatherData,
} from "@/utils/riskCalculations";

/**
 * RiskMeterSmall Component
 * Displays a compact risk meter with score and label
 */
function RiskMeterSmall({ label, score }) {
  const isHighRisk = score >= 60;
  const isCritical = score >= 80;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium opacity-75">{label}</span>
        <span
          className={`text-xs font-bold ${
            isCritical
              ? "text-red-600"
              : isHighRisk
              ? "text-orange-600"
              : score >= 40
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {score}%
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-gray-200">
        <div
          className={`h-full rounded-full transition-all ${
            isCritical
              ? "bg-red-600"
              : isHighRisk
              ? "bg-orange-500"
              : score >= 40
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

/**
 * ZoneCard Component
 * Displays weather and risk data for a single Lagos zone
 */
function ZoneCard({ zoneData, loading, error }) {
  if (loading) {
    return (
      <div className="rounded-lg p-4 border animate-pulse" style={{ background: "var(--bc-surface)", borderColor: "var(--bc-border)" }}>
        <div className="h-4 bg-gray-300 rounded w-24 mb-3"></div>
        <div className="h-3 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-28"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-lg p-4 border flex items-start gap-3"
        style={{ background: "var(--bc-surface)", borderColor: "var(--bc-border)" }}
      >
        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--bc-text)" }}>
            {zoneData.location || "Zone"}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--bc-text-muted)" }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  const overallRiskLevel = getRiskLevel(zoneData.overallRisk);

  return (
    <div
      className="rounded-lg p-5 border"
      style={{
        background: "var(--bc-surface)",
        borderColor: "var(--bc-border)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-bold" style={{ color: "var(--bc-text)" }}>
            {zoneData.location}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--bc-text-muted)" }}>
            Updated: {zoneData.timestamp}
          </p>
        </div>
        <div
          className={`px-2.5 py-1 rounded text-xs font-bold text-white ${
            overallRiskLevel.badgeColor
          }`}
        >
          {overallRiskLevel.label}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b" style={{ borderColor: "var(--bc-border)" }}>
        <div>
          <p className="text-2xl font-bold" style={{ color: "var(--bc-text)" }}>
            {zoneData.temperature}°C
          </p>
          <p className="text-xs capitalize mt-1" style={{ color: "var(--bc-text-muted)" }}>
            {zoneData.weatherDescription}
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <Droplets className="w-3.5 h-3.5 opacity-60" />
            <span style={{ color: "var(--bc-text-muted)" }}>
              {zoneData.humidity}%
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Wind className="w-3.5 h-3.5 opacity-60" />
            <span style={{ color: "var(--bc-text-muted)" }}>
              {zoneData.windSpeed} m/s
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Cloud className="w-3.5 h-3.5 opacity-60" />
            <span style={{ color: "var(--bc-text-muted)" }}>
              {zoneData.cloudCoverage}%
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <RiskMeterSmall label="Flood Risk" score={zoneData.floodRisk} />
        <RiskMeterSmall label="Heat Stress" score={zoneData.heatRisk} />
        <RiskMeterSmall
          label="Rainfall Delay"
          score={zoneData.rainfallRisk}
        />
      </div>

      {zoneData.insights && zoneData.insights.length > 0 && (
        <div className="pt-3 border-t" style={{ borderColor: "var(--bc-border)" }}>
          <p
            className="text-xs font-bold mb-2 flex items-center gap-1"
            style={{ color: "var(--bc-text)" }}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Construction Insights
          </p>
          <div className="space-y-1">
            {zoneData.insights.slice(0, 3).map((insight, idx) => (
              <p
                key={idx}
                className="text-xs"
                style={{ color: "var(--bc-text-muted)" }}
              >
                {insight}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getRiskLevel(score) {
  if (score >= 80) {
    return {
      label: "Very High Risk",
      level: "very_high",
      badgeColor: "bg-red-600",
    };
  } else if (score >= 60) {
    return {
      label: "High Risk",
      level: "high",
      badgeColor: "bg-orange-600",
    };
  } else if (score >= 40) {
    return {
      label: "Moderate Risk",
      level: "moderate",
      badgeColor: "bg-yellow-600",
    };
  } else {
    return {
      label: "Low Risk",
      level: "low",
      badgeColor: "bg-green-600",
    };
  }
}

function DashboardContent({ 
  zoneDataList, 
  loading, 
  apiError, 
  lastUpdated, 
  refreshing, 
  onRefresh 
}) {
  const getHighestRisk = () => {
    const risks = zoneDataList
      .filter((z) => !z.error)
      .map((z) => z.overallRisk);
    return risks.length > 0 ? Math.max(...risks) : 0;
  };

  const getCriticalAlerts = () => {
    return zoneDataList.filter((z) => !z.error && z.floodRisk >= 80).length;
  };

  const highestRisk = getHighestRisk();
  const highestRiskLevel = getRiskLevel(highestRisk);
  const criticalAlerts = getCriticalAlerts();

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div
          className="rounded-lg p-4 border"
          style={{
            background: "var(--bc-surface)",
            borderColor: "var(--bc-border)",
          }}
        >
          <p className="text-xs opacity-75" style={{ color: "var(--bc-text-muted)" }}>
            Highest Regional Risk
          </p>
          <div className="flex items-center justify-between mt-2">
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--bc-text)" }}
            >
              {highestRisk}%
            </p>
            <span
              className={`px-3 py-1 rounded text-xs font-bold text-white ${
                highestRiskLevel.badgeColor
              }`}
            >
              {highestRiskLevel.level.replace("_", " ")}
            </span>
          </div>
        </div>

        <div
          className="rounded-lg p-4 border"
          style={{
            background: "var(--bc-surface)",
            borderColor: "var(--bc-border)",
          }}
        >
          <p className="text-xs opacity-75" style={{ color: "var(--bc-text-muted)" }}>
            Zones Monitored
          </p>
          <p className="text-2xl font-bold mt-2" style={{ color: "var(--bc-text)" }}>
            {zoneDataList.length > 0
              ? zoneDataList.filter((z) => !z.error).length
              : 10}
            / 10
          </p>
        </div>

        <div
          className="rounded-lg p-4 border"
          style={{
            background: "var(--bc-surface)",
            borderColor: "var(--bc-border)",
          }}
        >
          <p className="text-xs opacity-75" style={{ color: "var(--bc-text-muted)" }}>
            Critical Flood Alerts
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-bold" style={{ color: "var(--bc-text)" }}>
              {criticalAlerts}
            </p>
            {criticalAlerts > 0 && (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        {lastUpdated && (
          <p className="text-xs" style={{ color: "var(--bc-text-muted)" }}>
            Last updated: {lastUpdated}
          </p>
        )}
        <button
          onClick={onRefresh}
          disabled={loading || refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
        >
          {refreshing ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Refresh Now
            </>
          )}
        </button>
      </div>

      {apiError && (
        <div
          className="rounded-lg p-4 mb-6 border flex items-start gap-3"
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            borderColor: "rgba(239, 68, 68, 0.3)",
          }}
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-700">{apiError}</p>
            {apiError.includes("API key") && (
              <p className="text-xs text-red-600 mt-2">
                {" To fix this: Open "}
                <code className="bg-red-100 px-1 rounded">
                  src/utils/lagosWeatherConfig.js
                </code>{" "}
                and replace{" "}
                <code className="bg-red-100 px-1 rounded">INSERT_API_KEY_HERE</code> with
                your OpenWeatherMap API key from{" "}
                <a
                  href="https://openweathermap.org/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold"
                >
                  https://openweathermap.org/api
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && lagosZones.length > 0 ? (
          lagosZones.map((zone) => (
            <ZoneCard
              key={zone.name}
              zoneData={{ location: zone.name }}
              loading={true}
              error={null}
            />
          ))
        ) : zoneDataList.length > 0 ? (
          zoneDataList.map((zoneData) => (
            <ZoneCard
              key={zoneData.location}
              zoneData={zoneData}
              loading={false}
              error={zoneData.error}
            />
          ))
        ) : null}
      </div>

      {!loading && zoneDataList.length === 0 && !apiError && (
        <div
          className="rounded-lg p-8 text-center"
          style={{
            background: "var(--bc-surface)",
            borderColor: "var(--bc-border)",
          }}
        >
          <AlertCircle className="w-12 h-12 opacity-30 mx-auto mb-4" />
          <p style={{ color: "var(--bc-text)" }}>No data available</p>
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default function LagosRealtimeClimate() {
  const [zoneDataList, setZoneDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState(null);

  const fetchAllZonesData = async () => {
    try {
      setApiError(null);

      if (WEATHER_API_KEY === "INSERT_API_KEY_HERE") {
        setApiError(
          "API key not configured. Please add your OpenWeatherMap API key."
        );
        setLoading(false);
        return;
      }

      const promises = lagosZones.map(async (zone) => {
        try {
          const weatherData = await fetchWeatherData(zone.lat, zone.lon);
          const processedData = processWeatherData(weatherData, zone);
          return { ...processedData, error: null };
        } catch {
          return {
            location: zone.name,
            error: `Failed to load data for ${zone.name}`,
          };
        }
      });

      const results = await Promise.all(promises);
      setZoneDataList(results);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      setApiError("Failed to fetch climate data. Please try again.");
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllZonesData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAllZonesData();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p
          className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: "var(--bc-accent)" }}
        >
          Real-Time Intelligence
        </p>
        <h1
          className="text-4xl font-bold mt-2 mb-3"
          style={{ color: "var(--bc-text)" }}
        >
          Lagos Construction Climate Dashboard
        </h1>
        <p
          className="leading-relaxed"
          style={{ color: "var(--bc-text-muted)" }}
        >
          Live weather monitoring and climate risk analysis for 10 major Lagos construction zones. Real-time data updates powered by OpenWeatherMap API.
        </p>
      </div>

      <DashboardContent
        zoneDataList={zoneDataList}
        loading={loading}
        apiError={apiError}
        lastUpdated={lastUpdated}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </div>
  );
}