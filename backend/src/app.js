const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
