import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './weathernow-ui.css';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import WeatherMap from './components/WeatherMap';
import SearchHistory from './components/SearchHistory';
import VisualAlerts from './components/VisualAlerts';
import { fetchWeatherData } from './utils/api';

const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    const handleSearch = async (searchCity) => {
        if (!searchCity) return;
        setLoading(true);
        setError(null);
        // setCity(searchCity); // Update input field to match search if clicked from history
        try {
            const data = await fetchWeatherData(searchCity);
            setWeatherData(data);
            setCity(searchCity);
            setHistory((prev) => {
                const newHistory = [searchCity, ...prev.filter((c) => c !== searchCity)].slice(0, 5);
                return newHistory;
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch weather data');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    // Extract coordinates for map
    const lat = weatherData?.current?.coord?.lat;
    const lon = weatherData?.current?.coord?.lon;
    const cityName = weatherData?.current?.name;

    return (
        <div className="app-container" style={{
            width: '100vw',
            minHeight: '100vh',
            background: '#f5f6f7',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            paddingBottom: 32
        }}>
            {/* Header */}
            <div className="header-bar" style={{
                maxWidth: 1200,
                margin: '0 auto',
                borderRadius: 0,
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
            }}>
                <h1>WeatherNow</h1>
                <div className="header-search">
                    <span style={{ color: '#888', fontSize: 20, marginRight: 6 }}>🔍</span>
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Enter city..."
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(city); }}}
                    />
                </div>
            </div>

            {/* Search History Row */}
            <SearchHistory history={history} onSelect={handleSearch} />

            {/* Error Message */}
            {error && (
                <div style={{ maxWidth: 1200, margin: '16px auto', padding: '0 32px', color: 'red', fontWeight: 'bold' }}>
                    Error: {error}
                </div>
            )}

            {/* Loading Indicator */}
            {loading && (
                <div style={{ maxWidth: 1200, margin: '32px auto', textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>
                    Loading...
                </div>
            )}

            {/* Main Content */}
            {weatherData && !loading && (
                <>
                    {/* Main Row: Current Weather + Visual Alerts */}
                    <div className="layout-row" style={{
                        maxWidth: 1200,
                        margin: '32px auto 0 auto',
                        gap: 48,
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: 1.2, minWidth: 300 }}>
                             <WeatherDisplay weather={weatherData.current} />
                        </div>
                        <div style={{ flex: 1, minWidth: 260, maxWidth: 340 }}>
                             <VisualAlerts weather={weatherData.current} />
                        </div>
                    </div>

                    {/* Second Row: 5-Day Forecast + Map */}
                    <div className="layout-row-forecast" style={{
                        maxWidth: 1200,
                        margin: '32px auto 0 auto',
                        gap: 48,
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: 2, minWidth: 340 }}>
                            <ForecastDisplay forecast={weatherData.forecast} />
                        </div>
                        <div className="map-card" style={{
                            minWidth: 400,
                            maxWidth: 600,
                            borderRadius: 18,
                            background: '#fff',
                            boxShadow: '0 2px 8px #0001',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: 'fit-content',
                            padding: 0,
                            flex: 1.5
                        }}>
                            <WeatherMap lat={lat} lon={lon} city={cityName} showMarkerEmoji width={480} height={340} weather={weatherData.current} />
                            <div className="map-label" style={{ fontSize: 20 }}>{cityName || 'City'}</div>
                        </div>
                    </div>
                </>
            )}

            {!weatherData && !loading && !error && (
                <div style={{ maxWidth: 1200, margin: '64px auto', textAlign: 'center', color: '#888' }}>
                    <h2>Welcome to WeatherNow</h2>
                    <p>Enter a city name above to get the current weather and forecast.</p>
                </div>
            )}
        </div>
    );
};

export default App;
