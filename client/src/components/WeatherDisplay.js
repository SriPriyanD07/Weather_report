import React from 'react';

const WeatherDisplay = ({ data }) => {
    if (!data) return null;
    const { current, forecast } = data;
    const iconUrl = current.weather[0]?.icon
        ? `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
        : '';

    // Get 5-day forecast (one per day at 12:00)
    const dailyForecast = forecast.list.filter(item => item.dt_txt.includes('12:00:00'));

    return (
        <div className="weather-display-3d">
            <h2 style={{ marginBottom: 8 }}>{current.name}, {current.sys.country}</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <img src={iconUrl} alt={current.weather[0].description} style={{ width: 64, height: 64 }} />
                <div style={{ marginLeft: 16 }}>
                    <div style={{ fontSize: 32, fontWeight: 600 }}>{Math.round(current.main.temp)}0C</div>
                    <div style={{ textTransform: 'capitalize', color: '#555' }}>{current.weather[0].description}</div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
                <div><strong>Humidity:</strong> {current.main.humidity}%</div>
                <div><strong>Wind:</strong> {current.wind.speed} m/s</div>
                <div><strong>Pressure:</strong> {current.main.pressure} hPa</div>
            </div>
            <h3 style={{ marginTop: 24 }}>5-Day Forecast</h3>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', marginTop: 8 }}>
                {dailyForecast.map((item, idx) => (
                    <div key={idx} className="forecast-card">
                        <div style={{ fontWeight: 500 }}>{new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}</div>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} style={{ width: 48, height: 48 }} />
                        <div style={{ fontSize: 18 }}>{Math.round(item.main.temp)}0C</div>
                        <div style={{ textTransform: 'capitalize', color: '#555', fontSize: 13 }}>{item.weather[0].description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherDisplay;