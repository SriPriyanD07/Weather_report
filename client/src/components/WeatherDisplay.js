import React from 'react';

const WeatherDisplay = ({ weather }) => {
    if (!weather) {
        return (
            <div className="current-weather-card">
                 <span style={{ color: '#bbb' }}>Search for a city to see weather</span>
            </div>
        );
    }

    const { main, weather: weatherDetails, wind, name } = weather;
    const description = weatherDetails[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

    return (
        <div className="current-weather-card">
            <div className="temp-row">
                <span className="temp">{Math.round(main.temp)}°C</span>
                <span className="weather-icon">
                    <img src={iconUrl} alt={description} style={{ width: 44, height: 44 }} />
                </span>
            </div>
            <div className="desc">{description.charAt(0).toUpperCase() + description.slice(1)}</div>
            <div className="meta">
                <span>Humidity: {main.humidity}%</span>
                <span>Wind: {wind.speed} km/h</span>
            </div>
            <div className="city">{name}</div>
        </div>
    );
};

export default WeatherDisplay;
