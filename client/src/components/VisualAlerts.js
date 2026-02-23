import React from 'react';

const VisualAlerts = ({ weather }) => {
    if (!weather) return null;

    const { weather: weatherDetails, wind, main } = weather;
    const description = weatherDetails[0].description.toLowerCase();
    const windSpeed = wind.speed;
    const temp = main.temp;

    const alerts = [];

    // Simple heuristic for alerts
    if (description.includes('rain') || description.includes('drizzle')) {
        alerts.push({ text: 'Carry umbrella', icon: '🌧️' });
    }
    if (windSpeed > 10) { // arbitrary threshold for windy
        alerts.push({ text: 'High winds warning', icon: '🌪️' });
    }
    if (temp > 30) {
        alerts.push({ text: 'Stay hydrated', icon: '☀️' });
    }
    if (temp < 5) {
        alerts.push({ text: 'Dress warmly', icon: '❄️' });
    }
    if (description.includes('snow')) {
        alerts.push({ text: 'Expect snow', icon: '❄️' });
    }

    if (alerts.length === 0) {
        alerts.push({ text: 'Enjoy the weather!', icon: '😊' });
    }

    return (
        <div className="visual-alerts-card">
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Visual Alerts</div>
            {alerts.map((alert, idx) => (
                <div key={idx} className="visual-alert">
                    {alert.text} <span style={{ fontSize: 20 }}>{alert.icon}</span>
                </div>
            ))}
        </div>
    );
};

export default VisualAlerts;
