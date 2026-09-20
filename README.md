# Skyline — Weather App

A responsive weather app built for the **Syntecxhub Internship Program**
(Front-End Development track, Project 1).

Search any city and see its live temperature, humidity, wind speed and
condition icon, pulled from the OpenWeatherMap API.

## Features

- Fetches live weather data using the OpenWeatherMap API
- Shows city, temperature, humidity, "feels like" and wind speed
- Weather condition icon from OpenWeatherMap
- `async/await` used for every API call, with clear error handling
- Search box to look up any city dynamically
- Clean, responsive glass-card layout that works on mobile and desktop
- Background tone shifts subtly with the current weather condition

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (ES6+, `fetch`, `async/await`)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Getting Started

1. Clone or download this repository.
2. Get a **free API key** from [openweathermap.org/api](https://openweathermap.org/api)
   (sign up → API keys tab → copy the default key).
3. Open `script.js` and replace the placeholder with your key:

   ```js
   const CONFIG = {
     API_KEY: "YOUR_OPENWEATHERMAP_API_KEY", // <-- paste your key here
     ...
   };
   ```

4. Open `index.html` in your browser (double-click it, or use the
   "Live Server" extension in VS Code). No build step or server is required.

> Note: a brand-new OpenWeatherMap key can take a few minutes up to 2 hours
> to activate. If you see an "invalid API key" message right after signing
> up, wait a bit and try again.

## Project Structure

```
Syntecxhub_Weather_App/
├── index.html      # Markup / structure
├── style.css       # Styling
├── script.js       # App logic + OpenWeatherMap API calls
└── README.md
```

## Author

Submitted as part of the **Syntecxhub Internship Program** —
Front-End Development track.

- LinkedIn: shared with `@Syntecxhub` mentioned per program instructions
- Company: [www.syntecxhub.com](https://www.syntecxhub.com)
