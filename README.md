# Weather Dashboard Application

A modern, full-stack JavaScript web app for searching and visualizing current weather and 5-day forecasts for any city, using the OpenWeatherMap API. The app features a React-based UI, interactive map, search history, and a Node.js/Express backend for API requests.

---

## Features
- **City Weather Search**: Enter a city to view its current weather and 5-day forecast.
- **Search History**: Clickable history of previous searches for quick access.
- **Interactive Map**: Displays the searched city on a map with a custom animated marker.
- **Responsive Dashboard**: Clean, modern UI with weather icons and forecast cards.
- **Error Handling**: User-friendly error messages for invalid cities or network issues.

---

## Project Structure
```
weather-dashboard-app/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js              # Main React app
│   │   ├── components/
│   │   │   ├── WeatherDisplay.js   # Shows current weather & forecast
│   │   │   ├── WeatherMap.js      # Interactive city map
│   │   │   └── SearchHistory.js   # Search history list
│   │   └── utils/
│   │       └── api.js             # Client-side API calls
│   └── package.json
├── server/
│   ├── src/
│   │   ├── index.js               # Express server entry
│   │   ├── routes/
│   │   │   └── weather.js         # Weather API route
│   │   └── controllers/
│   │       └── weatherController.js # Handles weather API logic
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation
1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd weather-dashboard-app
   ```
2. **Install dependencies:**
   - Client:
     ```sh
     cd client
     npm install
     ```
   - Server:
     ```sh
     cd ../server
     npm install
     ```
3. **Set up environment variables:**
   - In `server/.env`, add:
     ```
     OPENWEATHER_API_KEY=your_api_key_here
     ```

### Running the Application
1. **Start the backend server:**
   ```sh
   cd server
   npm start
   ```
2. **Start the frontend client (in a new terminal):**
   ```sh
   cd client
   npm start
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## API Overview
- **Client → Server:**
  - `GET /api/weather?city=<cityName>`
  - Returns: `{ current: {...}, forecast: {...} }` (current weather & 5-day forecast)
- **Server → OpenWeatherMap:**
  - Fetches both `/weather` and `/forecast` endpoints, merges results

---

## Main Components (Client)
- `WeatherDisplay.js`: Shows city name, country, current conditions, and a 5-day forecast with icons.
- `WeatherMap.js`: Renders a map centered on the city with a custom emoji marker.
- `SearchHistory.js`: Displays clickable history of searched cities.
- `api.js`: Handles client-side API requests to the backend.

---

## Contributing
Pull requests and issues are welcome! Please open an issue or PR for bugs, suggestions, or improvements.

---

## License
This project is licensed under the MIT License.