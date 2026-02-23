import React from 'react';

const ForecastDisplay = ({ forecast }) => {
    if (!forecast || !forecast.list) return null;

    // Group forecast items by date
    const dailyForecasts = {};
    forecast.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        // Prefer items close to 12:00:00, or take the first one available for the day
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        } else {
            const currentDiff = Math.abs(new Date(item.dt_txt).getHours() - 12);
            const existingDiff = Math.abs(new Date(dailyForecasts[date].dt_txt).getHours() - 12);
            if (currentDiff < existingDiff) {
                dailyForecasts[date] = item;
            }
        }
    });

    // Convert to array and take next 5 days (excluding today if needed, but let's just take 5)
    // Often the API returns today as well.
    const forecastItems = Object.values(dailyForecasts).slice(0, 5);

    return (
        <div className="forecast-section">
            <h2>5-Day Forecast</h2>
            <div className="forecast-cards">
                {forecastItems.map((item, idx) => {
                    const date = new Date(item.dt_txt);
                    const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
                    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                    const description = item.weather[0].description;
                    const tempMax = Math.round(item.main.temp_max); // Or use item.main.temp
                    const tempMin = Math.round(item.main.temp_min); // API forecast list has min/max for 3h block, not day.
                    // For daily high/low, we'd need to aggregate all 3h blocks for the day.
                    // But for simplicity, let's show the temp at that time.
                    const temp = Math.round(item.main.temp);

                    return (
                        <div className="forecast-card" key={idx}>
                            <div className="day">{dayName}</div>
                            <div className="icon">
                                <img src={iconUrl} alt={description} style={{ width: 36, height: 36 }} />
                            </div>
                            {/* Showing single temp for now as aggregation is complex without iterating all */}
                            <div className="temp">{temp}°C</div>
                            <div className="meta">{description.charAt(0).toUpperCase() + description.slice(1)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ForecastDisplay;
