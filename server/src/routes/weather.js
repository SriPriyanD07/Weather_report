const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');

// Unified route for current weather and forecast
router.get('/', getWeather);

module.exports = router;