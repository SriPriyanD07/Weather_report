import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './weathernow-ui.css';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherMap from './components/WeatherMap';
import SearchHistory from './components/SearchHistory';
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
        try {
            const data = await fetchWeatherData(searchCity);
            setWeatherData(data);
            setCity(searchCity);
            setHistory((prev) => [searchCity, ...prev.filter((c) => c !== searchCity)].slice(0, 5));
        } catch (err) {
            setError(err.message);
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
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            background: '#f5f6f7',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
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
            {/* Main Row: Current Weather + Visual Alerts */}
            <div className="layout-row" style={{
                maxWidth: 1200,
                margin: '32px auto 0 auto',
                gap: 48,
            }}>
                <div className="current-weather-card" style={{
                    minWidth: 340,
                    flex: 1.2,
                    borderRadius: 18,
                }}>
                    {weatherData ? (
                        <>
                            <div className="temp-row">
                                <span className="temp">{Math.round(weatherData.current.main.temp)}°C</span>
                                <span className="weather-icon">
                                    <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt={weatherData.current.weather[0].description} style={{ width: 44, height: 44 }} />
                                </span>
                            </div>
                            <div className="desc">{weatherData.current.weather[0].description.charAt(0).toUpperCase() + weatherData.current.weather[0].description.slice(1)}</div>
                            <div className="meta">
                                <span>Humidity: {weatherData.current.main.humidity}%</span>
                                <span>Wind: {weatherData.current.wind.speed} km/h</span>
                            </div>
                            <div className="city">{weatherData.current.name}</div>
                        </>
                    ) : (
                        <span style={{ color: '#bbb' }}>Search for a city to see weather</span>
                    )}
                </div>
                <div className="visual-alerts-card" style={{
                    minWidth: 260,
                    maxWidth: 340,
                    borderRadius: 18,
                }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Visual Alerts</div>
                    <div className="visual-alert">Carry umbrella <span style={{ fontSize: 20 }}>🌧️</span></div>
                    <div className="visual-alert">Stay hydrated <span style={{ fontSize: 20 }}>☀️</span></div>
                    <div className="visual-alert">High winds warning <span style={{ fontSize: 20 }}>🌪️</span></div>
                </div>
            </div>
            {/* Second Row: 5-Day Forecast + Map */}
            <div className="layout-row-forecast" style={{
                maxWidth: 1200,
                margin: '32px auto 0 auto',
                gap: 48,
            }}>
                <div className="forecast-section" style={{ minWidth: 340, flex: 2 }}>
                    <h2>5-Day Forecast</h2>
                    <div className="forecast-cards">
                        {weatherData && weatherData.forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5).map((item, idx) => (
                            <div className="forecast-card" key={idx}>
                                <div className="day">{new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}</div>
                                <div className="icon">
                                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} style={{ width: 36, height: 36 }} />
                                </div>
                                <div className="temp">{Math.round(item.main.temp)}°/{Math.round(item.main.temp_min)}°</div>
                                <div className="meta">{item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)}</div>
                            </div>
                        ))}
                    </div>
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
                }}>
                    <WeatherMap lat={lat} lon={lon} city={cityName} showMarkerEmoji width={480} height={340} weather={weatherData?.current} />
                    <div className="map-label" style={{ fontSize: 20 }}>{cityName || 'City'}</div>
                </div>
            </div>
        </div>
    );
};

export default App;