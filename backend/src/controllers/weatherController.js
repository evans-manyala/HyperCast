const axios = require('axios');
const User = require('../models/userModel');

// Get weather data from OpenWeather API
const getWeatherData = async (req, res) => {
  const { location } = req.body; // Expect location from the request body
  const apiKey = process.env.WEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data); // Return the OpenWeather API data to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

// Get or save user preferences
const savePreferences = async (req, res) => {
  const { location, unit } = req.body; // Expect preferences data from request body
  const user = await User.findById(req.user._id);

  if (user) {
    user.preferences = { location, unit }; // Save new preferences to the user
    await user.save();
    res.json({ message: 'Preferences updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { getWeatherData, savePreferences };
