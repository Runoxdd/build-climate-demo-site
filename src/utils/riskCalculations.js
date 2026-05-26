/**
 * Risk Calculation Engine for Lagos Construction Climate Intelligence
 * Calculates climate risks based on real-time weather data and local geographic factors
 */

/**
 * Calculate flood risk (0-100)
 * Based on rainfall, humidity, weather conditions, and local flood bias
 * @param {Object} weatherData - OpenWeatherMap data
 * @param {number} floodBias - Location-specific flood susceptibility (1-3)
 * @returns {number} Flood risk score (0-100)
 */
export function calculateFloodRisk(weatherData, floodBias) {
  const { rain, main, clouds } = weatherData;
  const baseScore = 20; // Baseline flood risk

  // Rainfall contribution (max 40 points)
  let rainfallScore = 0;
  if (rain?.["1h"]) {
    // Rain in last hour (mm)
    rainfallScore = Math.min(40, (rain["1h"] / 10) * 40); // 10mm = 40 points
  }

  // Humidity contribution (max 25 points)
  const humidityScore = (main.humidity / 100) * 25;

  // Weather condition contribution (max 15 points)
  let weatherScore = 0;
  const mainWeather = weatherData.weather[0]?.main.toLowerCase() || "";
  if (mainWeather.includes("rain")) weatherScore = 15;
  else if (mainWeather.includes("drizzle")) weatherScore = 10;
  else if (mainWeather.includes("thunderstorm")) weatherScore = 20;

  // Cloud coverage contribution (max 10 points)
  const cloudScore = (clouds.all / 100) * 10;

  // Calculate total and apply flood bias multiplier
  let totalScore = baseScore + rainfallScore + humidityScore + weatherScore + cloudScore;
  totalScore = totalScore * (floodBias / 2); // Scale by bias (1-3 becomes 0.5-1.5)
  totalScore = Math.min(100, Math.max(0, totalScore));

  return Math.round(totalScore);
}

/**
 * Calculate heat stress risk (0-100)
 * Based on temperature, humidity, and local heat bias
 * @param {Object} weatherData - OpenWeatherMap data
 * @param {number} heatBias - Location-specific heat susceptibility (1-3)
 * @returns {number} Heat stress risk score (0-100)
 */
export function calculateHeatStressRisk(weatherData, heatBias) {
  const { main } = weatherData;
  const temp = main.temp;
  const humidity = main.humidity;

  // Temperature contribution (0-50 points)
  // Lagos avg: 25-27°C, risk increases significantly above 28°C
  let tempScore = 0;
  if (temp < 25) tempScore = 10;
  else if (temp < 27) tempScore = 20;
  else if (temp < 29) tempScore = 35;
  else if (temp < 31) tempScore = 45;
  else tempScore = 50;

  // Humidity contribution (0-30 points)
  // Higher humidity + high temp = worse heat stress
  const humidityScore = (humidity / 100) * 30;

  // Wind factor (reduces heat stress slightly)
  let windFactor = 1;
  if (weatherData.wind && weatherData.wind.speed > 3) {
    windFactor = 0.85; // 15% reduction for wind above 3 m/s
  }

  // Calculate and apply heat bias multiplier
  let totalScore = (tempScore + humidityScore) * windFactor;
  totalScore = totalScore * (heatBias / 2); // Scale by bias
  totalScore = Math.min(100, Math.max(0, totalScore));

  return Math.round(totalScore);
}

/**
 * Calculate rainfall delay risk (0-100)
 * Based on precipitation probability and active rainfall
 * @param {Object} weatherData - OpenWeatherMap data
 * @returns {number} Rainfall delay risk score (0-100)
 */
export function calculateRainfallDelayRisk(weatherData) {
  const { rain, clouds } = weatherData;
  const mainWeather = weatherData.weather[0]?.main.toLowerCase() || "";

  let baseScore = 0;

  // Active rain presence (max 50 points)
  if (rain?.["1h"]) {
    baseScore += Math.min(50, (rain["1h"] / 5) * 50); // 5mm = 50 points
  }

  // Weather condition (max 40 points)
  if (mainWeather.includes("thunderstorm")) baseScore += 40;
  else if (mainWeather.includes("rain")) baseScore += 30;
  else if (mainWeather.includes("drizzle")) baseScore += 15;

  // Cloud coverage as predictive factor (max 20 points)
  // High clouds = higher chance of rain = higher delay risk
  baseScore += (clouds.all / 100) * 20;

  const finalScore = Math.min(100, Math.max(0, baseScore));
  return Math.round(finalScore);
}

/**
 * Get risk level category with color coding
 * @param {number} score - Risk score (0-100)
 * @returns {Object} Risk level object with label, color, and styling
 */
export function getRiskLevel(score) {
  if (score >= 80) {
    return {
      label: "Very High Risk",
      level: "very_high",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      badgeColor: "bg-red-600",
    };
  } else if (score >= 60) {
    return {
      label: "High Risk",
      level: "high",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      badgeColor: "bg-orange-600",
    };
  } else if (score >= 40) {
    return {
      label: "Moderate Risk",
      level: "moderate",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      badgeColor: "bg-yellow-600",
    };
  } else {
    return {
      label: "Low Risk",
      level: "low",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      badgeColor: "bg-green-600",
    };
  }
}

/**
 * Generate construction insights based on weather conditions and risk scores
 * Provides actionable warnings and recommendations
 * @param {Object} weatherData - OpenWeatherMap data
 * @param {number} floodRisk - Calculated flood risk
 * @param {number} heatRisk - Calculated heat risk
 * @param {number} rainfallRisk - Calculated rainfall delay risk
 * @returns {Array<string>} Array of construction insights/warnings
 */
export function generateConstructionInsights(
  weatherData,
  floodRisk,
  heatRisk,
  rainfallRisk
) {
  const insights = [];
  const { rain, main, weather } = weatherData;
  const mainWeather = weather[0]?.main.toLowerCase() || "";
  const temp = main.temp;
  const humidity = main.humidity;

  // FLOOD-RELATED INSIGHTS
  if (floodRisk >= 80) {
    insights.push("🚨 CRITICAL: Site flooding imminent - evacuate valuables and equipment");
    insights.push("⚠️ Foundation works should be suspended immediately");
  } else if (floodRisk >= 60) {
    insights.push("⚠️ Surface flooding possible - increase site drainage");
    insights.push("📋 Ensure all materials are elevated on platforms");
  } else if (floodRisk >= 40) {
    insights.push("💧 Moisture retention risk - monitor foundation excavations");
  }

  // HEAT-RELATED INSIGHTS
  if (heatRisk >= 80) {
    insights.push("🌡️ CRITICAL: Extreme heat - enforce mandatory rest breaks every 30 mins");
    insights.push("💧 Provide adequate hydration stations for workers");
    insights.push("⚡ Heat may cause rapid paint drying - apply coatings in shade/early hours");
  } else if (heatRisk >= 60) {
    insights.push("☀️ High heat stress risk - increase worker rest periods");
    insights.push("🎨 Exterior paint drying may be accelerated");
  } else if (heatRisk >= 40) {
    insights.push("☀️ Moderate heat - ensure worker hydration is maintained");
  }

  // RAINFALL DELAY INSIGHTS
  if (rainfallRisk >= 80) {
    insights.push("🌧️ CRITICAL: Heavy rainfall likely - outdoor work delays expected");
    insights.push("📋 Prepare waterproof covers for active excavations and materials");
  } else if (rainfallRisk >= 60) {
    insights.push("🌧️ Rain expected - exterior paint drying may be delayed");
    insights.push("⚠️ Strong humidity may affect coating adhesion");
  } else if (rainfallRisk >= 40) {
    insights.push("☁️ Moisture risk - exterior work may experience delays");
  }

  // HUMIDITY-SPECIFIC INSIGHTS
  if (humidity >= 80) {
    insights.push("💦 Very high humidity - concrete may cure slower than normal");
    insights.push("🎨 Paint and coating adhesion may be compromised");
  } else if (humidity >= 70) {
    insights.push("💨 High humidity - allow extended curing time for materials");
  }

  // WEATHER CONDITION INSIGHTS
  if (mainWeather.includes("thunderstorm")) {
    insights.push("⚡ Thunderstorm warning - suspend work at height and metal operations");
  } else if (mainWeather.includes("wind")) {
    insights.push("💨 Strong winds - secure all loose materials and check scaffolding");
  }

  // POSITIVE INSIGHTS
  if (floodRisk < 30 && heatRisk < 30 && rainfallRisk < 30) {
    insights.push("✅ Optimal conditions for most construction activities");
  }

  return insights.length > 0
    ? insights
    : ["📊 Monitor weather conditions throughout the workday"];
}

/**
 * Format weather data into a structured object
 * @param {Object} rawWeatherData - Raw OpenWeatherMap API response
 * @param {Object} zone - Lagos zone object with floodBias and heatBias
 * @returns {Object} Processed weather data with risk calculations
 */
export function processWeatherData(rawWeatherData, zone) {
  const floodRisk = calculateFloodRisk(rawWeatherData, zone.floodBias);
  const heatRisk = calculateHeatStressRisk(rawWeatherData, zone.heatBias);
  const rainfallRisk = calculateRainfallDelayRisk(rawWeatherData);

  const insights = generateConstructionInsights(
    rawWeatherData,
    floodRisk,
    heatRisk,
    rainfallRisk
  );

  return {
    location: zone.name,
    temperature: Math.round(rawWeatherData.main.temp),
    feelsLike: Math.round(rawWeatherData.main.feels_like),
    humidity: rawWeatherData.main.humidity,
    windSpeed: Math.round(rawWeatherData.wind.speed * 10) / 10,
    weatherMain: rawWeatherData.weather[0]?.main,
    weatherDescription: rawWeatherData.weather[0]?.description,
    rainfall: rawWeatherData.rain?.["1h"] || 0,
    cloudCoverage: rawWeatherData.clouds.all,
    floodRisk,
    heatRisk,
    rainfallRisk,
    overallRisk: Math.round((floodRisk + heatRisk + rainfallRisk) / 3),
    insights,
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}
