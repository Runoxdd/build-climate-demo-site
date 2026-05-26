/**
 * IMPORTANT: INSERT YOUR OPENWEATHERMAP API KEY HERE
 * Get free API key at: https://openweathermap.org/api
 * Sign up for free, create an API key, and replace "INSERT_API_KEY_HERE"
 */
export const WEATHER_API_KEY = "b30d64d1ca5e93115bb00cdd14b84b11";
export const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Lagos construction zones with geographic coordinates
 * floodBias and heatBias are multipliers for local risk factors (1-3 scale)
 * Higher values = higher susceptibility to that risk type
 */
export const lagosZones = [
  {
    name: "Lagos Island",
    lat: 6.4541,
    lon: 3.3947,
    floodBias: 3,
    heatBias: 2,
  },
  {
    name: "Lekki",
    lat: 6.4698,
    lon: 3.5852,
    floodBias: 3,
    heatBias: 2,
  },
  {
    name: "Victoria Island",
    lat: 6.4281,
    lon: 3.4219,
    floodBias: 2,
    heatBias: 2,
  },
  {
    name: "Ikeja",
    lat: 6.6018,
    lon: 3.3515,
    floodBias: 1,
    heatBias: 3,
  },
  {
    name: "Surulere",
    lat: 6.5000,
    lon: 3.3500,
    floodBias: 2,
    heatBias: 2,
  },
  {
    name: "Alimosho",
    lat: 6.6100,
    lon: 3.2950,
    floodBias: 1,
    heatBias: 2,
  },
  {
    name: "Ikorodu",
    lat: 6.6194,
    lon: 3.5105,
    floodBias: 2,
    heatBias: 1,
  },
  {
    name: "Badagry",
    lat: 6.4150,
    lon: 2.8815,
    floodBias: 2,
    heatBias: 1,
  },
  {
    name: "Epe",
    lat: 6.5841,
    lon: 3.9836,
    floodBias: 1,
    heatBias: 1,
  },
  {
    name: "Apapa",
    lat: 6.4488,
    lon: 3.3590,
    floodBias: 3,
    heatBias: 2,
  },
];

/**
 * Fetch live weather data from OpenWeatherMap API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data object
 */
export async function fetchWeatherData(lat, lon) {
  if (WEATHER_API_KEY === "INSERT_API_KEY_HERE") {
    throw new Error(
      "API Key not configured. Please set WEATHER_API_KEY in lagosWeatherConfig.js"
    );
  }

  const url = `${WEATHER_API_BASE}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  return response.json();
}
