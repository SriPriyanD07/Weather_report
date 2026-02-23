const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Returns both current weather and 5-day forecast for a city
exports.getWeather = async (req, res) => {
    const { city } = req.query;

    if (!API_KEY) {
        return res.status(500).json({ error: 'API key is missing in server configuration.' });
    }

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required.' });
    }
    try {
        // Current weather
        const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );
        // 5-day forecast
        const forecastRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        res.json({
            current: weatherRes.data,
            forecast: forecastRes.data
        });
    } catch (error) {
        console.error('Weather API Error:', error.message);
        if (error.response) {
            // Forward the status code and message from OpenWeatherMap if possible
            const status = error.response.status;
            const message = error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Failed to fetch weather data.';

            res.status(status).json({ error: message });
        } else {
            res.status(500).json({ error: 'Internal server error while fetching weather data.' });
        }
    }
};