/* =========================================================
   Skyline — Weather App
   Syntecxhub Internship | Front-End Development | Project 1
   ========================================================= */

// 1) Get a free API key from https://openweathermap.org/api
//    and paste it below. Keep it out of public commits if you
//    can — for this assignment a placeholder is fine.
const CONFIG = {
  API_KEY: "YOUR_OPENWEATHERMAP_API_KEY",
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
  ICON_URL: "https://openweathermap.org/img/wn",
  DEFAULT_CITY: "Dhaka",
};

const elements = {
  form: document.getElementById("searchForm"),
  input: document.getElementById("cityInput"),
  status: document.getElementById("statusArea"),
  weather: document.getElementById("weatherArea"),
  stage: document.getElementById("stage"),
  cityName: document.getElementById("cityName"),
  dateTime: document.getElementById("dateTime"),
  temperature: document.getElementById("temperature"),
  icon: document.getElementById("weatherIcon"),
  description: document.getElementById("description"),
  feelsLike: document.getElementById("feelsLike"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind"),
};

function showStatus(message, isError = false) {
  elements.weather.hidden = true;
  elements.status.hidden = false;
  elements.status.textContent = message;
  elements.status.classList.toggle("error", isError);
}

function showWeather() {
  elements.status.hidden = true;
  elements.weather.hidden = false;
}

function formatDateTime(unixSeconds, timezoneOffsetSeconds) {
  const localMs = (unixSeconds + timezoneOffsetSeconds) * 1000;
  const date = new Date(localMs);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

function mapConditionToStage(main) {
  const key = main.toLowerCase();
  if (key.includes("cloud")) return "clouds";
  if (key.includes("rain") || key.includes("drizzle") || key.includes("thunderstorm")) return "rain";
  if (key.includes("snow")) return "snow";
  return "clear";
}

async function fetchWeather(city) {
  const url = `${CONFIG.BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${CONFIG.API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Missing or invalid API key. Add yours in script.js (CONFIG.API_KEY).");
    }
    if (response.status === 404) {
      throw new Error(`Couldn't find "${city}". Check the spelling and try again.`);
    }
    throw new Error("Something went wrong while fetching the weather. Please try again.");
  }

  return response.json();
}

function renderWeather(data) {
  elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
  elements.dateTime.textContent = formatDateTime(data.dt, data.timezone);
  elements.temperature.textContent = Math.round(data.main.temp);
  elements.description.textContent = data.weather[0].description;
  elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  elements.humidity.textContent = `${data.main.humidity}%`;
  elements.wind.textContent = `${Math.round(data.wind.speed)} m/s`;

  const iconCode = data.weather[0].icon;
  elements.icon.src = `${CONFIG.ICON_URL}/${iconCode}@2x.png`;
  elements.icon.alt = data.weather[0].description;

  elements.stage.dataset.condition = mapConditionToStage(data.weather[0].main);

  showWeather();
}

async function loadCity(city) {
  showStatus(`Loading weather for "${city}"…`);
  try {
    const data = await fetchWeather(city);
    renderWeather(data);
  } catch (error) {
    showStatus(error.message, true);
  }
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = elements.input.value.trim();
  if (!city) return;
  loadCity(city);
});

// Load a default city on first visit so the card is never empty.
loadCity(CONFIG.DEFAULT_CITY);
