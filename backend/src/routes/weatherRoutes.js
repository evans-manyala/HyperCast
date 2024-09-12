const express = require('express');
const { getWeatherData, savePreferences } = require('../controllers/weatherController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/weather', getWeatherData); // POST route for fetching weather data
router.post('/preferences', protect, savePreferences); // POST route for saving preferences

module.exports = router;
