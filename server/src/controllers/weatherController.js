const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

// Returns both current weather and 5-day forecast for a city
exports.getWeather = async (req, res) => {
    const { city } = req.query;
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
        console.error(error); // Log the error for debugging
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found.' });
        } else {
            res.status(500).json({ error: 'Failed to fetch weather data.' });
        }
    }
};